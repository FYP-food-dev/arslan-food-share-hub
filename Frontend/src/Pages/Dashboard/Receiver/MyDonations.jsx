import React, { useState, useEffect } from "react";
import { getMyDonations } from "../../../services/donationService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyState from "../../../components/food/EmptyState";
import StatusBadge from "../../../components/food/StatusBadge";

const MyDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Data Fetch Function
    useEffect(() => {
        const fetchMyDonations = async () => {
            setLoading(true);
            const result = await getMyDonations();
            if (result.success) {
                setDonations(result.data);
            } else {
                toast.error("Failed to load your history.");
            }
            setLoading(false);
        };

        fetchMyDonations();
    }, []);

    // 2. Loading State
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading history...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Claims (History)</h1>
                    <Link to="/receiver" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Back to Dashboard
                    </Link>
                </div>

                {/* Donation History Grid */}
                {donations.length === 0 ? (
                    <EmptyState 
                        message="You haven't claimed any food yet." 
                        actionText="Browse Available Food" 
                        actionLink="/receiver/available-food" 
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* ✅ LOOP YAHAN SHURU HOTA HAI */}
                            {donations.map((donation) => {
                                const imageUrl = donation.food_image ? donation.food_image  // ✅ Seedha backend ka URL use karein
                                : null;

                            return (
                                <div key={donation.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition">
                                    
                                    {/* ✅ 1. IMAGE SECTION */}
                                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                                        {imageUrl ? (
                                            <img 
                                                src={imageUrl} 
                                                alt={donation.food_name} 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                            </svg>
                                        )}
                                    </div>

                                    {/* ✅ 2. CONTENT SECTION */}
                                    <div className="p-5 flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-bold text-gray-800">{donation.food_name}</h3>
                                            <StatusBadge status={donation.status} />
                                        </div>
                                        
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><strong>Donor:</strong> {donation.donor_name}</p>
                                            <p><strong>Quantity:</strong> {donation.quantity}</p>
                                            <p><strong>Claimed On:</strong> {new Date(donation.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    {/* ✅ 3. FOOTER SECTION */}
                                    <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                                        <p className="text-xs text-green-600 font-semibold">
                                            ✅ Successfully Claimed
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDonations;
















// import React, { useState, useEffect } from "react";
// import { getMyDonations } from "../../../services/donationService";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import EmptyState from "../../../components/food/EmptyState";
// import StatusBadge from "../../../components/food/StatusBadge";

// const MyDonations = () => {
//     const [donations, setDonations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // ✅ Image URL yahan banayein
//     const imageUrl = donation.food_image 
//     //    ? `http://127.0.0.1:8000${donation.food_image}` 
//         : null;

//     // 1. Data Fetch Function
//     useEffect(() => {
//         const fetchMyDonations = async () => {
//             setLoading(true);
//             const result = await getMyDonations();
//             if (result.success) {
//                 setDonations(result.data);
//             } else {
//                 toast.error("Failed to load your history.");
//             }
//             setLoading(false);
//         };

//         fetchMyDonations();
//     }, []);

//     // 2. Loading State
//     if (loading) {
//         return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading history...</div>;
//     }

   
//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <div className="max-w-6xl mx-auto">
                
//                 {/* Header Section */}
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800">My Claims (History)</h1>
//                     <Link to="/receiver" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
//                         Back to Dashboard
//                     </Link>
//                 </div>

//                 {/* Donation History Grid */}
//                 {donations.length === 0 ? (
//                     <EmptyState 
//                         message="You haven't claimed any food yet." 
//                         actionText="Browse Available Food" 
//                         actionLink="/receiver/available-food" 
//                     />
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {donations.map((donation) => (
                           
//                             <div key={donation.id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between">
//                                 {/* ✅ 1. IMAGE SECTION (Sabse Upar) */}
//             <div className="h-40 bg-gray-200 flex items-center justify-center">
//                 {imageUrl ? (
//                     <img 
//                         src={imageUrl} 
//                         alt={donation.food_name} 
//                         className="w-full h-full object-cover" 
//                     />
//                 ) : (
//                     <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//                     </svg>
//                 )}
//             </div>
//                                 <div>
                                    
//                                     <div className="flex justify-between items-start mb-3">
//                                         <h3 className="text-lg font-bold text-gray-800">{donation.food_name}</h3>
//                                         <StatusBadge status={donation.status} />
//                                     </div>
                                    
//                                     <div className="space-y-1 text-sm text-gray-600">
//                                         <p><strong>Donor:</strong> {donation.donor_name}</p>
//                                         <p><strong>Quantity:</strong> {donation.quantity}</p>
//                                         <p><strong>Claimed On:</strong> {new Date(donation.created_at).toLocaleString()}</p>
//                                     </div>
//                                 </div>
                                
//                                 {/* Additional Info / Action */}
//                                 <div className="mt-4 pt-4 border-t border-gray-100">
//                                     <p className="text-xs text-green-600 font-semibold">
//                                         ✅ Successfully Claimed
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyDonations;