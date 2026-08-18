"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { listings } from "../../listings/data";
import {
  ChatIcon,
  ChevronDownIcon,
  CheckIcon,
  QuestionCircleIcon,
} from "../../components/icons";

const dateRangeOptions = [
  "Last 7 days",
  "Last 30 days (Jul 19 - Aug 18)",
  "Last 90 days",
  "Year to date",
] as const;

const trafficByDay = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 1, 3, 1, 3, 1,
  2, 1, 0, 0, 0,
];

const channelRows = [
  { channel: "Google", share: "77.78%", visits: 14 },
  { channel: "Bing", share: "16.67%", visits: 3 },
  {
    channel: "Google Display Network",
    share: "5.56%",
    visits: 1,
    hasInfo: true,
  },
];

const listingPerf = [
  { listing: listings[0], clicks: 8, orders: 0, revenue: "$0.00" },
  { listing: listings[1], clicks: 6, orders: 0, revenue: "$0.00" },
  { listing: listings[2], clicks: 4, orders: 0, revenue: "$0.00" },
];

function TrafficChart({ data }: { data: number[] }) {
  const width = 720;
  const height = 180;
  const max = 4;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - (v / max) * height;
    return { x, y };
  });
  const path = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="mt-4 overflow-x-auto">
      <svg
        viewBox={`-30 -10 ${width + 40} ${height + 40}`}
        className="w-full min-w-[600px]"
        role="img"
        aria-label="Offsite ad traffic over time"
      >
        {[0, 1, 2, 3, 4].map((tick) => {
          const y = height - (tick / max) * height;
          return (
            <g key={tick}>
              <line
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke="#e5e3dc"
                strokeWidth={1}
              />
              <text x={-14} y={y + 4} fontSize="11" fill="#767676">
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
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#222" />
        ))}
        {["Jul 19", "Jul 25", "Jul 31", "Aug 6", "Aug 12", "Aug 18"].map(
          (label, i) => (
            <text
              key={label}
              x={(i / 5) * width}
              y={height + 22}
              fontSize="11"
              fill="#767676"
              textAnchor={i === 0 ? "start" : i === 5 ? "end" : "middle"}
            >
              {label}
            </text>
          )
        )}
      </svg>
    </div>
  );
}

