import Link from 'next/link'
import { getPosts, createPostAction } from '@/app/actions'

export const revalidate = 30

export default async function Post() {
  const posts = await getPosts()

  return (
    <div className="font-sans max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </header>

      <main className="space-y-8">
        {/* Posts List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Posts</h2>
          {!posts || posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Create one below!</p>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-2">{post.content}</p>
                  <time className="text-sm text-gray-500">
                    {post.createdAt?.toLocaleDateString() || 'Unknown date'}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Create Post Form */}
        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          <form action={createPostAction} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title..."
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post content..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Post
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
