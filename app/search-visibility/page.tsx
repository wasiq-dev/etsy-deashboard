"use client";

import Image from "next/image";
import Sidebar from "../components/Sidebar";
import { listings } from "../listings/data";
import {
  WarningTriangleIcon,
  CheckCircleIcon,
  QuestionCircleIcon,
  ChatIcon,
} from "../components/icons";

const tips = [
  {
    image: listings[0].image,
    title: "The Ultimate Guide to Etsy Search",
    desc: "Get an inside look at how Etsy search works and learn what you can do to help buyers find your shop.",
  },
  {
    image: listings[1].image,
    title: "Keywords 101: Everything You Need to Know",
    desc: "Follow these dos and don'ts when adding tags and keywords so shoppers can discover your listings.",
  },
  {
    image: listings[2].image,
    title: "Add Attributes to Help Increase Your Shop's Visibility",
    desc: "Learn how adding specific listing details helps match your items with the right shoppers.",
  },
];

export default function SearchVisibilityPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Etsy search visibility" />

      <main className="relative flex-1 overflow-y-auto">
        <header className="border-b border-[#e5e3dc] px-4 py-4 sm:px-6 lg:px-10">
          <h2 className="text-[20px] font-medium text-[#222]">
            Etsy search visibility
          </h2>
        </header>

        <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-6 lg:px-10">
          {/* Risk factor */}
          <section>
            <h3 className="text-[22px] font-semibold text-[#222]">
              1 factor risks lowering your search visibility
            </h3>
            <p className="mt-1.5 text-[15px] text-[#595959]">
              Improving photos, listing info, and more can help how you show up
              in search.{" "}
              <a href="#" className="text-[#222] underline">
                Learn more
              </a>
            </p>

            <div className="mt-6 flex gap-4">
              <span className="shrink-0">
                <WarningTriangleIcon width={26} height={26} />
              </span>
              <div className="flex-1">
                <h4 className="text-[16px] font-semibold text-[#222]">
                  Your listings
                </h4>
                <p className="mt-0.5 text-[15px] text-[#595959]">
                  Some of your listings could use a refresh to unlock their full
                  potential.
                </p>

                <div className="mt-4 rounded-xl border border-[#e5e3dc] p-5">
                  <div className="flex items-start gap-2">
                    <h5 className="text-[15px] font-semibold text-[#222]">
                      Make your titles even clearer to buyers
                    </h5>
                    <QuestionCircleIcon className="mt-0.5 text-[#767676]" />
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#595959]">
                    2 listings have new title recommendations that could help
                    buyers more easily understand what you&rsquo;re selling.
                  </p>
                  <button className="mt-4 rounded-full border border-[#222] px-5 py-2 text-[14px] font-medium text-[#222] hover:bg-[#f4f3ee]">
                    Update titles
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* On track */}
          <section className="mt-12">
            <h3 className="text-[20px] font-semibold text-[#222]">
              Here&rsquo;s where you&rsquo;re right on track:
            </h3>
            <div className="mt-5 space-y-5">
              <div className="flex gap-4">
                <CheckCircleIcon className="shrink-0" />
                <div>
                  <h4 className="text-[16px] font-semibold text-[#222]">
                    Your shop
                  </h4>
                  <p className="mt-0.5 text-[15px] text-[#595959]">
                    Awesome work! Your shop info helps build trust with buyers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircleIcon className="shrink-0" />
                <div>
                  <h4 className="text-[16px] font-semibold text-[#222]">
                    Service standards
                  </h4>
                  <p className="mt-0.5 text-[15px] text-[#595959]">
                    You&rsquo;re meeting our service standards!{" "}
                    <a href="#" className="text-[#222] underline">
                      View progress
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bonus tips */}
          <section className="mt-12">
            <h3 className="text-[20px] font-semibold text-[#222]">
              Bonus tips to help boost your visibility
            </h3>
            <p className="mt-1 text-[15px] text-[#595959]">
              Looking for extra ways to improve your search visibility? Here are
              tips to make your shop truly shine.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {tips.map((t) => (
                <a key={t.title} href="#" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-3 text-[15px] font-semibold text-[#222] group-hover:underline">
                    {t.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#595959]">
                    {t.desc}
                  </p>
                </a>
              ))}
            </div>
          </section>

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

        <button className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2f2f31] px-4 py-3 text-[14px] font-medium text-white shadow-lg hover:bg-[#1f1f21] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-[15px]">
          <ChatIcon />
          Get Help
        </button>
      </main>
    </div>
  );
}
