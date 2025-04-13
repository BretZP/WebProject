import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      
      <Navbar />

     
      <main className="h-screen"> 

        
        <section className="bg-black border-b border-gray-400 h-3/8"> {/*  Box*/}
          <div className="justify-content content-center place-content-center   p-3 text-center">
            <h1 className="text-[80px] font-bold justify-end p-30 text-center ">Scale Explorer</h1>

          
          </div>
        </section>

       
        <section className="bg-gray-100 dark:bg-[#1e1e1e] h-5/8  "> {/* Gray Box*/}
          <div className="text-[30px]   px-80 ">
          <input
              type="text"
              placeholder="Search For Scale"
              className="ml-100 mt-10 px-4 py-2  rounded  "
            />
           
            <p className="pt-15">
              Enter any musical note, and the app will show you scales that use
              that note. It’s a quick and easy way to learn music theory, understand how notes fit into scales,
              and find scales that match your playing style or creative ideas.
              You can also favorite scales that you like for easy access and edit the scale components by adding
              examples of songs in that key.
            </p> 
          </div>
        </section>
        
      </main>
    </div>
  );
}