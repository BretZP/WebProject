import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    
    <div className="min-h-screen ">
      
      <Navbar />

     
      <main className="h-screen flex flex-col">

 
  <section className="relative bg-black border-b border-gray-400 h-[40vh] flex items-center justify-center">
    <img
      src="/MusTheory.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover opacity-40  z-0"
    />
    <div className="relative z-10 text-center">
      <h1 className="text-[6vw] md:text-[65px] font-bold text-white">Scale Explorer</h1>
    </div>
  </section>

 
  <section className="flex-1 bg-gray-100 dark:bg-[#1e1e1e] py-5">
    <div className="max-w-4xl mx-auto px-15 text-[20px] text-[var(--text)]">
      <input
        type="text"
        placeholder="Search For Scale"
        className="block mx-auto px-4 py-2 mt-5 rounded bg-white text-black dark:bg-[#333] dark:text-white w-full max-w-md"
      />
      <p className="mt-4 leading-relaxed">
            Enter any musical note, and the app will show you scales that use
              that note. It’s a quick and easy way to learn, get inspired, or find scales. You 
              explore different scale types like major and minor. It's a quick and easy way to learn music theory
              understand how notes fit into scales, and find scales that match your playing style or creative ideas.
              You can also favorite scales that you like for easy access and edit the scale components by adding
              examples of songs in that key.
      </p>
    </div>
  </section>

</main>
    </div>
  );
}