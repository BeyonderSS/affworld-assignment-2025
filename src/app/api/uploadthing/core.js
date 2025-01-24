import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/utils/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Define a FileRoute for document uploads
  documentUploader: f({
    pdf: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  })
    // Middleware for authentication and metadata
    .middleware(async ({ req }) => {
      // Authenticate the user
      const user = await auth(req);

      // If no user is found, throw an error
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs after a document upload is complete
      console.log("Document upload complete for userId:", metadata.userId);
      console.log("Uploaded document URL:", file.url);

      // Perform any additional server-side actions here (e.g., database updates)
      return { uploadedBy: metadata.userId };
    }),
};
