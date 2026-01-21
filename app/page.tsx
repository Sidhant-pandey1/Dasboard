
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth")
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="relative rounded-3xl px-16 py-14 bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-700">
          Welcome to
        </h1>

        <h2 className="mt-2 text-5xl md:text-6xl font-playfair font-bold tracking-tight text-gray-900/80">
          Dashboard Rajwatches
        </h2>

        <p className="mt-5 text-sm text-gray-600">
          Select an option from the sidebar to continue
        </p>
      </div>
    </div>
  );
}
