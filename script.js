const heading = document.querySelector("h1");

document.addEventListener("click", () => {
    heading.textContent = heading.textContent === "Wow" ? "Wowed" : "Wow";
})