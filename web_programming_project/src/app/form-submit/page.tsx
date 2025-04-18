import FormSubmit from "@/app/components/FormSubmit";


export default function FormPage() {
  //  return (
  //      <main className="p-4">
  //        <FormSubmitPage />
  //      </main>
  //  );
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <div
        className="w-full h-60 bg-cover bg-center"
        style={{
          backgroundImage: "url('MusTheory.jpg/')"
        }}
      >
      </div>

      <div className="FormBox FormSubmit">
        <FormSubmit />
      </div>
    </div>
  );
}