"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut, MoveLeft } from "lucide-react";
import authServices from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/input";
import { ModeToggle } from "../modeToggle";
import useLoggedInUser from "@/store/loggedInUserStore";
import useData from "@/context/DataProvider";

const Header = () => {
	const navigate = useRouter();
	const { isChatOpen, setIsChatOpen, setIsloggedIn, clickedUserDetails } =
		useData();
	const [isLoggedOut, setIsLoggedOut] = useState(false);
	const removeCurrentUser = useLoggedInUser((state) => state.removeUser);
	const loggedInUser = useLoggedInUser((state) => state.loggedInUser);

	const handleLogout = async () => {
		try {
			setIsLoggedOut(true);
			const res = await authServices.logoutAccount();
			localStorage.removeItem("token");
			removeCurrentUser();
			setIsloggedIn(false);
			toast.success(res.data.message);
			navigate.replace("/login");
		} catch (err) {
			toast.error(err.response.data.message);
			setIsLoggedOut(false);
		} finally {
			setIsLoggedOut(false);
		}
	};
	return (
		<>
			<header className=" w-screen h-20 px-5 fixed top-0 backdrop-blur-md border-b z-50">
				<div className="header h-full flex items-center justify-between gap-5">
					{!isChatOpen ? (
						<div className="logo">
							<h1 className="text-2xl font-semibold">Chat App</h1>
						</div>
					) : (
						<div className="flex items-center gap-3">
							<MoveLeft
								className="cursor-pointer"
								onClick={() => setIsChatOpen(false)}
							/>
							<div>
								<p className="text-lg font-medium">
									{clickedUserDetails?.username}
								</p>
							</div>
						</div>
					)}

					<nav>
						<ul className="flex items-center gap-3">
							<li className={`${isChatOpen && "hidden"}`}>
								<Link href={"/"}>Profile</Link>
							</li>
							<li className={`${isChatOpen && "hidden"} hidden md:block`}>
								{loggedInUser?.username}
							</li>
							<ModeToggle />
							<Button
								disabled={isLoggedOut}
								variant={isLoggedOut ? "outline" : ""}
								size={isLoggedOut ? "icon" : ""}
								onClick={handleLogout}
							>
								{!isLoggedOut ? (
									<>
										<LogOut className="md:mr-2 h-4 w-4 " />
										<span className="md:block hidden">Logout</span>
									</>
								) : (
									<Loader2 className="animate-spin" />
								)}
							</Button>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
