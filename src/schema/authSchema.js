import { z } from "zod";

export const registerValidation = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters long." })
		.max(20, { message: "Username can't be longer than 20 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(20, { message: "Password can't be longer than 20 characters." })
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter.",
		})
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least one lowercase letter.",
		})
		.refine((val) => /[0-9]/.test(val), {
			message: "Password must contain at least one number.",
		})
		.refine((val) => /[!.@#$%^&*]/.test(val), {
			message: "Password must contain at least one special character.",
		}),
});
export const loginValidation = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(20, { message: "Password can't be longer than 20 characters." })
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter.",
		})
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least one lowercase letter.",
		})
		.refine((val) => /[0-9]/.test(val), {
			message: "Password must contain at least one number.",
		})
		.refine((val) => /[!.@#$%^&*]/.test(val), {
			message: "Password must contain at least one special character.",
		}),
});
