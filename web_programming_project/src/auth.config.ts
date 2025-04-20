import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema";
import connectMongoDB from "@/mongodb";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password as string;
        
        if (!username || !password) return null;
    
        await connectMongoDB();
        const user = await User.findOne({ username }).lean();
    
        if (!user) return null;
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
    
        return {
          id: user._id.toString(),
          username: user.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};