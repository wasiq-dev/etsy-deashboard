"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { listings } from "../../listings/data";
import {
  SearchIcon,
  QuestionCircleIcon,
  BookmarkIcon,
  ChatIcon,
} from "../../components/icons";

const categories = [
  "Accessories",
  "Art & Collectibles",
  "Bags & Purses",
  "Bath & Beauty",
  "Books, Films & Music",
  "Clothing",
  "Craft Supplies & Tools",
];

const img = (i: number) => listings[i % listings.length].image;

const trending: Record<string, { term: string; volume: string; image: string }[]> =
  {
    Accessories: [
      { term: "badge reel", volume: "205.6k", image: img(2) },
      { term: "keychain", volume: "101.3k", image: img(5) },
      { term: "bag charm", volume: "79.7k", image: img(8) },
      { term: "badge reels", volume: "55.3k", image: img(9) },
    ],
    "Art & Collectibles": [
      { term: "wall art", volume: "312.4k", image: img(0) },
      { term: "custom portrait", volume: "88.1k", image: img(4) },
      { term: "poster", volume: "64.9k", image: img(1) },
      { term: "sticker", volume: "402.7k", image: img(6) },
    ],
    "Bags & Purses": [
      { term: "tote bag", volume: "176.2k", image: img(3) },
      { term: "crossbody bag", volume: "54.0k", image: img(7) },
      { term: "makeup bag", volume: "61.5k", image: img(2) },
      { term: "backpack", volume: "39.8k", image: img(5) },
    ],
    "Bath & Beauty": [
      { term: "soap", volume: "133.9k", image: img(6) },
      { term: "lip balm", volume: "47.2k", image: img(8) },
      { term: "perfume oil", volume: "58.6k", image: img(4) },
      { term: "bath bomb", volume: "72.1k", image: img(1) },
    ],
    "Books, Films & Music": [
      { term: "journal", volume: "94.3k", image: img(0) },
      { term: "planner", volume: "121.7k", image: img(3) },
      { term: "vinyl record", volume: "33.4k", image: img(9) },
      { term: "sheet music", volume: "18.9k", image: img(5) },
    ],
    Clothing: [
      { term: "t shirt", volume: "488.0k", image: img(6) },
      { term: "sweatshirt", volume: "210.5k", image: img(1) },
      { term: "baby onesie", volume: "76.8k", image: img(7) },
      { term: "dress", volume: "142.2k", image: img(2) },
    ],
    "Craft Supplies & Tools": [
      { term: "sublimation design", volume: "156.4k", image: img(1) },
      { term: "svg files", volume: "260.1k", image: img(4) },
      { term: "png", volume: "301.9k", image: img(6) },
      { term: "digital download", volume: "180.3k", image: img(9) },
    ],
  };

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function MarketplaceInsightsPage() {
  const [category, setCategory] = useState(categories[0]);
  const [term, setTerm] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(15);
  const [saved, setSaved] = useState<string[]>([]);
  const [bannerOpen, setBannerOpen] = useState(true);

  const cards = trending[category] ?? [];

  const report = useMemo(() => {
    if (!searched) return null;
    const h = hash(searched.toLowerCase());
    const volume = 2000 + (h % 240000);
    const competition = ["Low", "Medium", "High"][h % 3];
    const conversion = ["Below average", "Average", "Above average"][(h >> 3) % 3];
    const related = [
      `${searched} gift`,
      `personalised ${searched}`,
      `${searched} set`,
      `custom ${searched}`,
      `${searched} for her`,
    ];
    return { volume, competition, conversion, related };
  }, [searched]);

  const runSearch = () => {
    const t = term.trim();
    if (!t || remaining <= 0) return;
    setSearched(t);
    setRemaining((r) => Math.max(0, r - 1));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Marketplace insights" />

      <main className="relative flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b border-[#e5e3dc] px-4 py-4 sm:px-6 lg:px-10">
          <h2 className="text-[20px] font-medium text-[#222]">
            Marketplace Insights
          </h2>
          <div className="flex items-center gap-4 text-[13px] text-[#595959]">
            <span className="flex items-center gap-1.5">
              <SearchIcon width={15} height={15} />
              {remaining} remaining
            </span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#222]">
              <QuestionCircleIcon />
              How-to
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-[860px] px-4 py-7 sm:px-6 lg:px-10">
          {bannerOpen && (
            <div className="flex items-start gap-3 rounded-xl bg-[#eef1f7] px-4 py-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3b4ee4] text-[12px] font-bold text-white">
                N
              </span>
              <div className="flex-1 text-[13px] text-[#3c3c3c]">
                <p className="font-semibold text-[#222]">
                  More insights to learn how buyers search
                </p>
                <p className="mt-0.5">
                  Now you can view 12 months of data, get search term conversion
                  ratings, and check purchase data to inform your listing
                  strategy.
                </p>
              </div>
              <button
                onClick={() => setBannerOpen(false)}
                aria-label="Dismiss"
                className="text-[#595959] hover:text-[#222]"
              >
                ✕
              </button>
            </div>
          )}

          {/* Search */}
          <section className="mt-9 text-center">
            <h3 className="text-[24px] font-semibold text-[#222]">
              Explore search terms related to your shop
            </h3>
            <p className="mx-auto mt-2 max-w-[460px] text-[14px] leading-relaxed text-[#595959]">
              Enter a search term to find out how buyers are searching on Etsy,
              dig into the competitive landscape, and discover similar keywords
              to help optimise your shop.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runSearch();
              }}
              className="relative mx-auto mt-5 max-w-[440px]"
            >
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder='Try a search term like "vase"'
                className="w-full rounded-full border border-[#d6d4cc] bg-white py-3 pl-5 pr-14 text-[14px] text-[#222] outline-none focus:border-[#222]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#222] text-white hover:bg-black"
              >
                <SearchIcon width={16} height={16} />
              </button>
            </form>
          </section>

          {/* Search report */}
          {searched && report && (
            <section className="mt-8 rounded-2xl border border-[#e5e3dc] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-[18px] font-semibold text-[#222]">
                  &ldquo;{searched}&rdquo;
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setSaved((s) =>
                        s.includes(searched) ? s : [...s, searched]
                      )
                    }
                    className="flex items-center gap-1.5 rounded-full border border-[#222] px-4 py-1.5 text-[13px] font-medium text-[#222] hover:bg-[#f4f3ee]"
                  >
                    <BookmarkIcon width={15} height={15} />
                    {saved.includes(searched) ? "Saved" : "Save search"}
                  </button>
                  <button
                    onClick={() => setSearched(null)}
                    className="rounded-full px-3 py-1.5 text-[13px] text-[#595959] hover:bg-[#f4f3ee]"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-[13px] text-[#595959]">
                    Search volume (90 days)
                  </p>
                  <p className="mt-1 text-[22px] font-semibold text-[#222]">
                    {report.volume.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-[#595959]">Competition</p>
                  <p className="mt-1 text-[22px] font-semibold text-[#222]">
                    {report.competition}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-[#595959]">
                    Conversion rating
                  </p>
                  <p className="mt-1 text-[22px] font-semibold text-[#222]">
                    {report.conversion}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[13px] font-medium text-[#222]">
                Similar keywords
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {report.related.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setTerm(r);
                      setSearched(r);
                      setRemaining((n) => Math.max(0, n - 1));
                    }}
                    className="rounded-full border border-[#d6d4cc] px-3 py-1.5 text-[13px] text-[#222] hover:bg-[#f4f3ee]"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Saved searches */}
          <section className="mt-10">
            <h3 className="text-[16px] font-semibold text-[#222]">
              Saved searches
            </h3>
            {saved.length === 0 ? (
              <div className="mt-3 rounded-xl bg-[#e9e6dd] px-5 py-6 text-center">
                <p className="text-[14px] font-semibold text-[#222]">
                  Stay updated on marketplace trends
                </p>
                <p className="mt-1 text-[13px] text-[#595959]">
                  Track the marketplace insights that matter most to you. Begin
                  by using the search bar above to save relevant searches.
                </p>
              </div>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {saved.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => {
                        setTerm(s);
                        setSearched(s);
                      }}
                      className="flex items-center gap-2 rounded-full border border-[#d6d4cc] px-3.5 py-2 text-[13px] text-[#222] hover:bg-[#f4f3ee]"
                    >
                      <BookmarkIcon width={14} height={14} />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* What buyers are searching for */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              What buyers are searching for across Etsy
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[#595959]">
              Just a reminder: the search terms you&rsquo;re seeing below reflect
              what buyers are looking for, which might not always reflect
              what&rsquo;s allowed on Etsy. It&rsquo;s your responsibility to
              ensure everything you list on Etsy complies with our{" "}
              <a href="#" className="text-[#222] underline">
                Seller Policy
              </a>
              .
            </p>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                    category === c
                      ? "border-[#222] bg-[#222] font-medium text-white"
                      : "border-[#d6d4cc] text-[#222] hover:bg-[#f4f3ee]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {cards.map((card) => (
                <button
                  key={card.term}
                  onClick={() => {
                    setTerm(card.term);
                    setSearched(card.term);
                    setRemaining((n) => Math.max(0, n - 1));
                  }}
                  className="group text-left"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 45vw, 200px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
                      <p className="text-[13px] font-semibold text-white">
                        {card.term}
                      </p>
                      <p className="text-[12px] text-white/80">{card.volume}</p>
                    </div>
                  </div>
                </button>
              ))}
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
