---
name: Event Pulse API & Portal
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad6ff'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#efebff'
  surface-container-high: '#e9e5ff'
  surface-container-highest: '#e3dfff'
  on-surface: '#181445'
  on-surface-variant: '#484554'
  inverse-surface: '#2d2a5b'
  inverse-on-surface: '#f3eeff'
  outline: '#797585'
  outline-variant: '#cac4d6'
  surface-tint: '#6444cd'
  primary: '#330093'
  on-primary: '#ffffff'
  primary-container: '#4a24b2'
  on-primary-container: '#b9a6ff'
  inverse-primary: '#ccbeff'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#2e2d3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#454354'
  on-tertiary-container: '#b3b0c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7deff'
  primary-fixed-dim: '#ccbeff'
  on-primary-fixed: '#1e0060'
  on-primary-fixed-variant: '#4c27b4'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#e4e0f5'
  tertiary-fixed-dim: '#c7c4d8'
  on-tertiary-fixed: '#1b1a29'
  on-tertiary-fixed-variant: '#464555'
  background: '#fcf8ff'
  on-background: '#181445'
  surface-variant: '#e3dfff'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends developer-grade technical precision with consumer-grade clarity. Built for event organizers, attendees, and integrating developers, it projects efficiency, technical capability, and frictionless coordination. 

The aesthetic is Modern Technical Minimalism influenced by contemporary developer documentation and SaaS management consoles. Crisp surfaces, distinct rounded micro-containers (as seen in API badges and method indicators), deep indigo typography, and vibrant warm accents (such as endpoint orange) create a layout that is legible at high density while remaining welcoming during end-user checkout and registration flows. 

Key attributes:
- **Sharp Information Architecture:** Table rows, cards, and data badges have crisp boundaries, subtle tonal fills, and strict vertical alignments.
- **Developer-Friendly Clarity:** Clear HTTP status tags, method pills, and code tokens sit comfortably alongside elegant event cards and registration modals.
- **Focused Feedback:** Interactive states provide immediate, high-contrast feedback using soft indigo fills and deep violet text.

## Colors

The palette directly reflects the technical documentation style in the reference, anchored by deep purple-indigos and accented by high-visibility endpoint orange:

- **Primary (`#4A24B2`):** A concentrated royal indigo used for primary interactive states, key buttons, table headers, and HTTP method designations (`GET`, `POST`).
- **Secondary (`#EA580C`):** A bright, technical burnt orange/amber used for API endpoints (`/api/events`), active notification badges, and critical action highlights.
- **Tertiary (`#EDE9FE`):** A soft lavender container tint used as foundational cell fills, badge backgrounds, pill backdrops, and active tab highlights.
- **Neutral (`#1E1B4B`):** Deep midnight navy utilized for high-legibility body copy, modal headings, and strict borders, paired with pure white (`#FFFFFF`) surfaces and ultra-light canvas tinting (`#F8F7FC`).

Status colors inherit the clean tech aesthetic:
- **Success:** `#059669` (soft green fill: `#ECFDF5`)
- **Warning / Redirect:** `#D97706` (soft amber fill: `#FFFBEB`)
- **Error / Conflict (409):** `#DC2626` (soft rose fill: `#FEF2F2`)

## Typography

The typographic hierarchy separates structural layout, reading flow, and technical data:

- **Headlines (`Plus Jakarta Sans`):** Provides approachable, modern geometry with tight letter spacing for page titles, modal heads, and event names.
- **Body (`Inter`):** Delivers clean readability across dense tabular data, registration instructions, and event descriptions.
- **Technical & Labels (`JetBrains Mono`):** Applied to API endpoints, payload keys, HTTP status codes, and timestamps, reinforcing developer alignment and visual clarity.

Headlines larger than 32px automatically step down on mobile breakpoints (`display-lg-mobile`) to prevent awkward line breaks in narrow modal views and data tables.

## Layout & Spacing

This design system uses a 12-column fluid grid system with controlled maximum container widths for portals and dashboards (`1280px` max container width; `640px` for focused registration modal dialogues).

- **Vertical Rhythm:** Built on a baseline 4px/8px incremental grid. Standard intra-component paddings use `space-sm` (8px) and `space-md` (16px), ensuring data density without visual clutter.
- **Card and Table Padding:** Table rows feature `0.75rem` vertical cell padding and `1rem` horizontal padding to maintain the compact, clean presentation established in the reference style.
- **Breakpoints & Reflow:**
  - **Mobile (<768px):** Single-column layout. Tab views transform into scrollable horizontal segments or dropdown selectors. Tables reflow into stacked cards with clear property-value badges.
  - **Tablet (768px - 1024px):** 8-column layout. Split view for event list alongside basic detail panes.
  - **Desktop (>1024px):** 12-column layout. Simultaneous display of navigation sidebar, multi-tab data explorer, and active registration side-sheets or modals.

