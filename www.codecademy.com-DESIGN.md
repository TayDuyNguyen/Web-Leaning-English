# Design System Inspired by Codecademy

## 1. Visual Theme & Atmosphere

Codecademy's design system reflects a modern, tech-forward learning platform that balances professionalism with accessibility. The aesthetic combines deep navy foundations with vibrant electric blue accents and striking yellow highlights, creating a dynamic yet focused environment. The typography is clean and geometric, emphasizing clarity and readability for code-centric content. The overall mood is energetic and progressive—designed to inspire learners while maintaining visual clarity during focused study sessions. High contrast ratios ensure accessibility, while generous whitespace and carefully calibrated shadows create visual hierarchy without overwhelming users.

**Key Characteristics**
- Bold color blocking with high contrast for accessibility
- Clean, modern typography centered on legibility
- Layered depth through subtle shadows and elevation
- Dynamic accent colors (electric blue and yellow) for call-to-action elements
- Tech-forward aesthetic with code-inspired typography choices
- Emphasis on learning-focused, distraction-free interfaces
- High-contrast dark and light modes for visual flexibility

## 2. Color Palette & Roles

### Primary
- **Navy Dark** (`#10162F`): Dominant background and primary text color; establishes the dark, focused learning environment (used 856 times across the platform)
- **Deep Navy** (`#0A0D1C`): Darkest neutral for high-contrast text and UI boundaries
- **Electric Blue** (`#3A10E5`): Primary call-to-action and interactive states; brand accent for buttons and links

### Accent Colors
- **Bright Blue** (`#1557FF`): Secondary interactive accent; used for hover states and highlighted navigation
- **Cyan Blue** (`#66C4FF`): Light accent for information layers and supporting visual elements
- **Bright Yellow** (`#FFD300`): Warning and promotional elements; draws attention to limited-time offers and urgent CTAs
- **Cream White** (`#FFFAE5`): Soft highlight for premium or featured content areas
- **Light Cream** (`#FFF0E5`): Subtle background tint for highlighted sections
- **Light Green** (`#F5FFE3`): Success state indicator for completed actions or achievements

### Interactive
- **Deep Navy** (`#10162F`): Secondary button background; neutral interactive state
- **Electric Blue** (`#3A10E5`): Primary button and link background; dominant interactive element

### Neutral Scale
- **White** (`#FFFFFF`): Primary surface for content areas, cards, and text backgrounds (used 101 times)
- **Light Gray** (`#F5F5F5`): Secondary surface for subtle differentiation (used 27 times)
- **Lighter Gray** (`#EEEEEE`): Tertiary surface for disabled or inactive states
- **Border Gray** (`#E2E8F0`): Input borders and subtle dividers
- **Edge Gray** (`#E0E0E0`): Fine line work and subtle separators
- **Medium Gray** (`#8A8A8A`): Muted text and secondary labels
- **Almost Black** (`#1A1A1A`): Darkest text for maximum contrast; used sparingly
- **Black** (`#000000`): Reserved for critical focus states

### Surface & Borders
- **Card Surface** (`#FFFFFF`): Standard container background with `1px solid rgba(16, 22, 47, 0.28)` border
- **Border Color** (`rgba(16, 22, 47, 0.28)`): Default card and input borders with 28% opacity
- **Input Border Light** (`rgba(255, 255, 255, 0.2)`): Borders on light-text inputs against dark backgrounds

### Semantic / Status
- **Error** (`#DC2626`, `#E91C11`, `#E53E3E`): Used interchangeably for error states, validation failures, and destructive actions
- **Warning** (`#FFD300`): Urgent alerts, limited-time offers, and attention-grabbing promotions
- **Success** (`#F5FFE3`): Completion states and positive feedback indicators

## 3. Typography Rules

