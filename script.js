(function () {
  // ---------- CTA / signup form toggle ----------
  const btn = document.getElementById("ctaBtn");
  const form = document.getElementById("signup");

  if (btn && form) {
    const thanks = form.querySelector(".thanks");
    const closeBtn = form.querySelector("#signupClose");

    const openForm = () => {
      form.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
      const firstInput = form.querySelector("input:not([type=checkbox])");
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: false }), 280);
      }
      form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    const closeForm = () => {
      form.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      btn.focus({ preventScroll: true });
    };

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) closeForm();
      else openForm();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeForm);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      console.log("[zoo-fit signup]", data);
      form.querySelectorAll("input, textarea, .submit").forEach((el) => {
        el.disabled = true;
      });
      if (thanks) thanks.removeAttribute("hidden");
    });
  }

  // ---------- Theme menu (hamburger popup) ----------
  const menuToggle = document.getElementById("menuToggle");
  const themeMenu = document.getElementById("themeMenu");

  if (menuToggle && themeMenu) {
    const openMenu = () => {
      themeMenu.removeAttribute("hidden");
      menuToggle.setAttribute("aria-expanded", "true");
    };
    const closeMenu = () => {
      themeMenu.setAttribute("hidden", "");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        menuToggle.getAttribute("aria-expanded") === "true" &&
        !themeMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        menuToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }
})();
