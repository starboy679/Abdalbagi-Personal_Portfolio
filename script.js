document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("current-year");
    if (year) year.textContent = new Date().getFullYear();

    // Accessible mobile navigation
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {
        const closeMenu = () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        };

        toggle.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
            toggle.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && nav.classList.contains("open")) {
                closeMenu();
                toggle.focus();
            }
        });
    }

    // Project filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(item => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            projectCards.forEach(card => {
                card.hidden = !(filter === "all" || card.dataset.category === filter);
            });
        });
    });
});
