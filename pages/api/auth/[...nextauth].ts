import BaserowAdapter from "@/utils/BaserowAdapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_ID) {
    throw new Error('Please add your github id to .env.local')
}

if (!process.env.GITHUB_SECRET) {
    throw new Error('Please add your github secret to .env.local')
}

if (!process.env.ACCOUNT_TABLE_ID) {
    throw new Error('Please add your ACCOUNT_TABLE_ID to .env.local');
}

if (!process.env.SESSION_TABLE_ID) {
    throw new Error('Please add your SESSION_TABLE_ID to .env.local');
}

if (!process.env.USER_TABLE_ID) {
    throw new Error('Please add your USER_TABLE_ID to .env.local');
}

if (!process.env.DB_TOKEN) {
    throw new Error('Please add your DB_TOKEN to .env.local');
}

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    adapter: BaserowAdapter({
        accountTableId: parseInt(process.env.ACCOUNT_TABLE_ID!),
        sessionTableId: parseInt(process.env.SESSION_TABLE_ID!),
        userTableId: parseInt(process.env.USER_TABLE_ID!),
        dbToken: process.env.DB_TOKEN!
    }),
    session: {
        strategy: "jwt"
      }
}

export default NextAuth(authOptions)