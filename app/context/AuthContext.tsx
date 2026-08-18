"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import * as authLib from "../lib/auth";
import type { PublicAccount } from "../lib/auth";

type ActionResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: PublicAccount | null;
  login: (email: string, password: string) => Promise<ActionResult>;
  signup: (
    shopName: string,
    email: string,
    password: string
  ) => Promise<ActionResult>;
  logout: () => void;
  updateProfile: (updates: {
    shopName?: string;
    email?: string;
    avatarColor?: string;
  }) => Promise<ActionResult>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<ActionResult>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function subscribe(callback: () => void) {
  const unsubscribe = authLib.subscribeAuth(callback);
  window.addEventListener("storage", callback);
  return () => {
    unsubscribe();
    window.removeEventListener("storage", callback);
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // This tab's active account lives in sessionStorage (per-tab), while the
  // account directory lives in localStorage (shared). useSyncExternalStore
  // keeps this in sync with both without tearing during hydration.
  const user = useSyncExternalStore(
    subscribe,
    authLib.getSessionSnapshot,
    authLib.getServerSessionSnapshot
  );

  const login = useCallback(async (email: string, password: string) => {
    const result = await authLib.verifyLogin(email, password);
    if (!result.ok) return { ok: false as const, error: result.error };
    authLib.setSessionAccountId(result.data.id);
    return { ok: true as const };
  }, []);

  const signup = useCallback(
    async (shopName: string, email: string, password: string) => {
      const result = await authLib.createAccount(shopName, email, password);
      if (!result.ok) return { ok: false as const, error: result.error };
      authLib.setSessionAccountId(result.data.id);
      return { ok: true as const };
    },
    []
  );

  const logout = useCallback(() => {
    authLib.clearSession();
  }, []);

  const updateProfile = useCallback(
    async (updates: { shopName?: string; email?: string; avatarColor?: string }) => {
      const id = authLib.getSessionAccountId();
      if (!id) return { ok: false as const, error: "Not signed in." };
      const result = authLib.updateProfile(id, updates);
      if (!result.ok) return { ok: false as const, error: result.error };
      return { ok: true as const };
    },
    []
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      const id = authLib.getSessionAccountId();
      if (!id) return { ok: false as const, error: "Not signed in." };
      const result = await authLib.changePassword(
        id,
        currentPassword,
        newPassword
      );
      if (!result.ok) return { ok: false as const, error: result.error };
      return { ok: true as const };
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
