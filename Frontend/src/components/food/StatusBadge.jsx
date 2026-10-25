import React from "react";

const StatusBadge = ({ status }) => {
    const colors = {
        available: "bg-green-100 text-green-700 border-green-300",
        claimed: "bg-yellow-100 text-yellow-700 border-yellow-300",
        completed: "bg-blue-100 text-blue-700 border-blue-300",
    };

    return (
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${colors[status] || colors.available}`}>
            {status?.toUpperCase()}
        </span>
    );
};

export default StatusBadge;