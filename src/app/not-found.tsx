import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (

    <div className="min-h-screen">

      <Navbar />


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
              width={600}
              height={500}
              className="mx-auto invert dark:invert-0 pt-10"
            />
          </div>
        </section>


        <section className="flex-1 bg-gray-100 dark:bg-[#1e1e1e] py-5">
          <div className="max-w-4xl mx-auto px-6 text-[20px] text-[var(--text)] flex justify-center text-center flex-col">
            <p className="mt-8 leading-relaxed">
              Page not found. Check out our Home page <a href="/" className="Link underline">here</a>.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}