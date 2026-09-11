"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { listings } from "../../listings/data";
import {
  ChevronDownIcon,
  CheckIcon,
  RefreshIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  ChatIcon,
} from "../../components/icons";

const RANGES = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days: 13 Aug - 11 Sept",
  "This month",
  "This year",
  "All time",
] as const;

const trafficByDay = [
  5, 19, 15, 31, 26, 33, 25, 28, 27, 20, 20, 19, 22, 34, 71, 46, 29, 51, 26, 25,
  42, 40, 38, 36, 33, 31, 27, 25, 21, 14, 1,
];

const shopperStats = [
  {
    label: "Item favourites",
    value: "27",
    body: "26 shoppers favourited 5 of your items. Share a discount when a shopper loves a listing to help seal the deal.",
    link: "Set up offer",
  },
  {
    label: "Shop follows",
    value: "2",
    body: "Now you've got 2 followers total. Add an About section to your shop to help buyers get to know you!",
    link: "Add your story",
  },
  {
    label: "Reviews",
    value: "1",
    body: "You had a 1 star average for that date range. Read and reply to reviews to keep your customer service top notch.",
    link: "Go to reviews",
  },
  {
    label: "Repeat buyers",
    value: "0",
    body: "Encourage more shoppers to come back – send a thank you offer after their order dispatches.",
    link: "Set up offer",
  },
  {
    label: "Cities reached",
    value: "8",
    body: "You reached 8 cities in 2 countries – wonder where you'll go next!",
    link: null,
  },
  {
    label: "Abandoned baskets",
    value: "15",
    body: "At full price these items may have added up to USD 1,129 in potential sales. Give future shoppers a nudge with an abandoned basket offer.",
    link: "Set up offer",
  },
];

const foundYouEtsy = [
  { label: "Etsy app & other Etsy pages", value: 258 },
  { label: "Etsy search", value: 66 },
  { label: "Etsy marketing & SEO", value: 423 },
];
const foundYouYou = [
  { label: "Direct & other traffic", value: 89 },
  { label: "Social media", value: 3 },
  { label: "Etsy Ads", value: 0 },
];

const listingRows = [
  { l: listings[2], views: 421, favs: 18, orders: 3, revenue: "USD 92.97" },
  { l: listings[1], views: 388, favs: 22, orders: 40, revenue: "USD 179.60" },
  { l: listings[9], views: 274, favs: 12, orders: 8, revenue: "USD 88.00" },
  { l: listings[0], views: 189, favs: 7, orders: 1, revenue: "USD 55.99" },
  { l: listings[8], views: 166, favs: 9, orders: 4, revenue: "USD 79.96" },
  { l: listings[6], views: 125, favs: 6, orders: 3, revenue: "USD 14.97" },
];

