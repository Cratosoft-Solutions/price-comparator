import { connectToDB } from "@utils/database";
import Store from "@models/store";
import { genericCompression } from "@utils/functions";

export async function saveStore(storeToSave) {
  try {
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();
    //check if store exists
    const storeExists = await Store.findOne({
      _id: storeToSave.id,
    });
    let createdID;
    //if not, create new store
    if (!storeExists) {
      const result = await Store.create({
        name: storeToSave.name,
        description: storeToSave.description,
        contactnumber: storeToSave.contactnumber,
        email: storeToSave.email,
        showwhatssapicon: storeToSave.showwhatssapicon,
        image: genericCompression(storeToSave.image, "compress"),
        user: storeToSave.user,
        address: storeToSave.address,
      });
      createdID = result._id.toString();
    } else {
      createdID = storeToSave.id.toString();
      await Store.updateOne(
        { _id: storeToSave.id },
        {
          name: storeToSave.name,
          description: storeToSave.description,
          contactnumber: storeToSave.contactnumber,
          email: storeToSave.email,
          showwhatssapicon: storeToSave.showwhatssapicon,
          image: storeToSave.image,
          user: storeToSave.user,
          address: storeToSave.address,
        }
      );
    }
    return createdID;
  } catch (error) {
    console.log(error);
    return null;
  }
}
