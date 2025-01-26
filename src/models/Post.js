import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Comment author reference
  text: { type: String, required: true }, // Comment text
  createdAt: { type: Date, default: Date.now }, // Comment creation timestamp
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Post author reference
  caption: { type: String, required: true }, // Post caption
  contentUrl: { type: String, required: true }, // Content URL (e.g., image or video URL)
  contentKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Post creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
  comments: [commentSchema], // Array of comments
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user references who liked the post
});

// Indexes
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 }); // For sorting by creation time
postSchema.index({ "comments.createdAt": -1 }); // For sorting by comment creation time

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
