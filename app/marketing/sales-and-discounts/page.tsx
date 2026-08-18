"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  ChatIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  CartIcon,
  HeartOutlineIcon,
  GiftIcon,
  TagIcon,
  HandshakeIcon,
  PercentTagIcon,
  BasketIcon,
  BundleIcon,
  CheckCircleIcon,
} from "../../components/icons";

const keyPromotions = [
  {
    type: "Abandoned cart offer",
    code: "JUST FOR YOU",
    date: "Jun 1, 2026 -",
    discount: "25%",
    granted: "63",
    purchases: "-",
    conversion: "0%",
    revenue: "$0.00",
  },
  {
    type: "Favorited item offer",
    code: "FOOTFAVE",
    date: "Jul 10, 2026 -",
    discount: "50%",
    granted: "90",
    purchases: "2",
    conversion: "2.22%",
    revenue: "$145.46",
  },
  {
    type: "Listings sale",
    code: "",
    date: "Jul 30, 2026 - Aug 29, 2026",
    discount: "70%",
    granted: "-",
    purchases: "-",
    conversion: "-",
    revenue: "$0.00",
  },
  {
    type: "Listings sale",
    code: "",
    date: "Jul 24, 2026 - Aug 23, 2026",
    discount: "45%",
    granted: "-",
    purchases: "13",
    conversion: "-",
    revenue: "$1,080.69",
  },
];

const offerCards = [
  {
    title: "Interested shopper offer",
    desc: "Send an offer when someone shows early interest in your items.",
    icon: <HeartOutlineIcon />,
    active: false,
  },
  {
    title: "Abandoned cart offer",
    desc: "Offers granted in the last 30 days",
    icon: <CartIcon />,
    active: true,
    count: 63,
    offer: "25% off",
  },
  {
    title: "Thank you offer",
    desc: "Send an offer to a buyer after their order ships, to thank them for their business.",
    icon: <GiftIcon />,
    active: false,
  },
  {
    title: "Favorited item offer",
    desc: "Offers granted in the last 30 days",
    icon: <HeartOutlineIcon />,
    active: true,
    count: 90,
    offer: "50% off",
  },
];

