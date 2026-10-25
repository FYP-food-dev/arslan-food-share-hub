import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const FoodCard = ({ listing, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
            {/* Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                {listing.image ? (
                    <img
                        src={listing.image}
                        alt={listing.food_name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{listing.food_name}</h3>
                    <StatusBadge status={listing.status} />
                </div>
                <p className="text-sm text-gray-500 mb-2">{listing.food_type}</p>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Quantity:</strong> {listing.quantity} {listing.quantity_unit}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Address:</strong> {listing.address}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    <strong>Pickup:</strong>{" "}
                    {new Date(listing.pickup_time).toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                    <Link
                        to={`/dashboard/donor/listing/${listing.id}`}
                        className="flex-1 text-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                    >
                        View
                    </Link>
                    <Link
                        to={`/dashboard/donor/listing/${listing.id}/edit`}
                        className="flex-1 text-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete && onDelete(listing.id)}
                        className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;