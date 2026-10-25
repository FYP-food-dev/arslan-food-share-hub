import React from "react";

const FoodForm = ({ formData, handleChange, onSubmit, loading, submitText }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {/* Food Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
                <input
                    type="text"
                    name="food_name"
                    value={formData.food_name}
                    onChange={handleChange}
                    placeholder="e.g., Biryani"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Food Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                <input
                    type="text"
                    name="food_type"
                    value={formData.food_type}
                    onChange={handleChange}
                    placeholder="e.g., Rice"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Fresh biryani from restaurant"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="5"
                        min="1"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                        name="quantity_unit"
                        value={formData.quantity_unit}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    >
                        <option value="kg">kg</option>
                        <option value="plates">plates</option>
                        <option value="pieces">pieces</option>
                        <option value="liters">liters</option>
                    </select>
                </div>
            </div>

            {/* Address */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Mohallah Komhara, Sialkot"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Pickup Time */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                <input
                    type="datetime-local"
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Expiration Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                <input
                    type="datetime-local"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3 rounded-lg transition ${
                    loading
                        ? "bg-green-300 cursor-not-allowed text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                }`}
            >
                {loading ? "Saving..." : submitText}
            </button>
        </form>
    );
};

export default FoodForm;