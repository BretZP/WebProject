'use server';

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from 'next/navigation';

export async function doLogout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("doLogout error:", error);
  }
}

export async function doCredentialLogin(formData: FormData) {
  const credentials = Object.fromEntries(formData);
  const username = credentials.username as string;

  if (!credentials.username || !credentials.password) {
    return { error: "Username and password are required." };
  }

  try {
    await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid username or password.' };
        case 'CallbackRouteError':
          return { error: 'Configuration error during login process.' };
        default:
          return { error: `Authentication failed: ${error.type}` };
      }
    }
    return { error: "An unexpected server error occurred during login." };
  }

  redirect('/scale-list');
}
