"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const PUBLIC_PATHS = new Set(["/login", "/signup"]);

function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#faf9f5]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#d9d7cf] border-t-[#222]" />
    </div>
  );
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPath = PUBLIC_PATHS.has(pathname);

  useEffect(() => {
    if (!user && !isPublicPath) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (user && isPublicPath) {
      router.replace("/");
    }
  }, [user, isPublicPath, pathname, router]);

  if (!user && !isPublicPath) return <LoadingScreen />;
  if (user && isPublicPath) return <LoadingScreen />;

  return <>{children}</>;
}
