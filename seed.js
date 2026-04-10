import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

dotenv.config();
await connectDB();

// ── Clear existing data ──────────────────────────────────────────────────────
await Promise.all([
  User.deleteMany({}),
  Post.deleteMany({}),
  Comment.deleteMany({}),
]);
console.log("🗑  Cleared existing data");

// ── Seed Users ───────────────────────────────────────────────────────────────
const [shahd, emad, mariam, jana, omar] = await User.insertMany([
  { name: "Shahd",  email: "shahd@gmail.com"  },
  { name: "Emad",   email: "emad@gmail.com"   },
  { name: "Mariam", email: "mariam@gmail.com" },
  { name: "Jana",   email: "jana@gmail.com"   },
  { name: "Omar",   email: "omar@gmail.com"   },
]);
console.log("👤 Users seeded");

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
  "when an unknown printer took a galley of type and scrambled it to make a type " +
  "specimen book. It has survived not only five centuries, but also the leap into " +
  "electronic typesetting, remaining essentially unchanged.";

// ── Seed Posts ───────────────────────────────────────────────────────────────
const [post1, post2, post3, post4] = await Post.insertMany([
  { title: "IAM user and role",              blog: lorem, userId: emad._id  },
  { title: "Stack memory vs queue memory",   blog: lorem, userId: shahd._id },
  { title: "Authorization and authentication", blog: lorem, userId: jana._id  },
  { title: "Docker containers",              blog: lorem, userId: shahd._id },
]);
console.log("📝 Posts seeded");

// ── Seed Comments ─────────────────────────────────────────────────────────────
await Comment.insertMany([
  { comment: "Great job!",                        postId: post2._id, userId: emad._id   },
  { comment: "Awesome blog",                      postId: post1._id, userId: shahd._id  },
  { comment: "This blog taught me a lot, keep going!", postId: post1._id, userId: mariam._id },
  { comment: "Great job!",                        postId: post3._id, userId: shahd._id  },
]);
console.log("💬 Comments seeded");

console.log("\n✅ Database seeded successfully!");
process.exit(0);