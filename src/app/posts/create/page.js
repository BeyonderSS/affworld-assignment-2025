"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/app/actions/feedActions"
import { UploadDropzone } from "@/utils/uploadthing"
import useSession from "@/hooks/useSession"
import { z } from "zod"
import { Loader2, X } from "lucide-react"

const PostSchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  contentUrl: z.string().url("Invalid URL").optional(),
  contentKey: z.string().min(1, "Content key is required").optional(),
})

export default function CreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { sessionData, isAuthenticated } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: "",
      contentUrl: "",
      contentKey: "",
    },
  })

  const contentUrl = watch("contentUrl")
  const contentKey = watch("contentKey")

  const onSubmit = async (data) => {
    if (!contentUrl || !contentKey) {
      console.log("Please upload an image or video before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createPost(data, sessionData._id)
      if (result.success) {
        router.push("/")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className=" rounded-t-lg">
          <CardTitle className="text-xl font-semibold">Create a New Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <Controller
              name="contentUrl"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {!field.value ? (
                    <UploadDropzone
                      endpoint="postFiles"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          const uploadedFile = res[0]
                          setValue("contentUrl", uploadedFile.url)
                          setValue("contentKey", uploadedFile.key)
                        }
                      }}
                      onUploadError={(error) => {
                        console.error(`Upload failed: ${error.message}`)
                      }}
                    />
                  ) : (
                    <div className="relative">
                      {field.value.includes("image") ? (
                        <img
                          src={field.value || "/placeholder.svg"}
                          alt="Uploaded content"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ) : (
                        <video controls className="w-full h-64 rounded-lg">
                          <source src={field.value} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setValue("contentUrl", "")
                          setValue("contentKey", "")
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />

            <Controller
              name="caption"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="caption" className="text-sm font-medium text-gray-700">
                    Caption
                  </label>
                  <Textarea
                    id="caption"
                    placeholder="Write a caption for your post..."
                    className={`min-h-[100px] ${errors.caption ? "border-red-500" : ""}`}
                    {...field}
                  />
                  {errors.caption && <p className="text-red-500 text-xs">{errors.caption.message}</p>}
                </div>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full "
              disabled={isSubmitting || !contentUrl}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