### Font Family
- **Primary: Apercu** — Modern sans-serif for UI, navigation, buttons, and body text. Fallback: `system-ui, -apple-system, sans-serif`
- **Secondary: Suisse** — Geometric sans-serif for display and emphasis in larger sizes. Fallback: `Apercu, system-ui, sans-serif`
- **Code: Monaco** — Monospace for inline code snippets and code blocks. Fallback: `'Courier New', monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| **Display/H1** | Apercu | 76px | 400 | 91.2px | 0px | Largest headings; hero titles and page introductions |
| **H2/Subheading** | Apercu | 22px | 700 | 28.6px | 0px | Section headings and feature titles |
| **H3/Card Title** | Apercu | 18px | 700 | 27px | 0px | Subsection headings and card titles |
| **Body Text** | Apercu | 16px | 400 | 24px | 0px | Default paragraph and body copy |
| **Button/Link** | Apercu | 16px | 700 | 24px | 0px | Call-to-action text and navigation links |
| **Label/Caption** | Apercu | 14px | 400 | 20px | 0px | Form labels and small text (inferred) |
| **Emphasis/Display** | Suisse | 26px | 700 | 33.8px | 0px | Bold emphasis and supporting headlines |
| **Code Block** | Monaco | 17.6px | 700 | 28.16px | 0px | Monospace code display; high readability for syntax |

### Principles
- **Contrast-First:** All body text uses either `#10162F` on light backgrounds or `#FFFFFF` on dark backgrounds for WCAG AA compliance
- **Consistent Line Height:** Maintains 1.5x font size minimum for readability; supports both compact and spacious layouts
- **Hierarchy Through Weight:** Font weight (400, 700) creates visual priority; emphasis is achieved through weight, not size alone
- **Code Legibility:** Monospace font (Monaco) preserves syntax clarity and character distinction
- **Geometric Elegance:** Suisse used sparingly for impact; Apercu is the workhorse for all UI elements
- **No Letter Spacing Manipulation:** Relies on font metrics for natural rhythm; zero letter-spacing enforced across all roles

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#3A10E5`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 16px, 700
- **Padding:** `4px 16px`
- **Height:** 40px
- **Border Radius:** `4px`
- **Border:** `2px solid transparent`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Hover State:** Background darkens to `#2D0BBD`; cursor pointer
- **Active State:** Background shifts to `#1F0880`
- **Disabled State:** Background becomes `#8A8A8A`; text opacity 60%; cursor not-allowed

#### Secondary Button (Dark Navy)
- **Background:** `#10162F`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 16px, 700
- **Padding:** `4px 16px`
- **Height:** 40px
- **Width:** 96.5px
- **Border Radius:** `4px`
- **Border:** `2px solid transparent`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Hover State:** Background lightens to `#1A1F3F`
- **Active State:** Background becomes `#0D0F1F`
- **Disabled State:** Background becomes `#E2E8F0`; text color `#8A8A8A`

#### Ghost Button (Icon/Minimal)
- **Background:** `transparent`
- **Text Color:** `#10162F`
- **Font:** Apercu, 16px, 400
- **Padding:** `0px`
- **Height:** 32px
- **Width:** 32px
- **Border Radius:** `4px`
- **Border:** `2px solid transparent`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Hover State:** Background becomes `rgba(58, 16, 229, 0.1)`
- **Active State:** Background becomes `rgba(58, 16, 229, 0.2)`

#### Navigation Button (Minimal White Text)
- **Background:** `transparent`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 16px, 400
- **Padding:** `8px 0px`
- **Height:** 41px
- **Border Radius:** `0px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Hover State:** Text color lightens to `#FFFAE5`; bottom border `2px solid #FFD300`
- **Active State:** Bottom border `2px solid #FFD300`

#### CTA Button (White Background)
- **Background:** `#FFFFFF`
- **Text Color:** `#3A10E5`
- **Font:** Apercu, 16px, 400
- **Padding:** `16px 24px 16px 16px`
- **Height:** 60px
- **Width:** 100%
- **Border Radius:** `8px 0px 0px 8px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Hover State:** Background becomes `#F5F5F5`; text color stays `#3A10E5`
- **Active State:** Background becomes `#EEEEEE`

