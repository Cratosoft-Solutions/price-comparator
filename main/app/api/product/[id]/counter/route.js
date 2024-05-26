import { connectToDB } from "@utils/database";
import Product from "@models/product";
import { dailycounter,currentDateWithTimeOffset } from "@utils/functions";

export const PUT = async (request, { params }) => {
  try {
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();

    console.log(`Starting put api: ${JSON.stringify(params)}`)

    //check if Product exists
    const productToUpdate = await Product.findOne({
      _id: params.id,
    });

    //if not, create new product
    if (productToUpdate) {
      console.log(`Increasing counter for product: ${params.id}`);
      productToUpdate.dailySearches = dailycounter(
        productToUpdate.lastTimeSeen,
        productToUpdate.dailySearches
      );
      productToUpdate.totalSearches = productToUpdate.totalSearches + 1;
      productToUpdate.lastTimeSeen = currentDateWithTimeOffset();
      await Product.updateOne({ _id: productToUpdate.id }, productToUpdate);
      return new Response(JSON.stringify({ message: "Counter updated" }), {
        status: 200,
      });
    }
    return new Response(
      JSON.stringify({ message: "Error updating counter values" }),
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
