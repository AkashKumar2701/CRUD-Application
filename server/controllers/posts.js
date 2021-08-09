import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

// function to fetch all the posts from DB and return response to frontend
export const getPosts = async (req, res) => {
    // current page
    const { page } = req.query;
    
    try {
        // limits of posts per page
        const LIMIT = 8;

        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        
        // total number of posts : helpful in pagination
        const total = await PostMessage.countDocuments({});
        // get posts in the order in which they were created

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        // send response back to frontend
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        console.log(error);
        
        res.status(404).json({ message: error.message });
    }
}
// function to fetch  posts by searchQuery from DB and return response to frontend
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        // find all the posts which are having the title equal to searchQuery.title and tags in searchQuery.tags
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        // return response
        res.json({ data: posts });
    } catch (error) {   
        console.log(error);
         
        res.status(404).json({ message: error.message });
    }
}
// function to fetch post by ID from DB and return response to frontend
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// function to create a new post and upload it to DB and then return response to frontend
export const createPost = async (req, res) => {
    const post = req.body;

    // create new post
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// function to update existing post In DB and return updated post to frontend
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

// function to delete a specific post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

// function to update the likes or upvotes of the post In DB and return updated Post to frontend
export const likePost = async (req, res) => {
    const { id } = req.params;
    

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    // if id of the post is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    // if user id is not present in the likes array of that post then it means user is liking the post
    // we will increment the upvotes
    if (index === -1) {
      post.likes.push(req.userId);
    } 
    // if user id is present in the likes array of that post then it means user is disliking the post
    // we will decrement the upvotes
    else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // updation in DB
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}
 
// function to add a new comment on the post in DB and return response to frontend
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;