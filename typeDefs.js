const typeDefs = `#graphql
  type Query {
    hello: String
    users: [User]
    posts: [Post]
    comments: [Comment]
    user(id: ID!): User
    post(id: ID!): Post
    comment(id: ID!): Comment
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    blog: String!
    user: User!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
    post: Post!
  }

  input UserInput {
    name: String!
    email: String!
  }

  input PostInput {
    title: String!
    blog: String!
  }

  input CommentInput {
    comment: String!
  }

  type Mutation {
    addUser(user: UserInput!): User
    addPost(post: PostInput!, userId: ID!): Post
    addComment(comment: CommentInput!, postId: ID!, userId: ID!): Comment

    deleteUser(id: ID!): User
    deletePost(id: ID!, userId: ID!): Post
    deleteComment(id: ID!, userId: ID!): Comment

    updateUser(id: ID!, user: UserInput!): User
    updatePost(id: ID!, post: PostInput!, userId: ID!): Post
    updateComment(id: ID!, comment: CommentInput!, userId: ID!): Comment
  }
`;

export default typeDefs;