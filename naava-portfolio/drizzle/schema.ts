import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Visitor tracking table for portfolio analytics
 */
export const visitors = mysqlTable("visitors", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  ipAddress: varchar("ipAddress", { length: 45 }), // Supports IPv4 and IPv6
  userAgent: text("userAgent"),
  referer: text("referer"),
  country: varchar("country", { length: 2 }),
  city: varchar("city", { length: 100 }),
  deviceType: varchar("deviceType", { length: 20 }), // mobile, tablet, desktop
  isRecruiter: boolean("isRecruiter").default(false),
  recruiterInfo: json("recruiterInfo"), // { source: 'linkedin' | 'company' | 'hr_platform', company?: string }
  pageViews: int("pageViews").default(1),
  timeSpent: int("timeSpent").default(0), // in seconds
  lastActivity: timestamp("lastActivity").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = typeof visitors.$inferInsert;

/**
 * Page view tracking for detailed analytics
 */
export const pageViews = mysqlTable("pageViews", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  page: varchar("page", { length: 255 }), // e.g., "/", "/about", "/experience"
  referrer: text("referrer"),
  timeSpent: int("timeSpent").default(0), // in seconds
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;

/**
 * Click/event tracking for user interactions
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  eventType: varchar("eventType", { length: 50 }), // 'click', 'scroll', 'form_submit', 'link_click'
  elementName: varchar("elementName", { length: 255 }), // e.g., 'contact-button', 'email-link'
  elementText: text("elementText"),
  page: varchar("page", { length: 255 }),
  metadata: json("metadata"), // Additional event data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Recruiter visits summary for quick lookup
 */
export const recruiterVisits = mysqlTable("recruiterVisits", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  recruiterName: varchar("recruiterName", { length: 255 }),
  company: varchar("company", { length: 255 }),
  linkedinProfile: text("linkedinProfile"),
  email: varchar("email", { length: 320 }),
  source: varchar("source", { length: 50 }), // 'linkedin', 'company_domain', 'hr_platform'
  pageViewCount: int("pageViewCount").default(1),
  timeSpent: int("timeSpent").default(0),
  clickCount: int("clickCount").default(0),
  contactClicked: boolean("contactClicked").default(false),
  emailClicked: boolean("emailClicked").default(false),
  resumeDownloaded: boolean("resumeDownloaded").default(false),
  lastVisit: timestamp("lastVisit").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RecruiterVisit = typeof recruiterVisits.$inferSelect;
export type InsertRecruiterVisit = typeof recruiterVisits.$inferInsert;