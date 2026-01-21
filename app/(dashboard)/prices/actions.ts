"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

let lastSnapshot: { id: string; price: number }[] = [];
const categoryMap: Record<string, string | string[]> = {
  men: "Guys Watch",
  women: "Girls Watch",
  wallclocks: "Wall clock",
  unisex: "unisex watch",
  couple: "couple watch",
  smartwatches: [
    "smart-guys watch",
    "smart-girls watch",
    "smart-unisex watch",
  ],
};


export async function updatePrices({
  brand,
  collections,
  percent,
}: {
  brand?: string;
  collections: string[];
  percent: number;
}) {
  const categoryValues: string[] = [];

  for (const key of collections) {
    const mapped = categoryMap[key];
    if (Array.isArray(mapped)) categoryValues.push(...mapped);
    else if (mapped) categoryValues.push(mapped);
  }

  const where: any = {};
  if (brand) where.brand = brand;
  if (categoryValues.length)
    where.category = { in: categoryValues };

  const watches = await prisma.watch.findMany({
    where,
    select: { id: true, price: true },
  });

  lastSnapshot = watches.map((w) => ({
    id: w.id,
    price: w.price,
  }));

  await prisma.$transaction(
    watches.map((w) =>
      prisma.watch.update({
        where: { id: w.id },
        data: {
          price: Math.max(
            0,
            Math.round(w.price + (w.price * percent) / 100)
          ),
        },
      })
    )
  );

  revalidatePath("/prices");
}

export async function rollbackPrices() {
  if (lastSnapshot.length === 0) return;

  await prisma.$transaction(
    lastSnapshot.map((w) =>
      prisma.watch.update({
        where: { id: w.id },
        data: { price: w.price },
      })
    )
  );

  lastSnapshot = [];

  revalidatePath("/prices");
}

