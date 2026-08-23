GANGA SEVA SANGAT TRUST — WEBSITE
=========================================================
This is an update to the existing production website
(gangasevasangat.com). It is built on the asset-complete package
supplied by the Trust (image assets, layout, copy), with the
previously-approved Hero Video and two responsive fixes merged in.

Status: reviewed and tested locally. NOT deployed by this process
(no Cloudflare access from this environment — see DEPLOYMENT below).

---------------------------------------------------------
1. FOLDER STRUCTURE
---------------------------------------------------------
index.html
assets/
  css/style.css
  js/main.js
  img/
    logo.jpg
    hero-kashi.jpg          (hero fallback image + video poster)
    gajanand.jpg            (kept in folder, NOT shown — see below)
    abhishek.jpg, shivam.jpg, vishal.jpg   (trustee photos, shown)
    suprabhat-seva.jpg, sawan-amavasya.jpg, services.jpg,
    jal-tarpan.jpg, guru-purnima-wishes.jpg, annadan.jpg,
    ashadh-amavasya.jpg, guru-purnima-bhandara.jpg,
    independence.jpg, nirjala-ekadashi.jpg   (gallery / story photos)
  video/
    GSS_Hero_Web_1600x900.webm   (served first)
    GSS_Hero_Web_1600x900.mp4    (fallback)

---------------------------------------------------------
2. WHAT WAS MERGED IN FROM THE PREVIOUS BUILD
---------------------------------------------------------
A. Hero Video
   Added inside the existing .hero-media layer, after the existing
   hero-kashi.jpg <img> (which remains as a real, local, working
   fallback + <video poster>). Attributes: autoplay, muted, loop,
   playsinline, webm source first, mp4 fallback. No other hero
   markup, copy, or button changed.

B. Trustee responsive breakpoint
   .trustee-grid previously used a fluid auto-fit,minmax(210px,1fr)
   layout, which does not guarantee a specific column count at any
   given width (it could show 3 columns as early as ~768px). Replaced
   with explicit breakpoints matching the previously approved rule:
     below 768px  -> 1 column
     768px+       -> 2 columns
     1024px+      -> 3 columns
   Verified by measurement, not assumption (see TESTS below).

C. "4-item value strip" mobile fix
   This exact component (grid-cols-2 mobile / md:grid-cols-4 desktop)
   does not exist anywhere in this codebase's design -- it was part
   of the previous, different-architecture build only. Nothing was
   invented or force-added to stand in for it. No equivalent
   unexplained-gap issue was found in this codebase (see section 4).

---------------------------------------------------------
3. GAJANAND PANDEY PHOTOGRAPH -- CONFIRMED
---------------------------------------------------------
UPDATE: The Trust has since confirmed this photograph's identity
directly, by supplying a higher-resolution version of the same
original photo (same person, same pose, same mountain backdrop,
same shawl -- verified as the same photograph, not a different
one, before this update was made).

assets/img/gajanand.jpg has been replaced with a cleaner, higher-
resolution crop (640x640, sourced from the confirmed original) and
is now shown normally on the trustee card, matching the treatment
used for the other three trustees. The monogram placeholder and
"photo confirmation pending" note have been removed.

The other three trustee photographs (Abhishek Jaiswal, Shivam
Chaurasiya, Vishal Jaiswal) were never in question and are shown
as real photographs, unchanged.

Akash Sharma does not appear anywhere as a current trustee.
Vice President card remains "Vice President -- Vacant" (पद रिक्त),
unchanged.

---------------------------------------------------------
4. VISUAL / SPACING REVIEW (rule 9/10)
---------------------------------------------------------
Measured (not eyeballed) the gap between every top-level section
at 360/390/480/640/768/1024/1280/1440px. Result: 0px unexplained
gap between any two sections at any of the 8 widths tested. No
image was force-placed anywhere, because no genuine empty-space
problem was found. The existing gallery/story-card sections
already use the real supplied photographs extensively and
appropriately (varied documentary sizing, object-fit contain for
posters so no text is cropped, object-fit cover for real seva
photos).

