import { connectToDB } from "@utils/database";
import Product from "@models/product";
import Payment from "@models/payment";
import { currentDateWithTimeOffset } from "@utils/functions";
import { put } from '@vercel/blob';

export const POST = async (req) => {
  try {
    const productToSave = await req.json();

    //Save image for Social Media Share
    let socialMediaURL;
    try {
      const blob = b64toBlob(productToSave.socialMediaImage.split(',')[1], 'data:image/jpeg;base64');
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const result =  await put("abc" + ".jpg", buffer, { access: 'public' });
      socialMediaURL = result.url;
    } catch (error) {
      socialMediaURL = "https://encuentralofacilcr.com/assets/images/default-social-media-image.png"
    }

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
      address: productToSave.address,
      socialMediaURL: socialMediaURL
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
      const result = await Product.create(formatedProduct);
      createdID = result._id.toString();
    } else {
      createdID = productToSave.id;
      formatedProduct.updatedAt = currentDateWithTimeOffset();
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
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};



const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}