import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

export const getUserPosts = async (userId) => {
  return await Post.find({ userId });
};


export const addUser = async ({ name, email }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error(`Email "${email}" is already in use`);

  const newUser = new User({ name, email });
  return await newUser.save();
};

export const updateUser = async (id, data) => {
  const updated = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error(`User with id ${id} not found`);
  return updated;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error(`User with id ${id} not found`);

  const userPosts = await Post.find({ userId: id });
  const postIds = userPosts.map((p) => p._id);
  await Comment.deleteMany({ postId: { $in: postIds } });
  await Post.deleteMany({ userId: id });
  await Comment.deleteMany({ userId: id });

  return user;
};