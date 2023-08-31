
import { Schema, model, models } from "mongoose";

const TagsSchema = new Schema({
    category:{
        type:String,
        required: [true, 'Category is required'],
        index:true
    },
    key:{
        type: String,
        required: [true, 'Key is required'],
        index:true
    }
});


const Tags = models.Tags || model("Tags", TagsSchema);
export default Tags;