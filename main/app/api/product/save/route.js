import { connectToDB } from "@utils/database";
import Product from "@models/product";
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
      negotiable: productToSave.negotiable
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
      console.log(`Prodcut to save: ${formatedProduct}`);
      const result = await Product.create(formatedProduct);
      createdID = result._id.toString();
    } else {
      formatedProduct.updatedAt = currentDateWithTimeOffset();
      console.log(`Prodcut to update: ${formatedProduct}`);
      console.log("Actualizando producto: " + productToSave.id);
      await Product.updateOne({ _id: productToSave.id }, formatedProduct);
    }
    return new Response(JSON.stringify({ id: createdID }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};