export default function OffsiteAdsPage() {
  const [range, setRange] = useState<(typeof dateRangeOptions)[number]>(
    "Last 30 days (Jul 19 - Aug 18)"
  );
  const [rangeOpen, setRangeOpen] = useState(false);
  const [compare, setCompare] = useState(false);
  const [optOut, setOptOut] = useState(true);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rangeOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (rangeRef.current && !rangeRef.current.contains(e.target as Node)) {
        setRangeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [rangeOpen]);

  const totalClicks = trafficByDay.reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Offsite Ads" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[26px] font-medium text-[#222]">
              Offsite Ads
            </h2>
            <a
              href="#"
              className="flex items-center gap-2 text-[14px] text-[#222] underline hover:no-underline"
            >
              <ChatIcon width={18} height={18} />
              Share your feedback
            </a>
          </header>

          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#595959]">
            With Offsite Ads, Etsy promotes your listings on high-traffic
            sites, like Google, Instagram, Facebook, Pinterest, Bing, and Etsy
            Publishing Partner sites, to help bring more shoppers to your
            shop. Etsy covers the upfront advertising costs, and you only pay
            a fee when an Offsite Ad leads to a sale.
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#595959]">
            Use this dashboard to see how your ads are performing, understand
            the sales they&rsquo;re helping drive, and get a clearer view of
            the value Offsite Ads brings to your business.
          </p>

          {/* Date range */}
          <div className="mt-6 flex items-center gap-2 text-[15px] text-[#222]">
            <span>Your ad stats for</span>
            <div className="relative" ref={rangeRef}>
              <button
                onClick={() => setRangeOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-[#a5a5a5] px-4 py-2 text-[14px] font-medium text-[#222] hover:border-[#222]"
              >
                {range}
                <ChevronDownIcon
                  width={14}
                  height={14}
                  className={`transition-transform ${
                    rangeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {rangeOpen && (
                <div className="absolute left-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-xl border border-[#e5e3dc] bg-white py-1 shadow-lg">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setRange(option);
                        setRangeOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-[14px] text-[#222] hover:bg-[#f4f3ee]"
                    >
                      {option}
                      {range === option && (
                        <CheckIcon width={15} height={15} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Performance card */}
          <div className="mt-5 rounded-xl border border-[#e5e3dc] p-5 sm:p-6">
            <h3 className="text-[16px] font-semibold text-[#222]">
              Performance driven by your ads
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              This performance data shows direct traffic to your shop during
              the selected time period.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-5">
              {[
                ["Total revenue", "$969.28"],
                ["Orders", "0"],
                ["New buyers", "0"],
                ["Direct revenue", "$0.00"],
                ["Ad fees paid", "$0.00"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="flex items-center gap-1 text-[14px] text-[#595959]">
                    {label}
                    <QuestionCircleIcon className="text-[#9b9b9b]" />
                  </p>
                  <p className="mt-1 text-[20px] font-medium text-[#222]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-5 border-[#e5e3dc]" />

            <h3 className="text-[16px] font-semibold text-[#222]">
              Indirect ad traffic to your shop
            </h3>
            <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[#595959]">
              A shopper might click an Offsite Ad for another Etsy page and
              then buy from your shop. This is considered indirect traffic.
              You still benefit from the orders and revenue, but since it
              isn&rsquo;t attributed to your shop&rsquo;s ads, the ad fee is
              $0.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {[
                ["Indirect revenue", "$969.28"],
                ["Orders", "11"],
                ["New buyers", "10"],
                ["Indirect fees", "$0.00"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[14px] text-[#595959]">{label}</p>
                  <p className="mt-1 text-[20px] font-medium text-[#222]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ad traffic over time */}
          <section className="mt-9">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Ad traffic over time
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              This shows the number of clicks from Offsite Ads to your shop.
            </p>
            <p className="mt-4 text-[30px] font-medium leading-none text-[#222]">
              {totalClicks}
            </p>
            <TrafficChart data={trafficByDay} />
            <button
              onClick={() => setCompare(!compare)}
              className="mt-3 flex items-center gap-3"
            >
              <span
                role="switch"
                aria-checked={compare}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  compare ? "bg-[#222]" : "bg-[#c9c7c0]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    compare ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </span>
              <span className="text-[14px] text-[#222]">
                Compare to previous time period
              </span>
            </button>
          </section>

          {/* By channel */}
          <section className="mt-9">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Ad performance by channel
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              For your selected time period, this is your ad traffic
              breakdown by channel with share of total (%) and total visits
              driven.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#e5e3dc] text-[#595959]">
                    <th className="pb-2 font-medium">Channel</th>
                    <th className="pb-2 font-medium">Share</th>
                    <th className="pb-2 font-medium">Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {channelRows.map((row) => (
                    <tr key={row.channel} className="border-b border-[#e5e3dc]">
                      <td className="py-3 text-[#222]">
                        <span className="flex items-center gap-1.5">
                          {row.channel}
                          {row.hasInfo && (
                            <QuestionCircleIcon className="text-[#9b9b9b]" />
                          )}
                        </span>
                      </td>
                      <td className="py-3 text-[#222]">{row.share}</td>
                      <td className="py-3 text-[#222]">{row.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* By listing */}
          <section className="mt-9">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-[#222]">
                Ad performance by listing
              </h3>
              <a href="#" className="text-[14px] text-[#222] underline">
                View all your orders
              </a>
            </div>
            <p className="mt-1 text-[14px] text-[#595959]">
              For your selected time period, the listings shown here are your
              top performers based on clicks.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#e5e3dc] text-[#595959]">
                    <th className="pb-2 font-medium">Listing</th>
                    <th className="pb-2 font-medium">Clicks</th>
                    <th className="pb-2 font-medium">Orders</th>
                    <th className="pb-2 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {listingPerf.map(({ listing, clicks, orders, revenue }) => (
                    <tr key={listing.id} className="border-b border-[#e5e3dc]">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={listing.image}
                              alt={listing.title}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </span>
                          <span className="max-w-[280px] truncate text-[#222]">
                            {listing.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[#222]">{clicks}</td>
                      <td className="py-3 text-[#222]">{orders}</td>
                      <td className="py-3 text-[#222]">{revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Opt out */}
          <div className="mt-9 rounded-xl border border-[#e5e3dc] p-5 sm:p-6">
            <h3 className="text-[16px] font-semibold text-[#222]">
              Thinking about opting out?
            </h3>
            <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[#595959]">
              Opting out of Offsite Ads might reduce your shop&rsquo;s
              visibility and sales opportunities. Some sellers aren&rsquo;t
              eligible to opt out based on their shop&rsquo;s performance.{" "}
              <a href="#" className="underline">
                Learn more.
              </a>
            </p>
            <button
              onClick={() => setOptOut(!optOut)}
              className="mt-4 flex items-center gap-3"
            >
              <span
                role="switch"
                aria-checked={optOut}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  optOut ? "bg-[#222]" : "bg-[#c9c7c0]"
                }`}
              >
                <span
                  className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all ${
                    optOut ? "left-[22px]" : "left-0.5"
                  }`}
                >
                  {optOut && (
                    <CheckIcon width={11} height={11} className="text-[#222]" />
                  )}
                </span>
              </span>
              <span className="text-[15px] font-medium text-[#222]">
                Opt out from Offsite Ads
              </span>
            </button>
          </div>

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
