
import { Schema, model, models } from "mongoose";

const UserSearchSchema = new Schema({
    user:{
        type:String,
        required: [true, 'User is required'],
        index: true
    },
    tagID:{
        type:String,
        required: [true, 'Search id is required']
    }
});


const UserSearch = models.UserSearch || model("UserSearch", UserSearchSchema);
export default UserSearch;