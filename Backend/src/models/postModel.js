import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.statics.getPosts = function (date, limit) {
  const condition = date ? { createdAt: { $lt: new Date(date) } } : {};
  limit = limit ?? 0;
  return this.find(condition, { __v: 0 })
    .limit(limit)
    .populate({
      path: "author",
      select: "username",
    })
    .sort({ createdAt: -1 })
    .lean();
};

const Post = mongoose.model("Post", postSchema);
export default Post;
