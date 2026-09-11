import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HomeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function ListingsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </svg>
  );
}

export function MessagesIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function OrdersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function VisibilityIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 9V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
      <path d="M15 9V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
      <path d="M4 9h5l1 5a3.5 3.5 0 0 1-7 0Z" />
      <path d="M15 9h5l-1 5a3.5 3.5 0 0 1-7 0l1-5" />
      <path d="M9 11h6" />
    </svg>
  );
}

export function StatsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V10" />
      <path d="M12 21V4" />
      <path d="M19 21v-7" />
    </svg>
  );
}

export function GearIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export function FlagIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export function MarketingIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 9v6h3l9 5V4L7 9H4Z" />
      <path d="M18 9a3 3 0 0 1 0 6" />
    </svg>
  );
}

export function FinancesIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function AppsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function HelpIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...p}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CheckCircleIcon(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="11" fill="#4a8a3f" />
      <path
        d="m7.5 12.5 3 3 6-6.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1 1-4Z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

export function PersonIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2} {...p}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalLinkIcon(p: IconProps) {
  return (
    <svg {...base} width={15} height={15} {...p}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base} width={14} height={14} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ChatIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClipboardIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 10h6M9 14h6" />
    </svg>
  );
}

export function TruckIcon(p: IconProps) {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4H14a1.5 1.5 0 0 1 1.5 1.5V16H8.7a3.2 3.2 0 0 0-5.4 0H2V5.5Z" />
      <path d="M17 8h2.6a1.5 1.5 0 0 1 1.2.6l1.9 2.6c.2.26.3.57.3.9V16h-1.3a3.2 3.2 0 0 0-5.4 0H17V8Z" />
      <circle cx="6" cy="17.5" r="2.1" />
      <circle cx="19.3" cy="17.5" r="2.1" />
    </svg>
  );
}

export function TagIcon(p: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M11.6 3a2 2 0 0 0-1.42.59L3.6 10.17a2 2 0 0 0 0 2.83l7.4 7.4a2 2 0 0 0 2.83 0l6.58-6.58A2 2 0 0 0 21 12.4V5a2 2 0 0 0-2-2h-7.4Zm5.4 4.5a1.5 1.5 0 1 1 0-.01v.01Z" />
      <circle cx="16.5" cy="6.5" r="1.5" fill="#fff" />
    </svg>
  );
}

export function CompleteOrderIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} strokeWidth={1.8} {...p}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M18.5 2.5v3.2h-3.2" />
      <path d="m8.2 12.3 2.6 2.6 5-5.4" />
    </svg>
  );
}

export function ChatFilledIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-8.6L7 21v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M7 9h10M7 12.5h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function KebabIcon(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
    </svg>
  );
}

export function GiftIcon(p: IconProps) {
  return (
    <svg width={19} height={19} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3.5 8h17a.5.5 0 0 1 .5.5V11H3V8.5a.5.5 0 0 1 .5-.5Z" />
      <path d="M4 12.5h7V21H5a1 1 0 0 1-1-1v-7.5ZM13 12.5h7V20a1 1 0 0 1-1 1h-6v-8.5Z" />
      <path d="M12 8C9 8 6.8 6.9 6.8 5.2 6.8 4 7.8 3 9.1 3 11 3 12 5.5 12 8Zm0 0c3 0 5.2-1.1 5.2-2.8C17.2 4 16.2 3 14.9 3 13 3 12 5.5 12 8Z" />
    </svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <svg {...base} width={17} height={17} strokeWidth={1.5} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} width={18} height={18} strokeWidth={2} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function BellIcon(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5v3.9L4 16h16l-1.5-3.6V8.5A6.5 6.5 0 0 0 12 2Z" />
      <path d="M9.8 18a2.3 2.3 0 0 0 4.4 0H9.8Z" />
    </svg>
  );
}

export function NoteIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5v-5h5M15 20l6-5" fillRule="evenodd" />
      <path d="M4 4h17v10h-6v6H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm13 16v-4h4l-4 4Z" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function QuestionCircleIcon(p: IconProps) {
  return (
    <svg {...base} width={15} height={15} strokeWidth={1.6} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2.2} {...p}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </svg>
  );
}

