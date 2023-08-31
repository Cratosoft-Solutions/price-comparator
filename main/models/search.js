
import { Schema, model, models } from "mongoose";

const SearchSchema = new Schema({
    key:{
        type: String,
        required: [true, 'Category is required'],
        index:true
    },
    result:{
        type: String,
        required: [true, 'result is required'],
    }
});


const Search = models.Search || model("Search", SearchSchema);
export default Search;