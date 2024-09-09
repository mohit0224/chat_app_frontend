import { create } from "zustand";

const useLoggedInUser = create((set) => ({
	loggedInUser: {},

	getUser: (user) => set(() => ({ loggedInUser: user })),
	removeUser: () => set(() => ({ loggedInUser: null })),
}));

export default useLoggedInUser;