export function CogIcon(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58ZM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z" />
    </svg>
  );
}

export function GridViewIcon(p: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

export function ListViewIcon(p: IconProps) {
  return (
    <svg {...base} width={18} height={18} strokeWidth={2.2} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function StarFilledIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9Z" />
    </svg>
  );
}

export function StarOutlineIcon(p: IconProps) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      {...p}
    >
      <path d="m12 2.8 2.7 5.6 6.2.9-4.5 4.3 1.1 6.1L12 16.9l-5.5 2.8 1.1-6.1L3.1 9.3l6.2-.9Z" />
    </svg>
  );
}

export function LightbulbIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.7.5 1 1.1 1 1.9v.2h5v-.2c0-.8.3-1.4 1-1.9A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function ThumbUpIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Z" />
      <path d="M7 11l4-7a2 2 0 0 1 2 2v4h5.5a1.5 1.5 0 0 1 1.46 1.83l-1.4 6A1.5 1.5 0 0 1 17.1 19H10a3 3 0 0 1-3-3v-5Z" />
    </svg>
  );
}

export function ThumbDownIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M17 13V4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3Z" />
      <path d="M17 13l-4 7a2 2 0 0 1-2-2v-4H5.5a1.5 1.5 0 0 1-1.46-1.83l1.4-6A1.5 1.5 0 0 1 6.9 5H14a3 3 0 0 1 3 3v5Z" />
    </svg>
  );
}

export function CartIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M3 4h2l2.3 11.4a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.47-1.2L20 8H6" />
    </svg>
  );
}

export function FastForwardIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M2 5.5v13a1 1 0 0 0 1.5.87l10-6.5a1 1 0 0 0 0-1.74l-10-6.5A1 1 0 0 0 2 5.5Z" />
      <path d="M12.5 5.5v13a1 1 0 0 0 1.5.87l10-6.5a1 1 0 0 0 0-1.74l-10-6.5a1 1 0 0 0-1.5.87Z" />
    </svg>
  );
}

export function CursorClickIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M6 3v3M3 6h3M4.5 4.5l2 2" />
      <path d="M12 8 21 12l-3.8 1.4L15.8 17 12 8Z" />
    </svg>
  );
}

export function TrendingUpIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M3 17 9.5 10.5 14 15l7-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
}

export function HeartOutlineIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7.5-4.6-9.6-9.3C1.2 7.6 3 4.5 6.3 4.5c1.9 0 3.4 1 4.7 2.6 1.3-1.6 2.8-2.6 4.7-2.6 3.3 0 5.1 3.1 3.9 6.2C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function HandshakeIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="m2 12 4-4 4 2 2-2h2l5 4" />
      <path d="m8 10 4.5 4.5a1.5 1.5 0 0 0 2.1-2.1" />
      <path d="m10.5 12.5 2 2a1.5 1.5 0 0 0 2.1-2.1" />
      <path d="M2 12v4l3 2 2-2" />
      <path d="m19 12 3 2v3l-3 2-2.5-2" />
    </svg>
  );
}

export function BasketIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M4 10h16l-1.5 8.5a1.5 1.5 0 0 1-1.48 1.25H6.98A1.5 1.5 0 0 1 5.5 18.5L4 10Z" />
      <path d="M8 10 12 4l4 6" />
      <path d="M9.5 13.5v3M14.5 13.5v3" />
    </svg>
  );
}

export function BundleIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <rect x="4" y="10" width="8" height="8" rx="1" />
      <rect x="12.5" y="6" width="7.5" height="7.5" rx="1" />
      <path d="M14.5 13.5v3M17.5 8v3" />
    </svg>
  );
}

export function PercentTagIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M11.6 3a2 2 0 0 0-1.42.59L3.6 10.17a2 2 0 0 0 0 2.83l7.4 7.4a2 2 0 0 0 2.83 0l6.58-6.58A2 2 0 0 0 21 12.4V5a2 2 0 0 0-2-2h-7.4Z" />
      <path d="m14.5 7.5-5 5" />
      <circle cx="10" cy="7.7" r="0.9" fill="currentColor" />
      <circle cx="14.2" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function ShareIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="5.5" r="2.4" />
      <circle cx="18" cy="18.5" r="2.4" />
      <path d="m8.1 10.8 7.8-4.3M8.1 13.2l7.8 4.3" />
    </svg>
  );
}

