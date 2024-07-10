import { connectToDB } from "@utils/database";
import Product from "@models/product";
import Payment from "@models/payment";
import { currentDateWithTimeOffset } from "@utils/functions";

export const POST = async (req) => {
  try {
    const productToSave = await req.json();
    let formatedProduct = {
      store: productToSave.store,
      name: productToSave.name,
      description: productToSave.description,
      indexedField:
        productToSave.name.toUpperCase() +
        " " +
        productToSave.description.toUpperCase(),
      category: productToSave.category,
      price: productToSave.price,
      especialprice: productToSave.especialprice,
      currency: productToSave.currency,
      image: productToSave.image,
      stock: productToSave.stock,
      negotiable: productToSave.negotiable,
      advertising: JSON.parse(productToSave.advertising),
      email: productToSave.email,
      contactNumber: productToSave.contactNumber,
      address: productToSave.address
    };

    if (productToSave.category == "CAR" || productToSave.category == 'HOUSES') {
      const otherInformation = JSON.parse(productToSave.otherItemInformation);
      formatedProduct = {
        ...formatedProduct,
        otherinformation: otherInformation,
      };       
    }

    /** Logic for services */
    if (productToSave.category === 'SERVICES') {
      formatedProduct.serviceType = productToSave.serviceType;
      formatedProduct.modalityType = productToSave.modalityType;
      formatedProduct.province = productToSave.province;
    }
    
    let createdID;
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();

    //check if Product exists
    const productExists = await Product.findOne({
      _id: productToSave.id,
    });

    //if not, create new product
    if (!productExists) {
      formatedProduct.createdAt = currentDateWithTimeOffset();
      formatedProduct.updatedAt = currentDateWithTimeOffset();
      formatedProduct.lastTimeSeen = currentDateWithTimeOffset();
      formatedProduct.dailySearches= 1;
      formatedProduct.totalSearches= 1;
      console.log(`Prodcut to save: ${formatedProduct}`);
      const result = await Product.create(formatedProduct);
      createdID = result._id.toString();
    } else {
      createdID = productToSave.id;
      formatedProduct.updatedAt = currentDateWithTimeOffset();
      console.log(`Prodcut to update: ${formatedProduct}`);
      console.log("Actualizando producto: " + productToSave.id);
      await Product.updateOne({ _id: productToSave.id }, formatedProduct);
    }

    if (productToSave.savePaymentData) {
      const paymentData = JSON.parse(productToSave.paymentData);
      const paymentDataToSave = {
        email: productToSave.email,
        description: "Payment for: " + productToSave.name,
        user: productToSave.store,
        paymentId: paymentData.id,
        refNumber: paymentData.refNumber,
        customerId: paymentData.customerId,
        paymentMethodId: paymentData.paymentMethodId,
        status: paymentData.status,
        productId: {linkedProducts:[{productId: createdID}]}
      };

     await Payment.create(paymentDataToSave);
    }


    return new Response(JSON.stringify({ id: createdID }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};