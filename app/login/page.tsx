"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "../components/AuthShell";
import TextField from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { MailIcon, LockIcon } from "../components/icons";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const next = searchParams.get("next");
    router.push(next && next.startsWith("/") ? next : "/");
  }

  return (
    <AuthShell
      title="Log in to your shop"
      subtitle="Each browser tab keeps its own signed-in shop."
      footer={
        <>
          Don&rsquo;t have a shop yet?{" "}
          <Link href="/signup" className="font-medium text-[#222] underline">
            Sign up
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
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-full bg-[#222] py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1f1f21] disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
