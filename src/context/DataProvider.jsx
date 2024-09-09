"use client";

import authServices from "@/services/authService";
import messageServices from "@/services/messageService";
import useGetAllUsers from "@/store/getAllUserStore";
import useLoggedInUser from "@/store/loggedInUserStore";
import useMessageStore from "@/store/messageStore";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	// const monitorCookieAndDeleteToken = async () => {
	// 	const response = await authServices.checkCookie();

	// 	const checkInterval = 1000;

	// 	const intervalId = setInterval(async () => {
	// 		const cookieExists = response.data?.cookieExists;
	// 		const localStorageExists = JSON.parse(localStorage.getItem("user"));

	// 		if (!cookieExists) {
	// 			localStorage.removeItem("user");
	//          removeCurrentUser()
	// 		}
	// 		if (!cookieExists && !localStorageExists) clearInterval(intervalId);
	// 	}, checkInterval);
	// };

	const [isLoggedIn, setIsloggedIn] = useState(false);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [clickedUserDetails, setClickedUserDetails] = useState({});

	const addCurrentUser = useLoggedInUser((state) => state.getUser);
	const removeCurrentUser = useLoggedInUser((state) => state.removeUser);
	const setAllUsers = useGetAllUsers((state) => state.setAllUsers);

	const setAllMessages = useMessageStore((state) => state.setAllMessages);

	const getCurrentUserFnc = async () => {
		try {
			const res = await authServices.loggedInUser();
			addCurrentUser(res.data.data);
		} catch (error) {
			removeCurrentUser();
		}
	};

	const getAllUserFnc = async () => {
		try {
			const res = await authServices.getAllUsers();
			setAllUsers(res.data.data);
		} catch (err) {
			setAllUsers([]);
		}
	};

	const getClickedUserChatMessage = async () => {
		try {
			const res = await messageServices.getChatMessages(clickedUserDetails?._id);
			setAllMessages(res.data.data);
		} catch (err) {
			setAllMessages([]);
		}
	};

	useEffect(() => {
		if (Object.keys(clickedUserDetails).length > 0) {
			getClickedUserChatMessage();
		}
	}, [clickedUserDetails]);

	useEffect(() => {
		const isToken = localStorage.getItem("token");
		if (isToken) {
			getCurrentUserFnc();
			getAllUserFnc();
		}
	}, [isLoggedIn]);

	return (
		<DataContext.Provider
			value={{
				setIsloggedIn,
				isChatOpen,
				setIsChatOpen,
				clickedUserDetails,
				setClickedUserDetails,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

const useData = () => useContext(DataContext);
export default useData;
