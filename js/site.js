// Navigation for pages that do not load the data-heavy app.js.
(function () {
  "use strict";
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("data-page") === page) link.setAttribute("aria-current", "page");
  });
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-nav");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
