import { connectToDB } from "@utils/database";
import Search from "@models/search";
import Tags from "@models/searchTags";

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
      let result = await Search.create({
        key:searchToSave.key,
        result:searchToSave.result
      });
      createdID = result._id.toString();
      
      const tagData =  searchToSave.key.replaceAll(".", " ").split("-").slice(-2);
      console.log(tagData);
      const tagExists = await Tags.findOne({
        category: tagData[0], key:tagData[1]
      });

      if(!tagExists){
        result = Tags.create({category: tagData[0], key:tagData[1]})
      }

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
