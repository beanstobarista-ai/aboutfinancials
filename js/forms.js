// Lead and sign-up forms. A form posts only when its endpoint is configured in
// js/site-config.js; otherwise it explains that it is not open yet.
(function () {
  "use strict";
  var config = (window.AFSiteConfig && window.AFSiteConfig.forms) || {};

  function status(form, text, kind) {
    var box = form.querySelector(".form-status");
    if (!box) return;
    box.textContent = text;
    box.className = "form-status" + (kind ? " " + kind : "");
    box.hidden = false;
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var endpoint = String(config[form.getAttribute("data-form")] || "").trim();
    var button = form.querySelector("button[type=submit]");

    if (!endpoint) {
      form.classList.add("form-closed");
      status(form, form.getAttribute("data-closed-text") || "This form opens soon. Nothing you type here is sent or stored.", "muted");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!endpoint) {
        status(form, form.getAttribute("data-closed-text") || "This form opens soon. Nothing you type here is sent or stored.", "muted");
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (button) button.disabled = true;
      status(form, "Sending…", "muted");
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          form.reset();
          status(form, form.getAttribute("data-success-text") || "Thank you. We received it.", "ok");
        })
        .catch(function () {
          status(form, "That did not go through. Please try again in a moment.", "error");
        })
        .then(function () { if (button) button.disabled = false; });
    });
  });
})();
