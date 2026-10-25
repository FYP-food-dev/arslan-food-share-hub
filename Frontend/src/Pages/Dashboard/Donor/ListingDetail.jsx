import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getListingById, deleteListing } from "../../../services/foodService";
import StatusBadge from "../../../components/food/StatusBadge";

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchListing() {
            const result = await getListingById(id);
            if (result.success) {
                setListing(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        }
        fetchListing();
    }, [id]);

    async function handleDelete() {
        if (!window.confirm("Delete this listing?")) return;
        const result = await deleteListing(id);
        if (result.success) {
            navigate("/dashboard/donor/my-listings");
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{JSON.stringify(error)}</div>;
    if (!listing) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{listing.food_name}</h1>
                    <StatusBadge status={listing.status} />
                </div>

                <div className="space-y-3 text-gray-700">
                    <p><strong>Food Type:</strong> {listing.food_type}</p>
                    <p><strong>Description:</strong> {listing.description}</p>
                    <p><strong>Quantity:</strong> {listing.quantity} {listing.quantity_unit}</p>
                    <p><strong>Address:</strong> {listing.address}</p>
                    <p><strong>Pickup Time:</strong> {new Date(listing.pickup_time).toLocaleString()}</p>
                    <p><strong>Expiration:</strong> {new Date(listing.expiration_date).toLocaleString()}</p>
                    <p><strong>Created At:</strong> {new Date(listing.created_at).toLocaleString()}</p>
                </div>

                <div className="flex gap-3 mt-8">
                    <Link
                        to={`/dashboard/donor/listing/${listing.id}/edit`}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
                    >
                        Delete
                    </button>
                    <Link
                        to="/dashboard/donor/my-listings"
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;