function LineChart({ data }: { data: number[] }) {
  const width = 760;
  const height = 200;
  const max = 80;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => ({
    x: i * stepX,
    y: height - (v / max) * height,
  }));
  const path = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="mt-5 overflow-x-auto">
      <svg
        viewBox={`-16 -12 ${width + 40} ${height + 44}`}
        className="w-full min-w-[620px]"
        role="img"
        aria-label="Shop visits over time"
      >
        {[0, 20, 40, 60, 80].map((tick) => {
          const y = height - (tick / max) * height;
          return (
            <g key={tick}>
              <line x1={0} y1={y} x2={width} y2={y} stroke="#e5e3dc" />
              <text x={-12} y={y + 4} fontSize="11" fill="#767676" textAnchor="end">
                {tick}
              </text>
            </g>
          );
        })}
        <polyline
          points={path}
          fill="none"
          stroke="#222"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.6} fill="#222" />
        ))}
        {["13 Aug", "20 Aug", "28 Aug", "04 Sept", "11 Sept"].map((label, i) => (
          <text
            key={label}
            x={(i / 4) * width}
            y={height + 24}
            fontSize="11"
            fill="#767676"
            textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function ShopTrafficPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>(
    "Last 30 Days: 13 Aug - 11 Sept"
  );
  const [rangeOpen, setRangeOpen] = useState(false);
  const [showShopper, setShowShopper] = useState(true);
  const [helpful, setHelpful] = useState<null | boolean>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rangeOpen) return;
    const handler = (e: MouseEvent) => {
      if (rangeRef.current && !rangeRef.current.contains(e.target as Node)) {
        setRangeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [rangeOpen]);

  const totalListingViews = useMemo(
    () => listingRows.reduce((s, r) => s + r.views, 0),
    []
  );

  const stats = [
    { label: "Visits", value: "844" },
    { label: "Orders", value: "7" },
    { label: "Conversion rate", value: "0.8%" },
    { label: "Revenue", value: "USD 260.68" },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Shop traffic" />

      <main className="relative flex-1 overflow-y-auto">
        <header className="border-b border-[#e5e3dc] px-4 py-4 sm:px-6 lg:px-10">
          <h2 className="text-[20px] font-medium text-[#222]">Stats</h2>
        </header>

        <div className="mx-auto max-w-[900px] px-4 py-7 sm:px-6 lg:px-10">
          {/* Date range */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative" ref={rangeRef}>
              <button
                onClick={() => setRangeOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-[#d6d4cc] px-4 py-2 text-[14px] font-medium text-[#222] hover:bg-[#f4f3ee]"
              >
                {range}
                <ChevronDownIcon
                  className={`text-[#595959] transition-transform ${
                    rangeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {rangeOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-[#e5e3dc] bg-white py-1 shadow-lg">
                  {RANGES.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRange(r);
                        setRangeOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-[14px] text-[#222] hover:bg-[#f4f3ee]"
                    >
                      {r}
                      {range === r && <CheckIcon className="text-[#222]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-[13px] text-[#767676]">
              <RefreshIcon />2 hours ago
            </span>
          </div>

          {/* Stat row */}
          <div className="mt-6 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[14px] text-[#595959]">{s.label}</p>
                <p className="mt-1 text-[24px] font-medium leading-none text-[#222] sm:text-[26px]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <LineChart data={trafficByDay} />

          {/* Shopper Stats */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-[#222]">
                Shopper Stats
              </h3>
              <button
                onClick={() => setShowShopper((v) => !v)}
                className="flex items-center gap-1 text-[14px] text-[#222] hover:opacity-70"
              >
                {showShopper ? "Hide" : "Show"}
                <ChevronDownIcon
                  className={`text-[#595959] transition-transform ${
                    showShopper ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <p className="mt-1 text-[14px] text-[#595959]">
              Get a snapshot of how buyers interacted with your shop – stats are
              based on the date range set at the top of the page.
            </p>

            {showShopper && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shopperStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-[#e5e3dc] p-4"
                  >
                    <div className="rounded-lg bg-[#eef1f7] px-3 py-2.5">
                      <p className="text-[13px] font-medium text-[#3c3c3c]">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[20px] font-semibold text-[#222]">
                        {s.value}
                      </p>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#595959]">
                      {s.body}
                    </p>
                    {s.link && (
                      <a
                        href="#"
                        className="mt-2 inline-block text-[13px] font-medium text-[#222] underline"
                      >
                        {s.link} →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-8 flex items-center justify-end gap-2 text-[13px] text-[#767676]">
            Is this helpful?
            <button
              onClick={() => setHelpful(true)}
              aria-label="Yes"
              className={`rounded-full p-1.5 hover:bg-[#f4f3ee] ${
                helpful === true ? "text-[#222]" : ""
              }`}
            >
              <ThumbUpIcon width={16} height={16} />
            </button>
            <button
              onClick={() => setHelpful(false)}
              aria-label="No"
              className={`rounded-full p-1.5 hover:bg-[#f4f3ee] ${
                helpful === false ? "text-[#222]" : ""
              }`}
            >
              <ThumbDownIcon width={16} height={16} />
            </button>
          </div>

          {/* How shoppers found you */}
          <section className="mt-6 rounded-2xl border border-[#e5e3dc] p-5 sm:p-7">
            <h3 className="text-[20px] font-semibold text-[#222]">
              How shoppers found you
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Want more info on each traffic source?{" "}
              <a href="#" className="text-[#222] underline">
                Get a quick rundown.
              </a>
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              <div>
                <p className="text-[14px] font-medium text-[#222]">
                  Etsy brought 89% of visits
                </p>
                <ul className="mt-3 space-y-2.5">
                  {foundYouEtsy.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between text-[14px]"
                    >
                      <a href="#" className="text-[#222] underline">
                        {row.label}
                      </a>
                      <span className="text-[#595959]">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#222]">
                  You brought 11% of visits
                </p>
                <ul className="mt-3 space-y-2.5">
                  {foundYouYou.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between text-[14px]"
                    >
                      <a href="#" className="text-[#222] underline">
                        {row.label}
                      </a>
                      <span className="text-[#595959]">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-[#e5e3dc] pt-5">
              <p className="text-[14px] font-semibold text-[#222]">
                Traffic and sales from Offsite Ads
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#595959]">
                We&rsquo;re promoting your items on high-traffic sites to drive
                new buyers to your shop. It&rsquo;s risk-free advertising – we
                cover the upfront costs, and you only pay when you make a sale.
              </p>
              <a
                href="/marketing/offsite-ads"
                className="mt-2 inline-block text-[14px] font-medium text-[#222] underline"
              >
                Get your stats →
              </a>
            </div>
          </section>

          {/* Listings viewed */}
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-[20px] font-semibold text-[#222]">
                  Shoppers viewed your listings{" "}
                  {totalListingViews.toLocaleString()} times
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  That&rsquo;s an average of{" "}
                  {(totalListingViews / 844).toFixed(2)} listing views per visit.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-[14px] text-[#222] hover:opacity-70">
                All listings
                <ChevronDownIcon className="text-[#595959]" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-[#e5e3dc] text-left text-[13px] text-[#767676]">
                    <th className="py-2 font-medium">Listing</th>
                    <th className="py-2 font-medium">Views</th>
                    <th className="py-2 font-medium">Favourites</th>
                    <th className="py-2 font-medium">Orders</th>
                    <th className="py-2 text-right font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {listingRows.map(({ l, views, favs, orders, revenue }) => (
                    <tr key={l.id} className="border-b border-[#eee]">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={l.image}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 max-w-[280px] text-[13px] text-[#222] underline">
                              {l.title}
                            </span>
                            <span className="mt-0.5 inline-block rounded bg-[#fbe1b6] px-1.5 py-0.5 text-[11px] font-semibold text-[#7a4b00]">
                              Active
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[#222]">{views}</td>
                      <td className="py-3 text-[#222]">{favs}</td>
                      <td className="py-3 text-[#222]">{orders}</td>
                      <td className="py-3 text-right text-[#222]">{revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-y-3 border-t border-[#e5e3dc] pt-6 pb-10 text-[14px] text-[#595959]">
            <span>© 2026 Etsy, Inc.</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {["Terms of Use", "Privacy", "Help Center"].map((link) => (
                <a key={link} href="#" className="underline hover:text-[#222]">
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>

        <button className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2f2f31] px-4 py-3 text-[14px] font-medium text-white shadow-lg hover:bg-[#1f1f21] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-[15px]">
          <ChatIcon />
          Get Help
        </button>
      </main>
    </div>
  );
}
