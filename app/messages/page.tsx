"use client";

import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { conversations as seedConversations, type Conversation } from "./data";
import {
  SearchIcon,
  ChevronDownIcon,
  StarFilledIcon,
  StarOutlineIcon,
  ArchiveIcon,
  TrashIcon,
  FlagIcon,
  TagIcon,
  ArrowLeftIcon,
  ReplyIcon,
  ChatIcon,
} from "../components/icons";

type FolderKey =
  | "inbox"
  | "starred"
  | "help"
  | "potential"
  | "etsy"
  | "sent"
  | "all"
  | "unread"
  | "spam"
  | "bin";

const folders: { key: FolderKey; label: string }[] = [
  { key: "inbox", label: "Inbox" },
  { key: "starred", label: "Starred" },
  { key: "help", label: "Order help requests" },
  { key: "potential", label: "From potential buyers" },
  { key: "etsy", label: "From Etsy" },
  { key: "sent", label: "Sent" },
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "spam", label: "Spam" },
  { key: "bin", label: "Recycling bin" },
];

export default function MessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>(seedConversations);
  const [folder, setFolder] = useState<FolderKey>("inbox");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [archived, setArchived] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [labelOpen, setLabelOpen] = useState(false);
  const [replyPrefsOpen, setReplyPrefsOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return convos.filter((c) => {
      if (folder === "bin") {
        if (!deleted.has(c.id)) return false;
      } else {
        if (deleted.has(c.id)) return false;
        if (archived.has(c.id) && folder !== "all") return false;
      }
      if (term && !`${c.name} ${c.preview}`.toLowerCase().includes(term))
        return false;
      switch (folder) {
        case "inbox":
          return c.folder === "inbox";
        case "starred":
          return c.starred;
        case "help":
          return !!c.helpRequest;
        case "potential":
          return !!c.potentialBuyer;
        case "etsy":
          return !!c.fromEtsy;
        case "sent":
          return c.folder === "sent";
        case "unread":
          return c.unread;
        case "spam":
          return c.folder === "spam";
        case "all":
        case "bin":
          return true;
      }
    });
  }, [convos, folder, deleted, archived, query]);

  const openConvo = convos.find((c) => c.id === openId) ?? null;

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allChecked = visible.length > 0 && visible.every((c) => selected.has(c.id));
  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(visible.map((c) => c.id)));

  const setUnreadForSelected = (unread: boolean) => {
    setConvos((prev) =>
      prev.map((c) => (selected.has(c.id) ? { ...c, unread } : c))
    );
    setSelected(new Set());
  };

  const applyToSelected = (setFn: typeof setDeleted) => {
    setFn((prev) => new Set([...prev, ...selected]));
    setSelected(new Set());
  };

  const toggleStar = (id: string) =>
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    );

  const openThread = (id: string) => {
    setOpenId(id);
    setDraft("");
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  };

  const sendReply = () => {
    if (!draft.trim() || !openConvo) return;
    setConvos((prev) =>
      prev.map((c) =>
        c.id === openConvo.id
          ? {
              ...c,
              preview: draft.trim(),
              time: "Just now",
              messages: [
                ...c.messages,
                { from: "shop", body: draft.trim(), time: "Just now" },
              ],
            }
          : c
      )
    );
    setDraft("");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Messages" />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex flex-wrap items-center gap-3 border-b border-[#e5e3dc] px-4 py-3.5 sm:px-6 lg:px-8">
          <h2 className="text-[20px] font-medium text-[#222]">Messages</h2>
          <div className="relative ml-auto w-full max-w-[280px] sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your messages"
              className="w-full rounded-full border border-[#d6d4cc] bg-white py-2 pl-4 pr-9 text-[14px] text-[#222] outline-none focus:border-[#222] sm:w-[240px]"
            />
            <SearchIcon
              width={16}
              height={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#595959]"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setReplyPrefsOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[14px] text-[#222] hover:opacity-70"
            >
              Reply preferences
              <ChevronDownIcon
                className={`text-[#595959] transition-transform ${
                  replyPrefsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {replyPrefsOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl border border-[#e5e3dc] bg-white py-1 text-[14px] shadow-lg">
                {["Snippets", "Auto-reply", "Signature", "Notifications"].map(
                  (o) => (
                    <button
                      key={o}
                      onClick={() => setReplyPrefsOpen(false)}
                      className="block w-full px-4 py-2 text-left text-[#222] hover:bg-[#f4f3ee]"
                    >
                      {o}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Folder list */}
          <nav className="hidden w-[220px] shrink-0 overflow-y-auto border-r border-[#e5e3dc] px-3 py-4 md:block">
            {folders.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFolder(f.key);
                  setOpenId(null);
                  setSelected(new Set());
                }}
                className={`mb-0.5 block w-full rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                  folder === f.key
                    ? "bg-[#e4e2db] font-semibold text-[#222]"
                    : "text-[#3c3c3c] hover:bg-[#efeee8]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <section className="flex flex-1 flex-col overflow-hidden">
            {openConvo ? (
              <ThreadView
                convo={openConvo}
                draft={draft}
                setDraft={setDraft}
                onSend={sendReply}
                onBack={() => setOpenId(null)}
                onToggleStar={() => toggleStar(openConvo.id)}
              />
            ) : (
              <>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-[#e5e3dc] px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all"
                    className="mr-2 h-4 w-4 accent-[#222]"
                  />
                  <ToolbarButton
                    icon={<TrashIcon width={16} height={16} />}
                    label="Recycling bin"
                    disabled={!selected.size}
                    onClick={() => applyToSelected(setDeleted)}
                  />
                  <ToolbarButton
                    label="Mark Unread"
                    disabled={!selected.size}
                    onClick={() => setUnreadForSelected(true)}
                  />
                  <ToolbarButton
                    label="Mark Read"
                    disabled={!selected.size}
                    onClick={() => setUnreadForSelected(false)}
                  />
                  <ToolbarButton
                    icon={<FlagIcon width={16} height={16} />}
                    label="Report"
                    disabled={!selected.size}
                    onClick={() => applyToSelected(setDeleted)}
                  />
                  <ToolbarButton
                    icon={<ArchiveIcon width={16} height={16} />}
                    label="Archive"
                    disabled={!selected.size}
                    onClick={() => applyToSelected(setArchived)}
                  />
                  <div className="relative">
                    <button
                      onClick={() => setLabelOpen((o) => !o)}
                      disabled={!selected.size}
                      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-[#3c3c3c] hover:bg-[#efeee8] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <TagIcon width={15} height={15} />
                      Label
                      <ChevronDownIcon width={13} height={13} />
                    </button>
                    {labelOpen && selected.size > 0 && (
                      <div className="absolute left-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-[#e5e3dc] bg-white py-1 text-[13px] shadow-lg">
                        {["Follow up", "Wholesale", "Custom order", "VIP"].map(
                          (l) => (
                            <button
                              key={l}
                              onClick={() => setLabelOpen(false)}
                              className="block w-full px-3.5 py-2 text-left text-[#222] hover:bg-[#f4f3ee]"
                            >
                              {l}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message rows */}
                <ul className="flex-1 overflow-y-auto">
                  {visible.length === 0 && (
                    <li className="px-6 py-16 text-center text-[14px] text-[#767676]">
                      No messages here.
                    </li>
                  )}
                  {visible.map((c) => (
                    <li
                      key={c.id}
                      className={`flex items-center gap-3 border-b border-[#eee] px-4 py-3.5 hover:bg-[#faf9f5] ${
                        c.unread ? "bg-[#fcfbf7]" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(c.id)}
                        onChange={() => toggleSelect(c.id)}
                        aria-label={`Select message from ${c.name}`}
                        className="h-4 w-4 accent-[#222]"
                      />
                      <button
                        onClick={() => toggleStar(c.id)}
                        aria-label={c.starred ? "Unstar" : "Star"}
                        className="text-[#c9a227] hover:opacity-70"
                      >
                        {c.starred ? (
                          <StarFilledIcon width={18} height={18} />
                        ) : (
                          <StarOutlineIcon
                            width={18}
                            height={18}
                            className="text-[#b8b6ac]"
                          />
                        )}
                      </button>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.initial}
                      </span>
                      <button
                        onClick={() => openThread(c.id)}
                        className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left sm:flex-row sm:items-center sm:gap-4"
                      >
                        <span
                          className={`w-full shrink-0 truncate text-[14px] sm:w-[160px] ${
                            c.unread
                              ? "font-semibold text-[#222]"
                              : "text-[#222]"
                          }`}
                        >
                          {c.name}
                        </span>
                        <span className="flex min-w-0 flex-1 items-center gap-2">
                          <span
                            className={`truncate text-[14px] ${
                              c.unread ? "text-[#222]" : "text-[#595959]"
                            }`}
                          >
                            {c.preview}
                          </span>
                        </span>
                        {c.helpRequest && (
                          <span className="shrink-0 rounded bg-[#fbe1b6] px-2 py-0.5 text-[11px] font-semibold text-[#7a4b00]">
                            Help request
                          </span>
                        )}
                      </button>
                      <span className="hidden shrink-0 items-center gap-3 text-[13px] text-[#767676] sm:flex">
                        {c.time}
                        <ReplyIcon width={15} height={15} />
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
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

function ToolbarButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-[#3c3c3c] hover:bg-[#efeee8] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {icon}
      {label}
    </button>
  );
}

function ThreadView({
  convo,
  draft,
  setDraft,
  onSend,
  onBack,
  onToggleStar,
}: {
  convo: Conversation;
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  onBack: () => void;
  onToggleStar: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-[#e5e3dc] px-4 py-3">
        <button
          onClick={onBack}
          aria-label="Back to messages"
          className="rounded-md p-1 text-[#222] hover:bg-[#efeee8]"
        >
          <ArrowLeftIcon />
        </button>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{ backgroundColor: convo.color }}
        >
          {convo.initial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#222]">
            {convo.name}
          </p>
          {convo.orderNumber && (
            <p className="text-[13px] text-[#767676]">Order {convo.orderNumber}</p>
          )}
        </div>
        <button
          onClick={onToggleStar}
          aria-label={convo.starred ? "Unstar" : "Star"}
          className="text-[#c9a227] hover:opacity-70"
        >
          {convo.starred ? (
            <StarFilledIcon width={19} height={19} />
          ) : (
            <StarOutlineIcon width={19} height={19} className="text-[#b8b6ac]" />
          )}
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf9f5] px-4 py-6 sm:px-8">
        {convo.messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "shop" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                m.from === "shop"
                  ? "bg-[#2f2f31] text-white"
                  : "border border-[#e5e3dc] bg-white text-[#222]"
              }`}
            >
              <p>{m.body}</p>
              <p
                className={`mt-1 text-[11px] ${
                  m.from === "shop" ? "text-white/60" : "text-[#9b9b9b]"
                }`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#e5e3dc] p-3 sm:p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder={`Reply to ${convo.name}…`}
          className="w-full resize-none rounded-xl border border-[#d6d4cc] bg-white px-3.5 py-2.5 text-[14px] text-[#222] outline-none focus:border-[#222]"
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={onSend}
            disabled={!draft.trim()}
            className="rounded-full bg-[#222] px-5 py-2 text-[14px] font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
