import axios from "axios";
import {api} from "./api";
import { publicApi } from "./api";


export async function registerUser(payload) {
    try {
        const response = await publicApi.post(
            "register/",
            payload
        );
       
      
        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (error) {

        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                data: error.response.data
            };
        }

        return {
            success: false,
            status: null,
            data: null,
            error: "Unable to connect to the server."
        };
    }
}


export async function loginUser(payload) {

    try {

        const response = await publicApi.post(
            "login/",
            payload
        );
        console.log(response)
        console.log(response.data.access)
         console.log(response.data.refresh)
     

        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (error) {

        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                data: error.response.data
            };
        }

        return {
            success: false,
            status: null,
            data: null,
            error: "Unable to connect to the server."
        };
    }
}