export type ThreadMessage = {
  from: "buyer" | "shop";
  body: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  initial: string;
  color: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  helpRequest?: boolean;
  fromEtsy?: boolean;
  potentialBuyer?: boolean;
  folder: "inbox" | "sent" | "spam";
  orderNumber?: string;
  messages: ThreadMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "m-marianne",
    name: "Marianne Pentecostes",
    initial: "M",
    color: "#7b3f9c",
    preview: "??",
    time: "2 days ago",
    unread: true,
    starred: false,
    helpRequest: true,
    folder: "inbox",
    orderNumber: "#4151980233",
    messages: [
      {
        from: "buyer",
        body: "Hi, I ordered the American Mahjong set last week and the tracking hasn't updated. Can you check on it?",
        time: "3 days ago",
      },
      {
        from: "shop",
        body: "Hi Marianne! Thanks for reaching out. Your parcel was collected by the carrier yesterday and should start scanning within 24 hours. I'll keep an eye on it.",
        time: "2 days ago",
      },
      { from: "buyer", body: "??", time: "2 days ago" },
    ],
  },
  {
    id: "m-amanda-update",
    name: "Amanda J Zolla",
    initial: "A",
    color: "#3f7d3a",
    preview:
      "Order Update: Your order should be delivered between 05-08 Sept View full details for order #4149...",
    time: "7 days ago",
    unread: false,
    starred: false,
    folder: "inbox",
    orderNumber: "#4149032881",
    messages: [
      {
        from: "shop",
        body: "Order Update: Your order should be delivered between 05-08 Sept. View full details for order #4149032881 in your Purchases.",
        time: "7 days ago",
      },
      {
        from: "buyer",
        body: "Perfect, thank you for the heads up!",
        time: "7 days ago",
      },
    ],
  },
  {
    id: "m-monica",
    name: "Monica",
    initial: "M",
    color: "#8a8a8a",
    preview: "Ok no problem",
    time: "02 Sept, 2026",
    unread: false,
    starred: true,
    folder: "inbox",
    messages: [
      {
        from: "buyer",
        body: "Would it be possible to add a gift note that says 'Happy Retirement Dad'?",
        time: "01 Sept, 2026",
      },
      {
        from: "shop",
        body: "Of course! I've added the note and it will be tucked inside the box. It ships tomorrow.",
        time: "02 Sept, 2026",
      },
      { from: "buyer", body: "Ok no problem", time: "02 Sept, 2026" },
    ],
  },
  {
    id: "m-amanda-ship",
    name: "Amanda J Zolla",
    initial: "A",
    color: "#3f7d3a",
    preview:
      "you asked that it was closer to your house so that it would ship earlier but thing is we have multiple ...",
    time: "27 Aug, 2026",
    unread: false,
    starred: false,
    helpRequest: true,
    folder: "inbox",
    orderNumber: "#4149032881",
    messages: [
      {
        from: "buyer",
        body: "Hi! Is there any way to ship from a warehouse closer to Ohio so it arrives sooner?",
        time: "26 Aug, 2026",
      },
      {
        from: "shop",
        body: "you asked that it was closer to your house so that it would ship earlier but thing is we have multiple fulfilment centres and the system picks the one with stock. I've flagged your order for the fastest available route.",
        time: "27 Aug, 2026",
      },
    ],
  },
  {
    id: "m-etsy",
    name: "Etsy",
    initial: "E",
    color: "#222222",
    preview:
      "Your payment account is all set. Deposits will arrive in your bank within 1-3 business days.",
    time: "24 Aug, 2026",
    unread: false,
    starred: false,
    fromEtsy: true,
    folder: "inbox",
    messages: [
      {
        from: "buyer",
        body: "Your payment account is all set. Deposits will arrive in your bank within 1-3 business days.",
        time: "24 Aug, 2026",
      },
    ],
  },
  {
    id: "m-priya",
    name: "Priya N.",
    initial: "P",
    color: "#b5651d",
    preview: "Do you ship the macrame wall hanging to Canada? And how long does it take?",
    time: "22 Aug, 2026",
    unread: true,
    starred: false,
    potentialBuyer: true,
    folder: "inbox",
    messages: [
      {
        from: "buyer",
        body: "Do you ship the macrame wall hanging to Canada? And how long does it take?",
        time: "22 Aug, 2026",
      },
    ],
  },
  {
    id: "m-derek",
    name: "Derek M.",
    initial: "D",
    color: "#2f6f8f",
    preview: "Thanks so much — it arrived early and looks even better in person!",
    time: "18 Aug, 2026",
    unread: false,
    starred: false,
    folder: "inbox",
    messages: [
      {
        from: "buyer",
        body: "Thanks so much — it arrived early and looks even better in person!",
        time: "18 Aug, 2026",
      },
      {
        from: "shop",
        body: "That's wonderful to hear, Derek. Thank you for the kind note — it means a lot!",
        time: "18 Aug, 2026",
      },
    ],
  },
  {
    id: "m-spam",
    name: "GrowthPartners LLC",
    initial: "G",
    color: "#9b9b9b",
    preview: "Boost your Etsy sales 10x with our guaranteed SEO package — reply YES to start.",
    time: "15 Aug, 2026",
    unread: false,
    starred: false,
    folder: "spam",
    messages: [
      {
        from: "buyer",
        body: "Boost your Etsy sales 10x with our guaranteed SEO package — reply YES to start.",
        time: "15 Aug, 2026",
      },
    ],
  },
];
