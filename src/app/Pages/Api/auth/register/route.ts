import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

interface RegistrationBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connect();

    const body: RegistrationBody = await req.json();
    const { firstName, lastName, email, password, dateOfBirth } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth: new Date(dateOfBirth),
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: "An error occurred during registration",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
