import axiosInstance from "@/lib/axiosInstance";

class messageService {
	getChatMessages = async (id) => await axiosInstance.get(`/messages/${id}`);
	sendMessages = async (id, data) =>
		await axiosInstance.post(`/messages/${id}`, data);
}

const messageServices = new messageService();
export default messageServices;
