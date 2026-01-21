import { updatePrices, rollbackPrices } from "./actions";
import { redirect } from "next/navigation";

export default function PricesPage() {

    if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth")) {
      redirect("/auth");
    }
  }

  const COLLECTIONS = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Couple", value: "couple" },
    { label: "Smartwatches", value: "smartwatches" },
    { label: "Wall Clock", value: "wallclocks" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-black">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Bulk Price Manager
        </h1>
        <p className="text-sm text-black/70 mt-1 mb-8">
          Adjust prices using filters and percentage
        </p>

        <form
          action={async (formData) => {
            "use server";

            const genders = formData.getAll("gender") as string[];
            const collections = formData.getAll("collection") as string[];

            await updatePrices({
              brand: formData.get("brand")?.toString() || undefined,
              collections,
              percent: Number(formData.get("percent")),
            });
          }}
          className="bg-white rounded-2xl border shadow-sm p-8 space-y-8"
        >
          {/* Brand */}
          <div>
            <label className="label">Brand (optional)</label>
            <input
              name="brand"
              placeholder="Eg. Titan, Fossil"
              className="input"
            />
          </div>

          {/* Collections */}
          <div>
            <label className="label">Collections</label>
            <div className="flex flex-wrap gap-3">
              {COLLECTIONS.map((c) => (
                <label key={c.value} className="pill">
                  <input
                    type="checkbox"
                    name="collection"
                    value={c.value}
                    className="hidden peer"
                  />
                  <span className="pill-ui">{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Percentage */}
          <div>
            <label className="label">Percentage Change</label>
            <input
              name="percent"
              type="number"
              required
              placeholder="-10 or 15"
              className="input w-40"
            />
          </div>

          <button className="primary-btn">Apply Price Changes</button>
        </form>

        {/* Rollback */}
        <form action={rollbackPrices} className="mt-6">
          <button className="secondary-btn">Rollback Last Change</button>
        </form>
      </div>
    </div>
  );
}
