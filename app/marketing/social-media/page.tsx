"use client";

import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { listings } from "../../listings/data";
import {
  ChatIcon,
  LightbulbIcon,
  CogIcon,
  PlusIcon,
  HashtagIcon,
  HeartBubbleIcon,
  ChevronDownIcon,
  PercentTagIcon,
} from "../../components/icons";

const newestListings = listings.slice(0, 5);

const reviews = [
  {
    listing: listings[2],
    snippet: "Beautifully made and shipped so fast, exactly as pictured!",
    by: "SARAH",
  },
  {
    listing: listings[0],
    snippet: "Great quality wood and the finish is gorgeous. Love it!",
    by: "MIKE T.",
  },
  {
    listing: listings[7],
    snippet: "Super soft print and true to size, will order again.",
    by: "JESSICA",
  },
  {
    listing: listings[5],
    snippet: "Perfect gift, arrived early and packaged with care.",
    by: "DEREK M.",
  },
];

const promos = [
  { off: "70%", label: "SALE", tint: "from-[#f4ede2] to-[#e9dbc4]" },
  { off: "45%", label: "SALE", tint: "from-[#f9e3d1] to-[#f2c9a0]" },
];

function StripedTile({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#e35c22] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 10px, rgba(255,255,255,0.55) 10px 14px)",
        }}
      />
      <span className="relative text-[44px] font-extrabold text-white drop-shadow">
        {text}
      </span>
    </div>
  );
}

export default function SocialMediaPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Social media" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[26px] font-medium text-[#222]">
              Social media
            </h2>
            <div className="flex items-center gap-2">
              <button
                aria-label="Tips"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#222] hover:bg-[#f4f3ee]"
              >
                <LightbulbIcon />
              </button>
              <button
                aria-label="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#222] hover:bg-[#f4f3ee]"
              >
                <CogIcon />
              </button>
              <button className="flex items-center gap-2 rounded-full bg-[#222] px-5 py-3 text-[15px] font-medium text-white hover:bg-black">
                <PlusIcon className="text-white" />
                Create post
              </button>
            </div>
          </header>

          {/* Recommended post */}
          <section className="mt-6 grid grid-cols-1 gap-8 rounded-2xl bg-[#f9e3d1] p-6 sm:grid-cols-[1fr_260px] sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-[#a45b1e]">
                <HashtagIcon width={20} height={20} />
                <HeartBubbleIcon width={20} height={20} />
              </div>
              <p className="mt-4 text-[12px] font-semibold tracking-wide text-[#a45b1e]">
                RECOMMENDED POST
              </p>
              <h3 className="mt-1 text-[28px] font-medium text-[#222]">
                Share a milestone
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#5c4433]">
                Congrats &ndash; you hit a record in sales! Pat yourself on
                the back and share it with the world, you deserve it.
              </p>
              <p className="mt-5 text-[12px] font-semibold tracking-wide text-[#a45b1e]">
                TIP
              </p>
              <p className="mt-1 text-[14px] text-[#5c4433]">
                Milestones show how much your shop&rsquo;s grown to your
                followers.
              </p>
            </div>
            <StripedTile text="300!" />
          </section>

          {/* Newest listings */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-semibold text-[#222]">
                  My newest listings
                </h3>
                <p className="mt-1 text-[14px] text-[#595959]">
                  Give your followers a first look at the latest additions to
                  your shop.
                </p>
              </div>
              <button
                aria-label="See more"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6d4cc] text-[#222] hover:bg-[#f4f3ee] sm:flex"
              >
                <ChevronDownIcon className="-rotate-90" />
              </button>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {newestListings.map((l) => (
                <div key={l.id} className="w-[180px] shrink-0">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={l.image}
                      alt={l.title}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 truncate text-[13px] text-[#222]">
                    {l.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Shop milestones */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Shop milestones
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Celebrate your successes. Nothing wrong with a little
              humblebrag.
            </p>
            <div className="mt-4 w-[220px]">
              <StripedTile text="300!" />
              <p className="mt-2 text-[13px] text-[#595959]">300 sales</p>
            </div>
          </section>

          {/* Sales or promotions */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Sales or promotions
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Keep your followers in the know about any special offers.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {promos.map((promo) => (
                <div key={promo.off} className="w-full">
                  <div
                    className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br ${promo.tint} text-[#222]`}
                  >
                    <PercentTagIcon width={26} height={26} />
                    <span className="text-[22px] font-bold">{promo.off}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-[#222]">
                    {promo.off} off
                  </p>
                  <p className="text-[12px] uppercase tracking-wide text-[#767676]">
                    {promo.label}
                  </p>
                </div>
              ))}
              <button className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#c9c7c0] text-[#595959] hover:border-[#222] hover:text-[#222]">
                <PlusIcon width={22} height={22} />
                <span className="text-[13px]">Create offer</span>
              </button>
            </div>
          </section>

          {/* Five-star reviews */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Five-star reviews
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Say thanks to all your buyers while sharing a glowing review.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {reviews.map((r) => (
                <div key={r.listing.id} className="w-full">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={r.listing.image}
                      alt={r.listing.title}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="line-clamp-2 text-[12px] leading-snug text-white">
                        {r.snippet}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-semibold tracking-wide text-[#767676]">
                    BY {r.by}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent favorites */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Recent favorites
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Support fellow sellers by sharing your latest discovery.
            </p>
            <div className="mt-4 w-[220px]">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={listings[6].image}
                  alt={listings[6].title}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 truncate text-[13px] text-[#222]">
                {listings[6].title}
              </p>
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
