"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "@/schema/authSchema";
import authServices from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import useData from "@/context/DataProvider";

const Page = () => {
	const navigate = useRouter();
	const { setIsloggedIn } = useData();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(loginValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			const res = await authServices.loginAccount(data);
			localStorage.setItem("token", `${res.data.data}Snp`);
			setIsloggedIn(true);
			form.reset({
				email: "",
				password: "",
			});
			toast.success(res.data.message);
			navigate.replace("/");
		} catch (err) {
			toast.error(err.response.data.message);
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<>
			<section className="pt-20 px-5">
				<div className="max-w-xl mx-auto rounded-xl shadow-lg dark:shadow-slate-800 p-5 space-y-5">
					<div className="">
						<h1 className="text-3xl font-bold text-pretty">Login account</h1>
						<p className="text-sm text-pretty">
							Dont have an account ? <Link href={"/register"}>signup</Link>{" "}
						</p>
					</div>

					<div className="">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter your email" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="Enter your password" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{!isSubmitting ? (
										"Login"
									) : (
										<>
											<LoaderCircle className="animate-spin mr-3" /> Please
											wait...
										</>
									)}
								</Button>
							</form>
						</Form>
					</div>

					<div className="">
						<Link href={"#"} className="text-sm text-pretty">
							forget password ?
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
