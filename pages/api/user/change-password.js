import { getSession } from "next-auth/react";
import { connectToDatabse } from "../../../lib/db";
import { verifyPassword, hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const session = await getSession({ req });

  if (!session)
    return res.status(401).json({ message: "Authentication required" });

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabse();
  const collection = await client.db().collection("users");
  const user = await collection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found" });
  }
  const passwordEqual = await verifyPassword(oldPassword, user.password);
  if (!passwordEqual) {
    client.close();
    return res.status(403).json({ message: "Invalid password" });
  }

  const result = await collection.updateOne(
    { email: userEmail },
    { $set: { password: await hashPassword(newPassword) } }
  );
  console.log(result);
  client.close();
  res.status(200).json({ message: "Password changed" });
}

export default handler;
