import { api } from "./api";

// ==================== CREATE LISTING ====================
export async function createListing(payload) {
    try {
        const response = await api.post('donations/food-listings/', payload);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== GET MY LISTINGS ====================
export async function getMyListings() {
    try {
        const response = await api.get('donations/my-listings/');
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== GET LISTING DETAIL ====================
export async function getListingById(id) {
    try {
        const response = await api.get(`donations/food-listings/${id}/`);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== UPDATE LISTING ====================
export async function updateListing(id, payload) {
    try {
        const response = await api.patch(`donations/food-listings/${id}/`, payload);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}

// ==================== DELETE LISTING ====================
export async function deleteListing(id) {
    try {
        const response = await api.delete(`donations/food-listings/${id}/`);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || "Network Error" 
        };
    }
}