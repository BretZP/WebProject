import Image from "next/image";
import Navbar from "../components/Navbar";
import connectMongoDB from "../mongodb";

export default function Home() {
  connectMongoDB();
  return (
    
    <div className="min-h-screen">
      <main className="h-screen flex flex-col">

 
  <section className="relative bg-black border-b border-gray-400 h-[40vh] flex items-center justify-center">
    <img
      src="/MusTheory.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover opacity-40  z-0"
    />
    <div className="relative z-10 text-center">
    <Image
      src="/scale_explorer.png"  
      alt="Scale Explorer Logo"
      width={450}      
      height={375}
      className="mx-auto invert dark:invert-0 pt-10"
    />
  </div>
  </section>

 
  <section className="flex-1 bg-gray-100 dark:bg-[#1e1e1e] py-5">
  <div className="max-w-4xl mx-auto px-6 text-[20px] text-[var(--text)]">
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
      <a href="/scale-list"
      className="px-4 py-2 mt-2 bg-[var(--button-background)] text-[var(--button-text)] rounded hover:opacity-90 transition whitespace-nowrap">
        Search For Scale
        
      </a>
  
    </div>

    <p className="mt-8 leading-relaxed">
      Enter any musical note, and the app will show you scales that use that note.
      It’s a quick and easy way to learn, get inspired, or find scales.
      You can explore different scale types like major and minor. It's a quick and
      easy way to learn music theory, understand how notes fit into scales, and find
      scales that match your playing style or creative ideas. You can also favorite scales
      that you like for easy access and edit the scale components by adding examples of songs in that key.
    </p>
  </div>
</section>

</main>
    </div>
  );
}