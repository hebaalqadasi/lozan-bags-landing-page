"use strict";

/* ==============================
   Elements
================================= */

const body = document.body;

const menuButton = document.querySelector("#menu-button");
const mobileNavigation = document.querySelector("#mobile-navigation");
const mobileNavigationLinks = document.querySelectorAll(
    ".mobile-navigation__link"
);

const productFilters = document.querySelectorAll(".product-filter");
const productCards = document.querySelectorAll(".product-card");

const favoriteButtons = document.querySelectorAll(
    ".product-card__favorite"
);

const scrollToTopButton = document.querySelector("#scroll-to-top");

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");

const currentYear = document.querySelector("#current-year");

const navbarLinks = document.querySelectorAll(".navbar__link");


/* ==============================
   Mobile Navigation
================================= */

function openMobileNavigation() {
    if (!menuButton || !mobileNavigation) {
        return;
    }

    mobileNavigation.classList.add("is-open");
    body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "إغلاق القائمة");

    menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
}

function closeMobileNavigation() {
    if (!menuButton || !mobileNavigation) {
        return;
    }

    mobileNavigation.classList.remove("is-open");
    body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");

    menuButton.innerHTML = '<i class="bi bi-list"></i>';
}

function toggleMobileNavigation() {
    if (!mobileNavigation) {
        return;
    }

    const isOpen = mobileNavigation.classList.contains("is-open");

    if (isOpen) {
        closeMobileNavigation();
    } else {
        openMobileNavigation();
    }
}

if (menuButton) {
    menuButton.addEventListener("click", toggleMobileNavigation);
}

mobileNavigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNavigation);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
        closeMobileNavigation();
    }
});


/* ==============================
   Product Filters
================================= */

function filterProducts(selectedCategory) {
    productCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        const shouldShow =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        card.classList.toggle("is-hidden", !shouldShow);
    });
}

productFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const selectedCategory = filterButton.dataset.filter;

        productFilters.forEach((button) => {
            button.classList.remove("active");
        });

        filterButton.classList.add("active");

        filterProducts(selectedCategory);
    });
});


/* ==============================
   Favorite Buttons
================================= */

favoriteButtons.forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", () => {
        const icon = favoriteButton.querySelector("i");

        const isFavorite =
            favoriteButton.classList.toggle("is-favorite");

        favoriteButton.setAttribute(
            "aria-label",
            isFavorite
                ? "إزالة المنتج من المفضلة"
                : "إضافة المنتج إلى المفضلة"
        );

        if (!icon) {
            return;
        }

        icon.className = isFavorite
            ? "bi bi-heart-fill"
            : "bi bi-heart";
    });
});


/* ==============================
   Scroll To Top
================================= */

function updateScrollToTopButton() {
    if (!scrollToTopButton) {
        return;
    }

    const shouldShow = window.scrollY > 500;

    scrollToTopButton.classList.toggle(
        "is-visible",
        shouldShow
    );
}

window.addEventListener("scroll", updateScrollToTopButton);

if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ==============================
   Newsletter Form
================================= */

function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailValue = newsletterEmail.value.trim();

        if (!isValidEmail(emailValue)) {
            alert("اكتبي بريدًا إلكترونيًا صحيحًا.");

            newsletterEmail.focus();

            return;
        }

        alert(
            "تم تسجيل بريدك بنجاح. شكرًا لاشتراكك في جديد لوزان."
        );

        newsletterForm.reset();
    });
}


/* ==============================
   Footer Year
================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==============================
   Active Navigation Link
================================= */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigationLink() {
    const scrollPosition = window.scrollY + 160;

    let currentSectionId = "home";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        const isInsideSection =
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight;

        if (isInsideSection) {
            currentSectionId = section.id;
        }
    });

    navbarLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href");

        const isActive =
            linkTarget === `#${currentSectionId}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigationLink
);


/* ==============================
   Close Menu With Escape Key
================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileNavigation();
    }
});


/* ==============================
   Initial State
================================= */

updateScrollToTopButton();
updateActiveNavigationLink();