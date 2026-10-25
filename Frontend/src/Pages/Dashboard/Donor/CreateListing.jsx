import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../../services/foodService";
import FoodForm from "../../../components/food/FoodForm";
import toast from 'react-hot-toast'; // ✅ Import karein

const CreateListing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        food_name: "",
        food_type: "",
        description: "",
        quantity: "",
        quantity_unit: "kg",
        address: "",
        pickup_time: "",
        expiration_date: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Convert datetime-local to ISO format
        const payload = {
            ...formData,
            quantity: parseInt(formData.quantity),
            pickup_time: new Date(formData.pickup_time).toISOString(),
            expiration_date: new Date(formData.expiration_date).toISOString(),
        };

        const result = await createListing(payload);
        setLoading(false);

        if (result.success) {
           // alert("Listing created successfully!");
            toast.success("Listing created successfully!"); // ✅ Success toast
            navigate("/dashboard/donor/my-listings");
        } else {
            //setError(result.error);
            toast.error("Error creating listing."); // ✅ Error toast
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Food Listing</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                )}

                <FoodForm
                    formData={formData}
                    handleChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitText="Create Listing"
                />
            </div>
        </div>
    );
};

export default CreateListing;