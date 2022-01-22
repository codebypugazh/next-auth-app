import { MongoClient } from "mongodb";

export async function connectToDatabse() {
  const client = await MongoClient.connect(
    "mongodb+srv://pugazhenthi:<password>@cluster0.wpeex.mongodb.net/nextauth?retryWrites=true&w=majority"
  );
  return client;
}
