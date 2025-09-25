import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"

// Tabela de usuários
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }),
  role: varchar("role", { length: 20 }).notNull().default("FUNCIONARIO"),
  needsPasswordSetup: boolean("needs_password_setup").default(true),
  status: varchar("status", { length: 20 }).notNull().default("ATIVO"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})

// Tabela de contracheques
export const payslips = pgTable("payslips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de solicitações de folga
export const timeOffRequests = mysqlTable("time_off_requests", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  justification: text("justification"),
  medicalCertificateUrl: varchar("medical_certificate_url", { length: 500 }),
  status: varchar("status", { length: 20 }).notNull().default("PENDENTE"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})

// Tabela de solicitações de reunião
export const meetingRequests = mysqlTable("meeting_requests", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  topic: varchar("topic", { length: 500 }).notNull(),
  preferredDateTime: timestamp("preferred_date_time").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("PENDENTE"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})

// Tabela de informativos/anúncios
export const announcements = mysqlTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de eventos
export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  dateTime: timestamp("date_time").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de participantes de eventos (relação many-to-many)
export const eventParticipants = mysqlTable("event_participants", {
  id: serial("id").primaryKey(),
  eventId: int("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  userId: serial("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de notificações
export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message").notNull(),
  link: varchar("link", { length: 255 }),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Definir relações
export const usersRelations = relations(users, ({ many }) => ({
  payslips: many(payslips),
  timeOffRequests: many(timeOffRequests),
  meetingRequests: many(meetingRequests),
  notifications: many(notifications),
  eventParticipants: many(eventParticipants),
}))

export const payslipsRelations = relations(payslips, ({ one }) => ({
  user: one(users, {
    fields: [payslips.userId],
    references: [users.id],
  }),
}))

export const timeOffRequestsRelations = relations(timeOffRequests, ({ one }) => ({
  user: one(users, {
    fields: [timeOffRequests.userId],
    references: [users.id],
  }),
}))

export const meetingRequestsRelations = relations(meetingRequests, ({ one }) => ({
  user: one(users, {
    fields: [meetingRequests.userId],
    references: [users.id],
  }),
}))

export const eventsRelations = relations(events, ({ many }) => ({
  participants: many(eventParticipants),
}))

export const eventParticipantsRelations = relations(eventParticipants, ({ one }) => ({
  event: one(events, {
    fields: [eventParticipants.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [eventParticipants.userId],
    references: [users.id],
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type Payslip = typeof payslips.$inferSelect
export type InsertPayslip = typeof payslips.$inferInsert
export type TimeOffRequest = typeof timeOffRequests.$inferSelect
export type InsertTimeOffRequest = typeof timeOffRequests.$inferInsert
export type MeetingRequest = typeof meetingRequests.$inferSelect
export type InsertMeetingRequest = typeof meetingRequests.$inferInsert
export type Announcement = typeof announcements.$inferSelect
export type InsertAnnouncement = typeof announcements.$inferInsert
export type Event = typeof events.$inferSelect
export type InsertEvent = typeof events.$inferInsert
export type EventParticipant = typeof eventParticipants.$inferSelect
export type InsertEventParticipant = typeof eventParticipants.$inferInsert
export type Notification = typeof notifications.$inferSelect
export type InsertNotification = typeof notifications.$inferInsert
