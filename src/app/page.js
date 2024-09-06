"use client";
import axios from "axios";
import React from "react";

const Page = () => {
	
	const axiosInstance = axios.create({
		baseURL: `/api/v1`,
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		// timeout: 10000,
	});
	const handleCookie = async () => {
		const result = await axiosInstance.post("/users/", {});
		console.log("🚀 ~ handleCookie ~ result:", result);
	};
	const handleData = async () => {
		const result = await axiosInstance.get("/users/");
		console.log("🚀 ~ handleData ~ result:", result);
	};

	return (
		<>
			<div className="px-10 py-5">
				<button
					className="border px-3 py-2 rounded-md font-[font-family:var(--font-geist-mono)]"
					onClick={handleCookie}
				>
					create user cookie
				</button>
			</div>
			<div className="px-10 py-5">
				<button
					className="border px-3 py-2 rounded-md font-[font-family:var(--font-geist-mono)]"
					onClick={handleData}
				>
					get user
				</button>
			</div>
		</>
	);
};

export default Page;
