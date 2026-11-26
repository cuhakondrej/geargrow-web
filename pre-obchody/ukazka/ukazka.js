/* GearGrow – demo page for e-shops: a made-up product page with the size widget.
   Based on the widget's own demo (dist/demo.html); the widget and engine come from /widget/geargrow-2.0.0.js. */
(function () {
  "use strict";
  var G = window.GearGrow, $ = function (id) { return document.getElementById(id); };
  if (!G || !window.GearGrowWidget) return;
  var ICON = { clothing: "🧥", foot: "👟", height_band: "🚲", height_length: "🎿", head: "⛑️", age_band: "⚽", none: "🛷" };
  var EU_INSOLE = function (eu) { return (eu * 2 / 3).toFixed(1).replace(".", ","); };
  var CHARTS = {
    height: [92, 98, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176].map(function (s, i, a) { return s + ";" + (i ? a[i - 1] + 1 : 87) + ";" + s; }).join("\n"),
    foot: Array.from({ length: 23 }, function (_, i) { return (20 + i) + ";" + EU_INSOLE(20 + i); }).join("\n"),
    head: "XS;46;50\nS;50;54\nM;54;58\nL;58;62"
  };
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-item]"));

  function fillItems() {
    var lang = $("lang").value, cur = $("item").value || "zimna_obuv", groups = {};
    G.catalog(lang).forEach(function (it) { (groups[it.category] = groups[it.category] || []).push(it); });
    $("item").innerHTML = "";
    var first = document.createElement("option");
    first.value = ""; first.textContent = lang === "en" ? "Other item…" : "Iný tovar…";
    $("item").appendChild(first);
    Object.keys(groups).forEach(function (g) {
      var og = document.createElement("optgroup"); og.label = g;
      groups[g].forEach(function (it) { var o = document.createElement("option"); o.value = it.id; o.textContent = it.name; og.appendChild(o); });
      $("item").appendChild(og);
    });
    $("item").value = cur;
  }
  function basisOf(it) { return { clothing: "height", height_band: "height", height_length: "height", foot: "foot", head: "head" }[it.sizing] || null; }
  function variants(it, style, chart) {
    var p = it.params, word = style === "word";
    if (chart) return chart.split("\n").map(function (l) { return l.split(";")[0]; });
    if (it.sizing === "clothing") return (p.series || [86, 92, 98, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176]).map(function (s) { return word ? "Veľkosť " + s : String(s); });
    if (it.sizing === "foot" && p.unit === "mondo") { var m = []; for (var x = 17; x <= 27; x += 0.5) m.push(word ? "MP " + String(x).replace(".", ",") : String(x)); return m; }
    if (it.sizing === "foot") { var e = []; for (var n = 20; n <= 42; n++) e.push(word ? "EU " + n : String(n)); if (it.id === "korcule_kolieskove") e = ["25-28", "29-32", "33-36", "37-40"]; return e; }
    if (it.sizing === "height_band") return p.bands.map(function (b) { return p.unit === "label" ? String(b[0]) : b[0] + '"'; });
    if (it.sizing === "height_length") { var l = []; for (var c = p.min_len; c <= p.max_len; c += 5) l.push(c + " cm"); return l; }
    if (it.sizing === "head") return ["XS (46–50 cm)", "S (50–54 cm)", "M (54–58 cm)", "L (58–62 cm)"];
    if (it.sizing === "age_band") return p.bands.map(function (b) { return p.unit === "label" ? String(b[2]) : (word ? "č. " + b[2] : String(b[2])); });
    return [];
  }
  function render() {
    var lang = $("lang").value, id = $("item").value || "zimna_obuv", it = G.findItem(id, lang), basis = basisOf(it);
    chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-item") === id)); });
    $("title").textContent = it.name; $("cat").textContent = it.category; $("photo").textContent = ICON[it.sizing] || "🧒";
    $("legend").textContent = lang === "en" ? "Size" : "Veľkosť";
    var chart = $("chart").value && basis ? CHARTS[basis] : "";
    $("chart-text").hidden = !chart;
    $("chart-text").textContent = chart ? (lang === "en" ? "Shop's size chart:\n" : "Tabuľka veľkostí obchodu:\n") + chart.replace(/;/g, " ; ") : "";
    var list = variants(it, $("style").value, chart), box = $("sizes"); box.innerHTML = "";
    $("sizes-wrap").hidden = !list.length;
    list.forEach(function (s, i) {
      var lab = document.createElement("label"), inp = document.createElement("input"), sp = document.createElement("span");
      inp.type = "radio"; inp.name = "options[Size]"; inp.value = s; if (!i) inp.checked = true; sp.textContent = s;
      lab.appendChild(inp); lab.appendChild(sp); box.appendChild(lab);
    });
    var slot = $("slot"); slot.innerHTML = "";
    if (it.sizing === "none") {
      var p = document.createElement("p"); p.className = "none";
      p.textContent = lang === "en" ? "This item has no size – the widget stays hidden." : "Pri tomto tovare sa veľkosť nerieši, widget sa nezobrazí.";
      slot.appendChild(p); return;
    }
    var w = document.createElement("div");
    w.setAttribute("data-geargrow", ""); w.setAttribute("data-item", it.id); w.setAttribute("data-lang", lang); w.setAttribute("data-open", "true");
    if (chart) w.setAttribute("data-chart", chart);
    slot.appendChild(w); window.GearGrowWidget.mount(w);
  }
  chips.forEach(function (c) { c.addEventListener("click", function () { $("item").value = c.getAttribute("data-item"); render(); }); });
  fillItems();
  $("item").value = "zimna_obuv";
  ["item", "chart", "style"].forEach(function (id) { $(id).addEventListener("change", render); });
  $("lang").addEventListener("change", function () { fillItems(); render(); });
  render();
})();
