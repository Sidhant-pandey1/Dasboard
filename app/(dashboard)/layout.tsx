import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f2efe9] border-r px-6 py-8 flex flex-col">
        <h1 className="text-2xl font-semibold mb-8">Raj Watches</h1>

        <nav className="flex flex-col gap-2">
          <Link href="/orders" className="px-4 py-2 rounded-lg hover:bg-white">
            Orders
          </Link>
          <Link href="/prices" className="px-4 py-2 rounded-lg hover:bg-white">
            Manage Prices
          </Link>
          <Link href="/watches" className="px-4 py-2 rounded-lg hover:bg-white">
            Manage Watches
          </Link>
        </nav>
      </aside>

      {/* Page */}
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
