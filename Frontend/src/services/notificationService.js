import { api } from "./api";

// 1. Saari Notifications Fetch Karna
export async function getNotifications() {
    try {
        const response = await api.get('donations/notifications/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || "Network Error" };
    }
}

// 2. Ek Notification ko Read Mark Karna
export async function markAsRead(id) {
    try {
        const response = await api.patch(`donations/notifications/${id}/read/`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || "Network Error" };
    }
}

// 3. Saari Notifications ko Read Mark Karna
export async function markAllAsRead() {
    try {
        const response = await api.patch('donations/notifications/read-all/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || "Network Error" };
    }
}