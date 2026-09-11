/**
 * =========================================================
 * SAHARIYAR DOCUMENTATION ENGINE
 * =========================================================
 *
 * Features:
 *
 * - Copy code
 * - Automatic table of contents
 * - Active heading detection
 * - Mobile sidebar
 * - Ctrl/Cmd + K search
 * - Reading progress
 * - Heading anchor links
 * - Escape key support
 * =========================================================
 */


(() => {


    /* -----------------------------------------------------
       Helpers
       ----------------------------------------------------- */

    const qs = (selector, root = document) =>
        root.querySelector(selector);


    const qsa = (selector, root = document) =>
        [...root.querySelectorAll(selector)];


    /* -----------------------------------------------------
       Mobile sidebar
       ----------------------------------------------------- */

    const mobileMenu =
        qs("#docsMobileMenu");

    const sidebar =
        qs("#docsSidebar");


    mobileMenu?.addEventListener(
        "click",
        () => {

            sidebar?.classList.toggle("open");

        }
    );


    /* -----------------------------------------------------
       Close mobile sidebar after clicking link
       ----------------------------------------------------- */

    qsa(".docs-sidebar a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    sidebar?.classList.remove("open");

                }
            );

        });


    /* -----------------------------------------------------
       Copy code
       ----------------------------------------------------- */

    qsa(".code-wrap")
        .forEach(wrapper => {

            const button =
                qs(".copy-code", wrapper);

            const code =
                qs("code", wrapper);


            if (!button || !code) {
                return;
            }


            button.addEventListener(
                "click",
                async () => {

                    try {

                        await navigator.clipboard
                            .writeText(
                                code.innerText
                            );


                        const oldText =
                            button.textContent;


                        button.textContent =
                            "Copied!";


                        setTimeout(
                            () => {

                                button.textContent =
                                    oldText;

                            },
                            1400
                        );


                    } catch (error) {

                        console.error(error);

                        button.textContent =
                            "Copy failed";


                        setTimeout(
                            () => {

                                button.textContent =
                                    "Copy";

                            },
                            1400
                        );

                    }

                }
            );

        });


    /* -----------------------------------------------------
       Generate TOC
       ----------------------------------------------------- */

    const toc =
        qs("#docsToc");

    const article =
        qs(".docs-content");


    if (toc && article) {


        const headings =
            qsa(
                "h2, h3",
                article
            );


        headings.forEach(
            (heading, index) => {


                /*
                 * Create ID automatically
                 */

                if (!heading.id) {

                    heading.id =
                        createSlug(
                            heading.textContent
                        ) || `section-${index}`;

                }


                /*
                 * Create TOC link
                 */

                const link =
                    document.createElement("a");


                link.href =
                    `#${heading.id}`;


                link.textContent =
                    heading.textContent;


                if (
                    heading.tagName === "H3"
                ) {

                    link.classList.add(
                        "sub"
                    );

                }


                toc.appendChild(link);

            }
        );


        /*
         * Highlight active heading
         */

        const tocLinks =
            qsa("a", toc);


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            tocLinks.forEach(
                                link => {

                                    link.classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                            const active =
                                tocLinks.find(
                                    link =>
                                        link
                                            .getAttribute(
                                                "href"
                                            ) ===
                                        `#${entry.target.id}`
                                );


                            active?.classList.add(
                                "active"
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-25% 0px -65% 0px"
                }
            );


        headings.forEach(
            heading =>
                observer.observe(
                    heading
                )
        );

    }


    /* -----------------------------------------------------
       Heading slug generator
       ----------------------------------------------------- */

    function createSlug(text) {

        return text
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9\s-]/g,
                ""
            )
            .replace(
                /\s+/g,
                "-"
            );

    }


    /* -----------------------------------------------------
       Search shortcut
       ----------------------------------------------------- */

    const search =
        qs("#docsSearch");


    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search?.focus();

            }


            /*
             * Escape closes search/sidebar
             */

            if (
                event.key === "Escape"
            ) {

                search?.blur();

                sidebar?.classList.remove(
                    "open"
                );

            }

        }
    );


    /* -----------------------------------------------------
       Documentation search
       ----------------------------------------------------- */

    search?.addEventListener(
        "input",
        () => {

            const query =
                search.value
                    .trim()
                    .toLowerCase();


            if (!query) {
                return;
            }


            const headings =
                qsa(
                    ".docs-content h2, .docs-content h3"
                );


            const result =
                headings.find(
                    heading =>
                        heading.textContent
                            .toLowerCase()
                            .includes(query)
                );


            if (result) {

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );


    /* -----------------------------------------------------
       Reading progress
       ----------------------------------------------------- */

    const progress =
        qs("#docsProgress");


    function updateProgress() {

        if (!progress) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width =
                "100%";

            return;

        }


        const percentage =
            (scrollTop /
                documentHeight) *
            100;


        progress.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            )}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();


})();