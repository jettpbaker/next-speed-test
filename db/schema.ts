import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

// Posts table - simple post data
export const posts_table = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type DB_PostType = typeof posts_table.$inferSelect
