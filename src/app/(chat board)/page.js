"use client";
import React from "react";
import InputBox from "./InputBox";
import ChatArea from "./ChatArea";
import useData from "@/context/DataProvider";

const Page = () => {
	const { isChatOpen } = useData();

	return (
		<>
			{isChatOpen ? (
				<div className="h-full w-full relative">
					<ChatArea />

					<div className=" w-full h-20 bg-slate-100 dark:bg-slate-900 px-5 border-t ">
						<InputBox />
					</div>
				</div>
			) : (
				<div className="h-full w-full flex items-center justify-center">
					<h3 className="text-xl">Click chat to conversation</h3>
				</div>
			)}
		</>
	);
};

export default Page;
