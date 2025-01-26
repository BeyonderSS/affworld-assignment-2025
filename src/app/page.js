import { getPosts } from "@/app/actions/feedActions";
import { PostCard } from "@/components/Feed/PostCard";
import { getSession } from "./actions/authActions";

export default async function Home() {
  const result = await getPosts();
  const posts = result.success ? result.data : [];
  const session = await getSession()
  return (
    <div className="container mx-auto px-4 py-8">

      {posts.length === 0 ? (
        // Display a message when no posts are available
        <div className="text-center text-gray-600">
          <p className="text-xl">No posts found!</p>
          <p className="mt-2">Follow people or start creating posts to build your feed. 🚀</p>
        </div>
      ) : (
        // Render the posts when available
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} currentUserId={session._id} />
          ))}
        </div>
      )}
    </div>
  );
}