---------------------------------------------------------
5. TESTS PERFORMED (real headless-browser tests, not assumed)
---------------------------------------------------------
Widths tested: 360, 390, 768, 1024, 1440px (plus 480/640/1280 for
the spacing-only pass above).

At every one of the 5 primary widths, verified:
  - No horizontal overflow (scrollWidth == clientWidth)
  - Hero video: found, playing (currentTime advancing), muted,
    loop, autoplay, playsinline all true, 2x source present
  - Trustee column count: 1 / 2 / 3 exactly at the required widths
  - Gajanand card: monogram shown, no img present (photo withheld)
  - Logo (header + hero mark): loads, visible
  - Trustee photos (Abhishek/Shivam/Vishal): load, visible, not
    stretched (object-fit:cover on a fixed circular frame)
  - Gallery photos: load, visible
  - Zero image stretch/distortion detected (object-fit rules
    checked programmatically against natural vs. displayed ratio)
  - Zero internal (local-asset) 404s
  - Zero JS console errors other than the two expected
    sandbox-only external blocks (Google Fonts CSS, Google Maps
    embed) -- both are external network calls, not part of this
    package, and not reachable from this particular local test
    environment; they are not evidence of a real production issue.

---------------------------------------------------------
6. V4 REFINEMENT PASS (19 August 2026)
---------------------------------------------------------
Full change list, real-browser QA data, asset inventory, and open
items are in GSS-WEB-QA-001-v1.0.md (delivered alongside this ZIP,
not inside it). Summary of what changed in this pass:

  - Removed duplicate mobile number; single number sitewide.
  - Email standardised to info@gangasevasangat.com sitewide.
  - Instagram made a real working link (header, footer, latest-seva).
    Facebook intentionally NOT added -- no official URL supplied.
  - Gajanand's photo: changed from tight circular crop to a
    rounded-square frame with object-fit:contain, so the existing
    asset is no longer clipped by a circular mask. (The source file
    itself is still a pre-cropped 640x640 square, not a true
    uncropped original -- flagged as an open item.)
  - Service journey (7 stages) now shows a real representative
    photo per stage.
  - Gallery rebuilt: 5 real-photo albums (Annadan/Prasad, Ganga/
    Ghat, Jal, Pitra, Community Seva -- 18 real photos total) in a
    folder/lightbox UI, kept fully separate from the poster
    documentation section.
  - New accessible lightbox: keyboard (Esc/Arrow keys), swipe,
    counter, caption, focus management. Two real bugs were found by
    actual headless-browser testing (not assumed) and fixed:
    (1) [hidden] attribute was being overridden by a same-
    specificity display:grid rule; (2) lightbox nav buttons were
    behind the image due to DOM-order stacking with no z-index.
  - Verified with real Playwright headless-browser tests at 360,
    390, 412, 768, 1024, 1440px: 0px horizontal overflow at every
    width, zero broken internal images/links, all interactive
    features (albums, lightbox, mobile menu, contact form) clicked
    and confirmed working, not just code-reviewed.

---------------------------------------------------------
7. DEPLOYMENT
---------------------------------------------------------
This environment has no Cloudflare Workers/Pages API access, so
deployment was NOT performed here. To publish as a new version of
the EXISTING Worker (ganga-seva-sangat-trust), without creating a
new Worker, Pages project, or touching the gangasevasangat.com
domain attachment:

  wrangler deploy
    (run from within the existing Worker project directory, with
    this package's index.html and assets/ replacing the current
    ones -- do not run wrangler init or create a new project)

or, via the Cloudflare dashboard: open the existing
"ganga-seva-sangat-trust" Worker/Pages project -> upload a new
deployment/version from this folder -> promote to production.
The custom domain gangasevasangat.com stays attached to the
existing project throughout; nothing about the domain needs to
be touched.