export default function SalesAndDiscountsPage() {
  const [tab, setTab] = useState<"promotions" | "stats">("promotions");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Sales and discounts" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          <header>
            <h2 className="text-[26px] font-medium text-[#222]">
              Sales and discounts
            </h2>
            <nav className="mt-5 flex gap-7 border-b border-[#e5e3dc] text-[16px]">
              <button
                onClick={() => setTab("promotions")}
                className={`-mb-px border-b-2 pb-3 ${
                  tab === "promotions"
                    ? "border-[#222] font-semibold text-[#222]"
                    : "border-transparent text-[#595959] hover:text-[#222]"
                }`}
              >
                Promotions
              </button>
              <button
                onClick={() => setTab("stats")}
                className={`-mb-px border-b-2 pb-3 ${
                  tab === "stats"
                    ? "border-[#222] font-semibold text-[#222]"
                    : "border-transparent text-[#595959] hover:text-[#222]"
                }`}
              >
                Details &amp; Stats
              </button>
            </nav>
          </header>

          {tab === "promotions" ? (
            <>
              {/* Key promotions table */}
              <section className="mt-7">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[#222]">
                    Your key sales and discounts
                  </h3>
                  <span className="text-[13px] text-[#767676]">
                    Last 30 Days
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-[#e5e3dc] text-[#595959]">
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Discount</th>
                        <th className="pb-2 font-medium">Offers granted</th>
                        <th className="pb-2 font-medium">Purchases</th>
                        <th className="pb-2 font-medium underline decoration-dashed underline-offset-4">
                          Conversion rate
                        </th>
                        <th className="pb-2 font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keyPromotions.map((row, i) => (
                        <tr key={i} className="border-b border-[#e5e3dc]">
                          <td className="py-3 text-[#222]">
                            <a href="#" className="underline hover:no-underline">
                              {row.type}
                              {row.code ? `: ${row.code}` : ""}
                            </a>
                            <p className="mt-0.5 text-[12px] text-[#767676]">
                              {row.date}
                            </p>
                          </td>
                          <td className="py-3 text-[#222]">{row.discount}</td>
                          <td className="py-3 text-[#222]">{row.granted}</td>
                          <td className="py-3 text-[#222]">{row.purchases}</td>
                          <td className="py-3 text-[#222]">{row.conversion}</td>
                          <td className="py-3 text-[#222]">{row.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[14px] text-[#595959]">
                    Is this helpful?
                  </span>
                  <button
                    aria-label="Helpful"
                    onClick={() => setFeedback("up")}
                    className={`rounded-full p-1.5 hover:bg-[#f4f3ee] ${
                      feedback === "up" ? "text-[#222]" : "text-[#767676]"
                    }`}
                  >
                    <ThumbUpIcon width={18} height={18} />
                  </button>
                  <button
                    aria-label="Not helpful"
                    onClick={() => setFeedback("down")}
                    className={`rounded-full p-1.5 hover:bg-[#f4f3ee] ${
                      feedback === "down" ? "text-[#222]" : "text-[#767676]"
                    }`}
                  >
                    <ThumbDownIcon width={18} height={18} />
                  </button>
                </div>
              </section>

              {/* Send offers */}
              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  Send offers to interested buyers
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  Create an offer to motivate interested shoppers
                  automatically, or create a promo code to share with anyone
                  you like.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {offerCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-xl border border-[#e5e3dc] p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-[15px] font-semibold text-[#222]">
                            {card.title}
                          </h4>
                          <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                            {card.desc}
                          </p>
                        </div>
                        <span className="shrink-0 text-[#222]">
                          {card.icon}
                        </span>
                      </div>
                      {card.active ? (
                        <>
                          <p className="mt-3 text-[26px] font-medium leading-none text-[#222]">
                            {card.count}
                          </p>
                          <p className="mt-2 flex items-center gap-2 text-[14px] text-[#222]">
                            <CheckCircleIcon width={18} height={18} />
                            Your offer: {card.offer}{" "}
                            <a href="#" className="underline">
                              Details
                            </a>
                          </p>
                        </>
                      ) : (
                        <a
                          href="#"
                          className="mt-4 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                        >
                          Set up →
                        </a>
                      )}
                    </div>
                  ))}
                  <div className="rounded-xl border border-[#e5e3dc] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#222]">
                          Promo code
                        </h4>
                        <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                          Share your code with customers, and they can apply
                          it for a discount at checkout.
                        </p>
                      </div>
                      <span className="shrink-0 text-[#222]">
                        <TagIcon />
                      </span>
                    </div>
                    <a
                      href="#"
                      className="mt-4 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                    >
                      Set up →
                    </a>
                  </div>
                </div>
              </section>

              {/* Drive traffic */}
              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  Drive traffic and move inventory
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  Join a sale or start your own to boost traffic, or accept
                  offers from buyers on select listings to move inventory.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e5e3dc] p-5">
                    <div className="flex items-start gap-3">
                      <HandshakeIcon className="shrink-0 text-[#222]" />
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#222]">
                          Accept offers from buyers
                        </h4>
                        <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                          You&rsquo;ll be able to choose specific listings,
                          set a discount limit, and have the final say.
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                        >
                          Set up →
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#e5e3dc] p-5">
                    <div className="flex items-start gap-3">
                      <TagIcon className="mt-0.5 shrink-0 text-[#222]" />
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#222]">
                          Run a sale
                        </h4>
                        <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                          Set lower prices for your whole shop or just a few
                          items, no code needed for the discount.
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                        >
                          Set up →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order value */}
              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  Up your average order value
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  Encourage buyers to place bigger orders and get the most
                  out of every sale.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e5e3dc] p-5">
                    <div className="flex items-start gap-3">
                      <BasketIcon className="shrink-0 text-[#222]" />
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#222]">
                          Set an order minimum
                        </h4>
                        <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                          Set up a discount with an order minimum to help
                          boost order value and appeal to deal-seeking
                          shoppers!
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                        >
                          Set up →
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#e5e3dc] p-5">
                    <div className="flex items-start gap-3">
                      <BundleIcon className="shrink-0 text-[#222]" />
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#222]">
                          Bundle items together
                        </h4>
                        <p className="mt-1 text-[14px] leading-snug text-[#595959]">
                          Sweeten the deal for buyers with a discount on items
                          they might want to buy together.
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-block text-[14px] font-medium text-[#222] underline hover:no-underline"
                        >
                          Set up →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sales events empty state */}
              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  Join Etsy&rsquo;s next sales events
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  Participate in Etsy&rsquo;s upcoming sales events to boost
                  your visibility and sales.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 pb-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f3ee] text-[#767676]">
                    <PercentTagIcon width={28} height={28} />
                  </span>
                  <p className="text-[16px] font-semibold text-[#222]">
                    There aren&rsquo;t any sales events
                  </p>
                  <p className="text-[14px] text-[#595959]">
                    Check again soon for the best sales events
                  </p>
                </div>
              </section>
            </>
          ) : (
            <div className="mt-10 rounded-xl border border-[#e5e3dc] p-8 text-center">
              <p className="text-[16px] font-semibold text-[#222]">
                No detailed stats yet
              </p>
              <p className="mt-1 text-[14px] text-[#595959]">
                Once your promotions run for a while, detailed performance
                breakdowns will show up here.
              </p>
            </div>
          )}

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
