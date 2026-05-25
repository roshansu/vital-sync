const BASE_URL = "https://vital-sync.onrender.com/api"
//  "http://localhost:5000/api";
// "https://vital-sync-ve9t.vercel.app/api"

import { getGlobalSetLoading } from "../hooks/AppContext";

const apiCall = async (
  endpoint,
  method = "GET",
  body = null,
  type = "application/json"
) => {
  // console.log(endpoint);

  const setLoading = getGlobalSetLoading();

  try {
    // token from localStorage
    const token = JSON.parse(
      localStorage.getItem("userData")
    );

    // console.log(token.token);

    setLoading(true);

    // Headers
    const headers = {
      Authorization: `Bearer ${token.token}`,
    };

    // Add content-type only for JSON
    if (type !== "multipart/form-data") {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        method,

        headers,

        body: body
          ? type === "multipart/form-data"
            ? body
            : JSON.stringify(body)
          : null,
      }
    );

    const data = await response.json();

    // console.log("apicall data", data);

    setLoading(false);

    // handle error
    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return data;

  } catch (error) {
    setLoading(false);

    console.log("apicall error", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export default apiCall;