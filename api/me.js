export default function handler(req, res) {
  const cookie = req.headers.cookie || "";

  const session = cookie.split("session=")[1];

  if (!session) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.json({ user: session });
}
