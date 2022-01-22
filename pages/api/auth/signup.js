import { connectToDatabse } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;
  if (!email || !email.includes("@") || !password || password.length < 7) {
    res.status(422).json({ message: "Invalid input" });
  }

  const client = await connectToDatabse();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User already exist" });
    return client.close();
  }

  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User Created" });
  client.close();
}

export default handler;
