"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, ClockIcon } from "./icons";

const DATE_RANGE_OPTIONS = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 30 days",
  "This month",
  "This year",
  "Last year",
  "All time",
] as const;

type DateRange = (typeof DATE_RANGE_OPTIONS)[number];

type StatValues = {
  totalViews: string;
  visits: string;
  orders: string;
  revenue: string;
};

const DEFAULTS: StatValues = {
  totalViews: "5,350",
  visits: "2,712",
  orders: "344",
  revenue: "$4,716",
};

const RESET: StatValues = {
  totalViews: "0",
  visits: "0",
  orders: "0",
  revenue: "$0",
};

// Mock numbers shown for each date range. Any range's numbers can be
// overridden via the hidden editor; overrides are persisted per range
// (see `overrides` state below).
const RANGE_STATS: Record<DateRange, StatValues> = {
  Today: { totalViews: "34", visits: "19", orders: "2", revenue: "$28" },
  Yesterday: { totalViews: "121", visits: "68", orders: "6", revenue: "$79" },
  "Last 7 days": { totalViews: "742", visits: "402", orders: "34", revenue: "$468" },
  "Last 30 days": { totalViews: "2,180", visits: "1,150", orders: "102", revenue: "$1,340" },
  "This month": { totalViews: "1,536", visits: "812", orders: "71", revenue: "$942" },
  "This year": DEFAULTS,
  "Last year": { totalViews: "4,890", visits: "2,398", orders: "306", revenue: "$3,984" },
  "All time": { totalViews: "18,240", visits: "9,650", orders: "1,206", revenue: "$16,430" },
};

const STORAGE_KEY = "etsy-stats-values";

const fields: { key: keyof StatValues; label: string }[] = [
  { key: "totalViews", label: "Total Views" },
  { key: "visits", label: "Visits" },
  { key: "orders", label: "Orders" },
  { key: "revenue", label: "Revenue" },
];

export default function StatsSection() {
  const [values, setValues] = useState<StatValues>(DEFAULTS);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<StatValues>(DEFAULTS);
  // Per-range overrides customized via the hidden editor + localStorage
  const [overrides, setOverrides] = useState<Partial<Record<DateRange, StatValues>>>({});
  const [dateRange, setDateRange] = useState<DateRange>("This year");
  const [rangeOpen, setRangeOpen] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

  const baseValuesFor = (range: DateRange) => overrides[range] ?? RANGE_STATS[range];

  // Close the date range dropdown when clicking outside it
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

  // Load saved values after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<DateRange, StatValues>>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable on the client, after mount
        setOverrides(parsed);
        const current = parsed["This year"];
        if (current) {
          setValues(current);
          setDraft(current);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const openEditor = () => {
    setDraft(values);
    setEditing(true);
  };

  const applyValues = () => {
    setEditing(false);
    // Edits apply to whichever date range is currently active, not always "This year"
    const nextOverrides = { ...overrides, [dateRange]: draft };
    setOverrides(nextOverrides);
    // Step 1: reset old numbers to zero (visible reset)
    setValues(RESET);
    // Step 2: after a short delay, show the new numbers
    window.setTimeout(() => {
      setValues(draft);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOverrides));
      } catch {
        /* ignore */
      }
    }, 600);
  };

  const resetToDefaults = () => {
    setDraft(RANGE_STATS[dateRange]);
  };

  const selectRange = (range: DateRange) => {
    setDateRange(range);
    setRangeOpen(false);
    const next = baseValuesFor(range);
    // Reuse the same reset-then-reveal animation as manual edits
    setValues(RESET);
    window.setTimeout(() => setValues(next), 600);
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        {/* Hidden trigger: double-click the "Stats" heading to edit numbers */}
        <h3
          onDoubleClick={openEditor}
          title=""
          className="cursor-default select-none text-[20px] font-semibold text-[#222] sm:text-[22px]"
        >
          Stats
        </h3>
        <a href="#" className="text-[15px] text-[#222] underline">
          View all
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-[#e5e3dc] p-4 sm:p-6">
        <div className="relative inline-block" ref={rangeRef}>
          <button
            onClick={() => setRangeOpen((o) => !o)}
            className="flex items-center gap-1.5 text-[15px] text-[#222]"
          >
            <span className="font-semibold">Date Range</span>
            <span className="text-[#595959]">{dateRange}</span>
            <ChevronDownIcon
              className={`text-[#595959] transition-transform ${rangeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {rangeOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-[#e5e3dc] bg-white py-1 shadow-lg">
              {DATE_RANGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => selectRange(option)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-[14px] text-[#222] hover:bg-[#f4f3ee] ${
                    option === "All time" ? "border-t border-[#1878f2]" : ""
                  }`}
                >
                  {option}
                  {dateRange === option && <CheckIcon className="text-[#222]" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {fields.map((field) => (
            <div key={field.key}>
              <p className="text-[15px] font-medium text-[#222]">{field.label}</p>
              <p className="mt-1 text-[24px] font-medium leading-none text-[#222] transition-all duration-300 sm:text-[30px]">
                {values[field.key]}
              </p>
              <p className="mt-2 text-[14px] text-[#595959] underline decoration-dashed underline-offset-4">
                --% YoY
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#595959]">
                <ClockIcon />
                Just now
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden editor modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setEditing(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-[18px] font-semibold text-[#222]">
              Edit stats numbers
            </h4>
            <p className="mt-1 text-[14px] text-[#595959]">
              Editing values for <span className="font-medium text-[#222]">{dateRange}</span>.
              Old numbers reset first, then yours appear.
            </p>

            <div className="mt-5 space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-[14px] font-medium text-[#222]">
                    {field.label}
                  </label>
                  <input
                    value={draft[field.key]}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-[#d6d4cc] px-3 py-2 text-[15px] text-[#222] outline-none focus:border-[#222]"
                    placeholder={RANGE_STATS[dateRange][field.key]}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={resetToDefaults}
                className="text-[14px] text-[#595959] underline hover:text-[#222]"
              >
                Reset to defaults
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-full border border-[#d6d4cc] px-5 py-2 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]"
                >
                  Cancel
                </button>
                <button
                  onClick={applyValues}
                  className="rounded-full bg-[#222] px-5 py-2 text-[15px] font-medium text-white hover:bg-[#000]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
