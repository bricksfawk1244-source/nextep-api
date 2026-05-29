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
            content: `Create landing page copy for: ${idea}
Return format:
TITLE: ...
DESC: ...
CTA: ...`
          }
        ]
      })
    });

    const data = await aiRes.json();
    let text = data.choices?.[0]?.message?.content;

    // ❗ GPT 실패 대비
    if (!text) {
      text = `TITLE: ${idea}\nDESC: 간단한 서비스 설명입니다.\nCTA: 시작하기`;
    }

    // 🔥 핵심 https://nextep-kr.imweb.me/index?preview_mode=1
    const url = `https://nextep-kr.imweb.me/?data=${encodeURIComponent(text)}`;

    return res.status(200).json({ url });

  } catch (err) {
    return res.status(200).json({
      url: "https://nextep-kr.imweb.me/?data=ERROR"
    });
  }
}
