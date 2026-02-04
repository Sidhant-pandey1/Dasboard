"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // If we are on the auth page, we are good.
    if (pathname.startsWith("/auth")) {
      setAuthorized(true);
      return;
    }

    // Check login
    const isAuth = localStorage.getItem("auth");
    if (!isAuth) {
      router.replace("/auth");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // If on auth page, render immediately to avoid flash
  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  // Otherwise wait for check
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6f3]">
        <p className="text-gray-500">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
