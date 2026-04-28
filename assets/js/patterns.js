document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-content");
    const contentArea = document.getElementById("pattern-content");

    fetch("data/patterns.json")
        .then(res => res.json())
        .then(data => {
            buildSidebar(data.categories);
            attachPatternHandlers(data.categories);
        });

    function buildSidebar(categories) {
        let html = "";

        categories.forEach(cat => {
            html += `
                <div class="sidebar-section">
                    <h2 class="sidebar-title">${cat.title}</h2>
                    <ul class="sidebar-list">
                        ${cat.patterns.map(p => `
                            <li>
                                <button class="sidebar-link" data-pattern="${p.id}">
                                    ${p.title}
                                </button>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            `;
        });

        sidebar.innerHTML = html;
    }

    function attachPatternHandlers(categories) {
        const buttons = document.querySelectorAll("[data-pattern]");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-pattern");

                const pattern = categories
                    .flatMap(c => c.patterns)
                    .find(p => p.id === id);

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
    }
});


