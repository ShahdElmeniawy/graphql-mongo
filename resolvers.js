import * as userController from "./controllers/userController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";

const resolvers = {
  // ─── Queries ────────────────────────────────────────────────────────────────
  Query: {
    hello: () => "Hello from GraphQL + MongoDB!",

    users:    () => userController.getUsers(),
    posts:    () => postController.getPosts(),
    comments: () => commentController.getComments(),

    user:    (_, { id }) => userController.getUserById(id),
    post:    (_, { id }) => postController.getPostById(id),
    comment: (_, { id }) => commentController.getCommentById(id),
  },

  // ─── Type Resolvers ─────────────────────────────────────────────────────────
  User: {
    posts: ({ id }) => userController.getUserPosts(id),
  },

  Post: {
    user:     ({ userId }) => postController.getPostUser(userId),
    comments: ({ id })     => postController.getPostComments(id),
  },

  Comment: {
    user: ({ userId }) => commentController.getCommentUser(userId),
    post: ({ postId }) => commentController.getCommentPost(postId),
  },

  // ─── Mutations ───────────────────────────────────────────────────────────────
  Mutation: {
    addUser:    (_, { user })                    => userController.addUser(user),
    addPost:    (_, { post, userId })            => postController.addPost(post, userId),
    addComment: (_, { comment, postId, userId }) => commentController.addComment(comment, postId, userId),

    deleteUser:    (_, { id })         => userController.deleteUser(id),
    deletePost:    (_, { id, userId }) => postController.deletePost(id, userId),
    deleteComment: (_, { id, userId }) => commentController.deleteComment(id, userId),

    updateUser:    (_, { id, user })            => userController.updateUser(id, user),
    updatePost:    (_, { id, post, userId })    => postController.updatePost(id, post, userId),
    updateComment: (_, { id, comment, userId }) => commentController.updateComment(id, comment, userId),
  },
};

export default resolvers;