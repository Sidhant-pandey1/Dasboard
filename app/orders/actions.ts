"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId: string) {
  // Delete order items first (FK safety)
  await prisma.orderItem.deleteMany({
    where: { orderId },
  });

  // Delete the order itself
  await prisma.order.delete({
    where: { id: orderId },
  });

  // Refresh orders page
  revalidatePath("/orders");
}
