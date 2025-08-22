# Project Plan (Markdown with Checkboxes + Instructions to the Coding Model)

> **Audience:** a ChatGPT‑5 coding model running in Cursor with access to the repo and a local runtime.  
> **Rules of Engagement (read first):**
> 
> -   Work **sequentially** through the checkboxes. For **each** item:
>     
>     1.  Implement the code per the referenced PRD section(s).
>         
>     2.  Write an **automated Playwright (Python) test** that verifies the behavior.
>         
>     3.  **Run** the test. If it fails, fix code or test until green.
>         
>     4.  Commit with a clear message referencing the task ID (e.g., `feat(task-3.2): issues list page`).
>         
> -   Keep changes **small and atomic**. One task → one commit (or a couple if necessary).
>     
> -   Prefer **idempotent** ops. Don’t break existing pages when adding new ones.
>     
> -   Maintain **a11y** and **performance** baselines as you go (lint your HTML; keep JS minimal).
>     
> -   If a PRD ambiguity arises, choose the simplest solution and note it in the commit body.
>     

## 0. Environment Setup

-   **0.1** Ensure Node 18+, Python 3.10+, git, and Playwright installed.  
    _Run:_
    
    bash
    
    CopyEdit
    
    `npm ci || npm install
    python -m venv .venv && source .venv/bin/activate
    pip install pytest pytest-playwright
    python -m playwright install` 
    
-   **0.2** Create `tests/e2e/` structure; add `conftest.py` to launch server (Astro preview) before tests.
    
    -   **Test infra acceptance:** `pytest -q` runs and fails only due to missing tests.
        

> **Instruction to model:** For all tests, use **pytest + Playwright (Python)**. Use `async` fixtures if needed; otherwise, sync API is fine. Start the dev server on a known port (e.g., 4321) or run `astro preview` build in a pre-test step. Prefer `page.goto("http://localhost:4321/")` style navigation. Use robust selectors (role/name where possible).

## 1. Global Structure & Baselines (PRD §4.1, §5, §6)

-   **1.1** Verify project boots: `npm run dev` and `npm run build`. Fix baseline issues (if any).
    
-   **1.2** Implement/verify **header & footer** across pages; nav links present; Donate styled primary; Español link present.
    
    -   **Test:** `test_global_nav.py`
        
        -   Assert header links visible (text match), Donate button role=button, Español link exists.
            
        -   Assert footer shows disclaimer placeholder and year.
            
-   **1.3** SEO meta: set default `<title>`, `<meta name="description">`, OpenGraph tags; add `robots.txt`, `sitemap.xml` (plugin or simple generator).
    
    -   **Test:** `test_seo.py`
        
        -   Fetch HTML; assert `<title>` contains candidate name; OG tags present.
            

## 2. Home Page (EN) (PRD §4.2)

-   **2.1** Implement hero with CMS fields (headline, subheadline, hero image, CTAs).
    
    -   **Test:** `test_home_hero.py`
        
        -   Assert H1 visible above fold; Donate/Volunteer buttons present; hero image rendered with non-empty `alt`.
            
-   **2.2** Implement 3 platform bullets from CMS; each links to `/issues` anchor or index.
    
    -   **Test:** `test_home_bullets.py`
        
        -   Assert 3 bullets render; anchor links navigate to Issues page.
            

## 3. Spanish Landing (PRD §4.3, §8 i18n)

-   **3.1** Create `/es` page with Spanish hero + 3 translated bullets; `lang="es"`.
    
    -   **Test:** `test_es_landing.py`
        
        -   Assert URL `/es` sets `<html lang="es">`; Spanish text present; CTAs in Spanish; link back to `/`.
            

## 4. Meet Chris (PRD §4.4)

-   **4.1** Build `/meet` page consuming CMS markdown; add photo field; inline CTA at end.
    
    -   **Test:** `test_meet.py`
        
        -   Assert heading equals CMS title; presence of image; presence of “Get Involved” link.
            

## 5. Issues (PRD §4.5, §7)

-   **5.1** Implement `/issues` list page from collection; sort by `priority`.
    
    -   **Test:** `test_issues_list.py`
        
        -   Seed 3 issues; assert order by priority; titles visible; cards link to detail pages.
            
-   **5.2** Implement dynamic `/issues/<slug>` detail page rendering markdown; anchor navigation if multiple headings.
    
    -   **Test:** `test_issue_detail.py`
        
        -   Assert markdown headings render; deep link navigation works (`#section`).
            

## 6. News (PRD §4.6)

-   **6.1** Implement `/news` list page ordered by `date` desc.
    
    -   **Test:** `test_news_list.py`
        
        -   Seed 2 posts with different dates; assert newest first.
            
-   **6.2** Implement dynamic `/news/<slug>` detail; OG meta from frontmatter.
    
    -   **Test:** `test_news_detail.py`
        
        -   Assert title/date visible; `<meta property="og:title">` matches.
            

## 7. Get Involved (PRD §4.7)

-   **7.1** Implement Netlify Form with honeypot; success acknowledgement inline (no navigation).
    
    -   **Test:** `test_get_involved_form.py`
        
        -   Fill form and submit; intercept request (stub) and assert success message shown.
            
        -   Confirm honeypot hidden & empty (DOM visibility false).
            

