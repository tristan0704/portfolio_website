// Skill bar animation
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bar div").forEach(b => {
        b.style.width = b.getAttribute("data-width");
    });
});

// Placeholder chatbot
document.getElementById("chat-send").addEventListener("click", () => {
    let input = document.getElementById("chat-input").value.trim();
    if (!input) return;

    let out = document.getElementById("chat-output");
    out.innerHTML += `<div><b>Du:</b> ${input}</div>`;

    setTimeout(() => {
        out.innerHTML += `<div><b>Chatbot:</b> Fake Antwort (Placeholder)</div>`;
        out.scrollTop = out.scrollHeight;
    }, 300);

    document.getElementById("chat-input").value = "";
});
