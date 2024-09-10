import { create } from "zustand";

const useGetAllUsers = create((set) => ({
	allUsers: [],
	getConversationsUser: [],

	setAllUsers: (data) =>
		set(() => ({
			allUsers: data,
		})),

	setConversationsUser: (data) =>
		set(() => ({
			getConversationsUser: data,
		})),

	updateConversationsUser: (data) =>
		set(() => ({
			getConversationsUser: data,
		})),
}));

export default useGetAllUsers;
