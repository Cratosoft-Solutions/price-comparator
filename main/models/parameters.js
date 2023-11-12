
import { Schema, model, models } from "mongoose";

const ParameterSchema = new Schema({
    key:{
        type: String,
        required: [true, 'Key is required'],
        index:true
    },
    value:{
        type: String,
        required: [true, 'value is required'],
    }
});


const Parameter = models.Parameter || model("Parameter", ParameterSchema);
export default Parameter;