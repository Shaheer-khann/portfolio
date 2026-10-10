# Design Spec — Shaheer Khan Portfolio

> Build every section from `content.md` using this spec. Do not invent copy.
> Direction: **editorial research journal on white**. Bold condensed headlines, one typeface throughout, one electric accent, motion that rewards scrolling.

---

## 1. Color

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F4F4F1` | Cards, paper blocks, image backdrops |
| `--ink` | `#0E0F0C` | Headlines, body text, primary buttons |
| `--ink-soft` | `#5C5D58` | Body/supporting text |
| `--ghost` | `#B9BAB4` | Two-tone headline second color, inactive list items |
| `--line` | `#E4E4DF` | Hairline dividers, card borders |
| `--accent` | `#E6F23D` | Electric lime-yellow: CTA pills, highlights, active states (max 1–2 uses per screen) |
| `--accent-ink` | `#0E0F0C` | Text on accent |
| `--band` | `#0E1A14` | The single dark band section (Areas of Work) |

Rules:
- White page. The only dark area is the Areas of Work band.
- Accent is never used for large backgrounds. Pills, a highlight bar, the active list dash, the cursor pill.
- No gradients, no glow, no glassmorphism except the hero floating cards (subtle white 80% + 1px border, no blur heavier than 8px).

---

## 2. Typography: one family, everywhere

**Archivo** (Google Fonts, variable: weight 100–900, width 62–125). One family keeps the whole site visually consistent; contrast comes from width and weight, not from mixing fonts.

| Role | Archivo setting | Style |
|---|---|---|
| Display | weight 800, width 62 (condensed) | Uppercase, leading 0.9, letter-spacing -0.01em. Hero, section titles, contact CTA |
| Paper titles / quotes | weight 500, width 100 | Sentence case; italic for key insights and thesis |
| Body / UI | weight 400 / 500, width 100 | Body 17px, line-height 1.6 |
| Labels | weight 500, width 100 | Uppercase, 12px, letter-spacing 0.1em. "PAPER 01", keywords, eyebrows |

Load with: `Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900`

Scale (desktop → mobile):
- Hero headline: 120px → 56px
- Section title: 72px → 40px
- Paper title: 44px → 30px
- Key insight: 32px italic → 24px
- Body: 17px → 16px

---

## 3. Layout

- Max width 1280px, 12-column grid, 32px gutters (16px mobile side padding)
- Generous vertical rhythm: 160px between sections desktop, 96px mobile
- Hairline dividers (`--line`) instead of boxes wherever possible
- Rounded corners: 20px for images/cards, full pill for buttons and tags

---

## 4. Sections

### Nav
Minimal, RS-style: name mark "SK®" left; links (Work · About · Contact) right in Archivo 14px; a lime "Get in touch" pill at far right. Becomes sticky with white background and hairline border after 80px scroll. Hides on scroll down, shows on scroll up.

### Hero (matches the career-coach reference, on white)
Full-width, ~92vh. White page; the right half holds the portrait.
- **Nav:** "SK" mark + "Shaheer Khan" left; links centered (Home · Work · About · Contact) with a small underline under the active one; outlined pill "Get in touch" right.
- **Left column (55%):**
  - Outlined pill tag: "AI automation & web development"
  - Headline in **Archivo 800 italic, normal width, sentence case**, 88px → 44px, leading 1.0, tracking -0.02em: "Most AI projects stop at the model. Mine ship with the product."
  - Supporting line (18px, `--ink-soft`, max 520px)
  - Dark pill button "Read the work" with a white circle arrow icon on the right
  - Bottom row: small uppercase label "RECOGNIZED BY" + text wordmarks in `--ghost`: HEC Generative AI Hackathon · Fauji Foundation · NAVTTC (text only, no fake logos)
