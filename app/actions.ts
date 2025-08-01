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

export async function createPost(title: string, content: string) {
  const newPost = await createPostQuery(title, content)
  if (!newPost) return null
  revalidatePath('/posts')
  return newPost
}
