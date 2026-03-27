export interface Flashcard {
  id: string;
  sopId: string;
  topic: string;
  question: string;
  answer: string;
}

export const FLASHCARDS: Flashcard[] = [
  // ─── SHIPPING FEES ─────────────────────────────────────────────────────────
  {
    id: 'fc-ship-01',
    sopId: 'shipping-fees',
    topic: 'Shipping Fees',
    question: 'What is the flat rate for shipping a small object (incense, vase)?',
    answer: '$7 flat rate for domestic objects.',
  },
  {
    id: 'fc-ship-02',
    sopId: 'shipping-fees',
    topic: 'Shipping Fees',
    question: 'What is the shipping fee for a single piece of furniture (fits 1 DHL size 8)?',
    answer: '$50 flat rate.',
  },
  {
    id: 'fc-ship-03',
    sopId: 'shipping-fees',
    topic: 'Shipping Fees',
    question: 'What is the fee for furniture delivery with complexities (2–4 pieces)?',
    answer: '$85.',
  },
  {
    id: 'fc-ship-04',
    sopId: 'shipping-fees',
    topic: 'Shipping Fees',
    question: 'How are stair climbing charges handled?',
    answer: '$10–$20 per flight, charged after job completion. The courier does not negotiate — Aa forwards the invoice to the customer.',
  },

  // ─── STORAGE FEES ──────────────────────────────────────────────────────────
  {
    id: 'fc-stor-01',
    sopId: 'storage-fees',
    topic: 'Storage Fees',
    question: 'How long is complimentary storage for a regular priced item?',
    answer: 'Months 1–3 are complimentary. From month 4: $50/month. From month 7: $100/month.',
  },
  {
    id: 'fc-stor-02',
    sopId: 'storage-fees',
    topic: 'Storage Fees',
    question: 'What is the storage policy for reduced-pricing items?',
    answer: 'No complimentary storage. Must clear within 1 week of order. 1–6 months: $50/month. 7+ months: $100/month.',
  },
  {
    id: 'fc-stor-03',
    sopId: 'storage-fees',
    topic: 'Storage Fees',
    question: 'What happens to an item after 1 year in storage?',
    answer: 'Item goes back on the sales floor. Refund is given only when it sells, excluding storage fees, delivery charges, and credit card charges.',
  },
  {
    id: 'fc-stor-04',
    sopId: 'storage-fees',
    topic: 'Storage Fees',
    question: 'What is the storage policy for MOD systems?',
    answer: '6 months complimentary, then $100/month. Max 1 year.',
  },

  // ─── PAYMENT METHODS ───────────────────────────────────────────────────────
  {
    id: 'fc-pay-01',
    sopId: 'payment-methods',
    topic: 'Payment Methods',
    question: 'What is the preferred payment order for a local customer purchasing below $1,000?',
    answer: '1. PayNow  2. Cash (transfer to Aa QR, keep the cash)  3. Credit card — NO AMEX.',
  },
  {
    id: 'fc-pay-02',
    sopId: 'payment-methods',
    topic: 'Payment Methods',
    question: 'What is the preferred payment order for any purchase above $1,000?',
    answer: '1. PayNow  2. Credit card — NO AMEX. (Same for both local and international above $1,000.)',
  },
  {
    id: 'fc-pay-03',
    sopId: 'payment-methods',
    topic: 'Payment Methods',
    question: 'Is AMEX accepted?',
    answer: 'No. AMEX is never accepted under any circumstances.',
  },

  // ─── DISCOUNTS ─────────────────────────────────────────────────────────────
  {
    id: 'fc-disc-01',
    sopId: 'discounts',
    topic: 'Discounts',
    question: 'What does a tag "IND10" on a customer profile mean?',
    answer: 'Industry discount at 10%. Applies to customers with $10,000–$19,999 cumulative spend.',
  },
  {
    id: 'fc-disc-02',
    sopId: 'discounts',
    topic: 'Discounts',
    question: 'When is a discretionary discount appropriate?',
    answer: 'Customer considering 2+ pieces, a pair/set being broken up, significant purchase with hesitation, or sealing a deal with a serious buyer. Never to open a negotiation.',
  },
  {
    id: 'fc-disc-03',
    sopId: 'discounts',
    topic: 'Discounts',
    question: 'What items can never receive a discount?',
    answer: 'New arrivals / latest shipment, items already on reduced pricing, and items under $100.',
  },
  {
    id: 'fc-disc-04',
    sopId: 'discounts',
    topic: 'Discounts',
    question: 'What should you do if a customer asks for a 20% discount or pushes for "best price"?',
    answer: 'Do NOT offer anything. Be firm but polite — we do not negotiate. If unsure, call or message the team first.',
  },

  // ─── GIFT CARDS ────────────────────────────────────────────────────────────
  {
    id: 'fc-gift-01',
    sopId: 'gift-cards',
    topic: 'Gift Cards',
    question: 'What denominations are gift cards available in, and how long are they valid?',
    answer: '$50 and $100. Valid for 1 year from purchase date. Redeemable in-store and online. Partial use is allowed.',
  },
  {
    id: 'fc-gift-02',
    sopId: 'gift-cards',
    topic: 'Gift Cards',
    question: 'What do you write on the back of a gift card when selling it?',
    answer: 'The expiry date — 1 year from today\'s date — in black pen.',
  },

  // ─── EXCHANGES ─────────────────────────────────────────────────────────────
  {
    id: 'fc-exch-01',
    sopId: 'exchanges',
    topic: 'Exchanges',
    question: 'What are the eligibility criteria for an exchange?',
    answer: 'Item in original packaging, unused, all components present. Original receipt required. Within 14 days of purchase. One-time per transaction.',
  },
  {
    id: 'fc-exch-02',
    sopId: 'exchanges',
    topic: 'Exchanges',
    question: 'Is a refund possible? What about store credit?',
    answer: 'No refunds. No store credit. Exchanges only, and only for evergreen products.',
  },

  // ─── WASHI LIGHTS ──────────────────────────────────────────────────────────
  {
    id: 'fc-wash-01',
    sopId: 'washi-light-sale',
    topic: 'Washi Light Sale',
    question: 'What are the three bulb socket types and when do you test fit?',
    answer: 'E14, E17, E27. Test fit if you are unsure which bulb is correct for the lamp.',
  },
  {
    id: 'fc-wash-02',
    sopId: 'washi-light-sale',
    topic: 'Washi Light Sale',
    question: 'What is the care instruction for all washi lights?',
    answer: 'Feather dust only. Never use a wet cloth or cleaning agents on washi paper.',
  },
  {
    id: 'fc-wash-03',
    sopId: 'washi-light-sale',
    topic: 'Washi Light Sale',
    question: 'What must you do with the Japanese adapter on pendant lights?',
    answer: 'Cut the Japanese adapter in front of the customer after shade inspection. Explain it is unnecessary in Singapore and removed to avoid confusion.',
  },

  // ─── SUGY CLOCKS ───────────────────────────────────────────────────────────
  {
    id: 'fc-sugy-01',
    sopId: 'sugy-clock-sale',
    topic: 'Sugy Clock Sale',
    question: 'Sugy clocks have no second hand. How do you confirm the clock is working?',
    answer: 'Show the customer the gear shifting at the back of the clock.',
  },
  {
    id: 'fc-sugy-02',
    sopId: 'sugy-clock-sale',
    topic: 'Sugy Clock Sale',
    question: 'What type of battery should customers use in Sugy clocks?',
    answer: 'Cheap standard batteries. NOT expensive rechargeable batteries — these can damage the clock mechanics.',
  },

  // ─── OPENING & CLOSING ─────────────────────────────────────────────────────
  {
    id: 'fc-open-01',
    sopId: 'opening-matters',
    topic: 'Opening & Closing',
    question: 'What is the store door passcode?',
    answer: '1486. Return the key after unlocking.',
  },
  {
    id: 'fc-open-02',
    sopId: 'opening-matters',
    topic: 'Opening & Closing',
    question: 'In what order do you turn on the audio system?',
    answer: 'Crown ON first, then Gemini. At closing: Gemini OFF first, then Crown OFF.',
  },
  {
    id: 'fc-open-03',
    sopId: 'opening-matters',
    topic: 'Opening & Closing',
    question: 'Where is the charger for battery-operated lights?',
    answer: 'Below the POS counter.',
  },

  // ─── MOVING UNITS ──────────────────────────────────────────────────────────
  {
    id: 'fc-mod-01',
    sopId: 'moving-units',
    topic: 'Moving Units',
    question: 'What should you always call the modular shelving system?',
    answer: '"Moving Units" — never "USM". Always use this name with customers.',
  },
  {
    id: 'fc-mod-02',
    sopId: 'moving-units',
    topic: 'Moving Units',
    question: 'What is the payment structure for Moving Units orders?',
    answer: '70% non-refundable deposit upon order confirmation; 30% before delivery. Credit card: 100% upfront.',
  },

  // ─── HOUSEKEEPING ──────────────────────────────────────────────────────────
  {
    id: 'fc-hk-01',
    sopId: 'housekeeping',
    topic: 'Housekeeping',
    question: 'In Week 2 of the cleaning schedule, what happens on Sunday?',
    answer: 'Dust surfaces and lights, then wipe all glass surfaces using glass cleaner from the "Glass Cleaning" box in the pantry.',
  },

  // ─── SHOPIFY POS ───────────────────────────────────────────────────────────
  {
    id: 'fc-pos-01',
    sopId: 'shopify-pos',
    topic: 'Shopify POS',
    question: 'Where do you check if a customer is eligible for a profile-based discount?',
    answer: 'Tap their name in Shopify POS → enter profile → scroll to the "tags" section. Check for tags: FF5, P5, IND5, IND10, IND15, IND20. Do this discreetly.',
  },

  // ─── TAPES & LABELS ────────────────────────────────────────────────────────
  {
    id: 'fc-tape-01',
    sopId: 'tapes-labels-boxes',
    topic: 'Tapes & Labels',
    question: 'What does a purple round label on an item mean?',
    answer: '10% off.',
  },
  {
    id: 'fc-tape-02',
    sopId: 'tapes-labels-boxes',
    topic: 'Tapes & Labels',
    question: 'What does a red tape on an item indicate?',
    answer: 'Sold item reserved for delivery or pickup; also used for sealing packaging and envelopes.',
  },
];
