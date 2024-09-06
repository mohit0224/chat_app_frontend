"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [whoIsOnline, setWhoIsOnline] = useState([]);
	console.log("🚀 ~ SocketProvider ~ whoIsOnline:", whoIsOnline);

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI, {
			auth: {
				userId: "dsv",
			},
			withCredentials: true,
		});
		setSocket(socket);

		socket.on("whoIsOnline", (data) => setWhoIsOnline(data));

		return () => {
			socket.disconnect();
		};
	}, []);

	return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

const useSocket = () => useContext(SocketContext);
export default useSocket;
