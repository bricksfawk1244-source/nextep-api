export default async function handler(req, res) {

  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "No idea" });
  }

  const url = `https://www.google.com/search?q=${encodeURIComponent(idea)}`;

  return res.status(200).json({ url });
}
