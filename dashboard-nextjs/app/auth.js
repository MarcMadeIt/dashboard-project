import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToMongoDB } from "./lib/utils"
import bcrypt from "bcrypt"
import { User } from "./lib/models/user.model"

// Corrected login function
const login = async (credentials) => {
    try {
        await connectToMongoDB(); // Await connection to MongoDB
        const user = await User.findOne({ username: credentials.username })
        if (!user) {
            throw new Error("User not found.")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) throw new Error("Invalid password.")

        return {
            user,
            message: "Successfully logged in.",
        }

    } catch (err) {
        console.log(err)
        throw new Error("Failed to login.")
    }
}

// Move export statement outside of the login function
export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user;
                } catch (err) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.username = token.username;
                session.img = token.img;
            }
            return session;
        }
    }

});