// Skill-Bar Animation
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bar div");
    bars.forEach(bar => {
        const width = bar.getAttribute("data-width");
        setTimeout(() => bar.style.width = width, 200);
    });
});

// Dark/Light Mode Toggle
let dark = true;
document.getElementById("themeToggle").addEventListener("click", () => {
    dark = !dark;
    document.body.classList.toggle("light-mode", !dark);
    document.getElementById("themeToggle").textContent = dark ? "Dark" : "Light";
});

