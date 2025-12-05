export default async function handler(req, res) {
    // CORS (optional, schadet aber nicht)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Nur POST erlauben
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // DEBUG: Prüft, ob der API-Key existiert
        const keyExists = !!process.env.OPENAI_API_KEY;
        console.log("DEBUG KEY PRESENT:", keyExists);
        if (!keyExists) {
            console.log("DEBUG KEY VALUE:", "(missing)");
            return res.status(500).json({ error: "API key missing on server" });
        } else {
            console.log("DEBUG KEY VALUE:", "(exists)");
        }

        // Body auslesen
        const { message } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

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
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Du bist Tristan-AI — ein freundlicher Assistent auf dem Portfolio von Tristan Trunez."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await completion.json();

        // Falls OpenAI einen Fehler zurückgibt → debuggen
        if (!data.choices) {
            console.log("OPENAI ERROR RESPONSE:", data);
            return res.status(500).json({ error: "OpenAI request failed", details: data });
        }

        return res.status(200).json({
            reply: data.choices[0].message.content
        });

    } catch (err) {
        console.log("SERVER ERROR:", err);
        return res.status(500).json({ error: "Server crashed", details: err.toString() });
    }
}
