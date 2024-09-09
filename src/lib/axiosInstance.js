import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1`,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
	// timeout: 10000,
});

export default axiosInstance;
