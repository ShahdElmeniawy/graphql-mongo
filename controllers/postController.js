import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";


export const getPosts = async () => {
  return await Post.find();
};

export const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new Error(`Post with id ${id} not found`);
  return post;
};

export const getPostUser = async (userId) => {
  return await User.findById(userId);
};

export const getPostComments = async (postId) => {
  return await Comment.find({ postId });
};


export const addPost = async ({ title, blog }, userId) => {
  const userExists = await User.findById(userId);
  if (!userExists) throw new Error(`User with id ${userId} not found`);

  const newPost = new Post({ title, blog, userId });
  return await newPost.save();
};

export const updatePost = async (id, data, userId) => {
  const post = await Post.findById(id);
  if (!post) throw new Error(`Post with id ${id} not found`);
  if (post.userId.toString() !== userId)
    throw new Error("Unauthorized: you are not the owner of this post");

  return await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) throw new Error(`Post with id ${id} not found`);
  if (post.userId.toString() !== userId)
    throw new Error("Unauthorized: you are not the owner of this post");

  await Comment.deleteMany({ postId: id });
  return await Post.findByIdAndDelete(id);
};