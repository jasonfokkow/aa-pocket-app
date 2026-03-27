export type SOPCategory = 'Operations' | 'Sales' | 'Products' | 'Logistics';

export type SOPContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'steps'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'warning'; text: string }
  | { type: 'info'; text: string };

export interface SOPTopic {
  id: string;
  category: SOPCategory;
  title: string;
  description: string;
  summary: string;
  content: SOPContentBlock[];
}

export const SOP_TOPICS: SOPTopic[] = [
  // ─── OPERATIONS ────────────────────────────────────────────────────────────
  {
    id: 'opening-matters',
    category: 'Operations',
    title: 'Opening & Closing',
    description: 'Arrive 15 min early. Step-by-step open and close procedures.',
    summary:
      'Arrive 15 minutes before shift. Enter with passcode 1486, return key. Turn on lights left to right (stop at R), burn incense at entrance and back, turn on 2 cassette AC units, turn on Crown then Gemini for audio. Charge Hitpay terminal. At close: write sales report, turn off all lights, AC, and audio (Gemini first then Crown), clear pantry trash, pack online orders.',
    content: [
      {
        type: 'steps',
        items: [
          'Arrive 15 minutes before shift start.',
          'Enter with keypad passcode 1486. Return key after unlocking.',
          'Light incense at 2 points: entrance and back area.',
          'Switch on main lights left to right, stop at "R". Activate all lighting points. Ensure battery-operated lights are charged (charger is below POS).',
          'Turn on 2 cassette AC units. Use third unit only if needed.',
          'Turn on Crown amp first, then Gemini. Select appropriate playlist (avoid full clubbing sets). Adjust Master knob for volume.',
          'Place any received packages on pantry table and note them in the closing report.',
          'Light all Kungyokudo incense in individual canisters.',
          'Charge Hitpay terminal and ensure it is on and connected.',
          'Close pantry door, clear POS table, fold and store dry cloths.',
        ],
      },
      {
        type: 'warning',
        text: 'Always turn on Crown amp before Gemini when opening. At close, turn off Gemini first, then Crown.',
      },
      {
        type: 'paragraph',
        text:
          'Closing sales report format: customer count (new vs returning), items of interest, sales made, special notes (order pickups, remarks for next shift). Turn off all lights including battery-operated ones. Turn off all AC units. Dispose food trash, replace bags, fill water, wash cups and cloths. Place packed online orders outside and take a photo.',
      },
    ],
  },
  {
    id: 'housekeeping',
    category: 'Operations',
    title: 'Housekeeping Schedule',
    description: 'Four-week rotating cleaning schedule for the store.',
    summary:
      'Cleaning tasks rotate on a 4-week cycle. Week 1: sweep/vacuum + dust surfaces and lights + wipe wooden furniture. Week 2: sweep/vacuum + dust + wipe glass surfaces (glass cleaner from Glass Cleaning box). Week 3: dust + vacuum soft furnishings + sweep/vacuum. Week 4: dust + polish metal parts + sweep/vacuum. Always photograph surfaces before moving items.',
    content: [
      {
        type: 'table',
        headers: ['Week', 'Day', 'Task'],
        rows: [
          ['Week 1', 'Thursday', 'Sweep/Vacuum Floor'],
          ['Week 1', 'Friday', 'Dust surfaces + lights; Wipe wooden furniture (damp cloth, squeeze dry)'],
          ['Week 2', 'Saturday', 'Sweep/Vacuum Floor'],
          ['Week 2', 'Sunday', 'Dust surfaces + lights; Wipe glass surfaces (glass cleaner from pantry)'],
          ['Week 3', 'Thursday', 'Dust surfaces + lights; Vacuum soft furnishings'],
          ['Week 3', 'Friday', 'Sweep/Vacuum Floor'],
          ['Week 4', 'Saturday', 'Dust surfaces + lights; Polish metal parts'],
          ['Week 4', 'Sunday', 'Sweep/Vacuum Floor'],
        ],
      },
      {
        type: 'warning',
        text: 'Always photograph surfaces before removing items for cleaning. Use glass cleaner from the "Glass Cleaning" box in the pantry for glass surfaces only.',
      },
      {
        type: 'paragraph',
        text: 'Miscellaneous: Cut more bubble wrap when running low. Clear trash if food is present or bin is full.',
      },
    ],
  },
  {
    id: 'audio',
    category: 'Operations',
    title: 'Audio System',
    description: 'Using the Crown and Gemini amp setup for in-store music.',
    summary:
      'Always turn on Crown first, then Gemini. At closing, turn off Gemini first, then Crown. Use the Master knob on Gemini to adjust volume. Select a playlist — avoid full clubbing sets.',
    content: [
      {
        type: 'steps',
        items: [
          'Turn on Crown amp first.',
          'Then turn on Gemini.',
          'Select playlist — avoid full clubbing sets.',
          'Adjust Master knob on Gemini for volume.',
          'At closing: turn off Gemini first, then Crown.',
        ],
      },
      {
        type: 'warning',
        text: 'Order matters: Crown ON first, Crown OFF last. Reversing this order may damage the equipment.',
      },
    ],
  },
  {
    id: 'air-conditioning',
    category: 'Operations',
    title: 'Air Conditioning',
    description: 'Managing the store\'s three cassette AC units.',
    summary:
      'Turn on both cassette AC units at opening. Use the third unit only if the store is hot or busy. Turn off all units at closing.',
    content: [
      {
        type: 'steps',
        items: [
          'At opening: turn on 2 cassette AC units.',
          'Use the third unit if needed (hot day, busy store).',
          'At closing: turn off all AC units.',
        ],
      },
    ],
  },

  // ─── SALES ─────────────────────────────────────────────────────────────────
  {
    id: 'shopify-pos',
    category: 'Sales',
    title: 'Using Shopify POS',
    description: 'Step-by-step checkout process on Shopify POS.',
    summary:
      'Key in products and verify prices match tags. Add customer profile (returning: search by name; new: collect first name, last name, email, phone). Check for discount tags (FF5, P5, IND5–IND20) discreetly on their profile. Apply discounts per item, not as a blanket fee. For delayed pickup/delivery, add notes and untick "Mark as fulfilled".',
    content: [
      {
        type: 'steps',
        items: [
          'Key in products. Confirm quantity and prices match price tags.',
          'Add customer profile. Returning: search by name, verify. New: collect First name, Last name, Email, Phone (required even for non-SG residents). Ask about mailing list opt-in.',
          'Tap customer name → enter profile → scroll to "tags" section. Look for: FF5 / P5 / IND5 / IND10 / IND15 / IND20. Do this discreetly.',
          'If eligible: apply discount to each item individually. Never apply a blanket discount — discounts do not apply to storage or delivery fees.',
          'For delayed pickup: add notes with estimated date, specify items if only some, untick "Mark as fulfilled".',
          'For delivery: add notes with estimated date/time, specify items if applicable, untick "Mark as fulfilled".',
        ],
      },
      {
        type: 'warning',
        text: 'Never apply discounts as a blanket order fee. Apply to individual items only. Delivery and storage fees are always excluded from discounts.',
      },
    ],
  },
  {
    id: 'discounts',
    category: 'Sales',
    title: 'Discounts',
    description: 'Rules for applying discounts — who qualifies and when.',
    summary:
      'Discounts are given discreetly to close sales, never to open a negotiation. Check the customer profile for tags (IND5–IND20, P5, FF5, STAFF) before applying. Discretionary 5–10% only for: multiple pieces, broken sets, significant hesitation, or sealing a deal. No discounts on new arrivals or items under $100. Firm on pushy customers — no negotiation.',
    content: [
      {
        type: 'table',
        headers: ['Tag / Type', 'Discount', 'Notes'],
        rows: [
          ['P5 (Regular)', '5%', 'Regular customer'],
          ['FF5 (Friends & Family)', '5%', 'Must be paid by tagged person'],
          ['STAFF', '20%', 'Must be handled/paid by staff member'],
          ['IND5', '5%', 'Industry — $1–9,999 spend tier'],
          ['IND10', '10%', 'Industry — $10,000–19,999 spend tier'],
          ['IND15', '15%', 'Industry — $20,000–34,999 spend tier'],
          ['IND20', '20%', 'Industry — $35,000+ spend tier'],
        ],
      },
      {
        type: 'warning',
        text: 'No discounts on latest shipment / new arrivals. No discounts on items under $100. No discounts on items already on reduced pricing.',
      },
      {
        type: 'paragraph',
        text:
          'Discretionary discounts (5–10%) are only appropriate when: customer is considering 2+ pieces, a pair/set is being broken up, the purchase is significant but customer is hesitating, or you are closing a deal with a serious buyer. Alternative: offer reduced delivery fee instead.',
      },
      {
        type: 'warning',
        text: 'Pushy customers asking for freebies, 10–20% discounts, or "best price" → Do NOT offer anything. Be firm but polite. We do not negotiate. If unsure, call or message the team first.',
      },
      {
        type: 'paragraph',
        text: 'Log every discount in the sales report: Order Number, Discount %, Reason.',
      },
    ],
  },
  {
    id: 'payment-methods',
    category: 'Sales',
    title: 'Payment Methods',
    description: 'Preferred payment order for local and international customers.',
    summary:
      'Local under $1,000: PayNow first, then cash (transfer to Aa PayNow QR, keep cash), then credit card (NO AMEX). Local over $1,000: PayNow first, then credit card (NO AMEX). International under $1,000: cash first, then credit card. International over $1,000: PayNow first, then credit card. No AMEX ever.',
    content: [
      {
        type: 'table',
        headers: ['Customer', 'Amount', 'Priority Order'],
        rows: [
          ['Local', 'Below $1,000', '1. PayNow  2. Cash (transfer to Aa QR, keep cash)  3. Credit card (NO AMEX)'],
          ['Local', 'Above $1,000', '1. PayNow  2. Credit card (NO AMEX)'],
          ['International', 'Below $1,000', '1. Cash (transfer to Aa QR, keep cash)  2. Credit card (NO AMEX)'],
          ['International', 'Above $1,000', '1. PayNow  2. Credit card (NO AMEX)'],
        ],
      },
      {
        type: 'warning',
        text: 'NO AMEX accepted under any circumstances. All credit card payments go through Hitpay terminal only.',
      },
    ],
  },
  {
    id: 'hitpay-terminal',
    category: 'Sales',
    title: 'Using Hitpay Terminal',
    description: 'Processing credit card payments through the Hitpay terminal.',
    summary:
      'In Shopify checkout, select "Hitpay Credit Card". Open Hitpay app — verify terminal is on and connected. Key in the exact amount from Shopify. Add description: Order Number + Customer Name. Customer taps card on WisePad3. Then manually mark order as paid in Shopify (same as PayNow).',
    content: [
      {
        type: 'steps',
        items: [
          'In Shopify checkout, tap "Hitpay Credit Card".',
          'Open Hitpay app. Ensure terminal is on. Tap Settings → verify terminal connected.',
          'Tap Home tab → key in the exact amount shown in Shopify POS.',
          'Tap "More Actions" → "Add Description" → enter Order Number (e.g. #0000) and Customer Name.',
          'Terminal displays transaction screen. WisePad3 lights up and shows "Tap to Pay".',
          'Customer taps card.',
          'In Shopify, manually mark order as paid (same process as PayNow).',
        ],
      },
      {
        type: 'warning',
        text: 'Always double-check the amount in Hitpay matches exactly what is shown in Shopify POS before the customer taps.',
      },
    ],
  },
  {
    id: 'gift-cards',
    category: 'Sales',
    title: 'Gift Cards',
    description: 'Selling and redeeming $50 and $100 gift cards.',
    summary:
      'Two denominations: $50 and $100. Valid for 1 year. When selling: locate card under POS, check out normally, write expiry date on back (1 year from purchase) in black pen, pack in Aa envelope. When redeeming: tap "Gift Card" → "Redeem" → enter gift code.',
    content: [
      {
        type: 'paragraph',
        text: 'Gift cards come in $50 and $100 denominations. Both are valid for 1 year from the purchase date. They are redeemable in-store and online. Full value does not need to be used in a single transaction — balance is stored for one year.',
      },
      {
        type: 'steps',
        items: [
          'SELLING: Locate gift cards under POS counter.',
          'Check out as per normal SOP.',
          'Write expiry date (1 year from today) on the back of the card in black pen.',
          'Place card in Aa envelope (found under POS).',
          'Tell customer: valid 1 year, redeemable in-store and online, partial use is OK.',
        ],
      },
      {
        type: 'steps',
        items: [
          'REDEEMING: Check out as per normal SOP.',
          'Tap "Gift Card" in payment options.',
          'Tap "Redeem".',
          'Enter the gift code from the card.',
        ],
      },
    ],
  },
  {
    id: 'exchanges',
    category: 'Sales',
    title: 'Exchanges',
    description: 'How to assess and process exchanges. No refunds.',
    summary:
      'Exchanges only — no refunds, no store credit. Item must be in original, unused packaging with all components, within 14 days of purchase with receipt. Exchange must be for equal or higher value (customer pays difference). One-time policy per transaction.',
    content: [
      {
        type: 'steps',
        items: [
          'Inspect item: must be in original packaging, unused, all components present.',
          'Verify original receipt. Must be within 14-day window from purchase date.',
          'Inform customer: exchanges only (no refunds), must exchange for equal or higher value item. One-time per transaction.',
        ],
      },
      {
        type: 'steps',
        items: [
          'EQUAL VALUE: Photograph both items (note SKUs). Add note to original Shopify order. Inform Reihan with order number and exchanged items list. Report in staff chat.',
          'HIGHER VALUE: Photograph both items (note SKUs). Key in all exchange items in Shopify, manually calculate difference. Do NOT create a custom order. Customer pays difference; send edited invoice within 2 days. Inform Reihan and report in staff chat.',
        ],
      },
      {
        type: 'warning',
        text: 'Exchanges apply to evergreen products only. Vintage items cannot be exchanged. No refunds under any circumstances.',
      },
    ],
  },
  {
    id: 'display-pieces-preorders',
    category: 'Sales',
    title: 'Display Pieces & Preorders',
    description: 'When to sell display pieces and how to handle preorders.',
    summary:
      'Display pieces can only be sold if we have decided to discontinue that evergreen item. In-store only — customer must inspect condition. Up to 20% discount if scratches present. Do NOT sell display pieces for evergreens that could be restocked — offer a preorder instead. For preorders, state estimated arrival vaguely (e.g. "August", not "2nd week of August").',
    content: [
      {
        type: 'paragraph',
        text: 'A display piece can be sold only if: (1) the item has been discontinued as an evergreen, or (2) it is a vintage item. In-store only — the customer must be able to inspect the condition before purchase.',
      },
      {
        type: 'steps',
        items: [
          'Assess item condition. If scratches present, up to 20% discount is allowed (decide based on severity; check with team if unsure).',
          'Do NOT sell display pieces for evergreens that could be restocked. Instead, offer to preorder.',
          'When sold: note the order number in the sales report and mention if a discount was given and why.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Preorders: Give estimated arrival vaguely (e.g. "August" not "2nd week of August"). Inform customer that shipment delays may occur beyond our control.',
      },
    ],
  },
  {
    id: 'personal-shopper',
    category: 'Sales',
    title: 'Personal Shopper',
    description: 'Sourcing specific pieces for customers on request.',
    summary:
      'For customers seeking specific pieces not in store. Submit all requests via the webstore form (staff can fill it with/for the customer). Bryan is the main contact. Price ranges: dining chairs $300+, tables $2,000+, sideboards $2,500+, floor lamps $1,000+. Payment: 70% non-refundable deposit; 30% before delivery. Credit card: 100% upfront.',
    content: [
      {
        type: 'table',
        headers: ['Category', 'Price Range'],
        rows: [
          ['Dining chairs', '$300+ per piece'],
          ['Dining tables', '$2,000+'],
          ['Sideboards', '$2,500+'],
          ['Bookshelves', '$2,000+'],
          ['Floor lamps', '$1,000+'],
          ['Collector pieces', 'Based on market price'],
        ],
      },
      {
        type: 'steps',
        items: [
          'Inform customers who can\'t find items in-store about this service.',
          'Submit all requests via the form on the webstore (staff fill on behalf of, with, or let customer do it).',
          'Bryan is the main contact. Multiple options will be presented initially, then narrowed down.',
          'Once confirmed: 70% non-refundable deposit; 30% before delivery. Credit card payments: 100% upfront.',
          'Delivery timing depends on customer clarity, next shipment timing, and ability to acquire pieces.',
        ],
      },
    ],
  },

  // ─── PRODUCTS ──────────────────────────────────────────────────────────────
  {
    id: 'washi-light-sale',
    category: 'Products',
    title: 'Washi Light Sale',
    description: 'Sale procedure for all washi paper lights.',
    summary:
      'Provide complimentary bulbs (know E14/E17/E27 differences). For table/standing lights: include complimentary converter plug, throw away Japan bulbs. Open shade with customer to check for tears. Light test before sale. For pendant lights: check if assembly is needed. For all washi pendant lights: cut Japanese adapter after shade check. Care instruction: feather dust only. No returns/exchanges after sale.',
    content: [
      {
        type: 'steps',
        items: [
          'Know bulb types: E14, E17, E27. Test fit if unsure. Provide complimentary bulb.',
          'For table/standing/battery lights: provide complimentary converter plug. Discard existing Japan bulbs in the box.',
          'Show customer the box contents (assembly paper inside — straightforward, no force needed).',
          'Open lampshade with customer — check for tears or holes.',
          'Light test: for table/battery/standing lights, light test using complimentary bulb and plug. Ensure customer sees it working.',
          'For pendant lights: check if assembly is needed on our end. If using our trusted contractor: we ensure smooth install. If using own contractor: we are not liable for damages.',
          'Inform customer: no returns/exchanges. If assembly issues arise, contact us via DM.',
          'For all washi pendant lights: cut Japanese adapter after shade is checked (see Remove Japanese Adapter SOP).',
          'Care instruction: feather dust only.',
        ],
      },
      {
        type: 'warning',
        text: 'We are not liable for tears or damages after the sale. The customer must inspect the shade in-store before leaving.',
      },
    ],
  },
  {
    id: 'remove-japanese-adapter',
    category: 'Products',
    title: 'Remove Japanese Adapter',
    description: 'How to remove the Japanese plug adapter from pendant lights.',
    summary:
      'After showing customer the light shades, cut the Japanese adapter in front of them. Explain it is unnecessary in Singapore and is removed to avoid confusion for contractors. Tape securely first, cut cleanly with fabric scissors near the adapter, check cable ends are neat. Discard the removed adapter.',
    content: [
      {
        type: 'steps',
        items: [
          'After customer has checked and approved the light shades, explain why the adapter is being removed.',
          'Tape the adapter securely using the same method as cutting custom fabric cables.',
          'Cut firmly and cleanly with fabric scissors, cutting close to the adapter.',
          'Check that cable ends are neat and match the standard finish in the reference image.',
          'Discard the removed Japanese adapter.',
        ],
      },
      {
        type: 'info',
        text: 'Tell customers: "The Japanese adapter is not compatible with Singapore sockets, so we remove it to avoid confusion — some contractors are hesitant to cut it themselves."',
      },
    ],
  },
  {
    id: 'pendant-light-installation',
    category: 'Products',
    title: 'Pendant Light Installation',
    description: 'Paid installation service for pendant and ceiling lights.',
    summary:
      'Installation service costs $100. Only for in-store or Instagram DM purchases (not online store). Requires ceiling below 3M and existing lighting point. For 3.1–3.5M ceilings: $130. Complimentary wire replacement is included only if installation + light purchased together — otherwise $18 on-site fee. Customer does not take item home; hand to Jason for wire replacement, installation team brings it on setup day.',
    content: [
      {
        type: 'table',
        headers: ['Scenario', 'Price'],
        rows: [
          ['Standard installation (ceiling below 3M)', '$100'],
          ['Installation (ceiling 3.1–3.5M)', '$130'],
          ['Wire replacement (light + install bought together)', 'Complimentary'],
          ['Wire replacement (separate purchase)', '$18 (pay installer on-site)'],
        ],
      },
      {
        type: 'steps',
        items: [
          'Confirm eligibility: in-store or IG DM purchase only (not online store orders).',
          'Confirm ceiling is below 3.5M and existing lighting point is available.',
          'After sale: ask customer for preferred installation date and time.',
          'Let customer know you will liaise via email once availability with lighting partner is confirmed.',
          'Hand item to Jason for wire replacement before installation. The installation team will bring the light on setup day.',
          'Customer does NOT take the item home if installation service is included.',
        ],
      },
      {
        type: 'warning',
        text: 'Complimentary wire replacement applies ONLY when installation service is purchased together with the light. Not eligible for separate purchases.',
      },
    ],
  },
  {
    id: 'sugy-clock-sale',
    category: 'Products',
    title: 'Sugy Clock Sale',
    description: 'Demonstration and sale steps for Sugy clocks.',
    summary:
      'Sugy clocks have no second hand — movement is confirmed by the gear shifting at the back. Remove battery and plastic film, show customer the clock is working (gear shifts at back), replace plastic film, put battery back. Advise customer to use cheap batteries — not expensive rechargeable ones, which can damage the mechanics.',
    content: [
      {
        type: 'steps',
        items: [
          'Remove battery from clock.',
          'Remove plastic film from clock face (do not throw away).',
          'Explain to customer: there is no second hand. Working is confirmed by the gear shifting at the back.',
          'Show customer the clock is working by pointing to the gear movement at the back.',
          'Replace the plastic film.',
          'Put battery back.',
          'Advise customer to use cheap batteries — not expensive rechargeable batteries, which may ruin the mechanics.',
        ],
      },
      {
        type: 'info',
        text: 'Sugy clocks do not have a second hand. This is a common customer question — the movement is confirmed by watching the gear at the back of the clock.',
      },
    ],
  },
  {
    id: 'incense-sampler',
    category: 'Products',
    title: 'Incense Sampler',
    description: 'Making and selling custom Kungyokudo incense samplers.',
    summary:
      'Incense sampler programme lets customers select specific Kungyokudo scents in 5-stick sampler size. All samplers in BOH shelving. Stick correct scent label on test tube (from the labelled stack), fill with 5 sticks of the same scent. Checkout as "sampler" variant — not the full box.',
    content: [
      {
        type: 'steps',
        items: [
          'Find all sampler materials at BOH shelving.',
          'From the stack of clear labels with scent names, select and stick the correct scent label on the test tube.',
          'Fill the test tube with 5 sticks of the same scent.',
          'If out of labels, print more.',
          'At checkout: select the "sampler" variant in Shopify — NOT the full box variant.',
        ],
      },
      {
        type: 'warning',
        text: 'Always check out as the "sampler" variant, not the full box. Incorrect checkout will affect inventory.',
      },
    ],
  },
  {
    id: 'furniture-sale',
    category: 'Products',
    title: 'Furniture Sale',
    description: 'Process for sold floor furniture — tagging, wrapping, and reporting.',
    summary:
      'After sale: place "OOPS… SOLD" reserved tag on the item. Small-mid items stay until end of shift or weekend. After hours or no customers: remove, clean, wrap securely in cling wrap (no holes), write details on reservation label, place in back of house. Take picture and notify staff chat in end-of-day report. Big items (sofas, cabinets, tables) stay displayed with tag — Darren schedules warehouse wrapping.',
    content: [
      {
        type: 'steps',
        items: [
          'After sale: place "OOPS… SOLD" reserved plastic tag on the item.',
          'Inform customer the item stays displayed until end of shift or weekend (next major VM shift).',
        ],
      },
      {
        type: 'paragraph',
        text: 'SMALL/MID items (chairs, coat racks, stools, standing mirrors) — after hours or when no customers:',
      },
      {
        type: 'steps',
        items: [
          'Remove sold item from floor.',
          'Clean item and wrap securely in cling wrap (no holes).',
          'Write details on reservation label, tape to cling wrap at a visible spot.',
          'Place in back of house (Darren moves to warehouse).',
          'Photograph and notify staff chat in end-of-day sales report. Bryan follows up with action plan.',
        ],
      },
      {
        type: 'paragraph',
        text: 'BIG items (sofas, cabinets, daybeds, desks, dining tables):',
      },
      {
        type: 'steps',
        items: [
          'Place "OOPS… SOLD" tag and inform customer.',
          'Take picture and notify staff chat. Darren schedules wrapping and warehouse packing.',
        ],
      },
      {
        type: 'warning',
        text: 'Fragile items must be properly wrapped with no dangling parts. Check furniture stoppers — replace if worn out. Lights with electrical points come with complimentary converter plugs; always light test before sale.',
      },
    ],
  },
  {
    id: 'moving-units',
    category: 'Products',
    title: 'Moving Units (Aa MOD)',
    description: 'Selling the Aa modular shelving system.',
    summary:
      'Moving Units mixes preowned USM Haller parts (Japan) with new Konektra-compatible panels. Always call it "Moving Units" — never "USM". Lead time: 2–3 months if parts not in stock. Payment: 70% non-refundable deposit; 30% before delivery (credit card = 100% upfront). Fill Google form with customer. Show physical colour swatches under warm and natural lighting.',
    content: [
      {
        type: 'steps',
        items: [
          'Understand customer requirements: existing designs or custom to specs?',
          'Determine if they are familiar with modular systems and our service.',
          'Fill in the Google form (with them, for them, or let them do it independently).',
          'Show physical colour swatches — view/feel under both warm and natural lighting.',
          'Ask customer to select top 3 colour choices (determines which colourway is fulfilled first).',
          'Colour availability is only confirmed via email quotation.',
          'Response time: 1 hour to 1 week depending on complexity.',
          'Payment: 70% non-refundable deposit on confirmation; 30% before delivery. Credit card = 100% upfront.',
        ],
      },
      {
        type: 'warning',
        text: 'Always refer to this as "Moving Units" — never "USM". Colour availability can only be confirmed by email quotation, not in-store.',
      },
      {
        type: 'info',
        text: 'Some colours/finishes are unavailable from USM Haller (e.g. Rust). Many designs cannot be configured at USM Haller. Lead time: 2–3 months if parts are not in stock.',
      },
    ],
  },

  // ─── LOGISTICS ─────────────────────────────────────────────────────────────
  {
    id: 'shipping-fees',
    category: 'Logistics',
    title: 'Shipping Fees',
    description: 'Domestic delivery fee tiers by item type and complexity.',
    summary:
      'Objects (small items): flat $7. Furniture (single or fits 1 DHL size 8): $50. Furniture with complexities (2–4 pieces): $85. Multiple large items (5–8 pieces): $135. Multiple extra-large items with possible assembly (5–8 pieces): $155. All MOD systems: $50–$155 based on size. Stair climbing: $10–$20 per flight, charged after job completion.',
    content: [
      {
        type: 'table',
        headers: ['Service', 'Fee', 'Notes'],
        rows: [
          ['Domestic Object (flat rate)', '$7', 'Small objects: incense, vase, incense holder'],
          ['Domestic Furniture (flat rate)', '$50', 'Fits 1x DHL size 8; multiple items OK if in single trip'],
          ['Domestic Furniture + Complexities', '$85', '2–4 pieces (e.g. 4 dining chairs, 2 lounge chairs, 1 desk)'],
          ['Domestic Furniture (Multiple Large)', '$135', '5–8 pieces (e.g. dining table + 4 chairs + 2 lights + 4 vases)'],
          ['Domestic Furniture (Multiple XL)', '$155', '5–8 pieces with possible assembly'],
          ['All MOD Systems', '$50–$155', 'Price based on size; complexities require add-on'],
          ['Stair Climbing', '$10–$20 per flight', 'Charged after job completion; courier does not negotiate; invoice forwarded from Aa'],
        ],
      },
      {
        type: 'warning',
        text: 'Stair climbing surcharges are charged after the delivery job is complete. The courier does not negotiate — Aa forwards the invoice to the customer.',
      },
    ],
  },
  {
    id: 'storage-fees',
    category: 'Logistics',
    title: 'Storage Fees',
    description: 'Storage pricing by duration and pricing type.',
    summary:
      'Regular priced items: 1–3 months free, 4–6 months $50/month, 7+ months $100/month, max 1 year. Reduced pricing items: no free storage, must clear within a week, 1–6 months $50/month, 7+ months $100/month. MOD only: 6 months free, then $100/month. No storage for plants. After 1 year, item goes back on sales floor; refund only when sold (excludes storage fees, delivery, and CC charges).',
    content: [
      {
        type: 'table',
        headers: ['Item Type', 'Duration', 'Fee'],
        rows: [
          ['Regular priced', '1–3 months', 'Complimentary'],
          ['Regular priced', '4–6 months', '$50/month'],
          ['Regular priced', '7+ months', '$100/month'],
          ['Reduced pricing', 'Must clear within 1 week', 'No complimentary storage'],
          ['Reduced pricing', '1–6 months', '$50/month'],
          ['Reduced pricing', '7+ months', '$100/month'],
          ['MOD only', 'Up to 6 months', 'Complimentary'],
          ['MOD only', 'Beyond 6 months', '$100/month'],
        ],
      },
      {
        type: 'warning',
        text: 'No storage for plants. Maximum storage period is 1 year. After 1 year, items are returned to the sales floor and refund is given only when the item sells (excludes all fees).',
      },
      {
        type: 'info',
        text: 'Reduced pricing storage applies only to discounted sale items. Not applicable to Partner (P5) or Industry (IND) discounts.',
      },
    ],
  },
  {
    id: 'online-packing',
    category: 'Logistics',
    title: 'Online Store Packing',
    description: 'Packing process for delivery and self-collection orders.',
    summary:
      'For delivery: remove price tags, wipe/polish items, do a 360° image of lights (checking for holes), provide bulbs and converter plug, light test, bubble wrap + cling wrap + DHL sleeve, slot Aa greeting card, print and tape delivery order to exterior, place outside for collection, send image to staff chat. For self-collection: same prep, but do NOT wrap washi lights — wait for customer to inspect in person.',
    content: [
      {
        type: 'steps',
        items: [
          'DELIVERY: Remove price tags from small vintage goods.',
          'Bigger pieces: wipe down, apply metal polisher if needed.',
          'Lights: take 360° images (check for holes before packing).',
          'Lights: provide complimentary bulbs and converter plug (overseas: exclude converter plug).',
          'Light test: use provided bulbs and plug.',
          'Pack: bubble wrap + cling wrap, slot into DHL sleeves/boxes. If it doesn\'t fit, ensure securely wrapped.',
          'Slot 1 Aa greeting card.',
          'Print delivery order (DO) and tape securely to the exterior.',
          'Place outside for collection. Send image to staff chat.',
        ],
      },
      {
        type: 'steps',
        items: [
          'SELF-COLLECTION: Same prep as delivery (remove price tags, wipe/polish).',
          'Do NOT wrap washi lights ahead of time — wait for customer to arrive and do in-person shade check + light test (as per Washi Light Sale SOP).',
          'Other items: bubble wrap + cling wrap. Write customer name and order number on tape, stick to cling wrap.',
          'Place in warehouse. Mark in inventory checklist as reserved.',
          'Send image to staff chat.',
        ],
      },
    ],
  },
  {
    id: 'warehouse',
    category: 'Logistics',
    title: 'Warehouse Management',
    description: 'Storing and labelling existing stock and reserved items.',
    summary:
      'Two warehouses: Warehouse A (in-store) and Warehouse B (Omnicorp, beside store). All stock must be bubble-wrapped, cling-wrapped (no holes), and labelled with name, SKU, and quantity. Dismantle oversized items; screws go in a labelled ziplock bag taped to the item. Reserved items use the Reserved Items Tag. MOD boxes labelled with panel size and colourway.',
    content: [
      {
        type: 'paragraph',
        text: 'Two warehouses: Warehouse A is in-store. Warehouse B is at Omnicorp, beside the store. Keep both accessible, navigable, and fully accounted for.',
      },
      {
        type: 'steps',
        items: [
          'Existing stock (can\'t fit in store): bubble wrap + cling wrap with no holes. Label with Name, SKU, quantity (if more than 1).',
          'Oversized items (cabinet/table): dismantle before storing. Put screws in a ziplock bag, label clearly, tape bag to item.',
          'Reserved items: wrap as above and use Reserved Items Tag.',
          'MOD: label boxes with correct panel size and colourway. Account for all items in and out. Note on inventory list.',
        ],
      },
      {
        type: 'warning',
        text: 'No holes in cling wrap — this prevents moisture damage. All dismantled items must have labelled screws taped directly to the item.',
      },
    ],
  },
  {
    id: 'price-tags',
    category: 'Logistics',
    title: 'Price Tags',
    description: 'How to place price tags on items in the store.',
    summary:
      'General rule: always hang tags if possible; else use plastic tag. Never stick labels directly onto product surfaces. Hanging tags hang from items. Plastic tags: place lying down if below eye level, standing up if above eye level.',
    content: [
      {
        type: 'paragraph',
        text: 'There are two tag methods in the store. Always default to hanging tags first.',
      },
      {
        type: 'table',
        headers: ['Tag Type', 'Placement Rule'],
        rows: [
          ['Hanging tags', 'Hang from item (preferred method)'],
          ['Plastic tags (below eye level)', 'Place lying down'],
          ['Plastic tags (above eye level)', 'Place standing up'],
        ],
      },
      {
        type: 'warning',
        text: 'Never stick labels directly onto product surfaces — this damages the surface.',
      },
    ],
  },
  {
    id: 'tapes-labels-boxes',
    category: 'Logistics',
    title: 'Tapes, Labels & Boxes',
    description: 'Colour coding system for tape and round labels.',
    summary:
      'Tape colours: yellow = maintenance, blue = warehouse sale items, red = sold/reserved + sealing, white = general non-retail. Round label colours: purple = 10% off, green = 30% off, brown = 50% off, orange = 70% off, white = preorder (mark "PO"), display-only (mark "DP"), or product style (mark A/B/C). Only use tape on cling/bubble wrap, never on product surfaces.',
    content: [
      {
        type: 'table',
        headers: ['Tape Colour', 'Use'],
        rows: [
          ['Yellow', 'Items requiring maintenance'],
          ['Blue', 'Items for sale but stored in warehouse due to space'],
          ['Red', 'Sold items reserved for delivery/pickup; packaging/sealing envelopes'],
          ['White', 'General non-retail use'],
        ],
      },
      {
        type: 'table',
        headers: ['Round Label Colour', 'Meaning'],
        rows: [
          ['Purple', '10% off'],
          ['Green', '30% off'],
          ['Brown', '50% off'],
          ['Orange', '70% off'],
          ['White', 'Preorder (mark "PO") OR product style (mark A/B/C) OR permanently display-only (mark "DP")'],
        ],
      },
      {
        type: 'warning',
        text: 'Only stick tape on cling wrap or bubble wrap. Never directly on product surfaces. Use black pen only on white round labels.',
      },
    ],
  },
  {
    id: 'niimbot',
    category: 'Logistics',
    title: 'Using the Niimbot',
    description: 'Operating the Niimbot label printer for product packaging labels.',
    summary:
      'Niimbot is under pantry table beside window. Available in clear and opaque white labels in various sizes. Open Niimbot app on store iPad, connect printer, create new label artwork (delete existing elements). Save label in Collections folder. Test print before printing multiples. Adjust print density for darkness.',
    content: [
      {
        type: 'steps',
        items: [
          'Locate Niimbot label printer under pantry table beside window.',
          'Choose label size and finish (clear or opaque white) for the product.',
          'Fit label in printer with sticker side facing down. Tighten both sides to secure.',
          'Open Niimbot app on store iPad. Connect label printer.',
          'Create new label artwork. Delete existing elements. Rotate artboard if portrait orientation is needed.',
          'Find and use saved labels from the Collections folder.',
          'Test print first if printing more than one. Adjust print density to control darkness.',
        ],
      },
    ],
  },
  {
    id: 'how-to-measure',
    category: 'Logistics',
    title: 'How to Measure Products',
    description: 'Measurement format and rules for new product listings.',
    summary:
      'All measurements in cm. Format: L × D × H cm. For chairs: add SH (seat height). Always round to nearest whole number (0.5 stays). Standard abbreviations: L=Length, D=Depth, H=Height, SH=Seat Height, Ø=Circumference. For extendable items, show min–max. For openable/closable, show both states.',
    content: [
      {
        type: 'table',
        headers: ['Item Type', 'Format'],
        rows: [
          ['Furniture (table/cabinet)', 'L00 × D00 × H00 cm'],
          ['Chair', 'L00 × D00 × H00 × SH00 cm'],
          ['Circular item', 'Ø00 × H00 cm'],
          ['Circular with opening', 'Ø00 × H00 cm / Mouth Ø00 cm'],
          ['Extendable', 'L00 × D00 × H00(min)~00(max) cm'],
          ['Openable/closable', 'Opened: L×D×H cm / Closed: L×D×H cm'],
        ],
      },
      {
        type: 'info',
        text: 'Rounding rules: 0.2 → 0, 0.7 → 1, 0.5 stays as 0.5. Seat height (SH) = floor to seat surface. Height (H) = base to top.',
      },
    ],
  },
  {
    id: 'blanks-project',
    category: 'Products',
    title: 'Blanks Project',
    description: 'Selling Ligne Roset Calin sofas sourced to order.',
    summary:
      'Applicable to Ligne Roset Calin only (out of production, sourced regularly). Take customer details or have them submit via webstore Personal Shopper form. Get 1P or 2P preference and ottoman. Show fabric swatches. If pieces available: 100% immediate payment. If sourcing needed: 70% non-refundable deposit, 30% before delivery. Credit card = 100% upfront. Production: 2–3 weeks.',
    content: [
      {
        type: 'table',
        headers: ['Item', 'SKU', 'Price'],
        rows: [
          ['Ligne Roset Calin 1P', 'BLANKS-LRC1', '$2,375'],
          ['Ligne Roset Calin 2P', 'BLANKS-LRC2', '$3,450'],
          ['Ligne Roset Ottoman', 'BLANKS-LRO', '$950'],
          ['Calin 1P + Ottoman', 'BLANKS-LRC1-SET', '$3,175'],
          ['Calin 2P + Ottoman', 'BLANKS-LRC2-SET', '$4,250'],
        ],
      },
      {
        type: 'steps',
        items: [
          'Take down customer details OR have them submit a Personal Shopper request on webstore.',
          'Clarify: 1P or 2P, with or without Ottoman.',
          'Do NOT process payment yet.',
          'Show fabric swatches for discussion and selection.',
          'If available pieces: collect 100% payment once fabric is selected.',
          'If sourcing needed: 70% non-refundable deposit; 30% before delivery. Credit card: 100% upfront.',
          'Estimated production time: 2–3 weeks (after fabric is pre-ordered).',
        ],
      },
    ],
  },
  {
    id: 'reupholstering',
    category: 'Products',
    title: 'Reupholstering & Swatches',
    description: 'Helping customers reupholster furniture in store.',
    summary:
      'Invite customer to sit in bright-lit area. Serve tea if appropriate. Bring out fabric swatch box, explain available materials and price range. Note material codes and take customer particulars. Get back within a week with total cost and timing. All reupholstery is final once fabric is confirmed — no changes after supplier indents.',
    content: [
      {
        type: 'steps',
        items: [
          'Invite customer to sit in bright-lit area.',
          'Serve tea if it feels appropriate.',
          'Bring out the fabric swatch box. Walk through available fabrics and price range.',
          'After selection: note down material codes, take customer name and email.',
          'Get back to customer within a week with total cost and timing.',
          'Communicate clearly: once fabric is confirmed and indented by supplier, it cannot be changed.',
        ],
      },
      {
        type: 'warning',
        text: 'Reupholstery choices cannot be changed once the fabric has been confirmed and ordered from the supplier. Make sure the customer understands this before finalising.',
      },
    ],
  },
  {
    id: 'plant-care',
    category: 'Products',
    title: 'Plant Care',
    description: 'General care information for plants sold in store.',
    summary:
      'Aa uses refined indoor media: pumice, perlite, orchiata bark, coco chips (general) or akadama, pumice, kanuma (arid). Two light categories: low-light and sun-loving. Fertilise with Osomote every 6 months. Use Diatomaceous Earth (DE) for pests — safe for children and pets. All plants come with a watering guide tag.',
    content: [
      {
        type: 'paragraph',
        text: 'Two categories of plants: (1) Low light — suitable for indoor indirect light. (2) Sun loving — prefer sunlight, indirect bright light.',
      },
      {
        type: 'table',
        headers: ['Topic', 'Details'],
        rows: [
          ['Growing media', 'General: pumice, perlite, orchiata bark, coco chips. Arid: akadama, pumice, kanuma'],
          ['Fertiliser', 'General Osomote added to all plants. Reapply every 6 months for optimal growth'],
          ['Pest control', 'Add DE (Diatomaceous Earth) every few days if ants or bugs appear. Child and pet safe'],
          ['Watering', 'All plants have a watering guide tag. Follow guide. Do not overwater'],
        ],
      },
      {
        type: 'info',
        text: 'For questions beyond the above, refer customers to Darren on staff chat. If Darren doesn\'t reply promptly, take the customer\'s name and follow up by email.',
      },
    ],
  },
];

export const SOP_CATEGORIES: SOPCategory[] = ['Operations', 'Sales', 'Products', 'Logistics'];
