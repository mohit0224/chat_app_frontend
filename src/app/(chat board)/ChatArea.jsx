import React, { useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import useMessageStore from "@/store/messageStore";

const ChatArea = () => {
	const readMessages = useMessageStore((state) => state.getMessages);

	const showLastMessageRef = useRef();

	useEffect(() => {
		showLastMessageRef.current.scrollTo({
			top: showLastMessageRef.current.scrollHeight,
		});
	}, [readMessages]);

	return (
		<div
			ref={showLastMessageRef}
			className="hideScrollBar media  h-[calc(100vh-80px)] flex flex-col space-y-3 overflow-y-scroll p-5  pt-24"
		>
			{readMessages.length === 0 ? (
				<div className="text-center">
					<p className="text-lg text-pretty dark:text-slate-400">
						Send message to start conversation.
					</p>
				</div>
			) : (
				readMessages.map((message, i) => <ChatCard key={i} data={message} />)
			)}
		</div>
	);
};

export default ChatArea;
