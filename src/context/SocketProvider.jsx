"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import useLoggedInUser from "@/store/loggedInUserStore";
import useMessageStore from "@/store/messageStore";
import useGetAllUsers from "@/store/getAllUserStore";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [whoIsOnline, setWhoIsOnline] = useState([]);
	const currentUser = useLoggedInUser((state) => state.loggedInUser);
	const addNewMessages = useMessageStore((state) => state.addNewMessages);
	const updateConversationsUser = useGetAllUsers(
		(state) => state.updateConversationsUser
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && currentUser?._id) {
			const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URI, {
				auth: {
					userId: currentUser?._id,
				},
				withCredentials: true,
			});
			setSocket(socketInstance);

			socketInstance.on("whoIsOnline", (data) => setWhoIsOnline(data));
			socketInstance.on("connect_error", (error) => {
				console.error("Socket connection error:", error);
			});

			return () => {
				if (socketInstance) {
					socketInstance.close();
				}
			};
		}
	}, [currentUser]);

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (message) => {
				addNewMessages(message);
			});

			socket.on("newConversationUser", (data) => {
				updateConversationsUser(data);
			});

			return () => {
				socket.off("newMessage");
			};
		}
	}, [socket]);

	return (
		<SocketContext.Provider value={{ socket, whoIsOnline }}>
			{children}
		</SocketContext.Provider>
	);
};

const useSocket = () => useContext(SocketContext);
export default useSocket;
