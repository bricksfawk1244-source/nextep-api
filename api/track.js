export default async function handler(req, res) {

  const { event, page } = req.body;

  console.log("TRACK:", event, page);

  return res.status(200).json({ ok: true });
}
