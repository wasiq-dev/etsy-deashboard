"use client";

import { useState, type FormEvent } from "react";
import Sidebar from "../components/Sidebar";
import TextField from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { AVATAR_COLOR_OPTIONS } from "../lib/auth";
import { MailIcon, ListingsIcon, LockIcon, CheckIcon } from "../components/icons";

function Avatar({ shopName, color }: { shopName: string; color: string }) {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[22px] font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {shopName.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [shopName, setShopName] = useState(user?.shopName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [color, setColor] = useState(user?.avatarColor ?? AVATAR_COLOR_OPTIONS[0]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    const result = await updateProfile({ shopName, email, avatarColor: color });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#e5e3dc] p-5 sm:p-6"
    >
      <h3 className="text-[18px] font-semibold text-[#222]">Shop details</h3>
      <p className="mt-1 text-[14px] text-[#595959]">
        This information is stored in this browser and is shared by every
        tab, but only tabs signed into this account will use it.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <Avatar shopName={shopName || user.shopName} color={color} />
        <div className="flex flex-wrap gap-2">
          {AVATAR_COLOR_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-label={`Use avatar color ${option}`}
              onClick={() => setColor(option)}
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: option }}
            >
              {option === color && <CheckIcon width={14} height={14} className="text-white" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <TextField
          id="shopName"
          label="Shop name"
          value={shopName}
          onChange={setShopName}
          icon={<ListingsIcon width={18} height={18} />}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          icon={<MailIcon width={18} height={18} />}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-[#f0c9c0] bg-[#fdf1ee] px-3 py-2.5 text-[14px] text-[#c0392b]">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 rounded-lg border border-[#c7e0c1] bg-[#f1f8ef] px-3 py-2.5 text-[14px] text-[#3f7a35]">
          Shop details updated.
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-5 rounded-full bg-[#222] px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1f1f21] disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function PasswordForm() {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    setSaving(true);
    const result = await changePassword(currentPassword, newPassword);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border border-[#e5e3dc] p-5 sm:p-6"
    >
      <h3 className="text-[18px] font-semibold text-[#222]">Password</h3>
      <p className="mt-1 text-[14px] text-[#595959]">
        Changing your password won&rsquo;t sign you out of this tab, but
        other tabs will need the new password next time they log in.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <TextField
          id="currentPassword"
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
          icon={<LockIcon width={18} height={18} />}
          autoComplete="current-password"
        />
        <TextField
          id="newPassword"
          label="New password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          icon={<LockIcon width={18} height={18} />}
          autoComplete="new-password"
        />
        <TextField
          id="confirmNewPassword"
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={<LockIcon width={18} height={18} />}
          autoComplete="new-password"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-[#f0c9c0] bg-[#fdf1ee] px-3 py-2.5 text-[14px] text-[#c0392b]">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 rounded-lg border border-[#c7e0c1] bg-[#f1f8ef] px-3 py-2.5 text-[14px] text-[#3f7a35]">
          Password updated.
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-5 rounded-full border border-[#222] px-5 py-2.5 text-[15px] font-medium text-[#222] transition-colors hover:bg-[#f4f3ee] disabled:opacity-60"
      >
        {saving ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}

export default function AccountPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Account" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <h2 className="text-[24px] font-medium leading-tight text-[#222] sm:text-[30px]">
            Account settings
          </h2>
          <p className="mt-1.5 text-[15px] text-[#595959]">
            Manage the shop signed into this tab.
          </p>

          <div className="mt-7">
            <ProfileForm />
            <PasswordForm />
          </div>
        </div>
      </main>
    </div>
  );
}