## Elevation & Depth

Visual hierarchy relies primarily on **tonal contrast** and **subtle ambient shadows**, avoiding heavy drops or dark borders:

- **Level 0 (Canvas):** Soft off-white base surface (`#F8F7FC`).
- **Level 1 (Cards, Table Containers, Form Panels):** Pure white (`#FFFFFF`) with a delicate ghost border (`1px solid #E2E0EE`) and an ambient tinted shadow (`0 2px 8px -2px rgba(30, 27, 75, 0.04)`).
- **Level 2 (Active Rows & Tonal Badges):** Tinted lavender background containers (`#EDE9FE`) without shadows, creating immediate group association (as shown in the reference table header and method cells).
- **Level 3 (Dropdowns & Floating Overlays):** `#FFFFFF` surfaces with dual-layer diffusion: `0 8px 24px -4px rgba(74, 36, 178, 0.08)`, `0 2px 6px -1px rgba(30, 27, 75, 0.04)`.
- **Level 4 (Registration Modals):** Centered elevated card over a translucent backdrop blur (`backdrop-filter: blur(4px); background: rgba(30, 27, 75, 0.4)`), bounded by `0 20px 40px -12px rgba(74, 36, 178, 0.16)`.

## Shapes

The design system employs a refined `Rounded` geometry (`0.5rem` / `8px` baseline):

- **Badges, Method Tags, & Endpoints:** `0.375rem` (6px) to `0.5rem` (8px) radius, mirroring the subtle corner curve of the reference cells.
- **Buttons & Form Inputs:** `0.5rem` (8px) for balanced, modern ergonomics.
- **Cards, Table Shells, & Modals:** `0.75rem` (12px) to `1rem` (16px) with clean inner clipping for child table headers and footers.
- **Pills & Status Dots:** Fully rounded (`9999px`) reserved specifically for live status tags (e.g., `Active`, `Sold Out`, `201 Created`).

## Components

### Buttons
- **Primary:** Background `#4A24B2`, text `#FFFFFF`, rounded `0.5rem`, font `Inter` 500. Subtle hover lightening to `#5B32CC`. Active: `#3C1B94`.
- **Secondary / Ghost:** Transparent background with `1px solid #DDD6FE`, text `#4A24B2`. Hover: `#EDE9FE`.
- **API Action (Code-Copy / Test):** JetBrains Mono font, light gray border, subtle purple accent hover.

### Chips & Status Tags
- **Method Badges:** Deep violet text (`#4A24B2`), bold uppercase, enclosed in soft lavender containers (`#EDE9FE`), padding `0.25rem 0.625rem`.
- **Endpoint Badges:** JetBrains Mono font, bold text colored `#EA580C`, light amber/neutral tint background.
- **Status Indicators:** 
  - `200/201 Success`: Soft emerald chip (`#D1FAE5`) with dark green text (`#065F46`).
  - `409 Conflict / Error`: Soft rose chip (`#FEE2E2`) with dark crimson text (`#991B1B`).

### Data Tables & API Lists
- **Structure:** Rounded outer container with `1px solid #E2E0EE`.
- **Headers:** Light lavender container fill (`#EDE9FE`) with dark indigo headline text (`Plus Jakarta Sans`, 700).
- **Rows:** Alternating subtle white and off-white rows, separated by hairline borders (`#F1F0F8`). Method and Endpoint cells highlight key data points clearly.

### Input Fields & Selectors
- **Default:** White background, `1px solid #D8D6E8`, rounded `0.5rem`, padding `0.625rem 0.875rem`. Text `Inter` 14px.
- **Focus:** Border color `#4A24B2` with a 3px outer ring tinted to `rgba(74, 36, 178, 0.15)`.
- **Error:** Border color `#DC2626` with red validation message directly below.

### Registration Modal Dialogs
- **Structure:** Max-width `560px`, rounded `1rem`, elevated at Level 4.
- **Header:** Sticky top header with title and event category pill.
- **Content:** Step-based registration forms (Attendee details -> Ticket selection -> API Webhook / Confirmation).
- **Actions:** Full-width or right-aligned primary CTA ("Complete Registration") paired with ghost secondary CTA ("Cancel").

### Tabbed Views
- **Segmented Portal Tabs:** Contained pills sitting within a light background strip (`#F1F0F8`). Active tab receives white fill, subtle shadow, and dark indigo text; inactive tabs use muted slate text (`#64748B`).