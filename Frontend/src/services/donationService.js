import {api} from "./api";

export async function getAvailableFood() {
    try {
       const  response = await api.get('/donations/available-food/');
        return {success:true, data:response.data};

    }
    catch (error) {
        return {success:false, error: error.response?.data || "Network error"};
    }
}



export async function claimFood(foodId) {
    try {
       const response = await api.post(`/donations/claim-food/${foodId}/`);
        return {success:true, data:response.data};

    }
    catch (error) {
        return {success:false, error: error.response?.data || "Network error"};
    }
}



export async function getMyDonations() {
    try {
       const response = await api.get('/donations/my-donations/');
        return {success:true, data:response.data};
    }
    catch (error) {
        return {success:false, error: error.response?.data || "Network error"};
    }
}