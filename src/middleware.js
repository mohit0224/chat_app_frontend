import { NextResponse } from "next/server";

export const middleware = (req) => {
	const token = req.cookies.get("token")?.value;
	console.log("🚀 ~ middleware ~ token:", token)
	const url = req.nextUrl;

	if (
		token &&
		(url.pathname.startsWith("/login") || url.pathname.startsWith("/register"))
	) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (!token && (url.pathname === "/" || url.pathname.startsWith("/profile"))) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
};

// See "Matching Paths"
export const config = {
	matcher: ["/", "/login", "/register", "/profile"],
};
