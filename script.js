(function () {
  const btn = document.getElementById("ctaBtn");
  const form = document.getElementById("signup");
  const thanks = form.querySelector(".thanks");

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      form.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    } else {
      form.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
      const firstInput = form.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: false }), 280);
      }
      form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

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
    thanks.removeAttribute("hidden");
  });
})();
