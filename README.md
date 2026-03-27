# Aa Pocket — Staff Companion App

A mobile-first learning and reference tool for part-time staff at Aa Furniture (Arts & Antiquities, Singapore).

## What it does

Two core use cases:
1. **Pre-shift knowledge refresh** — spaced repetition flashcard sessions that surface the most overdue topics automatically
2. **In-shift quick lookup** — fast access to all 28 SOP topics and the full product catalogue

## Screens

| Screen | Purpose |
|--------|---------|
| Home | Daily dashboard — shows cards due, starts Quick or Full Review sessions |
| Flashcard Review | Active recall with tap-to-reveal and 3-point confidence rating |
| Session Summary | Post-session summary with weak areas and next review timing |
| SOP Topic List | Searchable + filterable list of all 28 SOP topics in 4 categories |
| SOP Topic Detail | Condensed summary card + expandable full SOP with formatted tables, steps, and warnings |
| Product Catalogue | Searchable 2-column grid with Vintage / Evergreen / All filter |
| Product Detail | Full product info with SOP link where applicable |

## Tech stack

- **Expo SDK 55** (React Native)
- **React Navigation** — bottom tab bar + native stack
- **Spaced repetition** — custom SM-2-inspired algorithm stored in AsyncStorage
- **EB Garamond + Inter** via Google Fonts — matching Aa Furniture brand typography
- **MaterialCommunityIcons** via @expo/vector-icons

## Running the app

```bash
npm install
npm start
```

Then open in Expo Go on your phone, or press `i` for iOS simulator / `a` for Android emulator.

## Data

- **SOP data** — all 28 topics from the Aa Operations Manual (Dec 2025), organised into Operations, Sales, Products, and Logistics
- **Flashcards** — 32 cards covering the highest-frequency knowledge: shipping fees, storage fees, payment methods, discounts, gift cards, exchanges, washi lights, clocks, opening/closing
- **Products** — 9 evergreen + 6 vintage placeholder items

## What's not in v1 (deferred to v2)

- Quiz feature
- Knowledge gap analytics
- Moving Units dedicated hub
- Staff notes on vintage items
- Onboarding flow
- Offline mode
