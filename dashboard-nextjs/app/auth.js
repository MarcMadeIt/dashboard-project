import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
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
        Credentials({
            async authorize(credentials) {
                console.log(credentials);
                try {
                    const user = await login(credentials);
                    console.log("User object returned from login function:", user);
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
            console.log("User object received in jwt callback:", user);
            if (user) {
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && token.user) {
                session.user = token.user; // Set the entire user object in the session
            }
            return session;
        }
    }
});
