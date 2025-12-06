// Skill Bars
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bar div").forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
    });
});

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.onclick = () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    toggle.textContent = body.classList.contains("light")
        ? "Dark Mode"
        : "Light Mode";
};

// Chatbot
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const chatContainer = document.getElementById("chat-container");
const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatCloseBtn = document.getElementById("chat-close");

const API_URL = "https://portfolio-website-two-blush-31.vercel.app/api/chat";

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

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        chatWindow.lastChild.remove();

        if (data.reply) {
            addMessage("Tristan-AI", data.reply);
        } else {
            addMessage("Tristan-AI", "Fehler: " + (data.error || "Unbekannter Fehler"));
        }

    } catch (err) {
        chatWindow.lastChild.remove();
        addMessage("Tristan-AI", "Serverfehler: " + err);
    }
}

chatSend.onclick = sendMessage;

chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

// Chat öffnen
chatToggleBtn.onclick = () => {
    chatContainer.classList.remove("hidden");
};

// Chat schließen
chatCloseBtn.onclick = () => {
    chatContainer.classList.add("hidden");
};

// Wichtig: Chat startet offen → NICHT verstecken
