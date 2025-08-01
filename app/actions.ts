'use server'

import {
  getPosts as getPostQuery,
  createPost as createPostQuery,
} from '@/db/queries'
import { revalidatePath } from 'next/cache'

export async function getPosts() {
  const posts = await getPostQuery()
  if (!posts) return null
  return posts
}

export async function createPostAction(formData: FormData): Promise<void> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    return
  }

  await createPostQuery(title, content)
  revalidatePath('/posts') // Single revalidation point
}
