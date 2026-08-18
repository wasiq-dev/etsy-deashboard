"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  HomeIcon,
  ListingsIcon,
  MessagesIcon,
  OrdersIcon,
  VisibilityIcon,
  StatsIcon,
  GearIcon,
  FlagIcon,
  MarketingIcon,
  FinancesIcon,
  AppsIcon,
  HelpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  PencilIcon,
  LogoutIcon,
} from "./icons";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  expandable?: boolean;
  badge?: number;
  newPill?: boolean;
  dot?: boolean;
  children?: NavChild[];
};

const items: NavItem[] = [
  { label: "Search", icon: <SearchIcon /> },
  { label: "Dashboard", icon: <HomeIcon />, href: "/" },
  { label: "Listings", icon: <ListingsIcon />, href: "/listings" },
  { label: "Messages", icon: <MessagesIcon /> },
  { label: "Orders", icon: <OrdersIcon />, href: "/orders", badge: 4 },
  { label: "Etsy search visibility", icon: <VisibilityIcon /> },
  { label: "Stats", icon: <StatsIcon />, expandable: true, newPill: true },
  { label: "Customer service stats", icon: <GearIcon /> },
  { label: "Policy violations", icon: <FlagIcon /> },
  {
    label: "Marketing",
    icon: <MarketingIcon />,
    expandable: true,
    dot: true,
    children: [
      { label: "Etsy Ads", href: "/marketing/etsy-ads" },
      { label: "Offsite Ads", href: "/marketing/offsite-ads" },
      { label: "Sales and discounts", href: "/marketing/sales-and-discounts" },
      { label: "Social media", href: "/marketing/social-media" },
      { label: "Share & Save", href: "/marketing/share-and-save" },
    ],
  },
  { label: "Finances", icon: <FinancesIcon />, expandable: true },
  { label: "Apps", icon: <AppsIcon /> },
  { label: "Help", icon: <HelpIcon />, expandable: true },
  {
    label: "Settings",
    icon: <GearIcon />,
    expandable: true,
    children: [{ label: "Account", href: "/account" }],
  },
];

