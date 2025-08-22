# Product Requirements Document (PRD) – Chris Clark for Council Campaign Website Re-Spin

## 1. Goals & Success Metrics

* **Goals:**

  * Tell Chris’s story in an authentic, compelling way.
  * Drive **donations**, **volunteer sign-ups**, and **newsletter sign-ups**.
  * Present clear **policy priorities** (public safety, youth investment, revitalization, transparency).
  * Differentiate Chris as a **fresh outsider**.
  * Build trust with **strong visuals of Chris, family, and Sheridan community**.
* **Success Metrics:**

  * 25% donation increase post-launch.
  * 200+ volunteer signups pre-Election Day.
  * Bounce rate < 45%.
  * Increased time on site (esp. homepage + Meet Chris).

---

## 2. Target Audience

* Sheridan voters (families, small-business owners, youth advocates).
* Donors (local & beyond).
* Volunteers.
* Spanish-speaking residents.

---

## 3. Site Structure & Content

### Homepage

* **Hero Section:**

  * Headline: “Fresh Leadership. Safer Streets. A Stronger Sheridan.”
  * Subtext: “Chris Clark is a father, grandfather, small-business owner, youth mentor, and community leader — running to bring honest, community-first leadership to Sheridan.”
  * **Visuals:** Full-width photo of Chris with community or at Riverwalk.
  * Buttons: **Donate**, **Volunteer**, **Meet Chris**.

* **Campaign Pillars:** Four clickable cards with icons + blurbs:

  1. Public Safety
  2. Youth & Parks
  3. Revitalization & Riverwalk
  4. Transparency & Accountability

* **Featured Project:** Riverwalk revitalization vision, with background image of the Riverwalk.

* **Testimonials Section:** Carousel with resident quotes.

  * Placeholder for endorsements.

* **Footer:** Navigation, social links, disclaimer.

  * Placeholder for all major social platforms.

---

### Meet Chris

* **Expanded Bio Narrative:**

  * Chris Clark is not a career politician. He’s a **world champion martial artist, business owner, and mentor** who has dedicated his life to building strong communities.
  * Father of six (3 boys, 3 girls). Proud of their achievements:

    * Youngest daughter – Master’s degree, Georgetown University.
    * Middle daughter – Master’s degree, Drexel University.
    * Oldest daughter – Nursing degree, Florida.
    * Oldest son – English teacher in Cairo, Egypt.
    * Second son – Owner of successful HVAC business.
    * Youngest son – Air traffic controller in Denver, Colorado.
  * Grandfather of 13 (number 13 “is in the oven”).
  * Dedicated to **leaving Sheridan better for his family and all families**.

* **Visuals:**

  * Portrait headshot.
  * Chris teaching youth in martial arts.
  * Chris with family (grandchildren).
  * Chris with small-business peers.

* **Quote Block:**

  > “I’m not running for a title. I’m running to make Sheridan safer, stronger, and ready for the future.” – Chris Clark

---

### Issues

* **Overview Page:** Grid of 4 issue cards.

  * Public Safety & Safe Streets
  * Youth & Parks
  * Revitalization & Riverwalk
  * Transparency & Budgeting

* **Detail Pages:** Each issue has:

  * Narrative
  * "Chris’s Plan" bullet points
  * **Visuals:** relevant imagery (streets, parks, Riverwalk, symbolic graphics).

---

### Get Involved

* **Volunteer Form:** With interest checkboxes.
* **Events Section:** Placeholder for upcoming events.
* **Social Media Links:** Dedicated section for future accounts.
* **Visuals:** Group volunteer photo.

---

### News/Updates

* Blog-style posts.
* Visual: Thumbnails per post.
* Creative: Campaign timeline graphic.

---

### Donate

* Stripe integration.
* Progress thermometer graphic.
* Banner photo: Chris with supporters.

---

### Contact

* Netlify form + office info.
* Map embed of Sheridan.

---

### Spanish-Language Pages

* Homepage, Meet Chris, Issues, Contact in Spanish.
* Toggle: “English / Español”.

---

## 4. Visual & Branding

* **Color Palette:** Purple + golden-yellow + gray neutrals.
* **Typography:** Bold sans-serif headlines, clean body text.
* **Photography Style:** Natural, candid, community-first.
* **Graphics:** Icons for issues, donation thermometer, event timeline, testimonial carousel.

---

## 5. Technical Requirements

* Framework: Astro + Tailwind.
* CMS: Netlify CMS for issues & news.
* Forms: Netlify + Stripe.
* Accessibility: WCAG AA.
* Performance: Lighthouse ≥ 90.

---

## 6. Creative Enhancements

* Interactive Sheridan map with campaign highlights.
* Optional hero video (Chris on Riverwalk, community shots).
* Scroll animations (Framer Motion).

---

## 7. Updated Open Questions

1. Which **photos** Chris prefers in each category (community, family, professional, youth mentorship).
2. List of endorsements to feature on site.
3. Specific Riverwalk vision details when available.
4. Confirm social platforms (FB, IG, X, TikTok).
5. **Name Branding:** Recommend *Chris Clark* as primary (simple, strong, clear for ballots). “CJ” may be used casually in text, but site header and logo should use **Chris Clark for Council** for consistency.

---

## 8. Website Content Draft

**Homepage Hero:**
“Fresh Leadership. Safer Streets. A Stronger Sheridan.”
Chris Clark is a father, grandfather, small-business owner, youth mentor, and community leader — running to bring honest, community-first leadership to Sheridan.

**Meet Chris:**
Chris Clark isn’t a career politician. He’s a world champion martial artist, a successful small-business owner, and a mentor who has spent decades helping young people find their path. As the proud father of six children and grandfather of 13 (with one more on the way — affectionately known as “the one in the oven”), Chris knows what it means to fight for family, opportunity, and the future.

His children’s journeys inspire him: from a daughter with a master’s degree from Georgetown, to another from Drexel, to a daughter who became a nurse in Florida. His sons have built futures as an English teacher abroad in Cairo, a thriving HVAC business owner, and an air traffic controller right here in Denver. Their successes reflect the values Chris believes Sheridan should foster: hard work, opportunity, and family.

Now, Chris is ready to bring that same commitment to Sheridan City Council — working every day to keep our streets safe, support our youth, and revitalize our city for the future.”
