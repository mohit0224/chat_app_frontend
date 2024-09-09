import { create } from "zustand";

const useGetAllUsers = create((set) => ({
	allUsers: [],

	setAllUsers: (data) =>
		set(() => ({
			allUsers: data,
		})),



		
}));

export default useGetAllUsers;
