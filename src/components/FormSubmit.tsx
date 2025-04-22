'use client';

import { useState } from 'react'; 
import Button from "@/components/Button"; 
import { scaleCards } from '@/components/scales'; 

interface FormData {
    scale: string;
    songTitle: string; 
}

const scalesList = scaleCards
    .map(card => card.title)
    .filter((name): name is string => typeof name === 'string' && name.trim() !== '')
    .sort();

export default function FormSubmit() {
    const [formData, setFormData] = useState<FormData>({
        scale: '',
        songTitle: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setSubmitError(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSuccessMessage(null);

        if (!formData.scale) {
            setSubmitError("Please select a scale from the dropdown.");
            setIsSubmitting(false);
            return;
        }
        if (!formData.songTitle.trim()) {
            setSubmitError("Please enter a song title.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/scales/add-song', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    scaleName: formData.scale,
                    songTitle: formData.songTitle.trim()
                 }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `Submission failed: ${response.statusText}`);
            }

            setSuccessMessage(result.message || 'Song added successfully!');
            setFormData({ scale: '', songTitle: '' });

        } catch (err: any) {
            setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-auto w-full space-y-6 p-4 rounded-lg bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Add a Song to a Scale</h2>

            <div className="mb-4">
                <label htmlFor="scale" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Scale <span className="text-red-500">*</span>
                </label>
                <select
                    id="scale"
                    name="scale"
                    value={formData.scale}
                    onChange={handleChange}
                    required
                    className={`w-full sm:w-3/4 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 + text-black ${isSubmitting || scalesList.length === 0 ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'border-gray-300'}`}
                    disabled={isSubmitting || scalesList.length === 0}
                >
                    <option value="" disabled>-- Select a Scale --</option>
                    {scalesList.map((scaleName) => (
                        <option key={scaleName} value={scaleName}>
                            {scaleName}
                        </option>
                    ))}
                </select>
                {scalesList.length === 0 && (
                     <p className="text-sm text-gray-500 mt-1">No scales defined in '@/components/scales'.</p>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Song Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="songTitle"
                    name="songTitle"
                    value={formData.songTitle}
                    onChange={handleChange}
                    placeholder="Enter the song title"
                    required
                    className={`w-full sm:w-3/4 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 + text-black ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'border-gray-300'}`}
                    disabled={isSubmitting}
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting || scalesList.length === 0}
            >
                {isSubmitting ? 'Adding Song...' : 'Add Song to Scale'}
            </Button>

            <div className="mt-4 min-h-[2em]">
                {submitError && <p className="text-red-600 text-sm font-medium">Error: {submitError}</p>}
                {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}
            </div>
        </form>
    );
}
