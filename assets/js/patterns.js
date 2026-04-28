document.addEventListener("DOMContentLoaded", () => {
    const contentArea = document.getElementById("pattern-content");
    const patternLinks = document.querySelectorAll("[data-pattern]");

    // Load JSON file
    fetch("data/patterns.json")
        .then(response => response.json())
        .then(data => {
            const patterns = data.patterns;

            patternLinks.forEach(link => {
                link.addEventListener("click", () => {
                    const patternId = link.getAttribute("data-pattern");
                    const pattern = patterns.find(p => p.id === patternId);

                    if (pattern) {
                        contentArea.innerHTML = `
                            <h1>${pattern.title}</h1>
                            <p>${pattern.description}</p>
                            <h3>Example</h3>
                            <pre><code>${pattern.example}</code></pre>
                        `;
                    }
                });
            });
        })
        .catch(error => {
            console.error("Error loading patterns.json:", error);
        });
});
