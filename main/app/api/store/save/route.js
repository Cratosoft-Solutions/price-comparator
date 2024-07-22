import { saveStore } from "@utils/storeUtil";

export const POST = async (req) => {
    try {
        const storeToSave = await req.json();
        let createdID;
        // save store
        await saveStore(storeToSave);
        return new Response(JSON.stringify({id:createdID}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}