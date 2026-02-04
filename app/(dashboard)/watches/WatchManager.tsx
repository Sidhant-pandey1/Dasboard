"use client";

import { useState } from "react";
import {
  findWatchAction,
  deleteWatchAction,
  addWatchAction,
} from "./actions";

export default function WatchManager() {
  const [watch, setWatch] = useState<any | null>(null);
  const [error, setError] = useState("");

  /* ---------------- FIND WATCH ---------------- */
  async function handleFind(formData: FormData) {
    setError("");
    const result = await findWatchAction(formData);

    if (!result) {
      setWatch(null);
      setError("Watch not found");
    } else {
      setWatch(result);
    }
  }

  /* ---------------- DELETE WATCH ---------------- */
  async function handleDelete() {
    if (!watch) return;

    await deleteWatchAction(watch.id);
    setWatch(null);
  }

  return (
    <div className="space-y-12">
      {/* 🔍 FIND WATCH */}
      <section className="bg-[#f7f6f3] p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Find Watch</h2>

        <form action={handleFind} className="grid grid-cols-3 gap-4">
          <input
            name="id"
            placeholder="Watch ID (optional)"
            className="border px-3 py-2 rounded"
          />
          <input
            name="brand"
            placeholder="Brand"
            className="border px-3 py-2 rounded"
          />
          <input
            name="name"
            placeholder="Watch Name"
            className="border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="col-span-3 bg-black text-white py-2 rounded hover:opacity-90"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {watch && (
          <div className="mt-6 p-4 bg-white border rounded-lg flex gap-4">
            {watch.images && watch.images.length > 0 && (
              <img
                src={watch.images[0]}
                alt={watch.name}
                className="w-24 h-24 object-cover rounded-md border"
              />
            )}
            <div>
              <p className="font-medium">{watch.name}</p>
              <p className="text-sm text-gray-600">
                {watch.brand} • ₹{watch.price}
              </p>

              <button
                onClick={handleDelete}
                className="mt-4 text-sm bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
              >
                Delete Watch
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ➕ ADD WATCH */}
      <section className="bg-[#f7f6f3] p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Add New Watch</h2>

        <form action={addWatchAction} className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Name" required className="input" />
          <input name="brand" placeholder="Brand" required className="input" />
          <input
            name="modelNumber"
            placeholder="Model Number"
            className="input"
          />
          <input name="category" placeholder="Category" className="input" />
          <input name="price" placeholder="Price" type="number" required className="input" />
          <input
            name="discountedPrice"
            placeholder="Discounted Price"
            type="number"
            className="input"
          />
          <input
            name="inStock"
            placeholder="Stock"
            type="number"
            className="input"
          />
          <input
            name="images"
            placeholder="Image URLs (comma separated)"
            className="input col-span-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            className="input col-span-2"
          />

          <button
            type="submit"
            className="col-span-2 bg-black text-white py-2 rounded hover:opacity-90"
          >
            Add Watch
          </button>
        </form>
      </section>
    </div>
  );
}
