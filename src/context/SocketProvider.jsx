"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import useLoggedInUser from "@/store/loggedInUserStore";
import useMessageStore from "@/store/messageStore";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState();
	const [whoIsOnline, setWhoIsOnline] = useState([]);
	const currentUser = useLoggedInUser((state) => state.loggedInUser);

	const addNewMessages = useMessageStore((state) => state.addNewMessages);
	const getMessages = useMessageStore((state) => state.getMessages);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI, {
				auth: {
					userId: currentUser?._id,
				},
				withCredentials: true,
				transports: process.env.NODE_ENV === "production" && ["websocket"], // Using WebSocket for production is a best practice
				reconnectionAttempts: 5, // Limit the reconnection attempts
				reconnectionDelay: 3000, // Using WebSocket for production is a best practice
			});
			setSocket(socket);

			socket.on("whoIsOnline", (data) => setWhoIsOnline(data));
			return () => {
				socket.disconnect();
			};
		}
	}, [currentUser]);

	useEffect(() => {
		socket?.on("newMessage", (message) => {
			addNewMessages(message);
		});
	}, [socket?.connected]);

	return (
		<SocketContext.Provider value={{ socket, whoIsOnline }}>
			{children}
		</SocketContext.Provider>
	);
};

const useSocket = () => useContext(SocketContext);
export default useSocket;
