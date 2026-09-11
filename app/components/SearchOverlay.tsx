"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { listings } from "../listings/data";
import { orderGroups, completedOrders } from "../orders/data";
import { conversations } from "../messages/data";
import { SearchIcon, CloseIcon } from "./icons";

type Result = {
  key: string;
  kind: string;
  title: string;
  sub?: string;
  href: string;
  image?: string;
};

const allOrders = [...orderGroups.flatMap((g) => g.orders), ...completedOrders];

function useShopResults(q: string): Result[] {
  return useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Result[] = [];

    for (const l of listings) {
      if (l.title.toLowerCase().includes(term)) {
        out.push({
          key: `listing-${l.id}`,
          kind: "Listing",
          title: l.title,
          sub: `${l.price} · ${l.stock} in stock`,
          href: "/listings",
          image: l.image,
        });
      }
    }

    for (const o of allOrders) {
      const hay = `${o.buyer} ${o.username} ${o.orderNumber} ${o.id}`.toLowerCase();
      if (hay.includes(term)) {
        out.push({
          key: `order-${o.id}`,
          kind: "Order",
          title: `${o.buyer} · ${o.orderNumber}`,
          sub: `${o.total} · ${o.orderedDate.replace("Ordered ", "")}`,
          href: `/orders?order=${o.id}`,
        });
      }
    }

    for (const c of conversations) {
      const hay = `${c.name} ${c.preview}`.toLowerCase();
      if (hay.includes(term)) {
        out.push({
          key: `msg-${c.id}`,
          kind: "Message",
          title: c.name,
          sub: c.preview,
          href: "/messages",
        });
      }
    }

    return out.slice(0, 12);
  }, [q]);
}

function useMarketplaceResults(q: string): Result[] {
  return useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return listings
      .filter((l) => l.title.toLowerCase().includes(term))
      .slice(0, 8)
      .map((l) => ({
        key: `mp-${l.id}`,
        kind: "Listing",
        title: l.title,
        sub: l.price,
        href: "/listings",
        image: l.image,
      }));
  }, [q]);
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"shop" | "marketplace">("shop");
  const inputRef = useRef<HTMLInputElement>(null);

  const shopResults = useShopResults(query);
  const marketplaceResults = useMarketplaceResults(query);
  const results = tab === "shop" ? shopResults : marketplaceResults;

  const handleClose = useCallback(() => {
    setQuery("");
    setTab("shop");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div
        className="flex-1 bg-black/40"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative flex w-full flex-col bg-[#faf9f5] shadow-2xl sm:max-w-[560px] lg:max-w-[680px]">
        <button
          onClick={handleClose}
          aria-label="Close search"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#222] shadow hover:bg-[#f0efe9] lg:right-auto lg:-left-14 lg:top-5"
        >
          <CloseIcon />
        </button>

        <div className="px-5 pt-5 sm:px-8 sm:pt-6">
          <div className="relative">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across your orders, listings, messages, or help"
              className="w-full rounded-full border border-[#d6d4cc] bg-white py-3 pl-5 pr-12 text-[15px] text-[#222] outline-none focus:border-[#222]"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#595959]">
              <SearchIcon width={20} height={20} />
            </span>
          </div>

          <div className="mt-5 flex gap-7 border-b border-[#e5e3dc] text-[15px]">
            <button
              onClick={() => setTab("shop")}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3 transition-colors ${
                tab === "shop"
                  ? "border-[#222] font-semibold text-[#222]"
                  : "border-transparent text-[#595959] hover:text-[#222]"
              }`}
            >
              Shop Manager
              <span className="text-[13px] text-[#595959]">
                {shopResults.length}
              </span>
            </button>
            <button
              onClick={() => setTab("marketplace")}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3 transition-colors ${
                tab === "marketplace"
                  ? "border-[#222] font-semibold text-[#222]"
                  : "border-transparent text-[#595959] hover:text-[#222]"
              }`}
            >
              Etsy Marketplace
              <span className="text-[13px] text-[#595959]">
                {marketplaceResults.length}
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
          {!query.trim() ? (
            <p className="mt-10 text-center text-[14px] text-[#767676]">
              Start typing to search your {tab === "shop" ? "shop" : "the Etsy marketplace"}.
            </p>
          ) : results.length === 0 ? (
            <p className="mt-10 text-center text-[14px] text-[#767676]">
              No matches for &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <ul className="flex flex-col">
              {results.map((r) => (
                <li key={r.key}>
                  <Link
                    href={r.href}
                    onClick={handleClose}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-[#efeee8]"
                  >
                    {r.image ? (
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={r.image}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e4e2db] text-[11px] font-semibold uppercase text-[#595959]">
                        {r.kind.slice(0, 2)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] text-[#222]">
                        {r.title}
                      </span>
                      {r.sub && (
                        <span className="block truncate text-[13px] text-[#767676]">
                          {r.sub}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[12px] font-medium uppercase tracking-wide text-[#9b9b9b]">
                      {r.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
