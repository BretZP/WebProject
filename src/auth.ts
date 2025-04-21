import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema"; 
import connectMongoDB from "./mongodb";  

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { username, password } = credentials;

        try {
          await connectMongoDB();

          const user = await User.findOne({ username }).lean();

          if (!user) {
            console.log("User not found");
            alert("User not found");
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
          };
        } catch (error) {
          console.error("An error occurred during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },

});