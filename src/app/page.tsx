"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/BG.jpg')" }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <div className="text-center">
          <img
            src="/hashtag.png"
            alt="Cadbury"
            className="mx-auto w-80 md:w-100"
          />
          <h1 className="text-4xl font-bold mt-6">#mybirthdaysong</h1>
          <p className="text-lg mt-3">A unique birthday song for everyone!</p>
          <p className="text-sm mt-2 italic opacity-80">
            इस birthday, कुछ अच्छा हो जाए कुछ मीठा हो जाए.
          </p>
          <button
            className="mt-6 bg-yellow-400 text-purple-900 font-bold py-2 px-6 rounded-xl shadow-md hover:bg-yellow-300"
            onClick={() => router.push("/register")}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
