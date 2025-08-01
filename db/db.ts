// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  ssl: {
    rejectUnauthorized: false,
  },
})

const db = drizzle(pool, { schema })

export { db, pool }
