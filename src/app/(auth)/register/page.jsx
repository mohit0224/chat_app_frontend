"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidation } from "@/schema/authSchema";
import authServices from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
	const navigate = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerValidation),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			const res = await authServices.registerAccount(data);
			form.reset({
				username: "",
				email: "",
				password: "",
			});
			toast.success(res.data.message);
			navigate.replace("/login");
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
				<div className="max-w-xl mx-auto rounded-xl shadow-lg dark:shadow-slate-800 p-5">
					<div className="">
						<h1 className="text-3xl font-bold text-pretty">
							Create new account
						</h1>
						<p className="text-sm text-pretty">
							Have an account ? <Link href={"/login"}>login</Link>{" "}
						</p>
					</div>

					<div className="mt-5">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Enter your username"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Enter your email"
													{...field}
												/>
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
										"Register new account"
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
				</div>
			</section>
		</>
	);
};

export default Page;
