import { connectToDB } from "@utils/database";
import Search from "@models/search";

export const POST = async (req) => {
  try {
    const searchToSave = await req.json();
    let createdID;
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();

    //check if Search exists
    const searchExists = await Search.findOne({
      key: searchToSave.key
    });

    //if not, create new Search
    if (!searchExists) {
      const result = await Search.create({
        key:searchToSave.key,
        result:searchToSave.result
      });
      createdID = result._id.toString();
    } else {
      console.log("ingrese aca");
      await Search.updateOne(
        {
          key: searchToSave.key
        },
        {
          result: searchToSave.result,
        }
      );
    }
    return new Response(JSON.stringify({ id: createdID }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
