// ------------------ SKILL BARS ------------------
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bar div").forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
    });
});

// ------------------ CHATBOT ------------------
document.getElementById("chat-send").onclick = () => {
    let text = document.getElementById("chat-input").value.trim();
    if (!text) return;

    let win = document.getElementById("chat-window");

    win.innerHTML += `<p><b>Du:</b> ${text}</p>`;

    setTimeout(() => {
        win.innerHTML += `<p><b>Bot:</b> (Demo) Ich bin ein Platzhalter…</p>`;
        win.scrollTop = win.scrollHeight;
    }, 300);

    document.getElementById("chat-input").value = "";
};

// ------------------ THEME TOGGLE ------------------
const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.onclick = () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        toggle.textContent = "Dark Mode";
    } else {
        toggle.textContent = "Light Mode";
    }
};
