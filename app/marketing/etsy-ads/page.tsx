"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import {
  SearchIcon,
  ChatIcon,
  CartIcon,
  FastForwardIcon,
  CursorClickIcon,
  TrendingUpIcon,
  CheckIcon,
} from "../../components/icons";

const stats = [
  {
    value: "800K+",
    label: "Active Etsy Ads campaigns",
  },
  {
    value: "83%",
    label: "Of sellers see visits in the first 7 days",
  },
  {
    value: "$5",
    label: "Recommended starting budget",
  },
];

const steps = [
  {
    n: 1,
    title: "Set your daily budget",
    desc: "Set a daily budget that works for you. We recommend starting around $5/day.",
  },
  {
    n: 2,
    title: "Pick listings to promote",
    desc: "Choose which listings to advertise. They look like any other listing, just marked “Ad.”",
  },
  {
    n: 3,
    title: "Track and adjust",
    desc: "Watch visits and sales attributed to ads, then refine your listings and budget over time.",
  },
];

const whySellers = [
  {
    icon: <CartIcon />,
    title: "Reach high-intent shoppers",
    desc: "Connect with shoppers who are already looking for what you sell. Your ads appear in Etsy's search results and on its highest-traffic pages.",
  },
  {
    icon: <FastForwardIcon />,
    title: "Start small, learn fast",
    desc: "Begin with a modest daily budget, see what drives results, then increase your budget as you learn what works for your shop.",
  },
  {
    icon: <CursorClickIcon />,
    title: "Only pay when shoppers click",
    desc: "Your ads can be seen by many shoppers, but you're only charged when someone clicks to visit your shop.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Simple performance tracking",
    desc: "See how your ads are performing with clear metrics like clicks, views, and sales, all in your Etsy dashboard.",
  },
];

const pricingTiers = [
  {
    name: "Test and learn",
    price: "$1",
    features: [
      "Try Etsy Ads with minimal spend",
      "Promote a few listings and see how they perform",
      "Increase your budget whenever you're ready",
    ],
  },
  {
    name: "Reach more shoppers",
    price: "$5",
    features: [
      "Give your ads enough budget to get discovered more often",
      "Show up more in search as shoppers browse",
      "Start building performance insights to see what works",
    ],
  },
  {
    name: "Maximize visibility",
    price: "$25",
    features: [
      "Unlock features not available at lower budgets",
      "Support steady growth with a higher daily budget",
      "Keep your listings competitive in high-traffic searches",
    ],
  },
];

const adThumbs = [
  "/products/wooden-map.jpg",
  "/products/macrame-green.jpg",
  "/products/derby-fascinator.jpg",
];

