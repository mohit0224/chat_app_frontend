import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import useGetAllUsers from "@/store/getAllUserStore";
import UserCard from "./UserCard";

const SearchUser = () => {
	const getAllUsers = useGetAllUsers((state) => state.allUsers);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" className="w-full">
					Search user
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle>All users</SheetTitle>
				</SheetHeader>
				<div className="mt-5 space-y-3 w-full">
					{getAllUsers.map((user, i) => (
						<SheetClose className="w-full block text-start">
							<UserCard data={user} key={i} />
						</SheetClose>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SearchUser;
