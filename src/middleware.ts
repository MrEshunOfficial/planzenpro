import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/Pages/Client/userAuth/Login" ||
    path === "/Pages/Client/userAuth/Register";

  const isProfilePath = path === "/Pages/Client/userAuth/userProfile";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // If the user is logged in and is trying to access a login or register page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!token && (isProfilePath || (!isPublicPath && !isProfilePath))) {
    // If the user is not logged in and is trying to access the profile or any other private path
    return NextResponse.redirect(
      new URL("/Pages/Client/userAuth/Login", request.nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/Pages/Client/userAuth/Login",
    "/Pages/Client/userAuth/Register",
    "/Pages/Client/userAuth/Logout",
    "/Pages/Client/userAuth/userProfile",
  ],
};
