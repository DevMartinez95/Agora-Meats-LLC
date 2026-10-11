/* Ágora Meats — site interactions (no dependencies) */
(function () {
  "use strict";

  /* Mobile / tablet menu */
  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("drawer");
  function setMenu(open) {
    if (!burger || !drawer) return;
    drawer.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.querySelector(".ico-open").toggleAttribute("hidden", open);
    burger.querySelector(".ico-close").toggleAttribute("hidden", !open);
  }
  if (burger) {
    burger.addEventListener("click", function () { setMenu(!drawer.classList.contains("is-open")); });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* Product tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle("is-on", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      var next = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(next); next.focus();
    });
  });

  /* Inquiry form */
  var form = document.getElementById("inquiry");
  if (!form) return;
  var sent = document.querySelector(".sent");
  var errorEl = form.querySelector(".form-error");
  var cut = document.getElementById("cut");
  var cuts = JSON.parse(document.getElementById("cuts-data").textContent);

  function syncPills() {
    form.querySelectorAll(".pill").forEach(function (p) {
      p.classList.toggle("is-on", p.querySelector("input").checked);
    });
  }
  function fillCuts() {
    var checked = form.querySelector('input[name="protein"]:checked');
    var list = checked ? cuts[checked.value] : [];
    cut.innerHTML = '<option value="">—</option>';
    list.forEach(function (name) {
      var o = document.createElement("option");
      o.value = name; o.textContent = name;
      cut.appendChild(o);
    });
    cut.disabled = !checked;
  }
  form.addEventListener("change", function (e) {
    if (e.target.type === "radio") syncPills();
    if (e.target.name === "protein") fillCuts();
  });

  /* "Request a quote" under a product preselects that protein */
  document.querySelectorAll("[data-quote]").forEach(function (a) {
    a.addEventListener("click", function () {
      var r = form.querySelector('input[name="protein"][value="' + a.getAttribute("data-quote") + '"]');
      if (r) { r.checked = true; syncPills(); fillCuts(); }
    });
  });

  function showSent() {
    form.hidden = true;
    sent.hidden = false;
    sent.scrollIntoView({ behavior: "smooth", block: "center" });
    sent.focus({ preventScroll: true });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    var endpoint = form.getAttribute("data-endpoint");
    if (!endpoint) { showSent(); return; } // demo mode: no endpoint configured yet
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (res) { if (!res.ok) throw new Error(res.status); showSent(); })
      .catch(function () { errorEl.hidden = false; })
      .then(function () { btn.disabled = false; });
  });

  sent.querySelector("[data-reset]").addEventListener("click", function () {
    form.reset();
    syncPills(); fillCuts();
    sent.hidden = true;
    form.hidden = false;
    form.querySelector("input:not([type=hidden])").focus();
  });
})();
