'use client';

import { useState } from 'react';
import React from 'react';
import '@/app/globals.css';
import Button from "@/components/Button";

interface NewUser {
    _id: number;
    username: string;
    password: string;
}

interface LoginFormProps {
    onLogin: (user: NewUser) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.username != '' && formData.password != '') {
            const newUser: NewUser = {
                _id: Math.floor(Math.random() * 100000), // random ID
                ...formData
            };
            onLogin(newUser);
            setFormData({ username: '', password: '' });
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
                placeholder="Username"
                required
                className="w-3/4 p-2 border rounded-lg"
            />
            <br></br>
            <p>Password</p>
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-3/4 p-2 border rounded-lg mb-8"
            />
            <br></br>
            <Button type="submit">Login</Button>
        </form>
    )
}