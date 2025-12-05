export default async function handler(req, res) {
    // Nur POST-Anfragen erlauben
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = JSON.parse(req.body);

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        // Anfrage an OpenAI senden
        const completion = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // oder "gpt-4o"
                messages: [
                    { role: "system", content: "Du bist ein freundlicher Assistent auf Tristan Trunez' Portfolio-Seite." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await completion.json();

        // Antwort zurückgeben
        return res.status(200).json({
            reply: data.choices?.[0]?.message?.content || "Keine Antwort erhalten."
        });

    } catch (err) {
        console.error("Chat API error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
