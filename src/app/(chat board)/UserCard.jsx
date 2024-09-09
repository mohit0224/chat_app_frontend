"use client";

import { Card, CardDescription } from "@/components/ui/card";
import useData from "@/context/DataProvider";
import useSocket from "@/context/SocketProvider";
import React from "react";

const UserCard = ({ data }) => {
	const { setIsChatOpen, setClickedUserDetails } = useData();
	const { whoIsOnline } = useSocket();
	const isOnline = whoIsOnline.includes(data?._id);

	const handleOpenChat = (data) => {
		setIsChatOpen(true);
		setClickedUserDetails(data);
	};

	return (
		<>
			<Card
				className="flex items-center px-3 py-2 gap-2 overflow-hidden cursor-pointer"
				onClick={() => handleOpenChat(data)}
			>
				<div>
					<div className="w-12 h-12 border rounded-full"></div>
				</div>
				<div className="flex-1">
					<CardDescription className="text-base">
						{data.username}
					</CardDescription>
					<CardDescription className="">
						{isOnline ? "Online" : "Offline"}
					</CardDescription>
				</div>
			</Card>
		</>
	);
};

export default UserCard;
