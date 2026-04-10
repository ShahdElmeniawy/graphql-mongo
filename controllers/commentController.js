import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";


export const getComments = async () => {
  return await Comment.find();
};

export const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error(`Comment with id ${id} not found`);
  return comment;
};

export const getCommentUser = async (userId) => {
  return await User.findById(userId);
};

export const getCommentPost = async (postId) => {
  return await Post.findById(postId);
};


export const addComment = async ({ comment }, postId, userId) => {
  const [postExists, userExists] = await Promise.all([
    Post.findById(postId),
    User.findById(userId),
  ]);
  if (!postExists) throw new Error(`Post with id ${postId} not found`);
  if (!userExists) throw new Error(`User with id ${userId} not found`);

  const newComment = new Comment({ comment, postId, userId });
  return await newComment.save();
};

export const updateComment = async (id, data, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error(`Comment with id ${id} not found`);
  if (comment.userId.toString() !== userId)
    throw new Error("Unauthorized: you are not the owner of this comment");

  return await Comment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteComment = async (id, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error(`Comment with id ${id} not found`);
  if (comment.userId.toString() !== userId)
    throw new Error("Unauthorized: you are not the owner of this comment");

  return await Comment.findByIdAndDelete(id);
};