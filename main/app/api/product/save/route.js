import { connectToDB } from "@utils/database";
import Product from "@models/product";

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
    };

    if (productToSave.category == "CAR" || productToSave.category == 'HOUSES') {
      const otherInformation = JSON.parse(productToSave.otherItemInformation);
      formatedProduct = {
        ...formatedProduct,
        otherinformation: otherInformation,
      };
      console.log("11 ingresé  aca insertando",productToSave.category);
      console.log("22 ingresé  aca insertando",productToSave.otherItemInformation);
      console.log("33 ingresé  aca insertando",productToSave.otherInformation);            
    }

    if (productToSave.category === 'SERVICES') {
      formatedProduct.serviceType = productToSave.serviceType;
    }

/*     if (productToSave.category == 'HOUSES') {
      const otherinformation = JSON.parse(productToSave.otherHouseInformation);
      formatedProduct = {
        ...formatedProduct,
        otherinformation: otherinformation,
      };
      console.log("1 ingresé  aca insertando",productToSave.category);
      console.log("2 ingresé  aca insertando",productToSave.otherHouseInformation);
      console.log("3 ingresé  aca insertando",productToSave.otherInformation);      
    } */

    console.log(productToSave);
    let createdID;
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();

    //check if Product exists
    const productExists = await Product.findOne({
      _id: productToSave.id,
    });

    //if not, create new product
    if (!productExists) {
      console.log("ingresé  aca insertando");
      const result = await Product.create(formatedProduct);
      createdID = result._id.toString();
    } else {
      console.log("ingrese aca actualizando");
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