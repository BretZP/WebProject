'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doCredentialLogin } from '@/actions';
import Button from "@/components/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await doCredentialLogin(new FormData(e.currentTarget));
      if (response?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/form-submit");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-auto w-full space-y-4 p-4 rounded-lg">
      <p>Username</p>
      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg"
      />
      <p>Password</p>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-3/4 p-2 border rounded-lg mb-8"
      />
      <br></br>
      <Button type="submit">Login</Button>
      
    </form>
  );
}
