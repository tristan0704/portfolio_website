// Skill bars animation
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bar div").forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
    });
});

// Placeholder Chatbot (wird später echte API)
document.getElementById("chat-send").addEventListener("click", () => {
    let input = document.getElementById("chat-input").value.trim();
    if (!input) return;

    let out = document.getElementById("chat-output");
    out.innerHTML += "<div><b>Du:</b> " + input + "</div>";

    // fake response for now
    setTimeout(() => {
        out.innerHTML += "<div><b>Chatbot:</b> Placeholder Antwort…</div>";
        out.scrollTop = out.scrollHeight;
    }, 500);

    document.getElementById("chat-input").value = "";
});