> **Instruction to model:** In local tests, **do not** send real Netlify submissions. Mock `fetch`/XHR or simulate `data-netlify` POST to a local stub server. Validate DOM state changes instead of remote dashboards.

## 8. Donate (PRD §4.8)

-   **8.1** Implement amount validation (min $1.00); call Netlify function; redirect to Stripe Checkout URL on success.
    
    -   **Test:** `test_donate_flow.py`
        
        -   Without `STRIPE_SECRET_KEY`, intercept network and mock function response `{url: "https://checkout.stripe.com/test-session"}`; assert redirect is attempted.
            
        -   With key present in env (if provided), allow real function call in **test** mode only and assert `status 200` JSON.
            
-   **8.2** Success page `/donate/success` with no-store header (edge function or response header config).
    
    -   **Test:** `test_donate_success.py`
        
        -   Assert thank-you message; check `Cache-Control` header contains `no-store` (fetch via Python `requests` or Playwright `APIRequestContext`).
            

## 9. Contact (PRD §4.9)

-   **9.1** Implement Netlify Form with honeypot and inline confirmation.
    
    -   **Test:** `test_contact_form.py`
        
        -   Same approach as §7 tests; validate DOM after submit.
            

## 10. CMS Integration (PRD §4.10, §7)

-   **10.1** Confirm Decap CMS config for `pages/home`, `pages/meet`, `pages/spanish-landing`, `issues`, `news`.
    
    -   **Test:** `test_cms_content_presence.py`
        
        -   As build-time test: ensure expected markdown files exist and that `astro:content` loads them without schema errors (run a small Node script or integration test).
            
-   **10.2** Add image upload field wiring; ensure CMS image paths resolve to `public/uploads/...`.
    
    -   **Test:** `test_media_paths.py`
        
        -   Place a fixture image; reference it in home/meet; assert `<img>` `src` resolves and loads (200 OK via Playwright request).
            

## 11. Accessibility & Performance (PRD §5)

-   **11.1** A11y smoke test: ensure each page has unique `<h1>`, alt text on images, focus ring on tab, sufficient contrast (baseline).
    
    -   **Test:** `test_a11y_smoke.py`
        
        -   Use Playwright to tab through menu; assert `:focus-visible` outline appears; check each route has `<h1>`.
            
-   **11.2** Performance sanity: home page requests under a threshold; images lazy-load (if used).
    
    -   **Test:** `test_perf_sanity.py`
        
        -   Intercept network; ensure number of requests/assets reasonable (< ~20 on first load, excluding fonts/analytics placeholders).
            

## 12. SEO/Analytics (PRD §4.1 SEO, §6)

-   **12.1** JSON‑LD Person/Organization on home; meta tags for OG/Twitter.
    
    -   **Test:** `test_jsonld.py`
        
        -   Extract `<script type="application/ld+json">` and validate keys (name, sameAs if configured).
            
-   **12.2** GA4 or Plausible toggle via env/build flag; default off in dev.
    
    -   **Test:** `test_analytics_flag.py`
        
        -   With env set, assert script tag present; otherwise absent.
            

## 13. Polish & Content Pass

-   **13.1** Replace placeholder images with Unsplash temp images sized for hero & modules (document TODOs to swap with real photos).
    
    -   **Test:** `test_images_render.py`
        
        -   Assert hero image naturalWidth > 0 and not a broken icon.
            
-   **13.2** Copy pass: trim sentences, ensure bullets concise; check Spanish copy parity for bullets.
    
    -   **Test:** `test_copy_presence.py`
        
        -   Assert bullet count & non-empty text in EN & ES.
            

## 14. Handover & Docs

-   **14.1** Write `README.md`: local dev, build, env vars, Stripe test mode, Netlify setup (Identity + Git Gateway), CMS login, Content model.
    
-   **14.2** Add `CONTRIBUTING.md`: branching, commit messages, testing instructions.
    
    -   **Test:** `test_docs_links.py`
        
        -   Basic presence and a few expected headings.
            

----------

## Testing Conventions (for the Coding Model)

-   Place E2E tests in `tests/e2e/`.
    
-   Use **Playwright for Python** (`pytest-playwright`). Prefer role-based selectors:
    
    -   `page.get_by_role("heading", name="A Healthier, Safer Sheridan")`
        
    -   `page.get_by_role("button", name="Donate")`
        
-   For form tests, **do not** hit external services. Simulate success via:
    
    -   Intercepting network (`route.fulfill` with mock JSON) or
        
    -   Asserting DOM changes (thank-you text) without actual submission.
        
-   For Stripe:
    
    -   If `STRIPE_SECRET_KEY` unavailable, **mock** Netlify function response and assert redirect attempt to a `checkout.stripe.com` URL.
        
    -   If available, run in **test mode** only; never use live keys in tests.
        

## Commit & Branch Strategy (for the Coding Model)

-   Use short branches per task (e.g., `task/2.1-home-hero`), merge to `main` after tests pass.
    
-   Commit message format:
    
    -   `feat(task-5.1): issues list page`
        
    -   `test(task-5.1): e2e for issues list order`
        
    -   `fix(task-5.1): adjust sorting to priority asc`
        

## Rollback Strategy

-   Each task is atomic and reversible; if a task causes regressions, revert the specific commit/branch and re‑apply with fixes.
