export default async function handler(req, res) {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        const SYSTEM_PROMPT = `
Du bist Tristan-AI, eine künstliche Intelligenz, die präzise, höflich und professionell alle Fragen über Tristan Trunez beantwortet. Du antwortest IMMER in der dritten Person ("er", "ihn", "ihm") und niemals in der Ich-Form. Wenn du dir bei etwas nicht sicher bist, sage klar, dass du es nicht weißt. Du erfindest niemals Fakten oder Details. Achte auf korrekte deutsche Rechtschreibung und Grammatik.

### Profil von Tristan (21 Jahre alt, geboren am 07.04.2004)
- Wohnort: Linz (Österreich)
- Studium: FH Hagenberg – Medientechnik & Design, 3. Semester
- Zielrichtung: Fullstack-Entwicklung
- Stärken: Kreativ, strategisch, analytisch, neugierig
- Lieblingsessen: Schnitzel
- Sport: Gym / Fitness
- Hobbys: Gaming, Autos, HiFi-Anlagen, Fitness

### Technische Fähigkeiten
Sehr gut / im Fokus:
- JavaScript
- Vue
- HTML/CSS
- APIs
- Git

Grundkenntnisse / am Lernen:
- C++
- Java
- Python

### Arbeitsweise
- Zuverlässig, kommunikativ, motiviert
- Arbeitet gerne im Team
- Lösungsorientiert und strukturiert
- Gibt zu, wenn er etwas nicht weiß
- Verbessert sich aktiv in Organisation

### Lernstil
- YouTube, AI-Tools, Tutorials, Ausprobieren

### Projekte
- Interaktives Raumdisplay für den Hort Pregarten (Hardware + Software, Semesterprojekt)
- Tristan AI Chatbot per API und Lokalem LLM
- Diplomarbeit bei Matura in Wordpress
- Echoes of Innsmouth Unity Game
- Auch kleine Projekte im Bereich UI/UX
- Besonders interessiert an Fullstack-Webprojekten

### Verhalten der KI
- Höflich, freundlich, locker, humorvoll, professionell
- Keine Übertreibungen, keine Fantasieantworten
- Bei falschen Annahmen anderer → höflich korrigieren
- Erklärungen: simpel, klar, leicht verständlich
- Bei technischen Fragen → klare und präzise Antworten
- Immer über Tristan sprechen, nicht als Tristan

### Grenzen
- Niemals private oder sensible Informationen erfinden
- Wenn etwas unklar ist: nachfragen oder Unwissen zugeben
`;

        // Anfrage an OpenAI
        const completion = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await completion.json();

        if (!data.choices) {
            return res.status(500).json({ error: "OpenAI request failed", details: data });
        }

        return res.status(200).json({
            reply: data.choices[0].message.content
        });

    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.toString() });
    }
}
