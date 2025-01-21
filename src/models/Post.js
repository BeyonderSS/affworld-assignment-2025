import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Post author reference
  caption: { type: String, required: true }, // Post caption
  contentUrl: { type: String, required: true }, // Content URL (e.g., image or video URL)
  createdAt: { type: Date, default: Date.now }, // Post creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});

// Indexes
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 }); // For sorting by creation time

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
