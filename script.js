// Skill Bars
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bar div").forEach(bar => {
        bar.style.width = bar.dataset.width;
    });
});

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    toggle.textContent = document.body.classList.contains("light")
        ? "Dark Mode"
        : "Light Mode";
};

// Chat
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const chatContainer = document.getElementById("chat-container");
const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatCloseBtn = document.getElementById("chat-close");

const API_URL = "https://portfolio-website-two-blush-31.vercel.app/api/chat";

// Add message bubble
function addMessage(sender, text) {
    const cls = sender === "Du" ? "chat-bubble chat-user" : "chat-bubble chat-bot";
    chatWindow.innerHTML += `<p><span class="${cls}">${text}</span></p>`;
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

        addMessage("Tristan-AI", data.reply || "Fehler bei der Anfrage.");
    } catch (err) {
        chatWindow.lastChild.remove();
        addMessage("Tristan-AI", "Serverfehler: " + err);
    }
}

chatSend.onclick = sendMessage;
chatInput.addEventListener("keydown", e => e.key === "Enter" && sendMessage());

// Chat Panel
chatToggleBtn.onclick = () => chatContainer.classList.remove("hidden");
chatCloseBtn.onclick = () => chatContainer.classList.add("hidden");

// Lightbox
const lightbox = document.getElementById("lightbox-overlay");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".image-row img").forEach(img => {
    img.onclick = () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    };
});

lightbox.onclick = () => {
    lightbox.style.display = "none";
};