### Cards & Containers

#### Default Card
- **Background:** `#FFFFFF`
- **Text Color:** `#10162F`
- **Font:** Apercu, 16px, 400
- **Padding:** `8px 12px`
- **Border:** `1px solid rgba(16, 22, 47, 0.28)`
- **Border Radius:** `4px`
- **Box Shadow:** `rgb(16, 22, 47) 0px 0px 0px 0px` (no elevation)
- **Line Height:** 24px
- **Height:** 100%
- **Width:** 100%
- **Hover State:** Border color becomes `rgba(16, 22, 47, 0.5)`; slight lift effect
- **Disabled State:** Background becomes `#F5F5F5`; text color becomes `#8A8A8A`

#### Hero Section Container
- **Background:** `#10162F` or gradient background with image overlay
- **Text Color:** `#FFFFFF`
- **Padding:** `96px 32px`
- **Border Radius:** `16px` (if rounded corners on image assets)
- **Box Shadow:** `none` (background image provides depth)

#### Featured Card (Dark Navy)
- **Background:** `#10162F`
- **Text Color:** `#FFFFFF`
- **Border:** `1px solid rgba(255, 255, 255, 0.2)`
- **Border Radius:** `8px`
- **Padding:** `24px 32px`
- **Box Shadow:** `none`

### Inputs & Forms

#### Text Input (Large)
- **Background:** `rgba(255, 255, 255, 0.04)`
- **Text Color:** `#FFFFFF`
- **Font:** Suisse, 22px, 400
- **Padding:** `32px 56px 32px 32px`
- **Height:** 99px
- **Border:** `1px solid rgba(255, 255, 255, 0.2)`
- **Border Radius:** `16px 16px 0px 0px`
- **Box Shadow:** `none`
- **Line Height:** 33px
- **Placeholder Color:** `rgba(255, 255, 255, 0.5)`
- **Focus State:** Border color becomes `rgba(255, 255, 255, 0.4)`; outline `2px solid #1557FF`
- **Disabled State:** Background becomes `rgba(0, 0, 0, 0.1)`; text color becomes `#8A8A8A`

#### Standard Input (Form Field)
- **Background:** `#FFFFFF`
- **Text Color:** `#10162F`
- **Font:** Apercu, 16px, 400
- **Padding:** `12px 16px`
- **Height:** 40px
- **Border:** `1px solid #E2E8F0`
- **Border Radius:** `4px`
- **Box Shadow:** `none`
- **Focus State:** Border color becomes `#3A10E5`; box-shadow `0px 0px 0px 2px rgba(58, 16, 229, 0.1)`
- **Error State:** Border color becomes `#DC2626`; text color becomes `#DC2626`

#### Checkbox/Radio Input
- **Size:** 18px × 18px
- **Border:** `2px solid #E2E8F0`
- **Border Radius:** `4px` (checkbox), `50%` (radio)
- **Background (unchecked):** `#FFFFFF`
- **Background (checked):** `#3A10E5`
- **Checkmark Color:** `#FFFFFF`

### Navigation

#### Top Navigation Bar
- **Background:** `#10162F`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 16px, 400
- **Height:** 79px
- **Padding:** `0px 96px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Line Height:** 24px
- **Logo:** Positioned left, 24px from edge
- **Links:** Spaced `16px` apart; weight 400 for normal, 700 on active
- **Active Link State:** Text color `#FFD300`; bottom border `2px solid #FFD300`

#### Dropdown Menu (Inferred)
- **Background:** `#FFFFFF`
- **Text Color:** `#10162F`
- **Border:** `1px solid #E2E8F0`
- **Border Radius:** `4px`
- **Padding:** `8px 0px`
- **Item Padding:** `12px 16px`
- **Hover State:** Background becomes `#F5F5F5`
- **Active State:** Background becomes `#FFFAE5`

### Links

