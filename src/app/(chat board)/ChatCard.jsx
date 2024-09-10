import { Card, CardDescription } from "@/components/ui/card";
import useLoggedInUser from "@/store/loggedInUserStore";
import React from "react";

const ChatCard = ({ data }) => {
	const loggedInUser = useLoggedInUser((state) => state.loggedInUser);

	const date = new Date(data.createdAt);

	const timeString = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<>
			<div
				className={` ${
					data.senderID === loggedInUser?._id ? "text-end" : "text-start"
				} `}
			>
				<Card
					className={`inline-flex max-w-[400px] px-5 py-2 rounded-none rounded-t-2xl
					${data.senderID === loggedInUser?._id ? "rounded-l-2xl " : "rounded-r-2xl "}
					`}
				>
					<div className="">
						<CardDescription className="text-start">
							{data.message}
							{"  "}
							<span className="text-xs">{timeString}</span>
						</CardDescription>
					</div>
				</Card>
			</div>
		</>
	);
};

export default ChatCard;
