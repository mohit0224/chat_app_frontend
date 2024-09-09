"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useData from "@/context/DataProvider";
import messageServices from "@/services/messageService";
import { Loader2, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const InputBox = () => {
	const { clickedUserDetails } = useData();
	const [isSubmit, setIsSubmit] = useState(false);
	const [isDisabled, setIsDisabled] = useState("");

	const form = useForm({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			setIsSubmit(true);

			await messageServices.sendMessages(clickedUserDetails?._id, data);
			setIsSubmit(false);
			setIsDisabled("");
			form.reset({
				message: "",
			});
		} catch (err) {
			setIsSubmit(false);
		} finally {
			setIsSubmit(false);
		}
	};
	return (
		<div className="w-full h-full flex items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex gap-3"
				>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
										type="text"
										autoComplete="off"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											setIsDisabled(e.target.value);
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant="outline"
						size="icon"
						disabled={isSubmit}
						className={`${isDisabled === "" && "hidden"}`}
					>
						{!isSubmit ? (
							<SendHorizontal />
						) : (
							<Loader2 className="animate-spin" />
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default InputBox;
