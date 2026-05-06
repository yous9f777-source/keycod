import db from "../lib/db.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
    .get(username, password);

  if (!user) {
    return res.status(401).json({ error: "Wrong login" });
  }

  // جلسة بسيطة
  res.setHeader(
    "Set-Cookie",
    `session=${user.username}; Path=/; HttpOnly`
  );

  res.json({ success: true });
}