#### Text Link (Standard)
- **Text Color:** `#3A10E5`
- **Font:** Apercu, 16px, 700
- **Text Decoration:** `underline`
- **Hover State:** Text color becomes `#1F0880`; text-decoration stays underline
- **Visited State:** Text color becomes `#7C3AED`
- **Active State:** Text color becomes `#1F0880`

#### Link Button (White Background)
- **Background:** `#FFFFFF`
- **Text Color:** `#10162F`
- **Font:** Apercu, 16px, 700
- **Padding:** `24px 16px`
- **Height:** 72px
- **Border Radius:** `0px`
- **Border:** `none`
- **Line Height:** 24px

#### Link Button (Primary Blue)
- **Background:** `#3A10E5`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 16px, 700
- **Padding:** `4px 16px`
- **Height:** 40px
- **Border Radius:** `4px`
- **Border:** `2px solid transparent`
- **Hover State:** Background becomes `#2D0BBD`

### Tags & Badges

#### Subject Badge
- **Background:** `#10162F`
- **Text Color:** `#FFFFFF`
- **Font:** Apercu, 14px, 400
- **Padding:** `8px 12px`
- **Border Radius:** `4px`
- **Border:** `1px solid rgba(255, 255, 255, 0.2)`
- **Icon:** Positioned left, 4px margin-right

#### Success Badge
- **Background:** `#F5FFE3`
- **Text Color:** `#10162F`
- **Font:** Apercu, 12px, 700
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** `1px solid rgba(245, 255, 227, 0.5)`

#### Warning Badge
- **Background:** `#FFD300`
- **Text Color:** `#10162F`
- **Font:** Apercu, 12px, 700
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** `1px solid rgba(255, 211, 0, 0.5)`

## 5. Layout Principles

### Spacing System

Codecademy uses a modular spacing scale based on `4px` increments:
- **Base Unit:** `4px`
- **Scale:** `4px, 8px, 12px, 16px, 24px, 32px, 40px, 96px`
- **Component Padding:** Buttons use `4px 16px` (vertical × horizontal)
- **Card/Section Padding:** `8px-12px` (compact), `16px-24px` (standard), `32px-96px` (expansive)
- **Gap Between Items:** `8px` (tight), `16px` (standard), `24px` (comfortable), `40px` (spacious)
- **Margins:** Section-to-section uses `96px` vertical margin; container-to-edge uses `32px-96px` horizontal

### Grid & Container

- **Max Width:** 1440px (full HD standard; responsive down to mobile)
- **Horizontal Padding:** `96px` on desktop, `24px` on tablet, `16px` on mobile
- **Column System:** 12-column grid inferred from layout patterns
- **Container Width (Large):** 1248px (with `96px` horizontal padding = 1440px viewport)
- **Section Pattern:** Hero sections span full width; content sections center-aligned with max-width constraint
- **Alignment:** Center-aligned for maximum readability; hero overlays use left alignment for text

### Whitespace Philosophy

Whitespace is treated as a design element to guide focus and reduce cognitive load:
- **Breathing Room:** Cards and buttons have consistent padding around text; no text touches edges
- **Visual Separation:** Sections use vertical spacing (`40px-96px`) to denote logical breaks
- **Compact Density:** Forms and input groups use `8px-12px` padding for efficiency
- **Generous Margins:** Call-to-action elements are surrounded by whitespace to emphasize importance
- **Hierarchy Through Space:** Larger gaps create visual groups; tighter spacing de-emphasizes secondary content

### Border Radius Scale

- **Minimal:** `0px` — Navigation bars, full-width containers, flush elements
- **Small:** `4px` — Buttons, input fields, small cards, badges
- **Medium:** `8px` — Featured cards, modal dialogs, input groups (top corners)
- **Large:** `16px` — Hero image corners, large containers, rounded card tops

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **Flat (No Elevation)** | `box-shadow: none` | Buttons, cards, navigation bars; the primary UI layer |
| **Subtle Lift** | `box-shadow: 0px 1px 2px rgba(16, 22, 47, 0.08)` | Hover states on buttons; slight interactivity feedback |
| **Floating** | `box-shadow: 0px 4px 12px rgba(16, 22, 47, 0.12)` | Modal overlays, floating action buttons, expanded dropdowns |
| **Elevated** | `box-shadow: 0px 12px 24px rgba(16, 22, 47, 0.16)` | Modals, popovers, top-level navigation dropdowns |

