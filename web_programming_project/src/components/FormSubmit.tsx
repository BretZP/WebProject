'use client';


import { useState } from 'react';
import Button from "@/components/Button";


export default function FormSubmit() {
    const [formData, setFormData] = useState({

        Song: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert("Form submitted!");
        setFormData({ Song: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="h-auto w-full space-y-4 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-10">Enter a Song for Key</h2>

            <input
                name="Song"
                value={formData.Song}
                onChange={handleChange}
                placeholder="Song title - artist name"
                required
                className="w-3/4 p-2 border rounded-lg mb-10"
            />
            <br></br>
            <Button type="submit">Submit</Button>
        </form>
    );
}