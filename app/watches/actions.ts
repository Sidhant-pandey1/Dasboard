"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* 🔍 FIND */
export async function findWatchAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const brand = formData.get("brand")?.toString();
  const name = formData.get("name")?.toString();

  if (id) {
    return prisma.watch.findUnique({ where: { id } });
  }

  if (!brand || !name) return null;

  return prisma.watch.findFirst({
    where: {
      brand: { equals: brand, mode: "insensitive" },
      name: { contains: name, mode: "insensitive" },
    },
  });
}

/* ❌ DELETE */
export async function deleteWatchAction(watchId: string): Promise<void> {
  await prisma.watch.delete({
    where: { id: watchId },
  });

  revalidatePath("/watches");
}

/* ➕ ADD */
export async function addWatchAction(formData: FormData): Promise<void> {
  await prisma.watch.create({
    data: {
      name: formData.get("name")!.toString(),
      brand: formData.get("brand")!.toString(),
      modelNumber: formData.get("modelNumber")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      category: formData.get("category")?.toString() || "",
      price: Number(formData.get("price")),
      discountedPrice: Number(formData.get("discountedPrice")) || 0,
      inStock: Number(formData.get("inStock")) || 0,
      images: formData
        .get("images")
        ?.toString()
        .split(",")
        .map((i) => i.trim()) || [],
    },
  });

  revalidatePath("/watches");
}
