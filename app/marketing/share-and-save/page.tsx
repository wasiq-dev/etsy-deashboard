"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { listings } from "../../listings/data";
import {
  ChatIcon,
  CoinIcon,
  ShareIcon,
  LinkIcon,
  CheckIcon,
  FacebookIcon,
  PinterestIcon,
  XIcon,
  MailIcon,
} from "../../components/icons";

const shareLink = "etsy.com/shop/ANZCart?ref=share_save";

const stats = [
  { label: "Total savings earned", value: "$14.00" },
  { label: "Link clicks", value: "212" },
  { label: "New buyers referred", value: "7" },
];

const steps = [
  {
    n: 1,
    title: "Share your link",
    desc: "Grab your unique shop link and share it anywhere you like — social media, email, or a group chat.",
  },
  {
    n: 2,
    title: "A new buyer shops",
    desc: "Someone new to Etsy clicks your link and makes their first purchase, from your shop or anywhere on Etsy.",
  },
  {
    n: 3,
    title: "You both save",
    desc: "Your buyer gets a welcome discount, and you earn a credit toward your Etsy bill.",
  },
];

const shareListings = listings.slice(0, 4);

export default function ShareAndSavePage() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shareLink}`);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Share & Save" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          <header>
            <h2 className="text-[26px] font-medium text-[#222]">
              Share &amp; Save
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#595959]">
              Share your shop with friends, family, and followers. When
              someone new to Etsy makes their first purchase through your
              link, they get a discount and you earn a credit toward your
              Etsy bill.
            </p>
          </header>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-1 gap-6 rounded-xl border border-[#e5e3dc] p-5 sm:grid-cols-3 sm:p-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f3ee] text-[#222]">
                  <CoinIcon width={18} height={18} />
                </span>
                <div>
                  <p className="text-[22px] font-medium leading-none text-[#222]">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[14px] text-[#595959]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Share your shop */}
          <section className="mt-9">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Share your shop
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Copy your link or share it directly to your favorite platform.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-full border border-[#a5a5a5] px-4 py-2.5">
                <LinkIcon width={17} height={17} className="shrink-0 text-[#595959]" />
                <span className="truncate text-[14px] text-[#222]">
                  {shareLink}
                </span>
              </div>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 rounded-full bg-[#222] px-5 py-2.5 text-[15px] font-medium text-white hover:bg-black"
              >
                {copied ? (
                  <>
                    <CheckIcon width={16} height={16} />
                    Copied
                  </>
                ) : (
                  "Copy link"
                )}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: <FacebookIcon />, label: "Share to Facebook" },
                { icon: <PinterestIcon />, label: "Share to Pinterest" },
                { icon: <XIcon />, label: "Share to X" },
                { icon: <MailIcon />, label: "Share by email" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d4cc] text-[#222] hover:bg-[#f4f3ee]"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </section>

          {/* Share individual listings */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              Share individual listings
            </h3>
            <p className="mt-1 text-[14px] text-[#595959]">
              Each listing gets its own shareable link, in case a specific
              item is the star of the show.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {shareListings.map((l) => (
                <div key={l.id}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={l.image}
                      alt={l.title}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-2">
                    <p className="truncate text-[13px] text-[#222]">
                      {l.title}
                    </p>
                    <button
                      aria-label={`Share ${l.title}`}
                      className="shrink-0 rounded-full p-1 text-[#222] hover:bg-[#f4f3ee]"
                    >
                      <ShareIcon width={17} height={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-10">
            <h3 className="text-[18px] font-semibold text-[#222]">
              How Share &amp; Save works
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n}>
                  <p className="text-[30px] font-light leading-none text-[#222]">
                    {s.n}
                  </p>
                  <h4 className="mt-3 text-[16px] font-semibold text-[#222]">
                    {s.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#595959]">
                    {s.desc}
                  </p>
                </div>
              ))}
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
