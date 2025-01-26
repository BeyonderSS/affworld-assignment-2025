import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/utils/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Route for handling both image and video uploads
  postFiles: f({
    image: {
      maxFileSize: "10MB", // Max size for images
      maxFileCount: 1, // Allow up to 5 images per upload
    },
    video: {
      maxFileSize: "50MB", // Max size for videos
      maxFileCount: 1, // Allow one video per upload
    },
  })
    .middleware(async ({ req }) => {
      // Authenticate the user
      const user = await auth(req);

      // If no user is found, throw an error
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File upload complete for userId:", metadata.userId);
      console.log("Uploaded file URL:", file.url);
      console.log("Uploaded file type:", file.fileType);

      // Perform any additional server-side actions here (e.g., database updates)
      return { uploadedBy: metadata.userId };
    }),  profileImage: f({
      image: {
        maxFileSize: "5MB", // Max size for profile pictures
        maxFileCount: 1, // Only one image allowed per upload
      },
    })
      .middleware(async ({ req }) => {
        // Authenticate the user
        const user = await auth(req);
  
        // If no user is found, throw an error
        if (!user) throw new UploadThingError("Unauthorized");
  
        return { userId: user.userId };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        console.log("File upload complete for userId:", metadata.userId);
        console.log("Uploaded file URL:", file.url);
        console.log("Uploaded file type:", file.fileType);
  
        // Perform any additional server-side actions here (e.g., database updates)
        return { uploadedBy: metadata.userId };
      }),
};
