/**
 * Documentation home controller
 *
 * Loads documentation metadata from:
 * ../data/docs.json
 */

(() => {

    const grid = document.getElementById("docsGrid");
    const search = document.getElementById("docsHomeSearch");
    const empty = document.getElementById("docsHomeEmpty");

    let docs = [];


    async function loadDocs() {

        try {

            const response = await fetch("../data/docs.json");

            if (!response.ok) {
                throw new Error("Unable to load docs.json");
            }

            docs = await response.json();

            renderDocs(docs);

        } catch (error) {

            console.error(error);

            if (grid) {

                grid.innerHTML = `
                    <div class="docs-error">
                        Documentation could not be loaded.
                    </div>
                `;

            }

        }

    }


    function renderDocs(items) {

        if (!grid) return;

        grid.innerHTML = "";


        if (!items.length) {

            empty.hidden = false;

            return;

        }

        empty.hidden = true;


        items.forEach(doc => {

            const card = document.createElement("a");

            card.className = "docs-doc-card";

            card.href = `${doc.slug}/`;


            const icon = getIcon(doc.icon);


            card.innerHTML = `

                <div class="docs-doc-icon">
                    ${icon}
                </div>

                <div class="docs-card-content">

                    <div class="docs-card-top">

                        <span>
                            ${escapeHTML(doc.category || "Documentation")}
                        </span>

                        <span>
                            v${escapeHTML(doc.version || "1.0")}
                        </span>

                    </div>

                    <h3>
                        ${escapeHTML(doc.name)}
                    </h3>

                    <p>
                        ${escapeHTML(doc.description || "")}
                    </p>

                    <div class="docs-card-footer">

                        <span>
                            Updated ${formatDate(doc.updated)}
                        </span>

                        <strong>
                            Read →
                        </strong>

                    </div>

                </div>

            `;


            grid.appendChild(card);

        });

    }


    function getIcon(icon) {

        const icons = {

            android: "A",

            java: "J",

            firebase: "F",

            web: "W",

            api: "API",

            default: "D"

        };

        return icons[icon] || icons.default;

    }


    function formatDate(date) {

        if (!date) return "";

        return new Intl.DateTimeFormat(
            undefined,
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        ).format(
            new Date(`${date}T00:00:00`)
        );

    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function searchDocs() {

        const query =
            search.value
                .trim()
                .toLowerCase();


        if (!query) {

            renderDocs(docs);

            return;

        }


        const filtered =
            docs.filter(doc => {

                return [

                    doc.name,

                    doc.description,

                    doc.category,

                    doc.slug

                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(query);

            });


        renderDocs(filtered);

    }


    search?.addEventListener(
        "input",
        searchDocs
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search?.focus();

            }

        }
    );


    loadDocs();

})();