import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToMongoDB } from "./lib/utils";
import bcrypt from "bcryptjs";
import { User } from "./lib/models/user.model";

const login = async (credentials) => {
    try {
        await connectToMongoDB();
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
            throw new Error("User not found.");
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Invalid password.");
        }

        return {
            user,
            message: "Successfully logged in.",
        };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to login.");
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                //token.img = user.img;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username;
                // session.user.img = token.img;
            }
            return session;
        },
    },
});
