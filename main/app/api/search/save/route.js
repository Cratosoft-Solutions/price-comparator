import { connectToDB } from "@utils/database";
import Search from "@models/search";
import { genericDatabaseOperation } from "@utils/functions";
import { isTokenValid } from '@utils/authFunctionsServer';

export const POST = async (req) => {
  try {
    //Endpoint Token Validation
    const tokenStatus = await isTokenValid();
    if (!tokenStatus)
      return new Response("Unauthorized Access " + req.method, { status: 401 });

    const searchToSave = await req.json();
    let createdID;

    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();

    //check if Search exists
    const searchExists = await genericDatabaseOperation(
      Search,
      { key: searchToSave.key },
      "FINDONE"
    );

    //if not, create new Search
    if (!searchExists) {
      let result = await genericDatabaseOperation(
        Search,
        {
          key: searchToSave.key,
          result: searchToSave.result,
          expireAt: Date.now()
        },
        "CREATE"
      );
      createdID = result._id.toString();
    } else {
      await genericDatabaseOperation(
        Search,
        {
          key: searchToSave.key,
        },
        "UPDATEONE",
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
