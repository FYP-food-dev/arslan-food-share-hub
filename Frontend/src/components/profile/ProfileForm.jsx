import React, { useState,useEffect } from "react";
import ProfileField from "./ProfileField";
import { CreateProfile, UpdateProfile,GetProfile } from "../../services/profileservice";
const ProfileForm = ({  activeRole }) => {
   const [updateProfile, setUpdateProfile] = useState({});
   const [previewImage, setPreviewImage] = useState(null);
   const [existProfile,setExistProfile]=useState(false)
    const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    // Donor
    organization: "",
    organization_address: "",
    // Rider
    vehicle_type: "",
    vehicle_number: "",
    availability: false,
    // common
    profile_picture: null
});
   useEffect(() => {

    async function fetchData() {
        try {
            const result = await GetProfile();
            setProfileData(result.data.profile);
            setExistProfile(result.data.exist);
        } catch (error) {
            console.log(error);
        }
    }

    fetchData();

}, []);

    console.log("Data backend sa agiya hai",profileData)
    function getPayload() {
    if (activeRole === "Donor") {
        return {
            username: profileData.username,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address,
            organization: profileData.organization,
            organization_address: profileData.organization_address,
            profile_picture: profileData.profile_picture
        };
    }

    if (activeRole === "Rider") {
        return {
            username: profileData.username,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address,
            vehicle_type: profileData.vehicle_type,
            vehicle_number: profileData.vehicle_number,
            availability: profileData.availability,
            profile_picture: profileData.profile_picture
        };
    }

    return {
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        profile_picture: profileData.profile_picture
    };
}
const payload = getPayload();
    async function submitProfile(event) {
      event.preventDefault();
      if (existProfile) {
      const result=await UpdateProfile(updateProfile);
      console.log("Profile updated successfully:", result);
      
      }
      const result=await CreateProfile(payload);
      console.log("Profile created successfully:", result);
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateProfile({
            ...updateProfile,
            [name]: value
        });
        setProfileData({
            ...profileData,
            [name]: value
        });
    }
   function handleImageChange(event) {
        const file = event.target.files[0];

        setProfileData({
            ...profileData,
            profile_picture: file
        });
        setPreviewImage(URL.createObjectURL(file));  // ✅ Preview
    }
       function handleAvailabilityChange(event) {
        setProfileData({
            ...profileData,
            availability: event.target.checked
        });
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-wxl shadow-2xl p-8">
                <h1 className="text-2xl font-bold  text-center text-gray-800" mb-8>Profile</h1>
        <form className="space-y-3" onSubmit={submitProfile}>

                     {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
                {/* <label className="block text-sm font-medium text-gray-700 mb-3">
                         Profile Picture
                    </label> */}

            <label
                    htmlFor="profile_picture"
                    className="relative cursor-pointer group"
    >
                <div className="w-32 h-32 rounded-full border-4 border-green-500 overflow-hidden flex items-center justify-center bg-gray-100 group-hover:border-green-600 transition">
                    {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            )}
        </div>

        <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 shadow-md group-hover:bg-green-600 transition">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </div>
    </label>

    < input
        id="profile_picture"
        type="file"
        name="profile_picture"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
    />
</div>
                

            <ProfileField          
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleChange}
            />

             <ProfileField
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
            />
            <ProfileField
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
            />

             <ProfileField
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
            
            />

             
            <ProfileField
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
            />

   {activeRole ==="Donor" &&  
             <>
               <ProfileField
                    label="Organization"
                    name="organization"
                    value={profileData.organization}
                    onChange={handleChange}
                />
            <ProfileField
                label="Organization Address"
                name="organization_address"
                value={profileData.organization_address}
                onChange={handleChange}
              
            />
            </>}
          {activeRole === "Rider" && (
    <>
        <ProfileField
            label="Vehicle Type"
            name="vehicle_type"
            value={profileData.vehicle_type}
            onChange={handleChange}
        />

        <ProfileField
            label="Vehicle Number"
            name="vehicle_number"
            value={profileData.vehicle_number}
            onChange={handleChange}
        />
          <label>
                        <input
                            type="checkbox"
                            name="availability"
                            checked={profileData.availability || false}
                            onChange={handleAvailabilityChange}
                        />
                        Available for delivery
                    </label>
    </>
)}
              
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition" type="submit" onClick={submitProfile}>
                {existProfile ? "Update Profile" : "Save Profile"}
            </button>
        </form>
        </div>
        </div>
    );
};

export default ProfileForm;