function SidebarContent({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set(
        items
          .filter((item) => item.children?.some((c) => c.label === active))
          .map((item) => item.label)
      )
  );

  const toggleExpanded = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <>
      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3">
        {items.map((item) => {
          const isActive = item.label === active;
          const hasChildren = !!item.children;
          const isChildActive = item.children?.some((c) => c.label === active);
          const isOpen = expanded.has(item.label);
          const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
            isActive
              ? "bg-[#e4e2db] font-semibold text-[#222]"
              : isChildActive || isOpen
              ? "bg-[#f4f3ee] font-semibold text-[#222]"
              : "text-[#3c3c3c] hover:bg-[#efeee8]"
          }`;
          const content = (
            <>
              <span className="shrink-0 text-[#222]">{item.icon}</span>
              <span className="flex items-center gap-2">
                {item.label}
                {item.dot && !isChildActive && !isOpen && (
                  <span className="h-[7px] w-[7px] rounded-full bg-[#2f9cbb]" />
                )}
              </span>
              <span className="ml-auto flex items-center gap-2">
                {item.newPill && (
                  <span className="rounded-full bg-[#3b4ee4] px-2.5 py-0.5 text-[12px] font-semibold text-white">
                    New
                  </span>
                )}
                {item.badge !== undefined && (
                  <span className="rounded-full bg-[#fce2c9] px-2 py-0.5 text-[13px] font-semibold text-[#7a4b00]">
                    {item.badge}
                  </span>
                )}
                {item.expandable && (
                  <ChevronDownIcon
                    className={`shrink-0 text-[#595959] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </span>
            </>
          );

          return (
            <div key={item.label}>
              {item.href ? (
                <Link href={item.href} onClick={onNavigate} className={className}>
                  {content}
                </Link>
              ) : (
                <button
                  onClick={() =>
                    hasChildren ? toggleExpanded(item.label) : onNavigate?.()
                  }
                  aria-expanded={hasChildren ? isOpen : undefined}
                  className={`w-full ${className}`}
                >
                  {content}
                </button>
              )}

              {hasChildren && isOpen && (
                <div className="mt-0.5 flex flex-col gap-0.5">
                  {item.children!.map((child) => {
                    const childActive = child.label === active;
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={onNavigate}
                        className={`rounded-lg py-2 pl-11 pr-3 text-left text-[15px] transition-colors ${
                          childActive
                            ? "bg-[#e4e2db] font-semibold text-[#222]"
                            : "text-[#3c3c3c] hover:bg-[#efeee8]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sales channels */}
      <div className="mt-6 px-6">
        <h2 className="text-[15px] font-semibold text-[#222]">
          Sales channels
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#222] text-[13px] font-bold text-white">
            E
          </span>
          <span className="flex-1 text-[14px] leading-tight text-[#3c3c3c]">
            Etsy
            <br />
            ANZCart
          </span>
          <button
            aria-label="Edit shop"
            className="p-1 text-[#222] hover:opacity-70"
          >
            <PencilIcon width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Pattern */}
      <div className="mt-5 flex items-start gap-3 px-6">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#9b9b9b] text-[11px] font-bold text-white">
          P
        </span>
        <p className="text-[14px] leading-snug text-[#595959]">
          Want your own website?
          <br />
          Learn more about Pattern
        </p>
      </div>

      {/* Profile */}
      <ProfileMenu onNavigate={onNavigate} />
    </>
  );
}

function ProfileMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!user) return null;

  return (
    <div
      ref={menuRef}
      className="relative mt-auto border-t border-[#e5e3dc] px-3 py-3"
    >
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-1 overflow-hidden rounded-lg border border-[#e5e3dc] bg-white shadow-lg">
          <div className="border-b border-[#e5e3dc] px-3.5 py-3">
            <p className="truncate text-[14px] font-medium text-[#222]">
              {user.shopName}
            </p>
            <p className="truncate text-[13px] text-[#595959]">{user.email}</p>
          </div>
          <Link
            href="/account"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-[14px] text-[#3c3c3c] hover:bg-[#f4f3ee]"
          >
            <GearIcon width={17} height={17} />
            Account settings
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              onNavigate?.();
              logout();
              router.replace("/login");
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[14px] text-[#3c3c3c] hover:bg-[#f4f3ee]"
          >
            <LogoutIcon width={17} height={17} />
            Log out
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#efeee8]"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-white"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.shopName.trim().charAt(0).toUpperCase() || "?"}
        </span>
        <span className="min-w-0 flex-1 truncate text-left text-[15px] font-medium text-[#222]">
          {user.shopName}
        </span>
        {open ? (
          <ChevronDownIcon className="shrink-0 text-[#595959]" />
        ) : (
          <ChevronUpIcon className="shrink-0 text-[#595959]" />
        )}
      </button>
    </div>
  );
}

export default function Sidebar({ active = "Dashboard" }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-[#e5e3dc] bg-[#faf9f5] px-4 py-3 lg:hidden">
        <h1 className="text-[18px] font-semibold leading-tight text-[#222]">
          Shop Manager
        </h1>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-[#222] hover:opacity-70"
        >
          <MenuIcon width={24} height={24} />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col overflow-y-auto border-r border-[#e5e3dc] bg-[#faf9f5] shadow-xl">
            <div className="flex items-start justify-between px-6 pt-6 pb-4">
              <h1 className="text-[22px] font-semibold leading-tight text-[#222]">
                Shop Manager
              </h1>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="mt-1 p-1 text-[#222] hover:opacity-70"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <SidebarContent active={active} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-[280px] shrink-0 flex-col overflow-y-auto border-r border-[#e5e3dc] bg-[#faf9f5] pb-2 lg:flex">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h1 className="text-[20px] font-semibold leading-tight text-[#222]">
            Shop Manager
          </h1>
          <button
            aria-label="Toggle menu"
            className="text-[#222] hover:opacity-70"
          >
            <MenuIcon width={22} height={22} />
          </button>
        </div>
        <SidebarContent active={active} />
      </aside>
    </>
  );
}
