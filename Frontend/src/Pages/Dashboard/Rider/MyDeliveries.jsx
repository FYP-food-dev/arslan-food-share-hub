import React, { useState, useEffect } from "react";
import { getMyDeliveries, updateDeliveryStatus } from "../../../services/deliveryService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyState from "../../../components/food/EmptyState";
import StatusBadge from "../../../components/food/StatusBadge";

const MyDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null); // Kis delivery ka status update ho raha hai

    // 1. Data Fetch Function
    const fetchMyDeliveries = async () => {
        setLoading(true);
        const result = await getMyDeliveries();
        if (result.success) {
            setDeliveries(result.data);
        } else {
            toast.error("Failed to load your deliveries.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyDeliveries();
    }, []);

    // 2. Status Update Handler
    const handleStatusUpdate = async (deliveryId, newStatus) => {
        setUpdatingId(deliveryId);
        const result = await updateDeliveryStatus(deliveryId, newStatus);
        setUpdatingId(null);

        if (result.success) {
            toast.success(`Status updated to ${newStatus.replace('_', ' ')}!`);
            fetchMyDeliveries(); // List refresh karein
        } else {
            toast.error(result.error?.error || "Failed to update status.");
        }
    };

    // 3. Loading State
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading your deliveries...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Deliveries</h1>
                    <Link to="/rider" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Back to Dashboard
                    </Link>
                </div>

                {/* Delivery Cards Grid */}
                {deliveries.length === 0 ? (
                    <EmptyState 
                        message="You haven't accepted any deliveries yet." 
                        actionText="Browse Available Deliveries" 
                        actionLink="/rider/available-deliveries" 
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliveries.map((delivery) => (
                            <div key={delivery.id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">{delivery.food_name}</h3>
                                        <StatusBadge status={delivery.status} />
                                    </div>
                                    
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p><strong>Donor:</strong> {delivery.donor_name}</p>
                                        <p><strong>Receiver:</strong> {delivery.receiver_name}</p>
                                        <p><strong>Pickup:</strong> {delivery.pickup_address}</p>
                                        <p><strong>Drop:</strong> {delivery.receiver_address || "Address not provided"}</p>
                                    </div>
                                </div>

                                {/* Action Buttons based on Status */}
                                <div className="mt-5">
                                    {delivery.status === 'assigned' && (
                                        <button
                                            onClick={() => handleStatusUpdate(delivery.id, 'picked_up')}
                                            disabled={updatingId === delivery.id}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg transition"
                                        >
                                            {updatingId === delivery.id ? "Updating..." : "Mark as Picked Up"}
                                        </button>
                                    )}

                                    {delivery.status === 'picked_up' && (
                                        <button
                                            onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                                            disabled={updatingId === delivery.id}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
                                        >
                                            {updatingId === delivery.id ? "Updating..." : "Mark as Delivered"}
                                        </button>
                                    )}

                                    {delivery.status === 'delivered' && (
                                        <p className="text-center text-green-600 font-semibold text-sm">
                                            ✅ Delivery Completed
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDeliveries;