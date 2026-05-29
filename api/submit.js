export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const idea = body?.idea || "startup idea";

    // 🔥 GPT 요청
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a startup landing page generator."
          },
          {
            role: "user",
            content: `
Create a simple landing page for this idea:

${idea}

Return ONLY in this format:
TITLE: ...
DESC: ...
CTA: ...
`
          }
        ]
      })
    });

    const data = await aiRes.json();

    const text = data.choices?.[0]?.message?.content || "No result";

    // 👉 결과를 URL로 넘김
    const url = `https://nextep-kr.imweb.me/index?preview_mode=1/?data=${encodeURIComponent(text)}`;

    return res.status(200).json({ url });

  } catch (err) {
    console.log(err);

    return res.status(200).json({
      url: "https://www.google.com"
    });
  }
}