export default function EtsyAdsPage() {
  const [search, setSearch] = useState("handmade gifts");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Etsy Ads" />

      <main className="relative flex-1 overflow-y-auto">
        {/* Page header */}
        <header className="border-b border-[#e5e3dc] px-4 py-4 sm:px-6 lg:px-10">
          <h2 className="text-[20px] font-medium text-[#222]">Etsy Ads</h2>
        </header>

        {/* Hero */}
        <section className="bg-[#4b4f6e] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 lg:flex-row">
            <div className="max-w-[420px]">
              <h1 className="text-[32px] font-medium leading-tight text-white sm:text-[38px]">
                Your next sale could be one ad away
              </h1>
              <p className="mt-3 text-[16px] leading-relaxed text-[#d8d9e6]">
                Millions of shoppers are searching for items like yours. Get
                discovered with Etsy Ads &mdash; you only pay when someone
                clicks.
              </p>
              <button className="mt-5 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#222] hover:bg-[#f0f0f0]">
                Try Etsy Ads
              </button>
            </div>

            <div className="w-full max-w-[420px] rounded-2xl bg-white p-5 shadow-lg">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[#c9c7c0] py-2.5 pl-5 pr-11 text-[15px] text-[#222] outline-none focus:border-[#222]"
                />
                <span className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#e35c22] text-white">
                  <SearchIcon width={17} height={17} />
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {adThumbs.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={src}
                      alt="Sponsored listing example"
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                    <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      Ad
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[12px] text-[#767676]">
                Illustrative example only. Actual placement and appearance
                may vary.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-10">
          {/* Stats */}
          <section className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[34px] font-medium leading-none text-[#222]">
                  {s.value}
                </p>
                <p className="mt-2 text-[15px] text-[#595959]">{s.label}</p>
              </div>
            ))}
          </section>
          <p className="mt-4 text-[13px] text-[#9b9b9b]">
            Data from March 1 to May 31, 2026.
          </p>

          <hr className="my-10 border-[#e5e3dc]" />

          {/* Steps */}
          <section>
            <h3 className="text-[22px] font-semibold text-[#222]">
              Get started in 3 simple steps
            </h3>
            <p className="mt-1 text-[15px] text-[#595959]">
              No marketing experience needed. Etsy helps your ads work to
              drive more traffic to your shop.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n}>
                  <p className="text-[34px] font-light leading-none text-[#222]">
                    {s.n}
                  </p>
                  <h4 className="mt-3 text-[17px] font-semibold text-[#222]">
                    {s.title}
                  </h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#595959]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <div className="mt-12 rounded-xl bg-[#f4f3ee] px-6 py-8 text-center sm:px-14 sm:py-10">
            <p className="text-[19px] italic leading-relaxed text-[#222] sm:text-[22px]">
              &ldquo;Etsy ads REALLY propelled my sales! About 30% of my
              revenue so far has come from ads.&rdquo;
            </p>
            <p className="mt-4 text-[14px] text-[#595959]">
              &mdash; Emily, MessengerMercantile
            </p>
          </div>

          {/* Why sellers love Etsy Ads */}
          <section className="mt-12">
            <h3 className="text-[22px] font-semibold text-[#222]">
              Why sellers love Etsy Ads
            </h3>
            <p className="mt-1 text-[15px] text-[#595959]">
              Simple, effective advertising built for creative entrepreneurs.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {whySellers.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="shrink-0 text-[#222]">{f.icon}</span>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#222]">
                      {f.title}
                    </h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#595959]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section className="mt-12">
            <h3 className="text-[22px] font-semibold text-[#222]">
              Straightforward, transparent pricing
            </h3>
            <p className="mt-1 text-[15px] text-[#595959]">
              Set a daily budget and adjust as you grow&mdash;you can change
              it any time.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl border border-[#e5e3dc] p-6"
                >
                  <h4 className="text-[15px] font-semibold text-[#222]">
                    {tier.name}
                  </h4>
                  <p className="mt-2 text-[30px] font-medium leading-none text-[#222]">
                    {tier.price}
                  </p>
                  <p className="text-[13px] text-[#595959]">per day</p>
                  <ul className="mt-4 space-y-2.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[14px] leading-snug text-[#222]"
                      >
                        <CheckIcon
                          width={15}
                          height={15}
                          className="mt-0.5 shrink-0 text-[#4a8a3f]"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-4">
                <span className="text-[16px] text-[#222]">
                  Ready to reach more buyers?
                </span>
                <button className="rounded-full bg-[#222] px-6 py-3 text-[15px] font-medium text-white hover:bg-black">
                  Try Etsy Ads
                </button>
              </div>
              <a href="#" className="text-[14px] text-[#222] underline">
                Learn about Etsy Ads policy
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-14 flex flex-wrap items-center justify-between gap-y-3 border-t border-[#e5e3dc] pt-6 pb-10 text-[14px] text-[#595959]">
            <div className="flex items-center gap-2">
              <span className="text-[16px]" aria-hidden="true">
                🇺🇸
              </span>
              <span>United States</span>
              <span className="text-[#d6d6d6]">|</span>
              <span>English (US)</span>
              <span className="text-[#d6d6d6]">|</span>
              <span>$ (USD)</span>
            </div>
            <span>© 2026 Etsy, Inc.</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {[
                "Terms of Use",
                "Privacy",
                "Interest-based ads",
                "Local Shops",
                "Regions",
                "Help Center",
              ].map((link) => (
                <a key={link} href="#" className="underline hover:text-[#222]">
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>

        {/* Get Help floating button */}
        <button className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2f2f31] px-4 py-3 text-[14px] font-medium text-white shadow-lg hover:bg-[#1f1f21] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-[15px]">
          <ChatIcon />
          Get Help
        </button>
      </main>
    </div>
  );
}
