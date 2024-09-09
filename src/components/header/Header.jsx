"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
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
	const { setIsloggedIn } = useData();
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
			<header className="w-screen h-20 px-5 fixed top-0 backdrop-blur-md border-b z-50">
				<div className="header h-full flex items-center justify-between ">
					<div className="logo">
						<h1 className="text-2xl font-semibold">Chat App</h1>
					</div>

					<div className="searchBox">
						<Input
							type="search"
							placeholder="Search chat"
							className="w-96 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<nav>
						<ul className="flex items-center gap-3">
							<li>
								<Link href={"/profile"}>Profile</Link>
							</li>
							<li>{loggedInUser?.username}</li>
							<ModeToggle />
							<Button
								disabled={isLoggedOut}
								variant={isLoggedOut ? "outline" : ""}
								size={isLoggedOut ? "icon" : ""}
								onClick={handleLogout}
							>
								{!isLoggedOut ? (
									<>
										<LogOut className="mr-2 h-4 w-4 " />
										Logout
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
