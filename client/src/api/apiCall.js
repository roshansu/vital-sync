const BASE_URL = 'https://vital-sync-ve9t.vercel.app/api'
// 'https://vital-sync-ve9t.vercel.app'

// 'http://localhost:5000/api'
import { getGlobalSetLoading } from "../hooks/AppContext";

const apiCall = async (
    endpoint,
    method = "GET",
    body = null
) => {

    console.log(endpoint)
    const setLoading = getGlobalSetLoading();
    try {

        // token from localStorage
        const token = JSON.parse(localStorage.getItem("userData"));

        console.log(token.token)
        setLoading(true)

        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {
                method,

                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token.token}`
                },

                ...(body && {
                    body: JSON.stringify(body)
                })
            }
        );

        const data = await response.json();
        console.log("apicall data", data)
        setLoading(false)
        // handle error
        if (!response.ok) {
            throw new Error(
                data.message || "Something went wrong"
            );
        }

        return data;

    } catch (error) {
        setLoading(false)
        console.log("apicall error", error)
        return {
            success: false,
            message: error.message
        };
    }
};

export default apiCall;