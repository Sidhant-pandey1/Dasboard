import { getOrders, type OrderWithItems } from "@/lib/watchService";
import { deleteOrder } from "./actions";
import { redirect } from "next/navigation";

export default async function OrdersPage() {

  const orders = (await getOrders()) as OrderWithItems[];

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-black">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Orders Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            View, manage, and complete customer orders
          </p>
        </div>

        {orders.length === 0 && (
          <div className="rounded-lg bg-white p-6 shadow-sm text-gray-600">
            No orders found.
          </div>
        )}

        <div className="space-y-8">
          {orders.map((order: OrderWithItems) => {
            const isPaid = Boolean(order.razorpayPaymentId);
            const orderImage = order.orderItems[0]?.watch.images?.[0];

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {/* Top */}
                <div className="p-6 flex justify-between items-start border-b">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium text-sm break-all">{order.id}</p>

                    <p className="mt-2 text-sm">
                      <span className="font-medium">
                        {order.customerName}
                      </span>{" "}
                      <span className="text-gray-500">
                        — {order.customerEmail}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isPaid
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {isPaid ? "PAID" : "NOT PAID"}
                    </span>

                    <form
                      action={async () => {
                        "use server";
                        await deleteOrder(order.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-medium rounded-full
                        bg-gray-900 text-white hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>

                {/* Middle */}
                <div className="p-6 flex gap-6">
                  {orderImage && (
                    <img
                      src={orderImage}
                      alt="Product image"
                      className="w-32 h-32 object-cover rounded-xl border"
                    />
                  )}

                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium text-gray-800">
                        Shipping:
                      </span>{" "}
                      {order.shippingAddress}
                    </p>

                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="font-medium">
                              {item.watch.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {item.watch.brand} • Qty {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-between text-xs text-gray-500">
                  <span>
                    Ordered on{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span className="font-semibold text-gray-900">
                    Total ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}