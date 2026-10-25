import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import NotificationBell from '../../../components/notifications/NotificationBell'; // ✅ Import kiya

const DonorDashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Donor Dashboard
                </h1>
                <p className="text-gray-600 mb-6">Welcome, {user?.username}!</p>



                {/* Bell Icon yahan add kiya hai */}
                    <div className="flex items-center gap-4">
                        <NotificationBell /> 
                    </div>


                <div className="grid grid-cols-2 gap-4">
                    <Link to="/dashboard/donor/profile" className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition">
                        My Profile
                    </Link>
                    <Link to="/dashboard/donor/create-listing" className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition">
                        Create Food Listing
                    </Link>
                    <Link to="/dashboard/donor/my-listings" className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition">
                        My Listings
                    </Link>
                    <button onClick={logout} className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;