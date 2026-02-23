# Recruiter Tracking Setup Guide

## Overview

Your portfolio now includes a **complete recruiter tracking system** that automatically detects and monitors when recruiters visit your site. This guide explains how to set it up and use it.

---

## What Gets Tracked

### 📊 Visitor Data
- **IP Address** — Identify visitor location
- **User Agent** — Device type, browser, OS
- **Geographic Location** — Country, city
- **Referrer** — Where they came from
- **Session ID** — Track individual visits

### 🎯 Recruiter Detection
- **LinkedIn Visitors** — Detected via referrer & user agent patterns
- **Company Domain** — If they access from a company email domain
- **HR Platforms** — Indeed, LinkedIn Recruiter, etc.
- **Recruiter Profiles** — Name, company, email (when available)

### 📈 Behavior Tracking
- **Page Views** — Which sections they visit
- **Time Spent** — How long on each page
- **Click Events** — Every button/link click
- **Contact Interactions** — Email clicks, contact form submissions
- **Resume Downloads** — If you add a resume download button

---

## Database Schema

### Tables Created

#### `visitors`
Tracks all portfolio visitors
```sql
- sessionId (unique)
- ipAddress
- userAgent
- country, city
- deviceType (mobile/tablet/desktop)
- isRecruiter (boolean)
- recruiterInfo (JSON)
- pageViews (count)
- timeSpent (seconds)
- createdAt, updatedAt
```

#### `pageViews`
Detailed page visit tracking
```sql
- sessionId
- page (e.g., "/", "/about", "/experience")
- referrer
- timeSpent (seconds)
- createdAt
```

#### `events`
Click and interaction tracking
```sql
- sessionId
- eventType ('click', 'scroll', 'form_submit', 'link_click')
- elementName (e.g., 'contact-button', 'email-link')
- elementText
- page
- metadata (JSON for custom data)
- createdAt
```

#### `recruiterVisits`
Summary of identified recruiter visits
```sql
- sessionId (unique)
- recruiterName
- company
- linkedinProfile
- email
- source ('linkedin', 'company_domain', 'hr_platform')
- pageViewCount
- timeSpent
- clickCount
- contactClicked (boolean)
- emailClicked (boolean)
- resumeDownloaded (boolean)
- lastVisit
- createdAt, updatedAt
```

#### `notifications`
Alerts sent to you
```sql
- title
- message
- type ('recruiter_visit', 'contact_click', 'milestone')
- recruiterVisitId (reference)
- isRead (boolean)
- createdAt
```

---

## Setup Instructions

### 1. Push Database Schema
```bash
cd naava-portfolio
pnpm db:push
```

This creates all the tracking tables in your database.

### 2. Add Tracking Script to Frontend

The tracking script needs to be added to your portfolio pages. Here's how:

**Create `client/src/lib/tracking.ts`:**
```typescript
import { nanoid } from "nanoid";

const SESSION_ID_KEY = "portfolio_session_id";

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = nanoid();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export async function trackPageView(page: string) {
  const sessionId = getOrCreateSessionId();
  await fetch("/api/trpc/tracking.pageView", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, page }),
  });
}

export async function trackEvent(
  eventType: string,
  elementName: string,
  elementText?: string
) {
  const sessionId = getOrCreateSessionId();
  const page = window.location.pathname;
  
  await fetch("/api/trpc/tracking.event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      eventType,
      elementName,
      elementText,
      page,
    }),
  });
}
```

### 3. Add Tracking API Routes

**Update `server/routers.ts`:**
```typescript
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { visitors, pageViews, events, recruiterVisits } from "../drizzle/schema";

export const appRouter = router({
  // ... existing routes ...
  
  tracking: router({
    pageView: publicProcedure
      .input(z.object({ sessionId: z.string(), page: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return { success: false };
        
        await db.insert(pageViews).values({
          sessionId: input.sessionId,
          page: input.page,
        });
        
        return { success: true };
      }),

    event: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        eventType: z.string(),
        elementName: z.string(),
        elementText: z.string().optional(),
        page: z.string(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return { success: false };
        
        await db.insert(events).values({
          sessionId: input.sessionId,
          eventType: input.eventType,
          elementName: input.elementName,
          elementText: input.elementText,
          page: input.page,
        });
        
        return { success: true };
      }),

    getRecruiterVisits: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      
      return db.select().from(recruiterVisits).orderBy(desc(recruiterVisits.lastVisit));
    }),
  }),
});
```

### 4. Add Click Tracking to Components

**Example: Track contact button clicks**
```tsx
import { trackEvent } from "@/lib/tracking";

export function ContactButton() {
  const handleClick = async () => {
    await trackEvent("click", "contact-button", "Send Email");
    // Then perform the action
  };

  return (
    <button onClick={handleClick}>
      Contact Me
    </button>
  );
}
```

---

## Recruiter Detection Logic

