import { z } from "zod"

export const PostSchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  contentUrl: z.string().url("Invalid URL"),
  contentKey: z.string().min(1, "Content key is required"),
})

export const CommentSchema = z.object({
  text: z.string().min(1, "Comment text is required"),
})

