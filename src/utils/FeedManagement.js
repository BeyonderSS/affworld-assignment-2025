"use server"

import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import User from "@/models/User";

export async function createPost(authorId, caption, contentUrl) {
    try {
        await dbConnect();

        // Check if the user exists
        const author = await User.findById(authorId);
        if (!author) {
            return { success: false, error: "User not found." };
        }

        // Create a new post
        const post = new Post({
            author: authorId,
            caption,
            contentUrl,
        });

        await post.save();

        return { success: true, data: post, message: "Post created successfully." };
    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, error: error.message };
    }
}


export async function getPosts() {
    try {
        await dbConnect();

        // Retrieve posts sorted by creation date (most recent first)
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("author", "name email profilePictureUrl"); // Populate author details

        return { success: true, data: posts, message: "Posts retrieved successfully." };
    } catch (error) {
        console.error("Error retrieving posts:", error);
        return { success: false, error: error.message };
    }
}

export async function getPostsByAuthor(authorId) {
    try {
        await dbConnect();

        // Retrieve posts for a specific author
        const posts = await Post.find({ author: authorId })
            .sort({ createdAt: -1 })
            .populate("author", "name email profilePictureUrl"); // Populate author details

        if (!posts.length) {
            return { success: false, message: "No posts found for this author." };
        }

        return { success: true, data: posts, message: "Author's posts retrieved successfully." };
    } catch (error) {
        console.error("Error retrieving author's posts:", error);
        return { success: false, error: error.message };
    }
}

export async function deletePost(postId) {
    try {
        await dbConnect();

        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return { success: false, error: "Post not found." };
        }

        // Delete the post
        await Post.deleteOne({ _id: postId });

        return { success: true, message: "Post deleted successfully." };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, error: error.message };
    }
}
