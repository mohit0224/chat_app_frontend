import axiosInstance from "@/lib/axiosInstance";

class authService {
	registerAccount = async (data) => await axiosInstance.post("/users", data);
	loginAccount = async (data) => await axiosInstance.post("/users/login", data);
	logoutAccount = async () => await axiosInstance.post("/users/logout");

	loggedInUser = async () => await axiosInstance.get("/users");
	getAllUsers = async () => await axiosInstance.get("/users/get-all-users");
	getConversationUsers = async () => await axiosInstance.get("/users/get-conversation-user");
}

const authServices = new authService();
export default authServices;
