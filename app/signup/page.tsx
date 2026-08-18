"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../components/AuthShell";
import TextField from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { MailIcon, LockIcon, ListingsIcon } from "../components/icons";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const result = await signup(shopName, email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/");
  }

  return (
    <AuthShell
      title="Set up your shop"
      subtitle="Create an account to manage your Etsy shop."
      footer={
        <>
          Already have a shop?{" "}
          <Link href="/login" className="font-medium text-[#222] underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-[#f0c9c0] bg-[#fdf1ee] px-3 py-2.5 text-[14px] text-[#c0392b]">
            {error}
          </div>
        )}

        <TextField
          id="shopName"
          label="Shop name"
          value={shopName}
          onChange={setShopName}
          icon={<ListingsIcon width={18} height={18} />}
          placeholder="CyberResourcesInc"
          autoComplete="organization"
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          icon={<MailIcon width={18} height={18} />}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          icon={<LockIcon width={18} height={18} />}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />

        <TextField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={<LockIcon width={18} height={18} />}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <p className="-mt-1 text-[13px] text-[#8a8a8a]">
          Must be 8+ characters with at least one letter and one number.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-full bg-[#222] py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1f1f21] disabled:opacity-60"
        >
          {submitting ? "Creating shop…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
