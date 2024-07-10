import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email es requerido'],
    },
    description:{
        type: String,
        required: [true, 'Descripcion es requerida'],
    },
    user:{
        type:String,
        required:[true, 'Usuario es requerido']
    },
    paymentId:{
        type:String,
        required:[true, 'Payment id es requerido']
    },
    refNumber:{
        type:String,
        required:[true, 'Referencia es requerida']
    },
    customerId:{
        type:String,
        required:[true, 'Customer id es requerido']
    },
    paymentMethodId:{
        type:String,
        required:[true, 'Payment method id es requerido']
    },
    status:{
        type:String,
        required:[true, 'Status es requerido']
    },
    productId:{
        type:JSON
    },
    createdAt: { type: Date, index: true },
    updatedAt: { type: Date, index: true }       
});

const Payment = models.Payment || model("Payment", PaymentSchema);
export default Payment;