**Shadow Philosophy:** Shadows are minimal and restrained. Rather than relying on shadow depth for hierarchy, the design uses color contrast (dark navy backgrounds vs. white surfaces) and spacing to establish layering. When shadows are used, they are subtle and warm-toned to reflect the navy palette. Shadows on dark backgrounds use desaturated navy (`rgb(16, 22, 47)`) at low opacity (8-16%) to avoid harsh visual breaks. The primary card shadow (`rgb(16, 22, 47) 0px 0px 0px 0px`) indicates a flat, no-elevation approach for most containers—a deliberate choice to maintain visual clarity and reduce visual noise in a learning-focused interface.

## 7. Do's and Don'ts

### Do

- **Use Electric Blue (#3A10E5) for all primary CTAs** — Sign-up buttons, main navigation links, and conversion-focused elements
- **Maintain 4px padding minimum on all text elements** — Ensures readability and comfortable touch targets
- **Apply 4px border radius to buttons and inputs** — Creates approachable, modern aesthetic
- **Layer Navy (#10162F) backgrounds with White (#FFFFFF) cards** — Establishes clear visual hierarchy through contrast
- **Use Apercu font for all UI text** — Ensures consistency; Monaco is reserved for code blocks only
- **Implement 1.5x minimum line height for body text** — Supports accessibility and long-form reading
- **Surround call-to-action elements with whitespace** — Draws attention through isolation, not visual clutter
- **Use Yellow (#FFD300) sparingly for urgent/promotional content** — Limited-time offers and warnings gain instant recognition
- **Test all color combinations for WCAG AA contrast compliance** — Navy text on white, white text on navy, both pass
- **Keep shadow opacity below 16%** — Preserves flatness and focus; elevates without overwhelming

### Don't

- **Never use gradient backgrounds without solid color fallback** — Ensures legibility on all devices
- **Avoid dark text on dark backgrounds** — Navy text on Navy (#10162F) becomes invisible; use white or bright accent colors
- **Don't exceed 96px horizontal padding on desktop** — Constrains reading line-length; maintains focus
- **Never use Yellow (#FFD300) for body text** — Legibility fails; reserve for highlights, badges, and warnings only
- **Avoid nesting more than 2 levels of dropdowns** — Navigation complexity diminishes with depth; simplify menu structure
- **Don't apply multiple shadows to single elements** — Single shadow is sufficient; layered shadows create visual chaos
- **Never exceed 18px heading size in body text** — Breaks hierarchy; use defined typography roles only
- **Avoid transparent buttons on light backgrounds without border** — Loses definition; always add border or solid background
- **Don't use any color outside the defined palette** — Custom colors break accessibility and visual consistency
- **Never disable focus states for keyboard navigation** — All interactive elements must have visible `:focus` indicators for accessibility

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| **Desktop** | 1200px+ | Full layout; 12-column grid; `96px` horizontal padding; hero sections full-width |
| **Tablet** | 768px–1199px | Reduced padding to `32px`; 8-column grid; condensed navigation with dropdown menu |
| **Mobile** | 320px–767px | Single-column layout; `16px` horizontal padding; stacked navigation; full-width cards; font sizes reduced 10% |

### Touch Targets

- **Minimum Size:** 44px × 44px for interactive elements (buttons, links, form controls)
- **Recommended Size:** 48px × 48px for high-accuracy touch (CTA buttons)
- **Spacing Between Targets:** Minimum 8px to prevent accidental activation
- **Icon Size:** 24px minimum for standalone icons; 16px when paired with text
- **Navigation Items:** 44px height minimum; 16px padding between items

### Collapsing Strategy

- **Navigation:** Desktop horizontal menu bar (79px height) → Tablet dropdown (`More` menu) → Mobile hamburger menu (icon 32×32px)
- **Card Grid:** Desktop 4-column (`calc(25% - 16px)`) → Tablet 2-column (`calc(50% - 16px)`) → Mobile 1-column (full-width)
- **Padding Collapse:** `96px` (desktop) → `32px` (tablet) → `16px` (mobile); maintains visual breathing room at all sizes
- **Font Scaling:** Heading sizes reduce 8-10% on tablet; body text remains 16px but line-height compresses to 1.4x on mobile
- **Hero Section:** Full-height image on desktop → 60vh on tablet → 50vh on mobile; text size and positioning adjust proportionally
- **Button Layout:** Inline buttons on desktop → Stacked on mobile (full-width with 8px gap between); CTA buttons take 100% width on mobile
- **Spacing Gaps:** `40px` vertical gap (desktop) → `24px` (tablet) → `16px` (mobile) between major sections
- **Input Width:** Full container width on mobile; max 400px on desktop with centered alignment

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Electric Blue (`#3A10E5`)
- **Secondary CTA:** Deep Navy (`#10162F`)
- **Background (Dark):** Navy Dark (`#10162F`)
- **Background (Light):** White (`#FFFFFF`)
- **Heading Text:** Navy Dark (`#10162F`) on light; White (`#FFFFFF`) on dark
- **Body Text:** Navy Dark (`#10162F`) on light; White (`#FFFFFF`) on dark
- **Borders:** Border Gray (`#E2E8F0`) on light; Light Border (`rgba(255, 255, 255, 0.2)`) on dark
- **Accent Highlight:** Bright Yellow (`#FFD300`)
- **Error State:** Error Red (`#DC2626`)
- **Success State:** Light Green (`#F5FFE3`)
- **Disabled State:** Medium Gray (`#8A8A8A`)

### Iteration Guide

1. **Start with Navy + White contrast:** All layouts begin with `#10162F` dark sections and `#FFFFFF` light cards. This contrast anchors the visual hierarchy and requires no additional styling.

2. **Apply Electric Blue (#3A10E5) only to primary interactive elements:** Buttons, main navigation CTAs, and form focus states use this color exclusively. No secondary elements use blue to maintain focus hierarchy.

3. **Use 4px border radius for all buttons and inputs:** This single radius value (never 8px or higher for small components) maintains visual consistency and modern aesthetic. Larger containers (cards, modals) use 8px-16px.

4. **Enforce 4px baseline padding:** All text in buttons is `4px 16px`; all card text is minimum `8px 12px`. This creates a comfortable visual rhythm and ensures accessibility.

5. **Apercu font for UI, Monaco for code:** Typography roles are rigid. H1=Apercu 76px, body=Apercu 16px, code=Monaco 17.6px. Never mix fonts for the same role.

6. **Yellow (#FFD300) is reserved for urgent/promotional only:** Promotions, warnings, and limited-time alerts use yellow. It never appears in body text or passive UI elements.

7. **Whitespace scales with breakpoint:** Desktop spacing (96px sections, 40px gaps) halves or quarters at smaller viewports. Mobile padding is always 16px minimum.

8. **Shadows use navy at 8-16% opacity only:** No colored shadows; no shadows over 12px blur radius. Most UI is flat (no shadow). Hover states add subtle `0px 1px 2px rgba(16, 22, 47, 0.08)` lift.

9. **Focus states on all interactive elements:** Every button, link, and form field has visible `:focus` state (outline `2px solid #1557FF` or equivalent contrast). Keyboard navigation must be fully supported.

10. **Test all text for 16px minimum size on mobile:** Body text stays 16px; headings scale down 8-10%. Anything smaller than 14px fails mobile accessibility. Line height maintains minimum 1.4x multiplier.