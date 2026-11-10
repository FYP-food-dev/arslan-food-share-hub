import { api } from "./api";

// ==================== 1. GET AVAILABLE DELIVERIES ====================
// Kaam: Rider ko woh deliveries dikhana jo kisi ne accept nahi ki.
export async function getAvailableDeliveries() {
    try {
        const response = await api.get('deliveries/available/');
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== 2. ACCEPT DELIVERY ====================
// Kaam: Kisi specific delivery ko accept karna.
export async function acceptDelivery(deliveryId) {
    try {
        const response = await api.post(`deliveries/${deliveryId}/accept/`);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== 3. GET MY DELIVERIES ====================
// Kaam: Rider ki apni accepted deliveries dekhna.
export async function getMyDeliveries() {
    try {
        const response = await api.get('deliveries/my-deliveries/');
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== 4. UPDATE DELIVERY STATUS ====================
// Kaam: Delivery ka status badalna (picked_up, delivered).
export async function updateDeliveryStatus(deliveryId, status) {
    try {
        const response = await api.patch(`deliveries/${deliveryId}/update-status/`, {
            status: status
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}