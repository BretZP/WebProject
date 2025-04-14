'use client';


import { useState } from 'react';
import Button from "@/app/components/Button";


export default function FormSubmitPage() {
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
       <div className="min-h-screen dark:bg-[#1e1e1e]">
           <div
               className="w-full h-60 bg-cover bg-center"
               style={{
                   backgroundImage:  "url('MusTheory.jpg/')"
               }}
           >
             
               <div className="flex items-center justify-center h-full bg-black/40">
                   <h1 className="text-white text-4xl font-bold">Welcome to SongForm 🎵</h1>
               </div>
           </div>


           <div className="flex justify-center items-center pt-30">
               <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
                   <h2 className="text-2xl font-bold mb-2">Enter a Song for Key</h2>
  
                       <input
                       name="Song"
                       value={formData.Song}
                       onChange={handleChange}
                       placeholder="Song title - artist name"
                       required
                       className="w-full p-2 border rounded"
               />
                   <Button type="submit">Submit</Button>
               </form>
           </div>
       </div>
   );
}


