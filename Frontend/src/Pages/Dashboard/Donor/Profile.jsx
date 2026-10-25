import React, { useContext, useState ,useEffect} from 'react'
import { GetProfile } from '../../../services/profileservice'
import ProfileForm from '../../../components/profile/ProfileForm'
import { AuthContext } from '../../../context/AuthProvider'
const Profile = () => {
    const {activeRole}=useContext(AuthContext)
    const [existProfile,setExistProfile]=useState(false)

    const [profileData,setProfileData]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
      console.log("profile component mounted");

      async function fetchProfileData() {
        console.log("Getprofile function called");
        const result=await GetProfile();
        console.log("Backend se result aya",result);


        if(result.success && result.data){
          console.log("User ka data console mein:",result.data);
          setProfileData(result.data);
          setExistProfile(true);
        }
        setLoading(false);
      }
      fetchProfileData();
    },[]);
 
    if(loading) {
      return <div>Loading...</div>;
    }
    
  return (
    <div>
      {/* <h2>profile</h2> */}
      <ProfileForm existProfile={existProfile} activeRole={activeRole} initialData={profileData}/>
     
    </div>
  )
}

export default Profile