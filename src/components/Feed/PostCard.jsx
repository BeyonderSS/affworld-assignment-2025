"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, ChevronUp, ChevronDown } from "lucide-react"
import { addComment, toggleLike } from "@/app/actions/feedActions"
import { CommentSchema } from "@/lib/schema"

export function PostCard({ post, currentUserId }) {
  const [showComments, setShowComments] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CommentSchema),
  })

  const onAddComment = async (data) => {
    const result = await addComment(post._id, { text: data.text }, currentUserId)
    if (result.success) {
      setComments([...comments, { author: { _id: currentUserId }, text: data.text, createdAt: new Date() }])
      reset()
    } else {
      console.error(result.error)
    }
  }

  const handleLike = async () => {
    const result = await toggleLike(post._id, currentUserId)
    if (result.success) {
      setLikes(likes.includes(currentUserId) ? likes.filter((id) => id !== currentUserId) : [...likes, currentUserId])
    } else {
      console.error(result.error)
    }
  }

  // Share post function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.caption,
        url: `${window.location.origin}/posts/${post._id}`, // Share the link of the post
      })
        .then(() => console.log('Post shared successfully!'))
        .catch((error) => console.error('Error sharing post:', error))
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Sharing is not supported on this browser.');
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage className="object-cover" src={post.author.profilePictureUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={post.contentUrl || "/placeholder.svg"}
          alt={post.caption}
          width={800}
          height={600}
          className="w-full h-auto"
        />
        <p className="p-4 text-sm">{post.caption}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <Heart className={`w-5 h-5 mr-1 ${likes.includes(currentUserId) ? "fill-red-500" : ""}`} />
          {likes.length}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
          <MessageCircle className="w-5 h-5 mr-1" />
          {comments.length}
          {showComments ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="w-5 h-5 mr-1" />
          Share
        </Button>
      </CardFooter>
      {showComments && (
        <div className="px-4 py-2 border-t border-border">
          {comments.map((comment, index) => (
            <CommentItem key={comment._id || index} comment={comment} />
          ))}
          <form onSubmit={handleSubmit(onAddComment)} className="flex items-center space-x-2 mt-4">
            <Input
              placeholder="Add a comment..."
              {...register("text")}
              className={errors.text ? "border-red-500" : ""}
            />
            <Button type="submit" size="sm">
              Post
            </Button>
          </form>
          {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
        </div>
      )}
    </Card>
  )
}

function CommentItem({ comment }) {
  return (
    <div className="flex items-start space-x-2 mb-2">
      <Avatar className="w-6 h-6">
        <AvatarImage className="object-cover" src={comment.author.profilePictureUrl} alt={comment.author.name} />
        <AvatarFallback>{comment?.author?.name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">{comment.author.name}</span> {comment.text}
        </p>
        <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
