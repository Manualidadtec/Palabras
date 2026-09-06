document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const menuClose = document.querySelector(".menu-close");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const modal = document.querySelector("#consultation-modal");
  const modalOpenButtons = document.querySelectorAll("[data-open-modal]");
  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
  const form = document.querySelector("#consultation-form");
  const formSuccess = document.querySelector("#form-success");

  let lastFocusedElement = null;

  function openMenu() {
    mobileMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    menuToggle.innerHTML = '<i data-lucide="x"></i>';

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeMenu() {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  menuToggle?.addEventListener("click", () => {
    if (mobileMenu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menuClose?.addEventListener("click", closeMenu);
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");

    const firstInput = modal.querySelector("input");
    window.setTimeout(() => firstInput?.focus(), 50);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    formSuccess.hidden = true;
    form.reset();
    lastFocusedElement?.focus();
  }

  modalOpenButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!modal.hidden) closeModal();
      if (!mobileMenu.hidden) closeMenu();
    }

    if (event.key === "Tab" && !modal.hidden) {
      const focusableElements = modal.querySelectorAll(
        'button, input, textarea, [href], [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    formSuccess.hidden = false;
    form.reset();

    window.setTimeout(() => {
      closeModal();
    }, 2400);
  });

  const revealElements = document.querySelectorAll(
    ".service-card, .stat-item, .quote-inner, .contact-panel"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }
});