### How Recruiters Are Identified

1. **LinkedIn Referrer**
   - If `document.referrer` contains "linkedin.com"
   - Set `source = 'linkedin'`

2. **Company Domain**
   - If visitor's IP resolves to a company domain
   - Set `source = 'company_domain'`

3. **HR Platform User Agent**
   - If user agent contains patterns like "LinkedInBot", "Indeed", "Glassdoor"
   - Set `source = 'hr_platform'`

4. **Manual Identification**
   - You can manually mark visitors as recruiters in the dashboard

### Recruiter Info JSON Structure
```json
{
  "source": "linkedin",
  "company": "Google",
  "linkedinProfile": "https://linkedin.com/in/...",
  "detectionMethod": "referrer"
}
```

---

## Dashboard & Analytics

### View Recruiter Visits

Create a dashboard page to view all recruiter visits:

**`client/src/pages/Analytics.tsx`:**
```tsx
import { trpc } from "@/lib/trpc";

export default function Analytics() {
  const { data: recruiterVisits } = trpc.tracking.getRecruiterVisits.useQuery();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Recruiter Visits</h1>
      
      <div className="grid gap-4">
        {recruiterVisits?.map((visit) => (
          <div key={visit.id} className="border p-4 rounded">
            <h3 className="font-bold">{visit.recruiterName}</h3>
            <p className="text-sm text-gray-600">{visit.company}</p>
            <p className="text-xs">
              Visited {visit.pageViewCount} pages · Spent {visit.timeSpent}s
            </p>
            <p className="text-xs">
              Last visit: {new Date(visit.lastVisit).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Email Notifications

### Set Up Recruiter Visit Alerts

**Add to `server/routers.ts`:**
```typescript
import { notifyOwner } from "./_core/notification";

// When a recruiter is detected:
await notifyOwner({
  title: "🎯 Recruiter Visit Detected!",
  content: `${recruiterName} from ${company} visited your portfolio. They spent ${timeSpent} seconds and clicked ${clickCount} times.`,
});
```

---

## Privacy & GDPR Compliance

### Important Notes

1. **Inform Users** — Add a privacy policy mentioning analytics
2. **IP Anonymization** — Consider anonymizing the last octet of IPs
3. **Data Retention** — Set a policy for how long to keep data
4. **User Consent** — Some jurisdictions require opt-in consent

**Example Privacy Policy Addition:**
```
"We use analytics to track portfolio visitor behavior and identify recruiter interest. 
We do not sell this data. Data is retained for 90 days."
```

---

## Advanced Tracking Features

### 1. Heatmaps
Track where recruiters click most:
```typescript
export async function trackMousePosition(x: number, y: number) {
  const sessionId = getOrCreateSessionId();
  await fetch("/api/trpc/tracking.heatmap", {
    method: "POST",
    body: JSON.stringify({ sessionId, x, y, page: window.location.pathname }),
  });
}
```

### 2. Scroll Depth
Track how far recruiters scroll:
```typescript
export function trackScrollDepth() {
  window.addEventListener("scroll", () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    if (scrollPercent > 25 || scrollPercent > 50 || scrollPercent > 75) {
      trackEvent("scroll", `scroll-${Math.round(scrollPercent)}%`);
    }
  });
}
```

### 3. Form Submissions
Track contact form submissions:
```typescript
export async function trackFormSubmission(formData: Record<string, string>) {
  await trackEvent("form_submit", "contact-form", JSON.stringify(formData));
}
```

---

## Deployment Checklist

- [ ] Database schema pushed (`pnpm db:push`)
- [ ] Tracking API routes added to `server/routers.ts`
- [ ] Tracking script added to `client/src/lib/tracking.ts`
- [ ] Click tracking integrated into components
- [ ] Analytics dashboard created
- [ ] Email notifications configured
- [ ] Privacy policy updated
- [ ] Deployed to production
- [ ] Verified tracking is working

---

## Troubleshooting

### Tracking Not Recording

1. Check browser console for errors
2. Verify API routes are accessible at `/api/trpc/tracking.*`
3. Ensure database connection is working
4. Check that session ID is being created in localStorage

### Recruiters Not Being Detected

1. Verify recruiter detection logic in tracking script
2. Check IP geolocation service is working
3. Manually mark recruiters in dashboard if needed
4. Review user agent patterns for your industry

### Performance Issues

1. Batch tracking events (don't send every click)
2. Use debouncing for scroll/mouse tracking
3. Archive old tracking data monthly
4. Add database indexes on `sessionId` and `createdAt`

---

## Next Steps

1. ✅ Database schema created
2. ⏭️ Add tracking script to frontend
3. ⏭️ Integrate click tracking into components
4. ⏭️ Create analytics dashboard
5. ⏭️ Deploy to production
6. ⏭️ Monitor recruiter visits!

---

**Your portfolio is now ready to track every recruiter interaction!** 🚀
