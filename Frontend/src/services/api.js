import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

  export const api = axios.create({
    baseURL: API_BASE_URL,
});
   export const publicApi = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {

    let accessToken = localStorage.getItem("access");

    if (!accessToken) {

        console.log("Ahmad access token nahi hai");

        const refreshToken = localStorage.getItem("refresh");

        console.log("Token mil giya", refreshToken);

        if (!refreshToken) {
            return Promise.reject(
                new Error("No authentication token available.")
            );
        }

        try {

            console.log(
                "Naya token tiyari shuru ho giya",
                accessToken
            );

            const response = await publicApi.post(
                "token/refresh/",
                {
                    refresh: refreshToken
                }
            );

            console.log(
                "token agaya hai naya access",
                response
            );

            console.log(
                "This is access token",
                response.data.access
            );

            // ⭐ NEW ACCESS TOKEN VARIABLE MEIN BHI UPDATE
            accessToken = response.data.access;

            // ⭐ LocalStorage mein save
            localStorage.setItem(
                "access",
                accessToken
            );

        } catch (error) {

            console.log(error.response?.data);

            if (error.response?.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }

            return Promise.reject(error);
        }
    }

    console.log("Ahmad token ja raha hai");

    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log("Request URL:", config.baseURL, config.url);
    console.log("Authorization exists:", !!config.headers.Authorization);
    console.log(
    "Authorization type:",
    config.headers.Authorization?.split(" ")[0]
);
    return config;
});


api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh");

            if (!refreshToken) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(error);
            }

            try {
                const response = await publicApi.post(
                    "token/refresh/",
                    {
                        refresh: refreshToken
                    }
                );

                const newAccessToken = response.data.access;

                localStorage.setItem("access", newAccessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);