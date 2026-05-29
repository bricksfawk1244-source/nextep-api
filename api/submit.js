export default async function handler(req, res) {

  try {
    let body = req.body;

    // body 파싱 (핵심)
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const idea = body?.idea;

    if (!idea) {
      return res.status(200).json({
        url: "https://www.google.com"
      });
    }

    return res.status(200).json({
      url: `https://www.google.com/search?q=${encodeURIComponent(idea)}`
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return res.status(200).json({
      url: "https://www.google.com"
    });
  }
}
