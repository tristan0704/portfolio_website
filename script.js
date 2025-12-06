const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const API_URL = "https://portfolio-website-two-blush-31.vercel.app/api/chat";
// ↑ die echte Production-Domain

function addMessage(sender, text) {
    chatWindow.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage("Du", text);
    chatInput.value = "";

    addMessage("Tristan-AI", "<i>schreibt…</i>");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    // Entferne das "schreibt..." zuletzt
    chatWindow.lastChild.remove();

    if (data.reply) {
        addMessage("Tristan-AI", data.reply);
    } else {
        addMessage("Tristan-AI", "Fehler: " + (data.error || "Unbekannter Fehler"));
    }
}

chatSend.onclick = sendMessage;
chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
