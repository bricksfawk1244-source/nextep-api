export default async function handler(req, res) {

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const idea = body?.idea;

    if (!idea) {
      return res.status(400).json({ error: "No idea" });
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(idea)}`;

    return res.status(200).json({ url });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
