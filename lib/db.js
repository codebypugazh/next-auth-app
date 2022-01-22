import { MongoClient } from "mongodb";

export async function connectToDatabse() {
  const client = await MongoClient.connect(
    "mongodb+srv://pugazhenthi:09Dwg2KCg4S2dl2h@cluster0.wpeex.mongodb.net/nextauth?retryWrites=true&w=majority"
  );
  return client;
}
