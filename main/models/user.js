
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'email already exits'],
        required: [true, 'Email is required'],
    },
    username:{
        type: String,
        unique: [true, 'username already exits'],
        required: [true, 'username is required'],
    },
    image:{
        type: String
    },
    password:{
        type:String
    },
    provider:{
        type: String,
        required: [true, 'provider is required'],
    }
});

const User = models.User || model("User", UserSchema);
export default User;