
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "./db";
import bcrypt from 'bcryptjs'

export const authOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const findUser = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if (!findUser) return null;
                const matchPass = await bcrypt.compare(credentials.password, findUser.password)
                if (!matchPass) return null;
                return {
                    id: String(findUser.id),
                    username: findUser.username,
                    email: findUser.email
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
}