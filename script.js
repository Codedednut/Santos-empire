/* =========================================================
   SANTOS EMPIRE
   MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. COPYRIGHT YEAR */
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* 2. MOBILE HAMBURGER NAVIGATION */
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileNavigation = document.getElementById("mobileNavigation");
    const closeMobileNavigation = document.getElementById("closeMobileNavigation");

    function openMobileNavigation() {
        if (!mobileNavigation) return;
        mobileNavigation.classList.add("active");
        if (mobileMenuButton) {
            mobileMenuButton.setAttribute("aria-expanded", "true");
        }
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
    }

    function closeMobileNavigationMenu() {
        if (!mobileNavigation) return;
        mobileNavigation.classList.remove("active");
        if (mobileMenuButton) {
            mobileMenuButton.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", () => {
            const isOpen = mobileNavigation && mobileNavigation.classList.contains("active");
            if (isOpen) {
                closeMobileNavigationMenu();
            } else {
                openMobileNavigation();
            }
        });
    }

    if (closeMobileNavigation) {
        closeMobileNavigation.addEventListener("click", closeMobileNavigationMenu);
    }

    if (mobileNavigation) {
        mobileNavigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileNavigationMenu);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileNavigationMenu();
        }
    });

    /* 3. MOBILE ALL COLLECTIONS DROPDOWN */
    const collectionDropdown = document.querySelector(".mobile-collection-dropdown");
    if (collectionDropdown) {
        const collectionSummary = collectionDropdown.querySelector("summary");
        const collectionList = collectionDropdown.querySelector(".mobile-collection-list");
        const hoverSupported = window.matchMedia("(hover: hover) and (pointer: fine)");

        if (collectionSummary && collectionList) {
            collectionDropdown.addEventListener("mouseenter", () => {
                if (hoverSupported.matches) {
                    collectionDropdown.open = true;
                }
            });

            collectionDropdown.addEventListener("mouseleave", () => {
                if (hoverSupported.matches) {
                    collectionDropdown.open = false;
                }
            });

            collectionList.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", () => {
                    collectionDropdown.open = false;
                });
            });
        }
    }

    /* 4. MOBILE THREE-DOT UTILITY MENU */
    const mobileUtilityButton = document.getElementById("mobileUtilityButton");
    const mobileUtilityMenu = document.getElementById("mobileUtilityMenu");

    if (mobileUtilityButton && mobileUtilityMenu) {
        mobileUtilityButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = mobileUtilityMenu.classList.toggle("active");
            mobileUtilityButton.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (event) => {
            const clickedInsideButton = mobileUtilityButton.contains(event.target);
            const clickedInsideMenu = mobileUtilityMenu.contains(event.target);

            if (!clickedInsideButton && !clickedInsideMenu) {
                mobileUtilityMenu.classList.remove("active");
                mobileUtilityButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* 5. WEBSITE SEARCH */
    const searchPages = [
        { name: "New In", keywords: ["new", "new in", "latest", "arrival"], url: "New_in/index.html" },
        { name: "Streetwears", keywords: ["streetwear", "streetwears", "casual"], url: "Streetwears/index.html" },
        { name: "Agbada Designs", keywords: ["agbada", "senator", "embroidery"], url: "Senators%20with%20Agbada/index.html" },
        { name: "Kaftan Senator", keywords: ["kaftan", "kaftan senator", "senator kaftan"], url: "KAFTAN%20SENATOR/index.html" },
        { name: "Jackets", keywords: ["jacket", "jackets", "coat"], url: "JACKETS/index.html" },
        { name: "Tops", keywords: ["top", "tops", "shirt"], url: "TOPS/index.html" },
        { name: "Pants", keywords: ["pants", "trousers", "bottoms"], url: "PANTS/index.html" },
        { name: "Footwear", keywords: ["footwear", "footwears", "shoes"], url: "FOOTWEAR/index.html" },
        { name: "Showreel", keywords: ["showreel", "video", "fashion film"], url: "SHOWREEL/index.html" },
        { name: "Contact", keywords: ["contact", "reach", "message"], url: "CONTACT/index.html" }
    ];

    function performSearch(inputElement) {
        if (!inputElement) return;
        const searchTerm = inputElement.value.trim().toLowerCase();
        if (!searchTerm) {
            inputElement.focus();
            return;
        }

        const matchedPage = searchPages.find((page) => {
            return (
                page.name.toLowerCase().includes(searchTerm) ||
                page.keywords.some((keyword) => keyword.includes(searchTerm) || searchTerm.includes(keyword))
            );
        });

        if (matchedPage) {
            window.location.href = matchedPage.url;
        } else {
            alert("No matching collection found. Please try New In, Streetwears, Agbada, Kaftan Senator, Jackets, Tops, Pants or Footwear.");
        }
    }

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const mobileSearchInput = document.getElementById("mobileSearchInput");
    const mobileSearchButton = document.getElementById("mobileSearchButton");

    if (searchButton) {
        searchButton.addEventListener("click", () => performSearch(searchInput));
    }
    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") performSearch(searchInput);
        });
    }
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener("click", () => performSearch(mobileSearchInput));
    }
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") performSearch(mobileSearchInput);
        });
    }
});