import React, { createContext, useState, useEffect, useContext } from "react";
import { getNotifications } from "../services/notificationService";
import { AuthContext } from "./AuthProvider";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        const result = await getNotifications();
        if (result.success) {
            setNotifications(result.data);
            const unread = result.data.filter(n => !n.is_read).length;
            setUnreadCount(unread);
        }
        setLoading(false);
    };

    // Polling: Har 60 second baad refresh karein
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 60000); 
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    return (
        <NotificationContext.Provider value={{
            notifications, unreadCount, loading, fetchNotifications, setNotifications, setUnreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};