import axios from "axios";
const isProduction = process.env.NODE_ENV === "production";

const axiosInstance = axios.create({
	baseURL: `${
		!isProduction ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1` : `/api/v1`
	}`,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
	// timeout: 10000,
});

export default axiosInstance;
