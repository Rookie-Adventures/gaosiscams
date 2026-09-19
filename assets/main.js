// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }
  // Footer year
  var y = document.querySelector(".year");
  if (y) y.textContent = new Date().getFullYear();

  // News category filter
  var filterBtns = document.querySelectorAll(".filter-btn");
  var items = document.querySelectorAll(".news-item[data-cat]");
  if (filterBtns.length && items.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-cat");
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-cat") === cat;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }
});
