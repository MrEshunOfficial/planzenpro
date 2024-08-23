import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Ensure database connection
connect();

// Define the shape of the request body
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Define the shape of the token payload
interface TokenPayload {
  id: string;
  email: string;
}

// Define the shape of the API response
interface ApiResponse {
  message: string;
  success: boolean;
  token?: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    // Validate the request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", success: false },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Check if user exists
    const user = (await User.findOne({ email })) || null;
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    // Create token payload
    const tokenPayload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1d",
    });

    // Create the response
    const response = NextResponse.json<ApiResponse>(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
