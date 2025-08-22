# Product Requirements Document (PRD): CJ Clarke for City Council Website

## 1. Purpose & Scope

The website is the public hub for Chris “CJ” Clarke’s Sheridan (CO) City Council campaign. It must clearly communicate the candidate’s message, convert visitors into donors/volunteers, support English & Spanish audiences, and be fast, accessible, and easy for non‑technical staff to update.

## 2. Users & Goals

-   **Voters (primary):** Understand who CJ is, what he stands for, how to vote.
    
-   **Supporters (primary):** Donate, volunteer, request yard signs, attend events.
    
-   **Media/Community leaders (secondary):** Pull bio, headshots, quotes, platform, press contact.
    
-   **Campaign staff (internal):** Update content quickly via CMS; publish news/events.
    

## 3. Success Metrics (high-level)

-   Time-to-first-meaningful interaction < 2s on 4G (typical Netlify POP).
    
-   Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.
    
-   Conversion visibility: Donate and Volunteer CTAs above the fold on mobile & desktop.
    
-   CMS-driven content updates without developer involvement.
    
-   A11y: WCAG 2.2 AA (spot-check via Axe/WAVE; keyboard navigation; color contrast).
    
-   Spanish landing discoverability: one-click from header; language tag set correctly.
    

## 4. Functional Requirements

### 4.1 Global

-   **Navigation:** Header with links: Home, Meet Chris, Issues, News, Get Involved, Donate (styled primary), Español (language switch to `/es`). Sticky on mobile optional.
    
-   **Footer:** Copyright, “Paid for by…” disclaimer, basic contact info, social links, secondary CTA(s).
    
-   **Branding:** Clean, modern baseline (neutral background, campaign primary color), swap-in branding later.
    
-   **Responsive:** Mobile-first; no horizontal scroll; tap targets ≥ 44px.
    
-   **SEO:** Proper titles/descriptions; OpenGraph/Twitter tags; JSON‑LD (Person/Organization); sitemap, robots.txt.
    
-   **Analytics:** GA4 or Plausible (toggle via env/config).
    

### 4.2 Home (English) `/`

-   **Hero:** High-impact photo, headline (current: “A Healthier, Safer Sheridan”), subheadline, two CTAs: Donate (primary), Volunteer (secondary).
    
-   **Platform highlights:** 3 concise bullets with icons; deep links to Issues.
    
-   **News/Events teaser (optional v2):** 1–3 latest items.
    
-   **Spanish link:** Persistent in header.
    

**Acceptance Criteria (AC):**

-   AC‑H1: Hero is fully visible above fold on a typical mobile viewport with at least one CTA visible.
    
-   AC‑H2: Donate CTA navigates to Donate page; Volunteer CTA to Get Involved.
    
-   AC‑H3: Three platform bullets rendered from CMS.
    

### 4.3 Spanish Landing `/es`

-   **Content parity (condensed):** Spanish headline, subheadline, Donate/Volunteer CTAs, the same 3 bullets translated.
    
-   **Lang attribute:** `<html lang="es">`.
    

**AC:**

-   AC‑ES1: `/es` renders in Spanish, with Spanish CTAs.
    
-   AC‑ES2: Header includes link back to English.
    
-   AC‑ES3: Screen readers detect `lang="es"`.
    

### 4.4 Meet Chris `/meet`

-   **Bio:** Short narrative (CMS), photo.
    
-   **Tie‑in:** Mentorship, small-business ownership, community health focus.
    

**AC:**

-   AC‑MC1: Body text and hero image editable via CMS.
    
-   AC‑MC2: “Get Involved” inline CTA at end.
    

### 4.5 Issues `/issues` + detail pages `/issues/<slug>`

-   **List page:** Grid of issues (title, summary), ordered by priority.
    
-   **Detail:** Markdown-rendered body with headings and anchor links.
    

**AC:**

-   AC‑IS1: Issues list and detail pages generated from CMS collection.
    
-   AC‑IS2: At least three seed issues present.
    

### 4.6 News `/news` + detail pages `/news/<slug>`

-   **List:** Chronological; title + date + excerpt.
    
-   **Detail:** Markdown body; optional hero image.
    

**AC:**

-   AC‑NW1: News collection list renders newest first.
    
