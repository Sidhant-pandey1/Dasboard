
import WatchManager from "./WatchManager";
import { redirect } from "next/navigation";

export default function WatchesPage() {

    if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth")) {
      redirect("/auth");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Manage Watches
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Add new watches or delete existing ones
          </p>
        </div>

        <WatchManager />
      </div>
    </div>
  );
}
