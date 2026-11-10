import React, { useState, useEffect } from "react";
import { getAvailableDeliveries, acceptDelivery } from "../../../services/deliveryService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyState from "../../../components/food/EmptyState";
import StatusBadge from "../../../components/food/StatusBadge";

const AvailableDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState(null);

    // 1. Data Fetch Function
    const fetchDeliveries = async () => {
        setLoading(true);
        const result = await getAvailableDeliveries();
        if (result.success) {
            setDeliveries(result.data);
        } else {
            toast.error("Failed to load available deliveries.");
        }
        setLoading(false);
    };

    // 2. Component Mount hone par data fetch
    useEffect(() => {
        fetchDeliveries();
    }, []);

    // 3. Accept Handler
    const handleAccept = async (deliveryId) => {
        if (!window.confirm("Are you sure you want to accept this delivery?")) return;

        setAcceptingId(deliveryId);
        const result = await acceptDelivery(deliveryId);
        setAcceptingId(null);

        if (result.success) {
            toast.success("Delivery accepted successfully!");
            fetchDeliveries(); // Refresh list
        } else {
            toast.error(result.error?.error || "Failed to accept delivery.");
        }
    };

    // 4. Loading State
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading deliveries...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Available Deliveries</h1>
                    <Link to="/rider" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Back to Dashboard
                    </Link>
                </div>

                {/* Delivery Cards Grid */}
                {deliveries.length === 0 ? (
                    <EmptyState 
                        message="No deliveries available right now. Please check back later!" 
                        actionText="Refresh" 
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
                                        <p><strong>Pickup Address:</strong> {delivery.pickup_address}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAccept(delivery.id)}
                                    disabled={acceptingId === delivery.id}
                                    className={`w-full mt-5 font-bold py-2 rounded-lg transition ${
                                        acceptingId === delivery.id 
                                        ? "bg-green-300 cursor-not-allowed text-white" 
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                >
                                    {acceptingId === delivery.id ? "Accepting..." : "Accept Delivery"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableDeliveries;