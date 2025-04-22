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
        console.log("Validating credentials for:", credentials?.username);

        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials.");
          return null;
        }

        const { username, password } = credentials;
        const trimmedUsername = username.trim();

        try {
          await connectMongoDB();
          console.log(`Finding user: "${trimmedUsername}"`);

          const user = await User.findOne({ username: trimmedUsername })
                                 .select('+password')
                                 .lean();

          if (!user) {
            console.log(` User not found: "${trimmedUsername}"`);
            return null;
          }

          if (!user.password) {
             console.error(` Password field missing for user ${user.username}.`);
             return null;
          }

          console.log(` Comparing password for ${user.username}...`);
          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (!isPasswordCorrect) {
            console.log(`Password incorrect for ${user.username}.`);
            return null;
          }

          console.log(` Credentials valid for ${user.username}.`);
          return {
            id: user._id.toString(),
            username: user.username,
          };

        } catch (error) {
          console.error(" Error during authorization:", error);
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
