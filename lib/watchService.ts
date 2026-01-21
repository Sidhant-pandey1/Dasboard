import prisma from "./prisma";
import { Prisma, Watch } from "@prisma/client";

/* ===================== ORDERS ===================== */

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        watch: true;
      };
    };
  };
}>;

export async function getOrders(): Promise<OrderWithItems[]> {
  try {
    return await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            watch: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (e) {
    console.error("Error fetching orders:", e);
    throw e;
  }
}

/* ===================== WATCHES ===================== */

type FindWatchInput =
  | { id: string; brand?: never; name?: never }
  | { id?: never; brand: string; name: string };

export async function findWatch(
  input: FindWatchInput
): Promise<Watch | null> {
  try {
    if ("id" in input) {
      return prisma.watch.findUnique({
        where: { id: input.id },
      });
    }

    return prisma.watch.findFirst({
      where: {
        brand: input.brand,
        name: input.name,
      },
    });
  } catch (e) {
    console.error("Error finding watch:", e);
    throw e;
  }
}

/* ❌ Delete watch by ID */
export async function deleteWatchById(id: string): Promise<Watch> {
  try {
    return prisma.watch.delete({
      where: { id },
    });
  } catch (e) {
    console.error("Error deleting watch:", e);
    throw e;
  }
}

/* ➕ Add new watch */

export type CreateWatchInput = {
  name: string;
  brand: string;
  modelNumber: string;
  description: string;
  category: string;
  price: number | string;
  discountedPrice: number | string;
  inStock: number | string;
  images: string[];
};

export async function createWatch(
  data: CreateWatchInput
): Promise<Watch> {
  try {
    return prisma.watch.create({
      data: {
        name: data.name,
        brand: data.brand,
        modelNumber: data.modelNumber,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        discountedPrice: Number(data.discountedPrice),
        inStock: Number(data.inStock),
        images: data.images,
      },
    });
  } catch (e) {
    console.error("Error creating watch:", e);
    throw e;
  }
}
