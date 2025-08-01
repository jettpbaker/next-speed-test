import { desc } from 'drizzle-orm'
import { db } from './db'
import { posts_table, type DB_PostType } from './schema'

export async function getPosts(): Promise<DB_PostType[]> {
  try {
    return await db
      .select()
      .from(posts_table)
      .orderBy(desc(posts_table.createdAt))
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

export async function createPost(title: string, content: string) {
  try {
    const [newPost] = await db
      .insert(posts_table)
      .values({ title, content })
      .returning()
    return newPost
  } catch (error) {
    console.error('Error creating post:', error)
    return null
  }
}
