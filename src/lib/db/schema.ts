import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const episodes = pgTable("episodes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  guestName: text("guest_name"),
  guestBio: text("guest_bio"),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transcripts = pgTable("transcripts", {
  id: uuid("id").defaultRandom().primaryKey(),
  episodeId: uuid("episode_id")
    .references(() => episodes.id, { onDelete: "cascade" })
    .notNull(),
  fullText: text("full_text").notNull(),
  segments: jsonb("segments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pipelineRuns = pgTable("pipeline_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  episodeId: uuid("episode_id")
    .references(() => episodes.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status").notNull().default("pending"),
  currentStep: integer("current_step").default(0),
  error: text("error"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contentItems = pgTable("content_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  episodeId: uuid("episode_id")
    .references(() => episodes.id, { onDelete: "cascade" })
    .notNull(),
  runId: uuid("run_id")
    .references(() => pipelineRuns.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").notNull(),
  phase: text("phase").notNull(),
  title: text("title"),
  body: text("body").notNull(),
  metadata: jsonb("metadata"),
  sortOrder: integer("sort_order").default(0),
  isSelected: boolean("is_selected").default(false),
  isEdited: boolean("is_edited").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
