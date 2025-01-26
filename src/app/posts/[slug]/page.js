import { getPostById } from "@/app/actions/feedActions"
import { PostCard } from "@/components/Feed/PostCard"

export default async function PostPage({ params }) {
  const result = await getPostById(params.slug)

  if (!result.success) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>
  }

  const post = result.data

  return (
    <div className="container mx-auto px-4 py-8">
      <PostCard post={post} currentUserId="currentUserId" />
    </div>
  )
}