export function LinkIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 5a3.5 3.5 0 0 1 5 5l-1.6 1.6" />
      <path d="M13 17.5 11.4 19a3.5 3.5 0 0 1-5-5l1.6-1.6" />
    </svg>
  );
}

export function FacebookIcon(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 22v-8h2.7l.4-3.3H14V8.5c0-1 .3-1.6 1.7-1.6H17V4a15 15 0 0 0-2.2-.1c-2.2 0-3.8 1.4-3.8 3.8v2.9H8.5V14H11v8h3Z" />
    </svg>
  );
}

export function PinterestIcon(p: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8-.1-2 0-2.9l1.4-6s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-.9 3.9-.3 1.1.6 2.1 1.7 2.1 2.1 0 3.6-2.6 3.6-5.8 0-2.4-1.7-4.2-4.7-4.2-3.5 0-5.6 2.6-5.6 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.4 1.4c-.1.2-.2.3-.4.2-1.5-.7-2.4-2.8-2.4-4.6 0-3.7 2.7-7.2 7.8-7.2 4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.3-6.1 7.3-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.4-1.5 3.1A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

export function XIcon(p: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.2 3h3l-6.6 7.5L22.5 21h-6.1l-4.8-6.3L6 21H3l7.1-8.1L2 3h6.3l4.3 5.8Zm-1 16.2h1.7L7 4.7H5.2Z" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function HashtagIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} strokeWidth={2} {...p}>
      <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />
    </svg>
  );
}

export function HeartBubbleIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M12 8.5c-.6-.7-1.4-1-2.2-1a2.3 2.3 0 0 0-2.3 2.3c0 2.1 3 3.5 4.5 4.7 1.5-1.2 4.5-2.6 4.5-4.7A2.3 2.3 0 0 0 14.2 7.5c-.8 0-1.6.3-2.2 1Z" />
    </svg>
  );
}

export function CoinIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="9" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#faf9f5">
        $
      </text>
    </svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </svg>
  );
}

export function EyeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function EyeOffIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a15.4 15.4 0 0 1-3.4 4.1M6.5 7.4A15.6 15.6 0 0 0 2 12s3.5 6.5 10 6.5c1.4 0 2.6-.2 3.7-.6" />
      <path d="M9.5 10a2.6 2.6 0 0 0 3.6 3.6" />
    </svg>
  );
}

export function LogoutIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h3" />
      <path d="M15 16l4-4-4-4" />
      <path d="M19 12H9" />
    </svg>
  );
}

export function ArrowLeftIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} strokeWidth={2} {...p}>
      <path d="M19 12H6M12 6l-6 6 6 6" />
    </svg>
  );
}

export function ReplyIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...p}>
      <path d="M9 7 4 12l5 5" />
      <path d="M4 12h9a7 7 0 0 1 7 7v1" />
    </svg>
  );
}

export function ArchiveIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function TrashIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function WarningTriangleIcon(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 3.5 21 19a1 1 0 0 1-.87 1.5H3.87A1 1 0 0 1 3 19L12 3.5Z"
        fill="#f4c542"
      />
      <path
        d="M12 9.5v4.5M12 17h.01"
        stroke="#3c3c3c"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RefreshIcon(p: IconProps) {
  return (
    <svg {...base} width={14} height={14} {...p}>
      <path d="M20 11a8 8 0 0 0-13.5-4.2L4 9" />
      <path d="M4 5v4h4" />
      <path d="M4 13a8 8 0 0 0 13.5 4.2L20 15" />
      <path d="M20 19v-4h-4" />
    </svg>
  );
}

export function BookmarkIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function Star({ fill = "full" }: { fill?: "full" | "half" }) {
  if (fill === "half") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#222222" />
            <stop offset="50%" stopColor="#d6d6d6" />
          </linearGradient>
        </defs>
        <path
          d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9Z"
          fill="url(#halfStar)"
        />
      </svg>
    );
  }
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" fill="#222222">
      <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9Z" />
    </svg>
  );
}
