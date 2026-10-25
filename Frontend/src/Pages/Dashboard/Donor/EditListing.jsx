import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, updateListing } from "../../../services/foodService";
import FoodForm from "../../../components/food/FoodForm";
import toast from "react-hot-toast";


const EditListing = () => {
    const { id } = useParams();
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
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchListing() {
            const result = await getListingById(id);
            if (result.success) {
                const data = result.data;
                setFormData({
                    food_name: data.food_name,
                    food_type: data.food_type,
                    description: data.description,
                    quantity: data.quantity,
                    quantity_unit: data.quantity_unit,
                    address: data.address,
                    pickup_time: data.pickup_time.slice(0, 16), // datetime-local format
                    expiration_date: data.expiration_date.slice(0, 16),
                });
            } else {
                setError(result.error);
            }
            setFetching(false);
        }
        fetchListing();
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            ...formData,
            quantity: parseInt(formData.quantity),
            pickup_time: new Date(formData.pickup_time).toISOString(),
            expiration_date: new Date(formData.expiration_date).toISOString(),
        };

        const result = await updateListing(id, payload);
        setLoading(false);

        if (result.success) {
           // alert("Listing updated successfully!");
           toast.success("Listing updated successfully!"); // ✅ Success toast
            navigate("/dashboard/donor/my-listings");
        } else {
            setError(result.error);
        }
    }

    if (fetching) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Listing</h1>
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{JSON.stringify(error)}</div>}
                <FoodForm
                    formData={formData}
                    handleChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitText="Update Listing"
                />
            </div>
        </div>
    );
};

export default EditListing;