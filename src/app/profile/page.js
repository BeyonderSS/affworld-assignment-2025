"use client"

import React, { Suspense, useState } from "react"
import { updateUserProfile } from "../actions/profileActions"
import useSession from "@/hooks/useSession"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UploadDropzone } from "@/utils/uploadthing"
import { Loader2, Pencil, Camera, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
function UpdateProfileWrapper() {
  const { isAuthenticated, sessionData } = useSession()

if(!isAuthenticated) return
<div className="flex items-center justify-center h-screen">
  <Loader2 className="w-8 h-8 animate-spin" />
</div>
return(

  <UpdateProfile sessionData={sessionData} />
)

}
function UpdateProfile({sessionData}) {
  const userID = sessionData?._id
  const { toast } = useToast()

  const [name, setName] = useState(sessionData?.name || "")
  const [email, setEmail] = useState(sessionData?.email || "")
  const [profilePictureUrl, setProfilePictureUrl] = useState(sessionData?.profilePictureUrl || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = async () => {
    if (!userID) return

    setIsSubmitting(true)

    try {
      const response = await updateUserProfile({ userId: userID, name, email, profilePictureUrl })
      if (response.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
          duration: 3000,
        })
        setIsEditing(false)
      } else {
        toast({
          title: "Update Failed",
          description: response.message || "Failed to update profile.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className="relative pb-8">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center items-center">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src={profilePictureUrl} className="object-cover" alt="Profile Picture" />
                <AvatarFallback className="text-4xl">{sessionData?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="">
                  <UploadDropzone
                    endpoint="profileImage"
                    onClientUploadComplete={(res) => {
                      if (res && res.length > 0) {
                        setProfilePictureUrl(res[0].url)
                        toast({
                          title: "Image Uploaded",
                          description: "Your profile picture has been updated.",
                          duration: 3000,
                        })
                      }
                    }}
                    onUploadError={(error) => {
                      console.error(`Upload failed: ${error.message}`)
                      toast({
                        title: "Upload Failed",
                        description: "Failed to upload image. Please try again.",
                        variant: "destructive",
                      })
                    }}
                  >
                    {({ startUpload }) => (
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                        onClick={() => startUpload()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </UploadDropzone>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end space-x-4 pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setName(sessionData?.name || "")
                setEmail(sessionData?.email || "")
                setProfilePictureUrl(sessionData?.profilePictureUrl || "")
                setIsEditing(false)
              }}
            >
              Reset
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting || !name || !email}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default UpdateProfileWrapper

