# Quick Reference — Naava Portfolio

## Essential Files to Edit

| File | Purpose | What to Change |
|------|---------|-----------------|
| `client/src/lib/data.ts` | Portfolio content | Name, skills, experience, projects |
| `client/src/lib/images.ts` | Image URLs | Replace CDN URLs with your images |
| `client/src/index.css` | Colors & theme | Update color palette (OKLCH format) |
| `client/index.html` | Page metadata | Title, fonts, meta tags |
| `client/src/components/Navbar.tsx` | Navigation | Nav items, branding |

---

## Color Palette (OKLCH Format)

```css
/* Primary Colors */
--color-brand-black: oklch(0.15 0.005 65);    /* #0A0A0A */
--color-brand-red: oklch(0.62 0.25 25);       /* #FF3B30 */
--color-brand-lime: oklch(0.88 0.2 120);      /* #C8FF00 */
--color-brand-warm: oklch(0.93 0.01 80);      /* #E8E4DF */
--color-brand-gray: oklch(0.55 0.01 65);      /* Mid-gray */
--color-brand-dark: oklch(0.2 0.005 65);      /* Dark gray */
```

---

## Typography System

```css
/* Fonts (from Google Fonts) */
--font-display: 'Space Grotesk', sans-serif;  /* Headlines */
--font-body: 'DM Sans', sans-serif;           /* Body text */
--font-mono: 'JetBrains Mono', monospace;     /* Code/stats */
```

---

## Key Components

### HeroSection
- Masthead-style hero with background image
- Large headline with animated entrance
- Scroll indicator at bottom

### TickerBar
- Scrolling horizontal stats bar
- Repeating metrics animation
- Red & lime accent colors

### ExperienceSection
- Alternating left/right layout
- Metric cards with rotation
- Case study cards with highlights

### SkillsSection
- 5 skill cards in 2-column grid
- Tools section with image
- Icon system with hover effects

### MetricsSection
- Animated number counters
- Scroll-triggered animations
- Full-width data visualization

### ContactSection
- Large email CTA button
- Contact details cards
- Hover state transitions

---

## Common Customizations

### Change Hero Background Image
```typescript
// client/src/lib/images.ts
export const IMAGES = {
  hero: "https://your-new-image-url.jpg",
  // ...
};
```

### Update Experience Entry
```typescript
// client/src/lib/data.ts
export const EXPERIENCE = [
  {
    role: "Your Role",
    company: "Your Company",
    location: "Your City, Country",
    period: "Jan 2024 – Present",
    highlights: [
      "Achievement 1",
      "Achievement 2",
    ],
    metric: "+50%",
    metricLabel: "Growth Metric",
    tags: ["Tag1", "Tag2"],
  },
];
```

### Add New Skill
```typescript
// client/src/lib/data.ts
export const SKILLS = [
  {
    name: "Your Skill",
    description: "Description here",
    icon: "target", // or "share2", "barChart", "palette", "penTool"
  },
];
```

### Change Primary Color
```css
/* client/src/index.css */
:root {
  --primary: oklch(0.5 0.2 280); /* New purple */
  --accent: oklch(0.8 0.15 200); /* New blue */
}
```

---

## Animation Classes

```css
/* Built-in animations */
.animate-ticker         /* Scrolling ticker effect */
.grain-overlay          /* Subtle grain texture */
.stamp                  /* Rotated stamp badge */
.highlight-marker       /* Lime green highlight */
.highlight-red          /* Red highlight */
```

---

## Responsive Breakpoints (Tailwind)

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

Use in classes: `text-base sm:text-lg md:text-xl`

---

## Deployment Checklist

- [ ] Update all content in `client/src/lib/data.ts`
- [ ] Replace image URLs in `client/src/lib/images.ts`
- [ ] Update page title in `client/index.html`
- [ ] Test locally: `pnpm dev`
- [ ] Build: `pnpm build`
- [ ] Push to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Test on production URL
- [ ] Set up custom domain (if desired)

---

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm check            # Type check
pnpm format           # Format code

# Debugging
pnpm dev --host       # Expose to network
npm run build -- --sourcemap  # Build with source maps
```

---

## File Locations

```
client/src/
├── components/
│   ├── Navbar.tsx              ← Navigation
│   ├── HeroSection.tsx         ← Hero
│   ├── AboutSection.tsx        ← About/Story
│   ├── ExperienceSection.tsx   ← Case studies
│   ├── ProjectsSection.tsx     ← Portfolio items
│   ├── SkillsSection.tsx       ← Skills & tools
│   ├── MetricsSection.tsx      ← Animated metrics
│   ├── ContactSection.tsx      ← CTA & contact
│   ├── TickerBar.tsx           ← Scrolling stats
│   └── Footer.tsx              ← Footer
├── lib/
│   ├── data.ts                 ← EDIT: All content
│   └── images.ts               ← EDIT: Image URLs
├── hooks/
│   ├── useCountUp.ts           ← Number animation
│   └── useScrollReveal.ts      ← Scroll animation
├── pages/
│   └── Home.tsx                ← Main page
├── App.tsx                     ← App routing
├── index.css                   ← EDIT: Colors & theme
└── main.tsx                    ← Entry point
```

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Fully responsive

---

## Performance Tips

1. **Images**: Use compressed CDN URLs (WebP format)
2. **Fonts**: Google Fonts are cached globally
3. **Animations**: Framer Motion is optimized for performance
4. **CSS**: Tailwind CSS is tree-shaken in production

---

**Need help?** Check the full setup guide in `GITHUB_CODESPACE_SETUP.md`
