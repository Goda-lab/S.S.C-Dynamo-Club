const admin = require("./admin");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { uid } = req.body; // Get UID from request body

  if (!uid) {
    return res.status(400).json({ error: "Missing UID parameter" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    return res.status(200).json({ success: true, message: `User ${uid} is now an Admin.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}