"use client";

import Header from "@/components/header/Header";
import UserCard from "./UserCard";
import useGetAllUsers from "@/store/getAllUserStore";
import useData from "@/context/DataProvider";
import SearchUser from "./SearchUser";

export default function RootLayout({ children }) {
	const { isChatOpen } = useData();
	const getConversationsUser = useGetAllUsers(
		(state) => state.getConversationsUser
	);

	return (
		<>
			<Header />

			<div className="h-screen w-screen fixed top-0 left-0 right-0 ">
				<div className="h-full flex">
					<div
						className={`hideScrollBar pt-24 lg:block w-full lg:w-3/12 h-full overflow-y-scroll border-r p-5 space-y-3
								${isChatOpen && "hidden"}
							`}
					>
						<SearchUser />
						{getConversationsUser.map((users) =>
							users.participants.map((user, i) => (
								<UserCard data={user} key={i} />
							))
						)}
					</div>

					<div
						className={`hideScrollBar w-full flex-1 lg:block
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