- **Right column (45%):** large portrait, cut-out, bleeding to the top and bottom edges of the hero, its left edge fading softly into white. A faint `--surface` shape behind the head.
- **One floating card** over the portrait (white 85%, 1px `--line`, 12px radius, light 8px blur): star icon + "3rd place — HEC Generative AI National Hackathon". Gentle float + parallax.
- Below hero: hairline, then the slow keyword marquee (uppercase labels): AGENTIC AI · COMPUTER VISION · FULL-STACK · HUMAN-IN-THE-LOOP · AUTOMATION ·

### Thesis
Large Archivo paragraph (40px, weight 400), centered column. **Scroll-linked word reveal:** words start `--ghost` and turn `--ink` as the user scrolls through.

### Areas of Work (dark band)
Full-bleed `--band` section (ref: "A better way to").
- Left: sticky Display label "I BUILD —".
- Right: list of capability lines in Display style. As you scroll, the item in view turns white with a lime dash; others stay dim.
- Then two columns: AI Automation / Web Development bullets, and the "What ties them together" line in italic.

### Selected Papers
Section title "SELECTED PAPERS" + label count "04".
- **Sticky stacking cards:** each paper is a large `--surface` card that sticks near the top, and the next card slides over it (ref: blue numbered cards).
- Card layout: left = label "PAPER 01" pill, keywords, Archivo title, abstract (2–3 lines), "Read paper →" pill. Right = project screenshot (20px radius).
- Clicking opens `/papers/[slug]`.

### Paper page (`/papers/[slug]`)
Laid out like a journal article:
- Label "PAPER 01" + keywords
- Archivo title (64px) + subtitle
- **Abstract** in a `--surface` block with a lime left rule
- Numbered sections (1. Problem, 2. Approach…) in a narrow 680px reading column
- Screenshots as figures with captions: "Fig. 1 — Platform onboarding"
- **Key insight** as a large italic pull quote
- Reading progress bar (lime, 2px) at the top
- Footer: "Next paper →" large link

### Also Built
Numbered rows with hairline dividers (ref: 01–04 list). Hover: row text shifts right 8px and a small thumbnail fades in beside the cursor.

### About + Beyond Code
Two columns: About text left; Beyond Code + Recognition right as divider rows.

### Contact
Huge Display line: "LET'S BUILD SOMETHING THAT SHIPS." Email shown large; clicking copies it with a "Copied" toast. Lime pill "Download CV". Social links as text.

### Footer
Name, © year, "Back to top ↑".

---

## 5. Motion (keep it smooth, never noisy)

Stack: Framer Motion + Lenis smooth scroll.

| Effect | Where | Spec |
|---|---|---|
| Line-by-line reveal | Hero headline, section titles | Each line slides up from a mask, 0.8s, ease [0.22,1,0.36,1], 0.08s stagger |
| Fade-up | Paragraphs, cards | 24px up + fade, triggered once at 20% in view |
| Word color scrub | Thesis | Each word ghost → ink, tied to scroll position |
| Sticky highlight list | Areas band | Active item follows scroll |
| Sticky card stack | Selected Papers | Previous card scales to 0.95 and dims slightly as next arrives |
| Marquee | Under hero | Continuous, slows on hover |
| Parallax | Hero portrait + floating card | Max 40px offset |
| Cursor pill | Paper cards | Custom lime "Read →" pill follows cursor over cards (desktop only) |
| Magnetic buttons | Primary CTAs | Button drifts toward cursor up to 6px |
| Progress bar | Paper pages | Lime 2px bar |

Hover states:
- Links: underline draws left → right (scaleX)
- Buttons: arrow shifts 4px right; dark pill inverts to lime
- Images: scale 1.03 inside a fixed frame, 0.6s
- Rows: shift 8px right + color to ink

Rules:
- Respect `prefers-reduced-motion`: disable scrub, parallax, marquee, and cursor effects; keep simple fades.
- No animation longer than 1s. Nothing loops except the marquee.
- 60fps: animate only transform and opacity.

---

## 6. Assets needed

- Professional portrait (high-res, plain background)
- Original project screenshots in `/public/papers/[slug]/`
- CV as `/public/cv.pdf`
- Favicon: "SK" monogram in Archivo Display on lime
