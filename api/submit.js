export default async function handler(req, res) {

  // 🔥 CORS 허용 (이게 핵심)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS 요청 처리
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const idea = body?.idea;

    return res.status(200).json({
      url: `https://www.google.com/search?q=${encodeURIComponent(idea || "test")}`
    });

  } catch (err) {
    return res.status(200).json({
      url: "https://www.google.com"
    });
  }
}
