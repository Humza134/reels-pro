import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse){

    try {
        const {email, password} = await req.json()
        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400})
        }
        console.log(email, password)
        await connectToDatabase()
        console.log("✅ Database connected");

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }


        const user = await User.create({
            email,
            password
        })

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                user
            },
            {status: 201}
        )

    } catch (error: any) {
        console.error("❌ Error creating user:", error);
        return NextResponse.json({error: error.message || "Failed to create user"}, {status: 500});
    }

}