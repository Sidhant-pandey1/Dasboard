import prisma from "./prisma";

/* ===================== ORDERS ===================== */
export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
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

    return orders;
  } catch (e) {
    console.error("Error fetching orders:", e);
    throw e;
  }
}

/* ===================== WATCHES ===================== */

/* 🔍 Find watch by ID OR Brand + Name */
export async function findWatch({ id, brand, name }) {
  try {
    if (id) {
      return await prisma.watch.findUnique({
        where: { id },
      });
    }

    if (brand && name) {
      return await prisma.watch.findFirst({
        where: { brand, name },
      });
    }

    return null;
  } catch (e) {
    console.error("Error finding watch:", e);
    throw e;
  }
}

/* ❌ Delete watch by ID */
export async function deleteWatchById(id) {
  try {
    return await prisma.watch.delete({
      where: { id },
    });
  } catch (e) {
    console.error("Error deleting watch:", e);
    throw e;
  }
}

/* ➕ Add new watch */
export async function createWatch(data) {
  try {
    return await prisma.watch.create({
      data: {
        name: data.name,
        brand: data.brand,
        modelNumber: data.modelNumber,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        discountedPrice: Number(data.discountedPrice),
        inStock: Number(data.inStock),
        images: data.images, // array of strings
      },
    });
  } catch (e) {
    console.error("Error creating watch:", e);
    throw e;
  }
}