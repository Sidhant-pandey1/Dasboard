"use client";

import { usePathname } from "next/navigation";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // TEMP: hardcoded auth flag (replace later)
  const isLoggedIn = false;

  // Allow auth page always
  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  // Block everything else
  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
