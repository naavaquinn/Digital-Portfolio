# Naava Portfolio — GitHub Codespace Setup Guide

## Quick Start

### 1. Extract the Project
```bash
unzip naava-portfolio-source.zip
cd naava-portfolio
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

The dev server will start on `http://localhost:3000`

---

## Project Structure

```
naava-portfolio/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── MetricsSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── TickerBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useCountUp.ts
│   │   │   └── useScrollReveal.ts
│   │   ├── lib/
│   │   │   ├── data.ts      # Portfolio content & data
│   │   │   └── images.ts    # CDN image URLs
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Main app component
│   │   ├── index.css        # Global styles & theme
│   │   └── main.tsx         # Entry point
│   └── index.html
├── server/                  # Backend (Express)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Key Files to Know

### Content & Data
- **`client/src/lib/data.ts`** — All portfolio content (skills, experience, projects, etc.)
- **`client/src/lib/images.ts`** — CDN URLs for generated images

### Styling
- **`client/src/index.css`** — Global CSS with neo-brutalist theme colors and utilities
- Color palette:
  - **Jet Black**: `#0A0A0A`
  - **Signal Red**: `#FF3B30`
  - **Electric Lime**: `#C8FF00`
  - **Warm Gray**: `#E8E4DF`

### Components
Each major section is a separate component:
- `HeroSection.tsx` — Hero with masthead-style intro
- `TickerBar.tsx` — Scrolling stats ticker
- `AboutSection.tsx` — Story & journey
- `ExperienceSection.tsx` — Case studies (front page stories)
- `ProjectsSection.tsx` — Social media & websites managed
- `SkillsSection.tsx` — Skills & tools
- `MetricsSection.tsx` — Animated metrics counters
- `ContactSection.tsx` — Call to action & contact info

---

## Customization Guide

### Update Portfolio Content
Edit `client/src/lib/data.ts`:
```typescript
export const PERSONAL = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... etc
};

export const EXPERIENCE = [
  {
    role: "Your Role",
    company: "Your Company",
    // ... etc
  }
];
```

### Change Colors
Edit `client/src/index.css` in the `:root` section:
```css
:root {
  --primary: oklch(0.62 0.25 25);      /* Signal Red */
  --accent: oklch(0.88 0.2 120);       /* Electric Lime */
  /* ... etc */
}
```

### Update Images
Replace CDN URLs in `client/src/lib/images.ts`:
```typescript
export const IMAGES = {
  hero: "https://your-cdn-url.com/hero.jpg",
  // ... etc
};
```

### Modify Fonts
Fonts are defined in `client/index.html` (Google Fonts) and `client/src/index.css`:
- **Display Font**: Space Grotesk (headlines)
- **Body Font**: DM Sans (text)
- **Mono Font**: JetBrains Mono (code/stats)

---

## Available Scripts

```bash
# Development
pnpm dev          # Start dev server on localhost:3000

# Production
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code quality
pnpm check        # TypeScript type checking
pnpm format       # Format code with Prettier
```

---

## Design Philosophy: Neo-Brutalist Editorial

This portfolio uses a **"Social Newsroom"** design aesthetic:
- **Bold Typography**: Large, commanding headlines
- **Editorial Layout**: Asymmetric, newspaper-style sections
- **High Contrast**: Jet black & warm gray with signal red & lime accents
- **Stamp Badges**: Rubber-stamp style elements for emphasis
- **Data as Art**: Metrics presented as visual centerpieces
- **Smooth Animations**: Scroll reveals, count-up counters, hover effects

Key design elements:
- `.stamp` class — Rotated stamp-style badges
- `.highlight-marker` — Lime green highlight effect
- `.highlight-red` — Red highlight effect
- `.grain-overlay` — Subtle texture overlay
- Animated ticker bar with scrolling stats

---

## Deployment

### Option 1: Vercel (Recommended)
```bash
pnpm build
# Push to GitHub, then connect to Vercel
```

### Option 2: Netlify
```bash
pnpm build
# Deploy the `dist/` folder
```

### Option 3: GitHub Pages
Update `vite.config.ts` and push to GitHub.

---

## Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
pnpm dev
```

### Dependencies Not Installing
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Images Not Loading
- Check that CDN URLs in `client/src/lib/images.ts` are correct
- Ensure images are still accessible (not expired)

### Styles Not Applying
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check that `client/src/index.css` is imported in `client/src/main.tsx`

---

## Next Steps

1. **Customize Content**: Update `client/src/lib/data.ts` with your information
2. **Update Images**: Replace CDN URLs with your own images
3. **Test Locally**: Run `pnpm dev` and review in browser
4. **Deploy**: Push to GitHub and deploy to Vercel/Netlify
5. **Connect Domain**: Point your custom domain to the deployment

---

## Support & Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **shadcn/ui**: https://ui.shadcn.com
- **Vite**: https://vitejs.dev

---

**Portfolio by Naava N. Hedwig**
Built with React, Tailwind CSS, and Framer Motion
