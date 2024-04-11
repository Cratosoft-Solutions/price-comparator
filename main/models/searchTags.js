
import { Schema, model, models } from "mongoose";

const TagsSchema = new Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    index: true,
  },
  key: {
    type: String,
    required: [true, "Key is required"],
    index: true,
  },
  createdAt: { type: Date, index: true },
  updatedAt: { type: Date, index: true },
  dailySearches: {type: Number},
  totalSearches: {type: Number},
});


const Tags = models.Tags || model("Tags", TagsSchema);
export default Tags;