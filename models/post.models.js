import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";
const postSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostModel = new mongoose.model(COLLECTIONS.POSTS, postSchema);

export const createPostDB = (data) => {
  return PostModel.create(data);
};
export const findPostDB = (info) => PostModel.findOne(info);
export const updatePostDB = (...args) => PostModel.findOneAndUpdate(...args);
export default PostModel;
