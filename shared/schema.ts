import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"

// Tabela de usuários
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password"),
  role: text("role").notNull().default("FUNCIONARIO"),
  needsPasswordSetup: integer("needs_password_setup", { mode: "boolean" }).default(true),
  status: text("status").notNull().default("ATIVO"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de contracheques
export const payslips = sqliteTable("payslips", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de solicitações de folga
export const timeOffRequests = sqliteTable("time_off_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  justification: text("justification"),
  medicalCertificateUrl: text("medical_certificate_url"),
  status: text("status").notNull().default("PENDENTE"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de solicitações de reunião
export const meetingRequests = sqliteTable("meeting_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  topic: text("topic").notNull(),
  preferredDateTime: text("preferred_date_time").notNull(),
  status: text("status").notNull().default("PENDENTE"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de informativos/anúncios
export const announcements = sqliteTable("announcements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de eventos
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dateTime: text("date_time").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de participantes de eventos (relação many-to-many)
export const eventParticipants = sqliteTable("event_participants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: integer("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// Tabela de notificações
export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message").notNull(),
  link: text("link"),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
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