import type { ReactNode } from "react";

function ShopMark() {
  return (
    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b3a4b] to-[#0f2733]">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
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
  );
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f5] px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col items-center text-center">
          <ShopMark />
          <h1 className="mt-4 text-[15px] font-semibold tracking-wide text-[#595959]">
            SHOP MANAGER
          </h1>
          <h2 className="mt-2 text-[24px] font-medium leading-tight text-[#222]">
            {title}
          </h2>
          <p className="mt-1.5 text-[15px] text-[#595959]">{subtitle}</p>
        </div>

        <div className="mt-7 rounded-2xl border border-[#e5e3dc] bg-white p-6 shadow-sm sm:p-7">
          {children}
        </div>

        <div className="mt-5 text-center text-[14px] text-[#595959]">
          {footer}
        </div>
      </div>
    </div>
  );
}
