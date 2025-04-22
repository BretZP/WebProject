'use client';

import { useState } from 'react';
import { doCredentialLogin } from '@/app/actions';
import Button from "@/components/Button";
// import { useRouter } from 'next/compat/router';

export default function LoginForm() {
  // const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await doCredentialLogin(new FormData(e.currentTarget));
      if (response?.error) {
        setError(response.error);
      } else {
        // router.push("/scale-list");
      }
    } catch (err) {
      console.error("LOGIN FORM CATCH ERROR: " + err);
      setError("Incorrect Username or Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-auto w-full space-y-4 p-4 rounded-lg">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <p>Username</p>
      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg text-black"
        disabled={isLoading}
      />
      <p>Password</p>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg mb-8 text-black"
        disabled={isLoading}
      />
      <br />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
