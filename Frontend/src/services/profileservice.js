import { api } from "./api"



export async function GetProfile(){

    const role=JSON.parse(localStorage.getItem('role'))[0]
    console.log(role)
    try{
    const response= await api.get(`profile/?role=${role}`)
    console.log(response)
    return response
}catch(error){
    console.log(error)
    return error
}}
export async function CreateProfile(profileData){
    const role=JSON.parse(localStorage.getItem('role'))[0]
    const formData = new FormData();
    for (const key in profileData) {
        formData.append(key, profileData[key]);
    }
    try{
        const response= await api.post(`profile/?role=${role}`,formData)
        console.log(response)
        return response
    }catch(error){
        console.log(error)
        return error
    }}
export async function UpdateProfile(updateProfile){
    const role=JSON.parse(localStorage.getItem('role'))[0]
    const formData = new FormData();
    for (const key in updateProfile) {
        formData.append(key, updateProfile[key]);
    }
    try{
        const response= await api.patch(`profile/?role=${role}`,formData)
        console.log(response)
        return response
    }catch(error){
        console.log(error)
        return error
    }}