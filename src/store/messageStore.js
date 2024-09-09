import { create } from "zustand";

const useMessageStore = create((set) => ({
	getMessages: [],

	setAllMessages: (messages) =>
		set(() => ({
			getMessages: messages,
		})),

	addNewMessages: (messages) =>
		set((state) => ({
			getMessages: [...state.getMessages, messages],
		})),
}));

export default useMessageStore;
