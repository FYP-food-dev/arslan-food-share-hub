import React, { useEffect, useState } from "react";
import { getMyListings, deleteListing } from "../../../services/foodService";
import FoodCard from "../../../components/food/FoodCard";
import EmptyState from "../../../components/food/EmptyState";
import toast from 'react-hot-toast'; // ✅ Import karein

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchListings() {
        setLoading(true);
        const result = await getMyListings();
        if (result.success) {
            setListings(result.data);
        } else {
            setError(result.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchListings();
    }, []);

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        
        const result = await deleteListing(id);
        if (result.success) {
            //alert("Listing deleted successfully!");
            toast.success("Listing deleted successfully!"); // ✅ Success toast
            fetchListings(); // Refresh
        } else {
            //alert("Error deleting listing.");
            toast.error("Error deleting listing."); // ✅ Error toast
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Food Listings</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                        {JSON.stringify(error)}
                    </div>
                )}

                {listings.length === 0 ? (
                    <EmptyState
                        message="You haven't created any listings yet."
                        actionText="Create Your First Listing"
                        actionLink="/dashboard/donor/create-listing"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map(listing => (
                            <FoodCard
                                key={listing.id}
                                listing={listing}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyListings;