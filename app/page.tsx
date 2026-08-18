"use client";

import Sidebar from "./components/Sidebar";
import StatsSection from "./components/StatsSection";
import { useAuth } from "./context/AuthContext";
import {
  Star,
  ExternalLinkIcon,
  CheckCircleIcon,
  PencilIcon,
  PersonIcon,
  ArrowRightIcon,
  ClipboardIcon,
  MessagesIcon,
  ListingsIcon,
  ChatIcon,
} from "./components/icons";

const checklist = [
  { label: "Shop name added", done: true },
  { label: "Icon added", done: true },
  { label: "Banner added", done: true },
  {
    label: "Share your story",
    done: false,
    icon: "pencil" as const,
    desc: "Tell buyers about who you are, what inspires you, and how you create",
  },
  {
    label: "Upload a seller photo",
    done: false,
    icon: "person" as const,
    desc: "Introduce yourself with a friendly, clear photo",
  },
];

const topTasks = [
  {
    title: "Orders",
    icon: <ClipboardIcon width={22} height={22} />,
    lines: ["0 overdue orders", "0 orders to ship today"],
  },
  {
    title: "Messages",
    icon: <MessagesIcon width={22} height={22} />,
    lines: ["0 help requests", "0 potential buyers reaching out"],
  },
  {
    title: "Listings",
    icon: <ListingsIcon width={22} height={22} />,
    lines: ["0 items sold out", "0 listings expired"],
  },
];

export default function Home() {
  const { user } = useAuth();
  if (!user) return null;

  const shopSlug = user.shopName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar />

      {/* Main */}
      <main className="relative flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* Shop header */}
          <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <ShopAvatar
              color={user.avatarColor}
              letter={user.shopName.trim().charAt(0).toUpperCase() || "?"}
            />
            <div>
              <h2 className="text-[24px] font-medium leading-tight text-[#222] sm:text-[30px]">
                Hi there, {user.shopName}
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#595959] sm:text-[15px]">
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star fill="half" />
                  </span>
                  <span className="font-medium text-[#222]">4.5</span>
                  <span>(33)</span>
                </span>
                <span className="text-[#d6d6d6]">|</span>
                <span>344 sales</span>
                <span className="text-[#d6d6d6]">|</span>
                <span>36 active listings</span>
                <span className="text-[#d6d6d6]">|</span>
                <a
                  href="#"
                  className="flex items-center gap-1 text-[#595959] hover:text-[#222]"
                >
                  {shopSlug}.etsy.com
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <nav className="mt-7 flex gap-7 border-b border-[#e5e3dc] text-[16px]">
            <button className="-mb-px border-b-2 border-[#222] pb-3 font-medium text-[#222]">
              Home
            </button>
            <button className="-mb-px border-b-2 border-transparent pb-3 text-[#595959] hover:text-[#222]">
              Recent activity
            </button>
          </nav>

          {/* Customize your shop */}
          <section className="mt-9">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <h3 className="text-[20px] font-semibold text-[#222] sm:text-[22px]">
                Customize your shop
              </h3>
              <div className="flex items-center gap-2 pt-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e0ded7]">
                  <div className="h-full w-3/5 rounded-full bg-[#222]" />
                </div>
                <span className="text-[15px] text-[#595959]">3/5</span>
              </div>
            </div>
            <p className="mt-1 text-[15px] text-[#595959]">
              Showcase your brand&rsquo;s personality and build trust with buyers
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-[#e5e3dc]">
              {checklist.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-4 hover:bg-[#faf9f5] sm:gap-4 sm:px-5 ${
                    i !== checklist.length - 1 ? "border-b border-[#e5e3dc]" : ""
                  }`}
                >
                  <span className="shrink-0">
                    {item.done ? (
                      <CheckCircleIcon />
                    ) : item.icon === "pencil" ? (
                      <PencilIcon className="text-[#222]" />
                    ) : (
                      <PersonIcon className="text-[#222]" />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-[16px] font-semibold text-[#222]">
                      {item.label}
                      <ArrowRightIcon />
                    </div>
                    {item.desc && (
                      <p className="mt-0.5 text-[15px] text-[#595959]">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top tasks */}
          <section className="mt-10">
            <h3 className="text-[20px] font-semibold text-[#222] sm:text-[22px]">
              Top tasks
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {topTasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-xl border border-[#e5e3dc] p-5 hover:bg-[#faf9f5]"
                >
                  <div className="flex items-center gap-2 text-[#222]">
                    {task.icon}
                    <span className="flex items-center gap-1 text-[17px] font-semibold">
                      {task.title}
                      <ArrowRightIcon />
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 text-[15px] text-[#595959]">
                    {task.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[14px] text-[#595959]">
              Top tasks show activity from the last 30 days.{" "}
              <a href="#" className="text-[#222] underline">
                Learn more
              </a>
            </p>
          </section>

          {/* Stats */}
          <StatsSection />

          {/* Shop advisor */}
          <section className="mt-10">
            <h3 className="text-[20px] font-semibold text-[#222] sm:text-[22px]">
              Shop advisor
            </h3>
            <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
              <div className="max-w-2xl">
                <h4 className="text-[16px] font-semibold text-[#222]">
                  We&rsquo;ve lifted your Payment account reserve
                </h4>
                <p className="mt-1 text-[15px] leading-relaxed text-[#595959]">
                  All of your sales funds (minus fees) will now be available for
                  deposit, as long as there aren&rsquo;t any other holds on your
                  account.
                </p>
              </div>
              <button className="shrink-0 rounded-full border border-[#222] px-5 py-2.5 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]">
                View your Payment account
              </button>
            </div>
            <div className="mt-6">
              <h4 className="text-[16px] font-semibold text-[#222]">
                Congratulations, you&rsquo;ve made 300 sales!
              </h4>
              <p className="mt-1 text-[15px] text-[#595959]">
                Take a moment to pat yourself on the back! You&rsquo;ve earned it.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 flex flex-wrap items-center justify-between gap-y-3 border-t border-[#e5e3dc] pt-6 pb-10 text-[14px] text-[#595959]">
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
            <span className="text-[#595959]">© 2026 Etsy, Inc.</span>
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

function ShopAvatar({ color, letter }: { color: string; letter: string }) {
  return (
    <div className="relative shrink-0">
      <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b3a4b] to-[#0f2733]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z"
            fill="#2f6f8f"
            stroke="#7fd4ff"
            strokeWidth="1"
          />
          <path
            d="m8.5 12 2.5 2.5 4.5-5"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Hexagon badge, tinted with the account's avatar color */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2">
        <svg width="44" height="48" viewBox="0 0 44 48">
          <path
            d="M22 1 41 12v24L22 47 3 36V12Z"
            fill={color}
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="22"
            y="30"
            textAnchor="middle"
            fontSize="20"
            fontWeight="600"
            fill="#fff"
          >
            {letter}
          </text>
        </svg>
      </div>
    </div>
  );
}
