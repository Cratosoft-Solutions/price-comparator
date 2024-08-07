import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    store:{
        type: String,
        required: [true, 'Tienda es requerida'],
    },
    name:{
        type: String,
        required: [true, 'Nombre del producto es requerido']
    },
    description:{
        type: String,
        required: [true, 'Descripcion es requerida'],
    },
    indexedField:{
        type: String,
        required: [true, 'Nombre + Desc del producto es requerido'],
        index:true
    },
    category:{
        type: String,
        required: [true, 'Categoria es requerida'],
    },
    price:{
        type:Number,
        required: [true, 'Precio es requerido'],
    },
    especialprice:{
        type:Number,
    },
    stock:{
        type:Number,
    },
    currency:{
        type:String,
    },
    image:{
        type: String
    },
    negotiable:{
        type: String
    },
    otherinformation:{
        type: JSON
    },
    serviceType:{
        type:String,
    },
    modalityType:{
        type:String,
    },
    province:{
        type:String,
    },
    createdAt: { type: Date, index: true },
    updatedAt: { type: Date, index: true },
    advertising: { type: JSON },
    dailySearches: {type: Number},
    totalSearches: {type: Number},
    lastTimeSeen: { type: Date, index: true },
    socialMediaURL: {type: String},
    email:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    address:{
        type:String,
    }
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;