-   AC‑NW2: Sharing meta present on detail pages.
    

### 4.7 Get Involved `/get-involved`

-   **Form (Netlify Forms):** name, email, phone, “How can you help?” textarea; honeypot field.
    
-   **Thank-you state:** Inline acknowledgement or redirect.
    

**AC:**

-   AC‑GI1: Submissions appear in Netlify Forms dashboard.
    
-   AC‑GI2: Spam honeypot works (hidden field).
    

### 4.8 Donate `/donate` + Success `/donate/success`

-   **Amount input:** Simple numeric ($), presets optional.
    
-   **Stripe Checkout:** Netlify function creates session; redirect to Stripe test/live Checkout based on env.
    
-   **Success page:** Confirmation, “Back to Home” & “Share” prompt.
    

**AC:**

-   AC‑DN1: With `STRIPE_SECRET_KEY` (test), clicking continue opens Stripe Checkout (test mode).
    
-   AC‑DN2: Donations of at least $1.00 accepted; client-side validation exists.
    
-   AC‑DN3: Success page is no-cache and accessible via `success_url`.
    

### 4.9 Contact `/contact`

-   **Form (Netlify Forms):** name, email, message; honeypot; confirmation.
    

**AC:**

-   AC‑CT1: Submissions logged in Netlify Forms.
    

### 4.10 CMS (Decap/Netlify CMS)

-   **Collections:** `pages` (home, meet, spanish-landing), `issues`, `news`.
    
-   **Media:** Uploads to `public/uploads`; references work in markdown/frontmatter.
    
-   **Editorial Workflow:** Draft → Review → Publish (optional).
    

**AC:**

-   AC‑CMS1: Non‑technical editor can change hero headline/image & publish.
    
-   AC‑CMS2: Adding a new issue/news file via CMS produces a build that displays content.
    

## 5. Non‑Functional Requirements

-   **Performance:** Static output; minimal JS; compressed images; lazy‑load non-critical assets.
    
-   **Security:** Environment secrets via Netlify; Stripe secret **never** in client code; forms sanitized server-side by Netlify; CSP (optional v2).
    
-   **Accessibility:** WCAG 2.2 AA baseline (contrast, alt text, keyboard, focus styles, ARIA where needed).
    
-   **Privacy/Compliance:** Donation disclaimer text; privacy page stub (v2).
    
-   **Internationalization:** Folder-based routing; ES landing at `/es` with future extensibility.
    

## 6. Tech Stack & Integrations

-   **Astro** (static), **Tailwind CSS**.
    
-   **Netlify** hosting; **Netlify Forms**; **Netlify Identity + Git Gateway** for CMS auth.
    
-   **Decap (Netlify) CMS**.
    
-   **Stripe Checkout** via Netlify function (`/.netlify/functions/create-checkout-session`).
    
-   **Optional**: GA4 or Plausible.
    

## 7. Content Model (CMS)

-   **pages/home.md**: `heroTitle`, `heroSubtitle`, `primaryCta`, `secondaryCta`, `bullets[]`, `heroImage`.
    
-   **pages/meet.md**: `title`, markdown body, `image`.
    
-   **pages/spanish-landing.md**: `heroTitle`, `heroSubtitle`, `ctaLabel`, `bullets[]`.
    
-   **issues/**: `title`, `priority`, `summary`, markdown body.
    
-   **news/**: `title`, `date`, markdown body, `image?`.
    

## 8. Testing Strategy

-   **E2E tests in Python with Playwright** for each major user path:
    
    -   Load each route; check H1 visible; header/footer present.
        
    -   Navigation between EN/ES; lang attribute check.
        
    -   Forms submit to Netlify (mock or check thank-you text).
        
    -   Donate flow: network intercept or environment with test Stripe key; assert redirect to `https://checkout.stripe.com/` in test.
        
    -   CMS smoke (optional): build-time content presence (unit/integration).
        

## 9. Risks & Mitigations

-   **Stripe in local dev:** Use test key; treat function as integration point; in tests, stub network if key missing.
    
-   **CMS auth:** Ensure Identity & Git Gateway set; provide fallback docs for manual commits.
    
-   **i18n growth:** Start with ES landing; expand as content/translation resources allow.
