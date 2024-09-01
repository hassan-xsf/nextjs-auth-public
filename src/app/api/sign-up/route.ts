import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        const validate = signUpSchema.safeParse({ username, email, password })
        if (!validate.success) {
            const errorMessages = validate.error.issues.map(issue => issue.message).join(", ");

            return NextResponse.json({
                success: false,
                message: errorMessages,
            }, { status: 400 });
        }

        const userExists = await db.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (userExists) {
            console.log(userExists)
            return NextResponse.json({
                success: false,
                message: userExists.username === username ? "Username is already taken" : "Email is already taken!",
            }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        const { password: RemovePass, ...userWithoutPass } = user;
        return NextResponse.json({
            userWithoutPass,
            success: true,
            message: "User has been successfully registered",
        }, { status: 201 });

    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
