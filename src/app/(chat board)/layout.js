"use client";

import Header from "@/components/header/Header";
import UserCard from "./UserCard";
import useGetAllUsers from "@/store/getAllUserStore";
import useData from "@/context/DataProvider";

export default function RootLayout({ children }) {
	const { isChatOpen } = useData();
	const getUserData = useGetAllUsers((state) => state.allUsers);

	return (
		<>
			<Header />

			<div className="h-screen w-screen fixed top-0 left-0 right-0 pt-20">
				<div className="h-full flex">
					<div
						className={`hideScrollBar lg:block w-full lg:w-3/12 h-full overflow-y-scroll border-r p-5 space-y-3
								${isChatOpen && "hidden"}
							`}
					>
						{getUserData.map((data, i) => (
							<UserCard data={data} key={i} />
						))}
					</div>

					<div
						className={`hideScrollBar h-full w-full flex-1 lg:block
							${!isChatOpen && "hidden"}
						`}
					>
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
