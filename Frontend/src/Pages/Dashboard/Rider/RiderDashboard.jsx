import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import NotificationBell from '../../../components/notifications/NotificationBell';

const RiderDashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Rider Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">Welcome, {user?.username}!</p>
                    </div>
                    {/* Notification Bell */}
                    <NotificationBell />
                </div>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <Link to="/rider/available-deliveries" className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition font-semibold shadow-md">
                         Available Deliveries
                    </Link>
                    
                    <Link to="/rider/my-deliveries" className="p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition font-semibold shadow-md">
                         My Deliveries
                    </Link>
                    
                    <Link to="/profile" className="p-4 bg-gray-500 text-white rounded-lg text-center hover:bg-gray-600 transition font-semibold shadow-md">
                         My Profile
                    </Link>

                    <button onClick={logout} className="p-4 bg-red-500 text-white rounded-lg text-center hover:bg-red-600 transition font-semibold shadow-md">
                         Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RiderDashboard;