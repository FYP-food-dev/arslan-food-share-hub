import React from "react";

const ProfileField = ({ label, name, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
                                    
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
            
        </div>
    );
};

export default ProfileField;