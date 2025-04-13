import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
    {/* Navbar stays outside of the image section */}
    <Navbar />

    {/* Splash / hero section */}
    <div className="relative h-[300px] w-full overflow-hidden">
      {/* This is your image background */}
      <Image
        src="/MusTheory.jpg"
        alt="Sheet music background"
        fill
        className="object-cover opacity-40"
      />

      {/* Overlayed text and search bar */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Scale Explorer</h1>
        <input
          type="text"
          placeholder="Search For Scale"
          className="mt-4 px-4 py-2 rounded bg-[var(--button-background)] text-[var(--button-text)]"
        />
      </div>
    </div>


      <section className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-2">Description:</h2>
        <p>
          Enter any musical note, and the app will show you scales that use
          that note. It’s a quick and easy way to learn, get inspired, or find
          scales. You can explore different scale types like major and minor. It's a quick and
          easy way to learn music theory, understand how notes fit into scales, and find
          scales that match your playing style or creative ideas. You can also favorite scales that 
          you like for easy access and edit the scale component by adding examples of songs in that key
        </p>
      </section>
    </div>
  );
}