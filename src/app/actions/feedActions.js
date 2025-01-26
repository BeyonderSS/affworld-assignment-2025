"use server";

import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

// Create a new post
export async function createPost(postData, userId) {
  try {
    await dbConnect();

    if (!userId) {
      return {
        success: false,
        error: "User ID is required.",
      };
    }

    const { caption, contentUrl, contentKey } = postData;
    if (!caption || !contentUrl || !contentKey) {
      return {
        success: false,
        error: "Caption, content URL, and content key are required.",
      };
    }

    const newPost = new Post({
      author: userId,
      caption,
      contentUrl,
      contentKey,
    });

    await newPost.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newPost)),
      message: "Post created successfully.",
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while creating the post.",
    };
  }
}

// Get all posts (with optional filters)
export async function getPosts(filter = {}, options = {}) {
  try {
    await dbConnect();

    const posts = await Post.find(filter)
      .sort(options.sort || { createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 10)
      .populate("author", "name email") // Adjust fields as necessary
      .populate("comments.author", "name email"); // Populate comment authors

    return {
      success: true,
      data: JSON.parse(JSON.stringify(posts)),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while fetching posts.",
    };
  }
}

// Get a single post by ID
export async function getPostById(postId) {
  try {
    await dbConnect();

    if (!postId) {
      return {
        success: false,
        error: "Post ID is required.",
      };
    }

    const post = await Post.findById(postId)
      .populate("author", "name email")
      .populate("comments.author", "name email"); // Populate comment authors

    if (!post) {
      return {
        success: false,
        error: "Post not found.",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(post)),
    };
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while fetching the post.",
    };
  }
}

// Update a post by ID
export async function updatePostById(postId, updateData) {
  try {
    await dbConnect();

    if (!postId) {
      return {
        success: false,
        error: "Post ID is required.",
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return {
        success: false,
        error: "Post not found.",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedPost)),
      message: "Post updated successfully.",
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while updating the post.",
    };
  }
}

// Delete a post by ID
export async function deletePostById(postId) {
  try {
    await dbConnect();

    if (!postId) {
      return {
        success: false,
        error: "Post ID is required.",
      };
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return {
        success: false,
        error: "Post not found.",
      };
    }

    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while deleting the post.",
    };
  }
}

// Add a comment to a post
export async function addComment(postId, commentData, userId) {
  try {
    await dbConnect();

    if (!postId || !userId) {
      return {
        success: false,
        error: "Post ID and User ID are required.",
      };
    }

    if (!commentData.text) {
      return {
        success: false,
        error: "Comment text is required.",
      };
    }

    const post = await Post.findById(postId);

    if (!post) {
      return {
        success: false,
        error: "Post not found.",
      };
    }

    post.comments.push({
      author: userId,
      text: commentData.text,
    });

    await post.save();

    return {
      success: true,
      message: "Comment added successfully.",
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while adding the comment.",
    };
  }
}

// Like or Unlike a post
export async function toggleLike(postId, userId) {
  try {
    await dbConnect();

    if (!postId || !userId) {
      return {
        success: false,
        error: "Post ID and User ID are required.",
      };
    }

    const post = await Post.findById(postId);

    if (!post) {
      return {
        success: false,
        error: "Post not found.",
      };
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter((like) => like.toString() !== userId.toString());
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    return {
      success: true,
      message: isLiked ? "Post unliked successfully." : "Post liked successfully.",
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while toggling like.",
    };
  }
}
