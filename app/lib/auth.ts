// Client-only account store. There is no backend in this project, so
// accounts live in localStorage (shared across tabs) while the *active*
// session lives in sessionStorage, which is scoped per browser tab. That
// split is what lets each tab be signed into a different account at once.

export type Account = {
  id: string;
  shopName: string;
  email: string;
  avatarColor: string;
  createdAt: string;
  passwordHash: string;
  salt: string;
};

export type PublicAccount = Omit<Account, "passwordHash" | "salt">;

export const ACCOUNTS_KEY = "etsy-dashboard:accounts";
export const SESSION_KEY = "etsy-dashboard:session";

const AVATAR_COLORS = [
  "#2f6f8f",
  "#8a5fb0",
  "#4a8a3f",
  "#b0552f",
  "#3b4ee4",
  "#2f9cbb",
  "#a13d63",
];

export function toPublicAccount(account: Account): PublicAccount {
  return {
    id: account.id,
    shopName: account.shopName,
    email: account.email,
    avatarColor: account.avatarColor,
    createdAt: account.createdAt,
  };
}

// Pub/sub so AuthContext (via useSyncExternalStore) can react to auth
// changes made in this tab. The native `storage` event only fires in
// *other* tabs, so local mutations need their own signal.
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeAuth(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

let cachedSnapshot: PublicAccount | null = null;

export function getSessionSnapshot(): PublicAccount | null {
  const id = getSessionAccountId();
  const account = id ? getAccounts().find((a) => a.id === id) : undefined;

  if (!account) {
    cachedSnapshot = null;
    return null;
  }

  if (
    cachedSnapshot &&
    cachedSnapshot.id === account.id &&
    cachedSnapshot.shopName === account.shopName &&
    cachedSnapshot.email === account.email &&
    cachedSnapshot.avatarColor === account.avatarColor
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = toPublicAccount(account);
  return cachedSnapshot;
}

export function getServerSessionSnapshot(): null {
  return null;
}

function readJSON<T>(storage: Storage, key: string): T | null {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  return readJSON<Account[]>(window.localStorage, ACCOUNTS_KEY) ?? [];
}

function saveAccounts(accounts: Account[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  notify();
}

export function getSessionAccountId(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(SESSION_KEY);
}

export function setSessionAccountId(id: string) {
  window.sessionStorage.setItem(SESSION_KEY, id);
  notify();
}

export function clearSession() {
  window.sessionStorage.removeItem(SESSION_KEY);
  notify();
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomHex(byteLength: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-zA-Z]/.test(password)) return "Password must contain a letter.";
  if (!/[0-9]/.test(password)) return "Password must contain a number.";
  return null;
}

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export async function createAccount(
  shopName: string,
  email: string,
  password: string
): Promise<Result<PublicAccount>> {
  const trimmedName = shopName.trim();
  const normalizedEmail = normalizeEmail(email);

  if (trimmedName.length < 2) {
    return { ok: false, error: "Shop name must be at least 2 characters." };
  }
  if (!validateEmail(normalizedEmail)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  const passwordError = validatePassword(password);
  if (passwordError) return { ok: false, error: passwordError };

  const accounts = getAccounts();
  if (accounts.some((a) => a.email === normalizedEmail)) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const salt = randomHex(16);
  const passwordHash = await sha256Hex(salt + password);
  const account: Account = {
    id: randomHex(12),
    shopName: trimmedName,
    email: normalizedEmail,
    avatarColor: AVATAR_COLORS[accounts.length % AVATAR_COLORS.length],
    createdAt: new Date().toISOString(),
    passwordHash,
    salt,
  };

  saveAccounts([...accounts, account]);
  return { ok: true, data: toPublicAccount(account) };
}

export async function verifyLogin(
  email: string,
  password: string
): Promise<Result<PublicAccount>> {
  const normalizedEmail = normalizeEmail(email);
  const account = getAccounts().find((a) => a.email === normalizedEmail);
  if (!account) return { ok: false, error: "Incorrect email or password." };

  const hash = await sha256Hex(account.salt + password);
  if (hash !== account.passwordHash) {
    return { ok: false, error: "Incorrect email or password." };
  }
  return { ok: true, data: toPublicAccount(account) };
}

export function updateProfile(
  id: string,
  updates: { shopName?: string; email?: string; avatarColor?: string }
): Result<PublicAccount> {
  const accounts = getAccounts();
  const index = accounts.findIndex((a) => a.id === id);
  if (index === -1) return { ok: false, error: "Account not found." };

  const next = { ...accounts[index] };

  if (updates.shopName !== undefined) {
    const trimmedName = updates.shopName.trim();
    if (trimmedName.length < 2) {
      return { ok: false, error: "Shop name must be at least 2 characters." };
    }
    next.shopName = trimmedName;
  }

  if (updates.email !== undefined) {
    const normalizedEmail = normalizeEmail(updates.email);
    if (!validateEmail(normalizedEmail)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (accounts.some((a) => a.id !== id && a.email === normalizedEmail)) {
      return { ok: false, error: "An account with that email already exists." };
    }
    next.email = normalizedEmail;
  }

  if (updates.avatarColor !== undefined) {
    next.avatarColor = updates.avatarColor;
  }

  accounts[index] = next;
  saveAccounts(accounts);
  return { ok: true, data: toPublicAccount(next) };
}

export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<Result<true>> {
  const accounts = getAccounts();
  const index = accounts.findIndex((a) => a.id === id);
  if (index === -1) return { ok: false, error: "Account not found." };

  const account = accounts[index];
  const currentHash = await sha256Hex(account.salt + currentPassword);
  if (currentHash !== account.passwordHash) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const passwordError = validatePassword(newPassword);
  if (passwordError) return { ok: false, error: passwordError };

  const salt = randomHex(16);
  const passwordHash = await sha256Hex(salt + newPassword);
  accounts[index] = { ...account, salt, passwordHash };
  saveAccounts(accounts);
  return { ok: true, data: true };
}

export const AVATAR_COLOR_OPTIONS = AVATAR_COLORS;
