import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";
import connectMongoDB from "./mongodb";
import { authConfig } from "./auth.config";
import { AuthError } from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        console.log("[Auth.ts Authorize] Validating credentials for:", credentials?.username);

        if (!credentials?.username || !credentials?.password) {
          console.log("[Auth.ts Authorize] Missing credentials.");
          return null;
        }

        const { username, password } = credentials;
        const trimmedUsername = username.trim();

        try {
          await connectMongoDB();
          console.log(`[Auth.ts Authorize] Finding user: "${trimmedUsername}"`);

          const user = await User.findOne({ username: trimmedUsername })
                                 .select('+password')
                                 .lean();

          if (!user) {
            console.log(`[Auth.ts Authorize] User not found: "${trimmedUsername}"`);
            return null;
          }

          if (!user.password) {
             console.error(`[Auth.ts Authorize] Password field missing for user ${user.username}. Check DB/Schema.`);
             return null;
          }

          console.log(`[Auth.ts Authorize] Comparing password for ${user.username}...`);
          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (!isPasswordCorrect) {
            console.log(`[Auth.ts Authorize] Password incorrect for ${user.username}.`);
            return null;
          }

          console.log(`[Auth.ts Authorize] Credentials valid for ${user.username}.`);
          return {
            id: user._id.toString(),
            username: user.username,
          };

        } catch (error) {
          console.error("[Auth.ts Authorize] Unexpected error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
});
