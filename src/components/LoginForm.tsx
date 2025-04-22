// src/components/LoginForm.tsx
'use client';

import { useState } from 'react';
// Removed useRouter as redirect is now handled by server action
// import { useRouter } from 'next/navigation';
import { doCredentialLogin } from '@/app/actions';
import Button from "@/components/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  // const router = useRouter(); // No longer needed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Set loading true

    try {
      // Call the server action
      const response = await doCredentialLogin(new FormData(e.currentTarget));

      // Check if the action returned an error message
      if (response?.error) {
        setError(response.error); // Display the error from the server action
      }
      // --- REMOVED router.push ---
      // else {
      //   router.push("/scale-list"); // Redirect is now handled by the server action
      // }
      // If successful, the server action redirects, so code might not reach here.

    } catch (err) {
      // This catch block might be less likely to trigger if the server action handles errors gracefully
      console.error("LOGIN FORM CATCH ERROR: " + err);
      setError("An unexpected error occurred."); // Generic error
    } finally {
       setIsLoading(false); // Set loading false
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-auto w-full space-y-4 p-4 rounded-lg">
      {/* Display Error */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <p>Username</p>
      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg text-black" // Ensure text color
        disabled={isLoading} // Disable while loading
      />
      <p>Password</p>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg mb-8 text-black" // Ensure text color
        disabled={isLoading} // Disable while loading
      />
      <br></br>
      <Button type="submit" disabled={isLoading}> {/* Disable button while loading */}
        {isLoading ? 'Logging in...' : 'Login'} {/* Show loading text */}
      </Button>

    </form>
  );
}