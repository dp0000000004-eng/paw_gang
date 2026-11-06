"use strict";

const loader = document.querySelector("#page-loader");
let shouldShowLoader = true;

try {
    shouldShowLoader = sessionStorage.getItem("team-page-loaded") !== "true";
    sessionStorage.setItem("team-page-loaded", "true");
} catch (error) {
    console.warn("The first-visit loader will run because session storage is unavailable.", error);
}

if (loader && shouldShowLoader) {
    loader.hidden = false;
    window.addEventListener("load", () => {
        window.setTimeout(() => {
            loader.classList.add("is-leaving");
            window.setTimeout(() => {
                loader.hidden = true;
            }, 500);
        }, 350);
    }, { once: true });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    const revealGroups = [
        ...document.querySelectorAll(".team-intro > *"),
        ...document.querySelectorAll(".member-copy > *"),
        ...document.querySelectorAll(".member-art")
    ];

    document.documentElement.classList.add("motion-ready");

    revealGroups.forEach((element, index) => {
        element.classList.add("reveal-item");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 4) * 70}ms`);
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

        revealGroups.forEach((element) => revealObserver.observe(element));
    } else {
        revealGroups.forEach((element) => element.classList.add("is-visible"));
    }
}
