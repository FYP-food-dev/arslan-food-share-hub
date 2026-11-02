import React, { useState, useEffect } from "react";
import { getAvailableFood, claimFood } from "../../../services/donationService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyState from "../../../components/food/EmptyState";
import StatusBadge from "../../../components/food/StatusBadge";

const AvailableFood = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [claimingId, setClaimingId] = useState(null); // Track karein kaunsi food claim ho rahi hai

    // 1. Data Fetch Function
    const fetchAvailableFood = async () => {
        setLoading(true);
        const result = await getAvailableFood();
        if (result.success) {
            setFoods(result.data);
        } else {
            toast.error("Failed to load available food.");
        }
        setLoading(false);
    };

    // 2. Component Mount hone par data fetch karein
    useEffect(() => {
        fetchAvailableFood();
    }, []);

    // 3. Claim Button Handler
    const handleClaim = async (foodId) => {
        // Confirmation popup
        if (!window.confirm("Are you sure you want to claim this food?")) return;

        setClaimingId(foodId); // Button par loading dikhane ke liye
        const result = await claimFood(foodId);
        setClaimingId(null);

        if (result.success) {
            toast.success("Food claimed successfully!");
            fetchAvailableFood(); // List ko refresh karein (taake claimed food hat jaye)
        } else {
            // Agar error aaya (jaise kisi aur ne pehle claim kar liya)
            toast.error(result.error?.error || "Failed to claim food.");
        }
    };

    // 4. Loading State
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading available food...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Available Food</h1>
                    <Link to="/receiver" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Back to Dashboard
                    </Link>
                </div>

                {/* Food Cards Grid */}
                {foods.length === 0 ? (
                    <EmptyState 
                        message="No food available right now. Please check back later!" 
                        actionText="Refresh" 
                        actionLink="/receiver/available-food" 
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <div key={food.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
                                
                                {/* Image Section */}
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    {food.image ? (
                                        <img src={food.image} alt={food.food_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                        </svg>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">{food.food_name}</h3>
                                            <StatusBadge status={food.status} />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{food.food_type}</p>
                                        <p className="text-sm text-gray-600 mb-1"><strong>Quantity:</strong> {food.quantity} {food.quantity_unit}</p>
                                        <p className="text-sm text-gray-600 mb-1"><strong>Donor:</strong> {food.donor_name}</p>
                                        <p className="text-sm text-gray-600 mb-3"><strong>Pickup:</strong> {new Date(food.pickup_time).toLocaleString()}</p>
                                    </div>

                                    {/* Claim Button */}
                                    <button
                                        onClick={() => handleClaim(food.id)}
                                        disabled={claimingId === food.id}
                                        className={`w-full font-bold py-2 rounded-lg transition ${
                                            claimingId === food.id 
                                            ? "bg-green-300 cursor-not-allowed text-white" 
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                        }`}
                                    >
                                        {claimingId === food.id ? "Claiming..." : "Claim Food"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableFood;