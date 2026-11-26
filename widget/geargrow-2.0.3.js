/*! GearGrow – engine-1.4.4.js + widget 2.0.3 (one file) */
/* GearGrow sizing engine (browser port of predictor.py). Everything runs on the
   visitor's device; nothing is stored or sent anywhere.

   One engine for the website, its guide pages and the Shopify widget. Built by site/build.py into
   dist/engine-<VERSION>.js (and dist/engine.js = latest) with the catalog from catalog.py embedded.
   API and inputs: see site/ENGINE.md. Bump VERSION whenever results or the API change. */
(function (global) {
  "use strict";

  var VERSION = "1.4.4";
  var CATALOG = [{"id": "body_dupacky", "name": "Body, dupačky, overalčeky", "category": "Bábätká a batoľatá", "sizing": "clothing", "season": "any", "params": {}, "fit": "full", "cuff": false}, {"id": "kombineza_babatko", "name": "Zimná kombinéza pre bábätko", "category": "Bábätká a batoľatá", "sizing": "clothing", "season": "winter", "params": {}, "fit": "full", "cuff": false}, {"id": "ciapka_babatko", "name": "Čiapka pre bábätko", "category": "Bábätká a batoľatá", "sizing": "head", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "prve_topanky", "name": "Prvé topánky (capačky)", "category": "Bábätká a batoľatá", "sizing": "foot", "season": "any", "params": {"unit": "eu", "allowance_mm": 12, "note": "Prvé topánky kupujte, až keď dieťa samo chodí; dovtedy sú najlepšie bosé nohy alebo capačky."}, "fit": "top", "cuff": false}, {"id": "odrazadlo", "name": "Odrážadlo", "category": "Bicykle a kolobežky", "sizing": "height_band", "season": "spring", "params": {"unit": "inch", "bands": [[10, 75, 95], [12, 85, 105], [14, 95, 112]]}, "fit": "top", "cuff": false}, {"id": "bicykel", "name": "Bicykel", "category": "Bicykle a kolobežky", "sizing": "height_band", "season": "spring", "params": {"unit": "inch", "bands": [[12, 85, 98], [14, 95, 106], [16, 100, 116], [20, 114, 132], [24, 128, 148], [26, 142, 165]], "below_note": "Pre takúto výšku je zvyčajne vhodnejšie odrážadlo (10–12\").", "above_note": "Pre takúto výšku sa už hodí dospelý rám XS/S (27,5\" alebo 29\")."}, "fit": "top", "cuff": false}, {"id": "kolobezka", "name": "Kolobežka", "category": "Bicykle a kolobežky", "sizing": "none", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "prilba_bicykel", "name": "Prilba na bicykel", "category": "Bicykle a kolobežky", "sizing": "head", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "lyze", "name": "Zjazdové lyže", "category": "Lyžovanie a snowboard", "sizing": "height_length", "season": "winter", "params": {"factor": 1.0, "ideal": -15, "min": -20, "max": -10, "step": 5, "min_len": 70, "max_len": 180, "note": "Lyže: od výšky brady (začiatočníci, ≈ výška − 20 cm) po výšku nosa (zdatní lyžiari, ≈ výška − 10 cm). Hľadám {lo}–{hi} cm."}, "fit": "top", "cuff": false}, {"id": "lyziarky", "name": "Lyžiarky (lyžiarske topánky)", "category": "Lyžovanie a snowboard", "sizing": "foot", "season": "winter", "params": {"unit": "mondo", "allowance_mm": 5}, "fit": "top", "cuff": false}, {"id": "lyziarske_palice", "name": "Lyžiarske palice", "category": "Lyžovanie a snowboard", "sizing": "height_length", "season": "winter", "params": {"factor": 0.68, "ideal": 0, "min": -5, "max": 5, "step": 5, "min_len": 60, "max_len": 135, "note": "Palice: dĺžka ≈ 0,68 × výška dieťaťa (lakeť v pravom uhle). Hľadám {lo}–{hi} cm."}, "fit": "top", "cuff": false}, {"id": "lyziarska_prilba", "name": "Lyžiarska prilba", "category": "Lyžovanie a snowboard", "sizing": "head", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "lyziarske_okuliare", "name": "Lyžiarske okuliare", "category": "Lyžovanie a snowboard", "sizing": "none", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "snowboard", "name": "Snowboard", "category": "Lyžovanie a snowboard", "sizing": "height_length", "season": "winter", "params": {"factor": 1.0, "ideal": -18, "min": -25, "max": -12, "step": 5, "min_len": 70, "max_len": 165, "note": "Snowboard pre deti: medzi bradou a nosom (≈ výška − 25 až − 12 cm). Hľadám {lo}–{hi} cm."}, "fit": "top", "cuff": false}, {"id": "snowboard_topanky", "name": "Snowboardové topánky", "category": "Lyžovanie a snowboard", "sizing": "foot", "season": "winter", "params": {"unit": "eu", "allowance_mm": 10}, "fit": "top", "cuff": false}, {"id": "bezky", "name": "Bežky", "category": "Lyžovanie a snowboard", "sizing": "height_length", "season": "winter", "params": {"factor": 1.0, "ideal": 15, "min": 10, "max": 20, "step": 5, "min_len": 90, "max_len": 200, "note": "Bežky (klasika): výška dieťaťa + 10 až 20 cm. Hľadám {lo}–{hi} cm."}, "fit": "top", "cuff": false}, {"id": "bezky_topanky", "name": "Topánky na bežky", "category": "Lyžovanie a snowboard", "sizing": "foot", "season": "winter", "params": {"unit": "eu", "allowance_mm": 10}, "fit": "top", "cuff": false}, {"id": "lyziarska_bunda", "name": "Lyžiarska bunda", "category": "Lyžovanie a snowboard", "sizing": "clothing", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "lyziarske_nohavice", "name": "Lyžiarske nohavice (oteplováky)", "category": "Lyžovanie a snowboard", "sizing": "clothing", "season": "winter", "params": {}, "fit": "bottom", "cuff": false}, {"id": "kombineza", "name": "Zimná / lyžiarska kombinéza", "category": "Lyžovanie a snowboard", "sizing": "clothing", "season": "winter", "params": {}, "fit": "full", "cuff": false}, {"id": "termopradlo", "name": "Termoprádlo", "category": "Lyžovanie a snowboard", "sizing": "clothing", "season": "winter", "params": {}, "fit": "full", "cuff": false}, {"id": "lyziarske_rukavice", "name": "Lyžiarske rukavice", "category": "Lyžovanie a snowboard", "sizing": "age_band", "season": "winter", "params": {"unit": "number", "bands": [[0, 4, 3], [4, 6, 4], [6, 8, 5], [8, 10, 6], [10, 12, 7], [12, 99, 8]], "note": "Veľkosti rukavíc sa líšia podľa značky; najistejšie je vyskúšať alebo zmerať dlaň."}, "fit": "top", "cuff": false}, {"id": "korcule_ladove", "name": "Ľadové korčule (rekreačné / krasokorčule)", "category": "Korčuľovanie a hokej", "sizing": "foot", "season": "winter", "params": {"unit": "eu", "allowance_mm": 7}, "fit": "top", "cuff": false}, {"id": "korcule_hokejove", "name": "Hokejové korčule", "category": "Korčuľovanie a hokej", "sizing": "foot", "season": "winter", "params": {"unit": "eu", "allowance_mm": 4, "note": "Hokejové korčule sa nosia tesnejšie – bývajú o 1 až 1,5 čísla menšie než bežná obuv."}, "fit": "top", "cuff": false}, {"id": "korcule_kolieskove", "name": "Kolieskové korčule", "category": "Korčuľovanie a hokej", "sizing": "foot", "season": "spring", "params": {"unit": "eu", "allowance_mm": 10, "note": "Nastaviteľné korčule (napr. 29–32) vydržia 2–3 sezóny."}, "fit": "top", "cuff": false}, {"id": "hokejka", "name": "Hokejka", "category": "Korčuľovanie a hokej", "sizing": "height_band", "season": "winter", "params": {"unit": "label", "bands": [["YTH", 0, 130], ["JR", 125, 160], ["INT", 150, 175], ["SR", 170, 230]], "note": "Hokejky sa delia na YTH (najmenšie), JR, INT a SR; dĺžka po bradu dieťaťa v topánkach."}, "fit": "top", "cuff": false}, {"id": "hokejova_prilba", "name": "Hokejová prilba", "category": "Korčuľovanie a hokej", "sizing": "head", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "hokejova_vystroj", "name": "Hokejová výstroj (chrániče)", "category": "Korčuľovanie a hokej", "sizing": "height_band", "season": "winter", "params": {"unit": "label", "bands": [["YTH", 0, 130], ["JR", 125, 160], ["INT", 150, 175], ["SR", 170, 230]]}, "fit": "top", "cuff": false}, {"id": "chranice", "name": "Chrániče na korčuľovanie (kolená, lakte, zápästia)", "category": "Korčuľovanie a hokej", "sizing": "age_band", "season": "spring", "params": {"unit": "label", "bands": [[0, 5, "XS"], [5, 8, "S"], [8, 12, "M"], [12, 99, "L"]]}, "fit": "top", "cuff": false}, {"id": "kopacky", "name": "Kopačky (lisovky)", "category": "Futbal a loptové hry", "sizing": "foot", "season": "spring", "params": {"unit": "eu", "allowance_mm": 8}, "fit": "top", "cuff": false}, {"id": "halovky", "name": "Halovky / turfy", "category": "Futbal a loptové hry", "sizing": "foot", "season": "autumn", "params": {"unit": "eu", "allowance_mm": 8}, "fit": "top", "cuff": false}, {"id": "chranice_holeni", "name": "Chrániče holení", "category": "Futbal a loptové hry", "sizing": "height_band", "season": "spring", "params": {"unit": "label", "bands": [["XS", 0, 122], ["S", 118, 142], ["M", 138, 162], ["L", 158, 230]]}, "fit": "top", "cuff": false}, {"id": "futbalova_lopta", "name": "Futbalová lopta", "category": "Futbal a loptové hry", "sizing": "age_band", "season": "spring", "params": {"unit": "number", "bands": [[0, 8, 3], [8, 12, 4], [12, 99, 5]], "note": "Futbalové lopty: č. 3 do 8 rokov, č. 4 pre 8–12 rokov, č. 5 od 12 rokov."}, "fit": "top", "cuff": false}, {"id": "basketbalova_lopta", "name": "Basketbalová lopta", "category": "Futbal a loptové hry", "sizing": "age_band", "season": "any", "params": {"unit": "number", "bands": [[0, 12, 5], [12, 14, 6], [14, 99, 7]], "note": "Basketbal: č. 5 do 12 rokov, č. 6 pre 12–14 rokov (dievčatá aj neskôr), č. 7 chlapci od 14."}, "fit": "top", "cuff": false}, {"id": "futbalovy_dres", "name": "Športový / futbalový dres", "category": "Futbal a loptové hry", "sizing": "clothing", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "tenisova_raketa", "name": "Tenisová raketa", "category": "Tenis", "sizing": "height_band", "season": "spring", "params": {"unit": "inch", "bands": [[19, 0, 105], [21, 100, 118], [23, 113, 132], [25, 128, 148], [26, 140, 160], [27, 155, 230]]}, "fit": "top", "cuff": false}, {"id": "plavky", "name": "Plavky", "category": "Plávanie a voda", "sizing": "clothing", "season": "summer", "params": {}, "fit": "full", "cuff": false}, {"id": "neopren", "name": "Neoprén", "category": "Plávanie a voda", "sizing": "clothing", "season": "summer", "params": {}, "fit": "full", "cuff": false}, {"id": "plavecke_okuliare", "name": "Plavecké okuliare", "category": "Plávanie a voda", "sizing": "none", "season": "summer", "params": {}, "fit": "top", "cuff": false}, {"id": "obuv_do_vody", "name": "Obuv do vody", "category": "Plávanie a voda", "sizing": "foot", "season": "summer", "params": {"unit": "eu", "allowance_mm": 10}, "fit": "top", "cuff": false}, {"id": "turisticka_obuv", "name": "Turistická obuv", "category": "Turistika a outdoor", "sizing": "foot", "season": "spring", "params": {"unit": "eu", "allowance_mm": 12}, "fit": "top", "cuff": false}, {"id": "softshell_bunda", "name": "Softshellová bunda", "category": "Turistika a outdoor", "sizing": "clothing", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "nepremokava_bunda", "name": "Nepremokavá bunda", "category": "Turistika a outdoor", "sizing": "clothing", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "softshell_nohavice", "name": "Softshellové nohavice", "category": "Turistika a outdoor", "sizing": "clothing", "season": "spring", "params": {}, "fit": "bottom", "cuff": false}, {"id": "cvicky", "name": "Cvičky / baletky", "category": "Gymnastika, tanec, bojové športy", "sizing": "foot", "season": "autumn", "params": {"unit": "eu", "allowance_mm": 5}, "fit": "top", "cuff": false}, {"id": "kimono", "name": "Kimono (judo, karate)", "category": "Gymnastika, tanec, bojové športy", "sizing": "clothing", "season": "autumn", "params": {"series": [100, 110, 120, 130, 140, 150, 160, 170, 180, 190], "note": "Kimonu sa veľkosť udáva výškou postavy v cm (po 10 cm)."}, "fit": "top", "cuff": false}, {"id": "gymnasticky_dres", "name": "Gymnastický / tanečný dres", "category": "Gymnastika, tanec, bojové športy", "sizing": "clothing", "season": "autumn", "params": {}, "fit": "full", "cuff": false}, {"id": "tenisky", "name": "Tenisky / botasky", "category": "Obuv", "sizing": "foot", "season": "any", "params": {"unit": "eu", "allowance_mm": 12}, "fit": "top", "cuff": false}, {"id": "bezecka_obuv", "name": "Bežecká obuv", "category": "Obuv", "sizing": "foot", "season": "spring", "params": {"unit": "eu", "allowance_mm": 12}, "fit": "top", "cuff": false}, {"id": "zimna_obuv", "name": "Zimné topánky / snehule", "category": "Obuv", "sizing": "foot", "season": "winter", "params": {"unit": "eu", "allowance_mm": 15, "note": "Pri zimnej obuvi rátame s väčšou rezervou (15 mm) na hrubé ponožky."}, "fit": "top", "cuff": false}, {"id": "gumaky", "name": "Gumáky", "category": "Obuv", "sizing": "foot", "season": "autumn", "params": {"unit": "eu", "allowance_mm": 15}, "fit": "top", "cuff": false}, {"id": "sandale", "name": "Sandále", "category": "Obuv", "sizing": "foot", "season": "summer", "params": {"unit": "eu", "allowance_mm": 10}, "fit": "top", "cuff": false}, {"id": "papuce", "name": "Papuče / prezuvky", "category": "Obuv", "sizing": "foot", "season": "autumn", "params": {"unit": "eu", "allowance_mm": 10}, "fit": "top", "cuff": false}, {"id": "zimna_bunda", "name": "Zimná bunda", "category": "Oblečenie", "sizing": "clothing", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "prechodna_bunda", "name": "Prechodná bunda", "category": "Oblečenie", "sizing": "clothing", "season": "spring", "params": {}, "fit": "top", "cuff": false}, {"id": "mikina", "name": "Mikina", "category": "Oblečenie", "sizing": "clothing", "season": "any", "params": {}, "fit": "top", "cuff": false}, {"id": "teplaky", "name": "Tepláky", "category": "Oblečenie", "sizing": "clothing", "season": "any", "params": {}, "fit": "bottom", "cuff": true}, {"id": "nohavice", "name": "Nohavice / rifle", "category": "Oblečenie", "sizing": "clothing", "season": "any", "params": {}, "fit": "bottom", "cuff": false}, {"id": "tricko", "name": "Tričko", "category": "Oblečenie", "sizing": "clothing", "season": "summer", "params": {}, "fit": "top", "cuff": false}, {"id": "leginy", "name": "Legíny", "category": "Oblečenie", "sizing": "clothing", "season": "any", "params": {}, "fit": "bottom", "cuff": true}, {"id": "pyzamo", "name": "Pyžamo", "category": "Oblečenie", "sizing": "clothing", "season": "any", "params": {}, "fit": "full", "cuff": false}, {"id": "ciapka", "name": "Čiapka", "category": "Oblečenie", "sizing": "head", "season": "winter", "params": {}, "fit": "top", "cuff": false}, {"id": "rukavice", "name": "Zimné rukavice", "category": "Oblečenie", "sizing": "age_band", "season": "winter", "params": {"unit": "number", "bands": [[0, 4, 3], [4, 6, 4], [6, 8, 5], [8, 10, 6], [10, 12, 7], [12, 99, 8]], "note": "Veľkosti rukavíc sa líšia podľa značky; najistejšie je vyskúšať alebo zmerať dlaň."}, "fit": "top", "cuff": false}, {"id": "sanky", "name": "Sánky / boby", "category": "Bez veľkosti", "sizing": "none", "season": "winter", "params": {}, "fit": "top", "cuff": false}];
  // English names and notes of the catalog items (site/i18n_en.py), by item id; categories by their Slovak name.
  var CATALOG_EN = {"items": {"body_dupacky": {"name": "Bodysuits, sleepsuits, rompers"}, "kombineza_babatko": {"name": "Baby snowsuit"}, "ciapka_babatko": {"name": "Baby hat"}, "prve_topanky": {"name": "First shoes (soft soles)", "note": "Buy first shoes only once the child walks alone; until then bare feet or soft slippers are best."}, "odrazadlo": {"name": "Balance bike"}, "bicykel": {"name": "Bike", "below_note": "For this height a balance bike (10–12\") is usually better.", "above_note": "For this height an adult XS/S frame (27.5\" or 29\") fits."}, "kolobezka": {"name": "Scooter"}, "prilba_bicykel": {"name": "Bike helmet"}, "lyze": {"name": "Downhill skis", "note": "Skis: from chin height (beginners, ≈ height − 20 cm) to nose height (good skiers, ≈ height − 10 cm). Looking for {lo}–{hi} cm."}, "lyziarky": {"name": "Ski boots"}, "lyziarske_palice": {"name": "Ski poles", "note": "Poles: length ≈ 0.68 × the child's height (elbow at a right angle). Looking for {lo}–{hi} cm."}, "lyziarska_prilba": {"name": "Ski helmet"}, "lyziarske_okuliare": {"name": "Ski goggles"}, "snowboard": {"name": "Snowboard", "note": "Kids' snowboard: between chin and nose (≈ height − 25 to − 12 cm). Looking for {lo}–{hi} cm."}, "snowboard_topanky": {"name": "Snowboard boots"}, "bezky": {"name": "Cross-country skis", "note": "Cross-country skis (classic): the child's height + 10 to 20 cm. Looking for {lo}–{hi} cm."}, "bezky_topanky": {"name": "Cross-country ski boots"}, "lyziarska_bunda": {"name": "Ski jacket"}, "lyziarske_nohavice": {"name": "Ski trousers"}, "kombineza": {"name": "Snowsuit / ski suit"}, "termopradlo": {"name": "Thermal underwear"}, "lyziarske_rukavice": {"name": "Ski gloves", "note": "Glove sizes differ between brands; trying them on or measuring the palm is the safest way."}, "korcule_ladove": {"name": "Ice skates (recreational / figure)"}, "korcule_hokejove": {"name": "Hockey skates", "note": "Hockey skates are worn tighter – usually 1 to 1.5 sizes smaller than everyday shoes."}, "korcule_kolieskove": {"name": "Inline skates", "note": "Adjustable skates (e.g. 29–32) last 2–3 seasons."}, "hokejka": {"name": "Hockey stick", "note": "Hockey sticks come in YTH (smallest), JR, INT and SR; length up to the child's chin in skates."}, "hokejova_prilba": {"name": "Hockey helmet"}, "hokejova_vystroj": {"name": "Hockey protective gear"}, "chranice": {"name": "Skating pads (knees, elbows, wrists)"}, "kopacky": {"name": "Football boots (moulded studs)"}, "halovky": {"name": "Indoor / turf shoes"}, "chranice_holeni": {"name": "Shin guards"}, "futbalova_lopta": {"name": "Football", "note": "Footballs: size 3 up to 8 years, size 4 for 8–12 years, size 5 from 12 years."}, "basketbalova_lopta": {"name": "Basketball", "note": "Basketball: size 5 up to 12 years, size 6 for 12–14 years (girls also later), size 7 for boys from 14."}, "futbalovy_dres": {"name": "Sports / football kit"}, "tenisova_raketa": {"name": "Tennis racket"}, "plavky": {"name": "Swimsuit / swim shorts"}, "neopren": {"name": "Wetsuit"}, "plavecke_okuliare": {"name": "Swimming goggles"}, "obuv_do_vody": {"name": "Water shoes"}, "turisticka_obuv": {"name": "Hiking boots"}, "softshell_bunda": {"name": "Softshell jacket"}, "nepremokava_bunda": {"name": "Waterproof jacket"}, "softshell_nohavice": {"name": "Softshell trousers"}, "cvicky": {"name": "Gym shoes / ballet slippers"}, "kimono": {"name": "Gi (judo, karate)", "note": "A gi is sized by body height in cm (in 10 cm steps)."}, "gymnasticky_dres": {"name": "Gymnastics / dance leotard"}, "tenisky": {"name": "Trainers / sneakers"}, "bezecka_obuv": {"name": "Running shoes"}, "zimna_obuv": {"name": "Winter boots / snow boots", "note": "For winter boots we allow more room (15 mm) for thick socks."}, "gumaky": {"name": "Wellies"}, "sandale": {"name": "Sandals"}, "papuce": {"name": "Slippers / indoor shoes"}, "zimna_bunda": {"name": "Winter jacket"}, "prechodna_bunda": {"name": "Spring / autumn jacket"}, "mikina": {"name": "Sweatshirt / hoodie"}, "teplaky": {"name": "Tracksuit bottoms"}, "nohavice": {"name": "Trousers / jeans"}, "tricko": {"name": "T-shirt"}, "leginy": {"name": "Leggings"}, "pyzamo": {"name": "Pyjamas"}, "ciapka": {"name": "Hat"}, "rukavice": {"name": "Winter gloves", "note": "Glove sizes differ between brands; trying them on or measuring the palm is the safest way."}, "sanky": {"name": "Sledge / bobsled"}}, "categories": {"Bábätká a batoľatá": "Babies and toddlers", "Oblečenie": "Clothing", "Obuv": "Footwear", "Bicykle a kolobežky": "Bikes and scooters", "Lyžovanie a snowboard": "Skiing and snowboarding", "Korčuľovanie a hokej": "Skating and hockey", "Futbal a loptové hry": "Football and ball games", "Tenis": "Tennis", "Plávanie a voda": "Swimming and water", "Turistika a outdoor": "Hiking and outdoor", "Gymnastika, tanec, bojové športy": "Gymnastics, dance, martial arts", "Bez veľkosti": "No size"}};
  // Language of the texts the engine returns: "sk" (default) or "en". Calculations are the same in both.
  var LANG = "sk";
  function T(sk, en) { return LANG === "en" ? en : sk; }
  function withLang(lang, fn) { var prev = LANG; LANG = lang === "en" ? "en" : "sk"; try { return fn(); } finally { LANG = prev; } }
  function localItem(item) {
    if (!item || LANG !== "en") return item;
    var t = CATALOG_EN.items[item.id] || {}, params = Object.assign({}, item.params);
    ["note", "below_note", "above_note"].forEach(function (k) { if (t[k]) params[k] = t[k]; });
    return Object.assign({}, item, { name: t.name || item.name, category: CATALOG_EN.categories[item.category] || item.category, params: params });
  }

  var Z_DRIFT = 0.35, MEAS_ERR = 1.0, MAX_Z = 3.0, RARE_Z = 4.0, IMPOSSIBLE_Z = 6.0, FOOT_RATIO_MIN = 0.67, FOOT_RATIO_MAX = 1.33;
  var INFANT_END = 24, FOOT_MIN_AGE = 1.0;
  var DAY_MS = 86400000, DAYS_PER_MONTH = 365.25 / 12;
  var SEASONS = { spring: [4, 1], summer: [6, 15], autumn: [9, 15], winter: [12, 1] };
  var SEASON_LABELS = { spring: "jar", summer: "leto", autumn: "jeseň", winter: "zima", any: "kedykoľvek" };
  var SEASON_LABELS_EN = { spring: "spring", summer: "summer", autumn: "autumn", winter: "winter", any: "any time" };

  // WHO Child Growth Standards, length-for-age 0-23 months (lying): [month, M, S]; L = 1, so 1 SD = M * S.
  var WHO_LENGTH = {
    male: [[0,49.8842,0.03795],[1,54.7244,0.03557],[2,58.4249,0.03424],[3,61.4292,0.03328],[4,63.8860,0.03257],
      [5,65.9026,0.03204],[6,67.6236,0.03165],[7,69.1645,0.03139],[8,70.5994,0.03124],[9,71.9687,0.03117],[10,73.2812,0.03118],
      [11,74.5388,0.03125],[12,75.7488,0.03137],[13,76.9186,0.03154],[14,78.0497,0.03174],[15,79.1458,0.03197],[16,80.2113,0.03222],
      [17,81.2487,0.03250],[18,82.2587,0.03279],[19,83.2418,0.03310],[20,84.1996,0.03342],[21,85.1348,0.03376],[22,86.0477,0.03410],
      [23,86.9410,0.03445]],
    female: [[0,49.1477,0.03790],[1,53.6872,0.03640],[2,57.0673,0.03568],[3,59.8029,0.03520],[4,62.0899,0.03486],
      [5,64.0301,0.03463],[6,65.7311,0.03448],[7,67.2873,0.03441],[8,68.7498,0.03440],[9,70.1435,0.03444],[10,71.4818,0.03452],
      [11,72.7710,0.03464],[12,74.0150,0.03479],[13,75.2176,0.03496],[14,76.3817,0.03514],[15,77.5099,0.03534],[16,78.6055,0.03555],
      [17,79.6710,0.03576],[18,80.7079,0.03598],[19,81.7182,0.03620],[20,82.7036,0.03643],[21,83.6654,0.03666],[22,84.6040,0.03688],
      [23,85.5202,0.03711]]
  };
  function r2(v) { return Math.round(v * 100) / 100; }
  function lengthRows(sex) { return WHO_LENGTH[sex].map(function (r) { return [r[0], r2(r[1] * (1 - r[2])), r2(r[1]), r2(r[1] * (1 + r[2]))]; }); }
  // WHO height-for-age (cm): [months, -1 SD, median, +1 SD]; 24-60 m WHO standards (standing), 61-228 m WHO 2007 reference
  var WHO = {
    male: [[24,84.1,87.1,90.2],[30,88.5,91.9,95.3],[36,92.4,96.1,99.8],[42,95.9,99.9,103.8],[48,99.1,103.3,107.5],
      [54,102.3,106.7,111.1],[60,105.3,110.0,114.6],[61,105.7,110.3,114.9],[72,111.0,116.0,120.9],[84,116.4,121.7,127.0],
      [96,121.6,127.3,132.9],[108,126.6,132.6,138.6],[120,131.4,137.8,144.2],[132,136.4,143.1,149.8],[144,142.0,149.1,156.2],
      [156,148.6,156.0,163.5],[168,155.5,163.2,170.9],[180,161.2,169.0,176.8],[192,165.1,172.9,180.7],[204,167.5,175.2,182.8],
      [216,168.7,176.1,183.6],[228,169.2,176.5,183.8]],
    female: [[24,82.5,85.7,88.9],[30,87.1,90.7,94.2],[36,91.2,95.1,98.9],[42,95.0,99.0,103.1],[48,98.4,102.7,107.0],
      [54,101.6,106.2,110.7],[60,104.7,109.4,114.2],[61,104.8,109.6,114.4],[72,110.0,115.1,120.2],[84,115.3,120.8,126.3],
      [96,120.8,126.6,132.4],[108,126.4,132.5,138.6],[120,132.2,138.6,145.0],[132,138.3,145.0,151.6],[144,144.4,151.2,158.1],
      [156,149.4,156.4,163.3],[168,152.8,159.8,166.7],[180,154.8,161.7,168.5],[192,155.7,162.5,169.3],[204,156.2,162.9,169.5],
      [216,156.5,163.1,169.7],[228,156.6,163.2,169.7]]
  };
  WHO.male = lengthRows("male").concat(WHO.male);
  WHO.female = lengthRows("female").concat(WHO.female);
  // Mean foot length (cm) by age (same table as predictor.py): 2-7 y Vrdoljak et al. 2017 (Croatia, n = 2,745);
  // 1.5 y Mueller et al. 2012 (Germany), 1.0 y extends that slope back; 7.5-17.5 y Wu et al. 2024 scaled to meet 7 y.
  var FOOT_RAW = {
    male: [[1,12.62],[1.5,13.39],[2,14.16],[3,15.74],[4,16.855],[5,17.975],[6,19.065],[7,19.935],[7.5,20.58],[8.5,21.55],[9.5,22.84],[10.5,23.71],[11.5,25.43],[12.5,26.51],[13.5,27.15],[14.5,27.59],[15.5,27.8],[16.5,27.8],[17.5,27.91]],
    female: [[1,12.07],[1.5,12.81],[2,13.545],[3,15.355],[4,16.635],[5,17.74],[6,18.88],[7,19.64],[7.5,20.12],[8.5,20.88],[9.5,22.6],[10.5,23.03],[11.5,24.32],[12.5,24.86],[13.5,25.07],[14.5,25.07],[15.5,25.29],[16.5,25.29],[17.5,25.29]]
  };
  // Head circumference (cm), sexes averaged: 0-5 y WHO girls' medians x 1.0125 (boys run ~2.5 % higher); later approximate.
  var HEAD = [[0,33.8787],[1,36.5463],[2,38.2521],[3,39.5328],[4,40.5817],[5,41.4590],[6,42.1995],[8,43.3671],[10,44.2319],
    [12,44.8965],[15,45.6551],[18,46.2424],[21,46.7384],[24,47.1822],[30,47.9340],[36,48.5099],[42,48.9629],[48,49.3321],
    [54,49.6464],[60,49.9229]].map(function (r) { return [r[0] / 12, r2(r[1] * 1.0125)]; }).concat([[6.0,51.1],[8.0,51.9],[10.0,52.6],[12.0,53.5],
    [14.0,54.5],[16.0,55.3],[18.0,55.8]]);
  // Body chest girth (cm) per children's size: 50-86 C&A baby chart, 92-176 s.Oliver kids' table (same as predictor.py).
  var CHEST_BY_SIZE = [[50,36],[56,38.5],[62,42.5],[68,45.5],[74,47],[80,49],[86,51],[92,52],[98,54],[104,56],[110,58],[116,60],[122,62],[128,64],[134,67],[140,70],[146,73],[152,76],[158,79],[164,82],[170,85],[176,88]];
  // Adult tops by chest girth (upper end of each size), s.Oliver size tables.
  var ADULT_CHEST = { female: [["XS",84],["S",88],["M",92],["L",96],["XL",101],["XXL",106]], male: [["S",90],["M",98],["L",102],["XL",114],["XXL",126]] };
  // WHO Growth Reference 2007, BMI-for-age 5-19 y: [month, L, M, S]. Over +1 / +2 SD = one / two sizes larger (rule of thumb).
  var WHO_BMI = {
    male: [[61,-0.7387,15.2641,0.0839],[66,-0.8554,15.2645,0.08516],[72,-0.9921,15.3062,0.08682],[78,-1.123,15.3825,0.08865],[84,-1.246,15.4832,0.09068],[90,-1.3596,15.6023,0.09289],[96,-1.4629,15.7368,0.09526],[102,-1.5542,15.8855,0.09778],[108,-1.6318,16.049,0.10038],[114,-1.6944,16.2333,0.10303],[120,-1.7407,16.4433,0.10566],[126,-1.771,16.6786,0.10823],[132,-1.7862,16.9392,0.1107],[138,-1.7873,17.2236,0.11304],[144,-1.7751,17.5334,0.11522],[150,-1.7511,17.8704,0.1172],[156,-1.7168,18.233,0.11898],[162,-1.6732,18.6148,0.12055],[168,-1.6211,19.005,0.12191],[174,-1.5615,19.3937,0.1231],[180,-1.4961,19.7744,0.12412],[186,-1.4263,20.1427,0.12501],[192,-1.3529,20.4951,0.12579],[198,-1.2762,20.8287,0.1265],[204,-1.1962,21.1423,0.12715],[210,-1.1129,21.4354,0.12777],[216,-1.026,21.7077,0.12836],[222,-0.9356,21.9585,0.12893],[228,-0.8419,22.1883,0.12948]],
    female: [[61,-0.8886,15.2441,0.09692],[66,-0.978,15.2464,0.0992],[72,-1.0794,15.2697,0.10195],[78,-1.1728,15.32,0.10471],[84,-1.2565,15.4036,0.10746],[90,-1.3287,15.524,0.1102],[96,-1.388,15.681,0.11291],[102,-1.4336,15.8738,0.11557],[108,-1.465,16.0964,0.11816],[114,-1.4823,16.3425,0.12067],[120,-1.4864,16.6133,0.12307],[126,-1.4787,16.9136,0.12534],[132,-1.4606,17.2459,0.12748],[138,-1.4339,17.6088,0.12946],[144,-1.4006,17.9966,0.13129],[150,-1.3621,18.3986,0.13295],[156,-1.3195,18.8012,0.13445],[162,-1.2739,19.1931,0.1358],[168,-1.2266,19.5647,0.137],[174,-1.1788,19.907,0.13808],[180,-1.1311,20.2125,0.13904],[186,-1.0838,20.4769,0.13991],[192,-1.0368,20.7008,0.1407],[198,-0.9898,20.8863,0.14142],[204,-0.9423,21.0367,0.14208],[210,-0.8944,21.1586,0.14271],[216,-0.8462,21.2603,0.1433],[222,-0.798,21.348,0.14386],[228,-0.7496,21.4269,0.14441]]
  };
  function bmiZ(sex, months, kg, cm) {
    if (months < 61 || months > 228) return null;
    var sexes = sex === "male" || sex === "female" ? [sex] : ["male", "female"], sum = 0;
    sexes.forEach(function (sx) {
      var rows = WHO_BMI[sx], col = function (i) { return interp(rows.map(function (r) { return [r[0], r[i]]; }), months); };
      var L = col(1), M = col(2), S = col(3), bmi = kg / Math.pow(cm / 100, 2);
      sum += (Math.pow(bmi / M, L) - 1) / (L * S);
    });
    return sum / sexes.length;
  }
  function chestForHeight(cm) {
    var last = CHEST_BY_SIZE[CHEST_BY_SIZE.length - 1];
    return cm > last[0] ? last[1] + (cm - last[0]) * 0.5 : interp(CHEST_BY_SIZE, cm);
  }
  function adultSize(sex, girth, charts) {
    var key = sex === "female" ? "female" : "male", chart = (charts || ADULT_CHEST)[key], label = chart[chart.length - 1][0];
    for (var i = 0; i < chart.length; i++) if (chart[i][1] >= girth - 1e-9) { label = chart[i][0]; break; }
    return [label, key === "female" ? T("dámske", "women's") : T("pánske", "men's")];
  }
  // Body waist girth (cm) per children's size 92-176: s.Oliver kids' table. Adult trousers by waist, s.Oliver tables.
  var WAIST_BY_SIZE = [[92,50],[98,52],[104,53],[110,54],[116,55],[122,57],[128,58],[134,59.5],[140,61],[146,62.5],[152,64],
    [158,65.5],[164,67],[170,68.5],[176,70]];
  var ADULT_WAIST = { female: [["XS",65],["S",69],["M",73],["L",77],["XL",82],["XXL",87]], male: [["S",77.3],["M",85.3],["L",95.3],["XL",101.3],["XXL",113.3]] };
  var ADULT_FROM_SIZE = 158; // trousers move to adult sizes by waist only from this children's size on
  // Sizing trousers by the waist and shortening the legs works up to ~2 sizes (3 with elastic cuffs); beyond that
  // the rise (waist to crotch) is too long, so a Big/Plus cut or an adjustable waist is the better advice.
  var HEM_MAX_SIZES = 2, CUFF_MAX_SIZES = 3;
  function waistAdvice(item, heightSize, fits, shift) { // -> [extra sizes, advice]; same as _waist_advice in predictor.py
    var fitText = fits !== null ? num(fits) : T("nad 176", "over 176");
    if (item.fit !== "bottom") return [1, T("Obvodom pásu zodpovedá veľkosti " + fitText + ". Hľadajte voľnejší strih (Big/Plus); " +
      "ešte väčšia veľkosť by bola príliš dlhá.", "By the waist this matches size " + fitText + ". Look for a looser cut (Big/Plus); " +
      "an even bigger size would be too long.")];
    var cuff = !!item.cuff;
    var big = heightSize >= 134 ? T("veľkosť " + num(heightSize) + " v strihu Big/Plus", "size " + num(heightSize) + " in a Big/Plus cut")
      : T("nohavice s nastaviteľným pásom", "trousers with an adjustable waist");
    if (fits !== null && shift <= (cuff ? CUFF_MAX_SIZES : HEM_MAX_SIZES)) {
      if (cuff) return [shift, T("Pri manžetách na koncoch nohavíc dĺžka nevadí, skracovať zvyčajne netreba. Alternatíva: ",
        "With elastic cuffs at the ankles the length doesn't matter, so shortening is usually not needed. Alternative: ") + big + "."];
      return [shift, T("Veľkosť " + fitText + " sedí v páse, nohavice však bude treba skrátiť (dĺžkou zodpovedá veľkosť " +
        num(heightSize) + "). Alternatíva bez skracovania: ", "Size " + fitText + " fits at the waist, but the legs will need shortening (the length matches size " +
        num(heightSize) + "). Alternative without shortening: ") + big + "."];
    }
    var hem = fits !== null ? T(" Veľkosť " + fitText + " so skrátením je možná, ale sed (od pásu po rozkrok) by bol príliš dlhý.",
      " Size " + fitText + " with shortened legs is possible, but the rise (waist to crotch) would be too long.") : "";
    return [1, T("Obvodom pásu zodpovedá veľkosti " + fitText + ". Hľadajte strih Big/Plus alebo nastaviteľný pás.",
      "By the waist this matches size " + fitText + ". Look for a Big/Plus cut or an adjustable waist.") + hem];
  }
  var MEASURES = {
    chest: { name: "hrudníka", nameEn: "chest", table: CHEST_BY_SIZE, adult: ADULT_CHEST, kind: "", kindEn: "" },
    waist: { name: "pásu", nameEn: "waist", table: WAIST_BY_SIZE, adult: ADULT_WAIST, kind: "nohavice", kindEn: "trousers" }
  };
  function mName(m) { return T(m.name, m.nameEn); }
  function slimTip(girthGiven) { // the last sentence asks for the waist girth, so it is left out once a girth was entered
    return T("Dieťa má štíhlu postavu: veľkosť ponechávame podľa výšky (kvôli dĺžke rukávov a nohavíc), ale hľadajte " +
      "strih Slim, nohavice s nastaviteľným pásom, alebo nechajte pás zúžiť u krajčírky." + (girthGiven ? "" : " Presnejšie poradíme podľa obvodu pásu."),
      "The child has a slim build: we keep the size by height (for the length of sleeves and legs), but look for a Slim cut, " +
      "trousers with an adjustable waist, or have the waist taken in by a tailor." + (girthGiven ? "" : " The waist girth gives more precise advice."));
  }
  function measureTip(bottom) {
    return bottom ? T("Presnejšie to určí obvod pásu – zmerajte ho v najužšom mieste, zvyčajne tesne nad pupkom.",
      "The waist girth gives a more precise answer – measure it at the narrowest point, usually just above the navel.")
      : T("Presnejšie to určí obvod hrudníka – zmerajte ho pod pazuchami cez najširšie miesto.",
      "The chest girth gives a more precise answer – measure it under the armpits around the widest part.");
  }
  function girthForHeight(table, cm) {
    if (table === CHEST_BY_SIZE) return chestForHeight(cm);
    var n = table.length;
    if (cm > table[n - 1][0]) { var a = table[n - 2], b = table[n - 1]; return b[1] + (cm - b[0]) * (b[1] - a[1]) / (b[0] - a[0]); }
    return interp(table, cm);
  }
  function noBuild() { return { shift: 0, girth: null, reason: "", byWeight: false, measure: null, slim: "" }; }
  // How the child's build changes a clothing size: chest for tops, waist for bottoms, both for one-piece items;
  // without girths, WHO BMI-for-age from the weight (5-19 y). Same logic as ClothingRule in predictor.py.
  function buildFor(item, child, h, series, iH) {
    var bottom = item.fit === "bottom", ms = [];
    if (!bottom && child.chest) ms.push([MEASURES.chest, child.chest]);
    if ((bottom || item.fit === "full") && child.waist && series[iH] >= WAIST_BY_SIZE[0][0]) ms.push([MEASURES.waist, child.waist]);
    if (ms.length) {
      var best = null, slimSizes = [], big = "";
      ms.forEach(function (pair) {
        var m = pair[0], girth = pair[1] * girthForHeight(m.table, h.value) / girthForHeight(m.table, child.height), fits = null;
        for (var k = 0; k < m.table.length; k++) if (m.table[k][1] >= girth - 0.5) { fits = m.table[k][0]; break; }
        var iFit = fits !== null ? series.indexOf(fits) : series.length, sh = Math.max(0, iFit - iH);
        if (m === MEASURES.waist && sh >= 2 && !(fits === null && series[iH] >= ADULT_FROM_SIZE)) {
          var adv = waistAdvice(item, series[iH], fits, sh);
          sh = adv[0]; big = adv[1];
        }
        if (!best || sh > best[0]) best = [sh, m, girth];
        if (fits !== null && iFit <= iH - 2) slimSizes.push([m, fits]);
      });
      var reason = LANG === "en" ? ms.map(function (pr) { return pr[0].nameEn; }).join(" and ") + " girth"
        : ms.map(function (pr) { return "obvodu " + pr[0].name; }).join(" a "), slim = big;
      if (!best[0] && slimSizes.length === ms.length) {
        var ls = slimSizes[slimSizes.length - 1];
        slim = T("Dieťa je štíhlejšie: obvodom " + ls[0].name + " zodpovedá veľkosti " + num(ls[1]) + ", výškou veľkosti " + num(series[iH]) +
          ". Vyberte veľkosť " + num(series[iH]) + " v strihu Slim, s nastaviteľným pásom, alebo nechajte pás zúžiť u krajčírky.",
          "The child is slimmer: by the " + ls[0].nameEn + " girth this matches size " + num(ls[1]) + ", by height size " + num(series[iH]) +
          ". Choose size " + num(series[iH]) + " in a Slim cut, with an adjustable waist, or have the waist taken in by a tailor.");
      }
      return { shift: best[0], girth: best[0] ? best[2] : null, reason: reason, byWeight: false, measure: best[0] ? best[1] : null, slim: slim };
    }
    if (child.weight) {
      var z = bmiZ(child.sex, ageMonths(child.birth, child.today), child.weight, child.height);
      if (z !== null) {
        var steps = (z > 1 ? 1 : 0) + (z > 2 ? 1 : 0);
        return { shift: steps, girth: null, reason: T("výšky a hmotnosti", "height and weight"), byWeight: true, measure: null, slim: !steps && z < -1 ? slimTip() : "" };
      }
    }
    return noBuild();
  }
  var CLOTHING_SIZES = [50,56,62,68,74,80,86,92,98,104,110,116,122,128,134,140,146,152,158,164,170,176];

  function monotone(rows) { var best = 0; return rows.map(function (r) { best = Math.max(best, r[1]); return [r[0], best]; }); }
  var FOOT = { male: monotone(FOOT_RAW.male), female: monotone(FOOT_RAW.female) };

  // ---------------------------------------------------------------- helpers
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function roundHalfUp(v) { return Math.floor(v + 0.5); }
  function pyRound(v) { // Python's round(): halves go to the even neighbour
    var f = Math.floor(v), d = v - f;
    if (Math.abs(d - 0.5) < 1e-9) return f % 2 === 0 ? f : f + 1;
    return Math.round(v);
  }
  function num(v) { var t = String(Number(Number(v).toFixed(2))); return LANG === "en" ? t : t.replace(".", ","); }
  function interp(table, x) {
    if (x <= table[0][0]) return table[0][1];
    if (x >= table[table.length - 1][0]) return table[table.length - 1][1];
    for (var i = 1; i < table.length; i++) {
      if (x <= table[i][0]) {
        var a = table[i - 1], b = table[i];
        return a[1] + (x - a[0]) / (b[0] - a[0]) * (b[1] - a[1]);
      }
    }
    return table[table.length - 1][1];
  }
  function whoPoint1(sex, m) {
    var pts = WHO[sex];
    m = clamp(m, pts[0][0], pts[pts.length - 1][0]);
    for (var i = 0; i < pts.length; i++) {
      if (pts[i][0] === m) return { minus: pts[i][1], median: pts[i][2], plus: pts[i][3] };
      if (pts[i][0] > m) {
        var lo = pts[i - 1], hi = pts[i], t = (m - lo[0]) / (hi[0] - lo[0]);
        return { minus: lo[1] + t * (hi[1] - lo[1]), median: lo[2] + t * (hi[2] - lo[2]), plus: lo[3] + t * (hi[3] - lo[3]) };
      }
    }
    var last = pts[pts.length - 1];
    return { minus: last[1], median: last[2], plus: last[3] };
  }
  function whoPoint(sex, m) {
    if (sex === "male" || sex === "female") return whoPoint1(sex, m);
    var a = whoPoint1("male", m), b = whoPoint1("female", m);
    return { minus: (a.minus + b.minus) / 2, median: (a.median + b.median) / 2, plus: (a.plus + b.plus) / 2 };
  }
  function zScore(sex, m, h) {
    var p = whoPoint(sex, m);
    return h >= p.median ? (h - p.median) / (p.plus - p.median) : (h - p.median) / (p.median - p.minus);
  }
  function heightAt(sex, m, z) {
    var p = whoPoint(sex, m);
    return p.median + z * (z >= 0 ? p.plus - p.median : p.median - p.minus);
  }
  function footRef(sex, years) {
    if (sex === "male" || sex === "female") return interp(FOOT[sex], years);
    return (interp(FOOT.male, years) + interp(FOOT.female, years)) / 2;
  }
  function utc(y, m, d) { return new Date(Date.UTC(y, m - 1, d)); }
  function toUTC(date) { return utc(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()); }
  function ageMonths(birth, on) { return Math.round((toUTC(on) - toUTC(birth)) / DAY_MS) / DAYS_PER_MONTH; }
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(d) {
    return LANG === "en" ? d.getUTCDate() + " " + MONTHS_EN[d.getUTCMonth()] + " " + d.getUTCFullYear()
      : d.getUTCDate() + ". " + (d.getUTCMonth() + 1) + ". " + d.getUTCFullYear();
  }

  function resolveTarget(spec, today) {
    today = toUTC(today);
    if (spec === "now") return new Date(today.getTime() + 14 * DAY_MS);
    var m = /^next_(\w+)$/.exec(spec);
    if (m && SEASONS[m[1]]) {
      var s = SEASONS[m[1]], c = utc(today.getUTCFullYear(), s[0], s[1]);
      return c > today ? c : utc(today.getUTCFullYear() + 1, s[0], s[1]);
    }
    var mm = /^(\d{4})-(\d{1,2})$/.exec(spec || "");
    if (mm && +mm[2] >= 1 && +mm[2] <= 12) return utc(+mm[1], +mm[2], 1);
    var dd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(spec || "");
    if (dd) { var day = utc(+dd[1], +dd[2], +dd[3]); if (day.getUTCMonth() + 1 === +dd[2]) return day; }
    throw new SizingError(T("Vyberte, na kedy vec potrebujete.", "Choose when you need it."));
  }

  // A missing or impossible input: message = a sentence for the parent, field = the form field to fix.
  function SizingError(message, field) {
    this.name = "SizingError"; this.message = message; this.field = field || null;
    if (Error.captureStackTrace) Error.captureStackTrace(this, SizingError); else this.stack = new Error(message).stack;
  }
  SizingError.prototype = Object.create(Error.prototype);
  SizingError.prototype.constructor = SizingError;
  SizingError.prototype.name = "SizingError";

  // -------------------------------------------------------------- forecasts
  // Age in the genitive, as used after "veku": 1 roka, 6 rokov, 1 mesiaca, 4 mesiacov.
  function ageText(months) {
    var y = Math.floor(months / 12), m = Math.floor(months % 12), parts = [];
    if (LANG === "en") {
      if (y) parts.push(y + (y === 1 ? " year" : " years"));
      if (m) parts.push(m + (m === 1 ? " month" : " months"));
      return parts.join(" and ") || "0 months";
    }
    if (y) parts.push(y + (y === 1 ? " roka" : " rokov"));
    if (m) parts.push(m + (m === 1 ? " mesiaca" : " mesiacov"));
    return parts.join(" a ") || "0 mesiacov";
  }
  // Month-to-month correlation of a z-score: ~0.8 at 0-1 m rising to ~0.97 at 11-12 m (Cole et al. 2016);
  // from 2 years the z-score is kept with a drift of Z_DRIFT per sqrt(year), as for older children.
  function monthlyR(m) {
    var older = Math.sqrt(1 - Z_DRIFT * Z_DRIFT / 12);
    if (m < 11) return 0.80 + (0.97 - 0.80) * m / 11;
    if (m < INFANT_END) return 0.97 + (older - 0.97) * (m - 11) / (INFANT_END - 11);
    return older;
  }
  function zTracking(a0, a1) { // -> [share of z kept, SD of the target z]
    var start = Math.max(a0, 0), end = Math.max(a1, a0), infEnd = Math.min(end, INFANT_END), logKeep = 0, m = start;
    while (m < infEnd - 1e-9) { var dt = Math.min(0.25, infEnd - m); logKeep += dt * Math.log(monthlyR(m + dt / 2)); m += dt; }
    var keep = Math.exp(logKeep), variance = 1 - keep * keep;
    variance += Z_DRIFT * Z_DRIFT * Math.max(0, end - Math.max(start, INFANT_END)) / 12;
    return [keep, Math.sqrt(variance)];
  }
  // Corrected age for babies born preterm (< 37 weeks): growth is read against the age counted from the due date
  // (40 weeks), as paediatric growth monitoring does until 2 years of chronological age.
  function correctionMonths(child) {
    var w = child.birthWeek;
    if (!w || w >= 37 || ageMonths(child.birth, child.today) >= 24) return 0;
    return (40 - w) * 7 / DAYS_PER_MONTH;
  }
  function growthAge(child, on) { return Math.max(0, ageMonths(child.birth, on) - correctionMonths(child)); }

  // Puberty (Holmgren et al. 2017, Gårdstedt-Berghog et al. 2024; feet: Busscher et al. 2011) and parents' heights
  // (Zeevi et al. 2024; Tanner et al. 1956; Cole & Wright 2011). Same constants as predictor.py.
  var PUBERTY_WINDOW = { female: [8.5, 15.0], male: [10.0, 16.5], unspecified: [8.5, 16.5] };
  var FOOT_PUBERTY_WINDOW = { female: [8.5, 13.0], male: [9.5, 14.5], unspecified: [8.5, 14.5] };
  var PHV_AGE = { female: 11.8, male: 13.6, unspecified: 12.7 }, GROWTH_END = { female: 16.0, male: 18.0, unspecified: 17.0 };
  var PARENTS_FROM_AGE = 8.0, ADULT_MONTH = 228, PARENT_GAP_SHARE = 0.35;
  // Late spurt: wider upper end of the range. Earlier measurement: measured growth speed (see predictor.py).
  var LATE_PUBERTY_WINDOW = { female: [12.5, 15.0], male: [14.5, 16.5], unspecified: [12.5, 16.5] };
  var LATE_EXTRA_PER_YEAR = 2.5, LATE_EXTRA_MAX = 3.0, VELOCITY_EXTRA_SHARE = 0.5;
  var VEL_PERSIST = 0.5, VEL_SD_CHILD = 1.2, VEL_SD_PUBERTY = 2.5, HOME_MEAS_SD = 0.7;
  var PREV_MIN_MONTHS = 3, PREV_MAX_MONTHS = 24, MAX_GROWTH_PER_YEAR = 20;
  function missingHint(noParents, noPrevious) {
    if (noParents && noPrevious) return T("Výsledok spresní výška oboch rodičov a staršie meranie výšky (napr. z preventívnej prehliadky).",
      "Both parents' heights and an earlier height measurement (e.g. from a check-up) would make the result more precise.");
    if (noParents) return T("Výsledok spresní aj výška oboch rodičov.", "Both parents' heights would make the result more precise.");
    if (noPrevious) return T("Výsledok spresní aj staršie meranie výšky (napr. z preventívnej prehliadky).",
      "An earlier height measurement (e.g. from a check-up) would make the result more precise.");
    return null;
  }
  function lateExtra(sex, a0m, a1m) {
    var w = LATE_PUBERTY_WINDOW[sexKey(sex)], overlap = Math.min(a1m / 12, w[1]) - Math.max(a0m / 12, w[0]);
    return Math.min(LATE_EXTRA_MAX, LATE_EXTRA_PER_YEAR * Math.max(0, overlap));
  }
  function velocityZShift(sex, a0m, intervalM, horizonM, z, zPrev) {
    var years = intervalM / 12, sd = overlaps(PUBERTY_WINDOW[sexKey(sex)], a0m / 12, a0m / 12) ? VEL_SD_PUBERTY : VEL_SD_CHILD;
    var noise = 2 * HOME_MEAS_SD * HOME_MEAS_SD / (years * years), rel = sd * sd / (sd * sd + noise);
    return VEL_PERSIST * rel * (z - zPrev) / years * Math.min(1, horizonM / 12);
  }
  function velocityShift(child, a0, a1, z, notes) { // -> z change or null; same as SizePredictor._velocity_shift
    var aPrev = growthAge(child, child.prevDate), interval = a0 - aPrev, growth = child.height - child.prevHeight;
    if (growth < -MEAS_ERR) throw new SizingError(T("Predchádzajúca výška je väčšia ako dnešná. Skontrolujte obe merania a ich dátumy.",
      "The earlier height is greater than today's. Check both measurements and their dates."), "prevHeight");
    if (interval > 0 && interval >= PREV_MIN_MONTHS && growth / (interval / 12) > MAX_GROWTH_PER_YEAR)
      throw new SizingError(T("Medzi meraniami by dieťa vyrástlo o " + num(Math.round(growth * 10) / 10) + " cm, to je na ten čas priveľa. Skontrolujte obe merania a ich dátumy.",
        "Between the measurements the child would have grown " + num(Math.round(growth * 10) / 10) + " cm, which is too much for that time. Check both measurements and their dates."), "prevHeight");
    if (interval < PREV_MIN_MONTHS) { notes.push(T("Predchádzajúce meranie je príliš nedávne (menej ako 3 mesiace), rýchlosť rastu sa z neho nedá spoľahlivo určiť.",
      "The earlier measurement is too recent (less than 3 months ago) to tell the growth rate reliably.")); return null; }
    if (interval > PREV_MAX_MONTHS) { notes.push(T("Predchádzajúce meranie je staršie ako 2 roky, na rýchlosť rastu ho nepoužívame.",
      "The earlier measurement is more than 2 years old, so we don't use it for the growth rate.")); return null; }
    var years = interval / 12, zPrev = zScore(child.sex, aPrev, child.prevHeight);
    var typical = (heightAt(child.sex, a0, z) - heightAt(child.sex, aPrev, z)) / years;
    notes.push(T("Podľa predchádzajúceho merania rastie dieťa asi " + num(Math.round(growth / years * 10) / 10) + " cm za rok (deti s rovnakou výškou na svoj vek v tomto období bežne " +
      num(Math.round(typical * 10) / 10) + " cm).", "Based on the earlier measurement, the child grows about " + num(Math.round(growth / years * 10) / 10) +
      " cm a year (children of the same height for their age usually grow " + num(Math.round(typical * 10) / 10) + " cm a year at this time)."));
    return velocityZShift(child.sex, a0, interval, a1 - a0, z, zPrev);
  }
  var PUBERTY_TEXT = {
    female: "dievčatá majú rastový skok zvyčajne medzi 9. a 14. rokom, najrýchlejšie rastú okolo 12 rokov (približne 8 cm za rok).",
    male: "chlapci majú rastový skok zvyčajne medzi 11. a 16. rokom, najrýchlejšie rastú okolo 13,5 roka (približne 9–10 cm za rok).",
    unspecified: "rastový skok prichádza u dievčat zvyčajne medzi 9. a 14. rokom (až 8 cm za rok), u chlapcov medzi 11. a 16. rokom (až 9–10 cm za rok)."
  };
  var FOOT_PUBERTY_TEXT = { female: "u dievčat okolo 10 rokov", male: "u chlapcov okolo 11–12 rokov", unspecified: "u dievčat okolo 10, u chlapcov okolo 11–12 rokov" };
  var PUBERTY_TEXT_EN = {
    female: "girls usually have their growth spurt between 9 and 14 and grow fastest around 12 (about 8 cm a year).",
    male: "boys usually have their growth spurt between 11 and 16 and grow fastest around 13.5 (about 9–10 cm a year).",
    unspecified: "the growth spurt usually comes between 9 and 14 in girls (up to 8 cm a year) and between 11 and 16 in boys (up to 9–10 cm a year)."
  };
  var FOOT_PUBERTY_TEXT_EN = { female: "around 10 in girls", male: "around 11–12 in boys", unspecified: "around 10 in girls and 11–12 in boys" };
  function sexKey(sex) { return sex === "female" || sex === "male" ? sex : "unspecified"; }
  function overlaps(w, a, b) { return a <= w[1] && b >= w[0]; }
  function pubertyNote(sex, a0m, a1m, wider) {
    var k = sexKey(sex);
    if (!overlaps(PUBERTY_WINDOW[k], a0m / 12, a1m / 12)) return null;
    return T("Puberta: " + PUBERTY_TEXT[k] + " Kedy príde, je u každého dieťaťa iné, takže môže dieťa vyrásť viac alebo menej, ako ukazuje predpoveď." +
      (wider ? " Rozsah predpovede je preto smerom nahor širší." : "") + " Pred nákupom ho znova zmerajte.",
      "Puberty: " + PUBERTY_TEXT_EN[k] + " When it comes differs for every child, so the child may grow more or less than the forecast shows." +
      (wider ? " The forecast range is therefore wider upwards." : "") + " Measure the child again before buying.");
  }
  function footPubertyNote(sex, a0, a1) {
    var k = sexKey(sex);
    if (!overlaps(FOOT_PUBERTY_WINDOW[k], a0, a1)) return null;
    return T("Puberta: chodidlo rastie najrýchlejšie ešte pred výškovým skokom (" + FOOT_PUBERTY_TEXT[k] + ") a dorastie skôr ako telo. Obuv kupujte radšej tesne pred sezónou.",
      "Puberty: the foot grows fastest even before the height spurt (" + FOOT_PUBERTY_TEXT_EN[k] + ") and stops growing earlier than the body. Buy shoes close to the season.");
  }
  function midParentalZ(mother, father) { return (zScore("female", ADULT_MONTH, mother) + zScore("male", ADULT_MONTH, father)) / 2; }
  function parentsShift(sex, a0, a1, z, pz) { // extra growth (cm) by the target date because of the parents' heights
    var k = sexKey(sex), years = a0 / 12, phv = PHV_AGE[k], end = GROWTH_END[k];
    var share = years <= phv ? PARENT_GAP_SHARE : PARENT_GAP_SHARE * Math.max(0, (end - years) / (end - phv));
    var remaining = heightAt(sex, ADULT_MONTH, 0) - heightAt(sex, a0, 0);
    if (share <= 0 || remaining <= 0) return 0;
    var adultShift = heightAt(sex, ADULT_MONTH, z + share * (pz - z)) - heightAt(sex, ADULT_MONTH, z);
    var done = heightAt(sex, a1, 0) - heightAt(sex, a0, 0);
    return adultShift * Math.min(1, done / remaining);
  }
  function forecastHeight(child, target) {
    var age0 = growthAge(child, child.today), age1 = growthAge(child, target);
    var horizon = age1 - age0, notes = [], corr = correctionMonths(child);
    if (corr) {
      var wk = 40 - child.birthWeek;
      notes.push(T("Narodené predčasne: počítame s korigovaným vekom (o " + wk + (wk >= 2 && wk <= 4 ? " týždne" : " týždňov") +
        " menej), ako sa to u predčasne narodených detí robí do 2 rokov.",
        "Born preterm: we use the corrected age (" + wk + " weeks less), as is done for babies born preterm up to 2 years."));
    }
    if (age0 < INFANT_END) notes.push(T("Bábätká a batoľatá menia percentil častejšie, preto je rozsah predpovede širší.",
      "Babies and toddlers change percentiles more often, so the forecast range is wider."));
    if (horizon > 18) notes.push(T("Predpoveď je na " + Math.round(horizon) + " mesiacov dopredu; pred sezónou dieťa radšej znova zmerajte.",
      "The forecast is " + Math.round(horizon) + " months ahead; measure the child again before the season."));
    var z = zScore(child.sex, age0, child.height);
    // Far outside anything seen in real children: almost always a wrong birth date or a typo, so show no size at all.
    if (Math.abs(z) > IMPOSSIBLE_Z) throw new SizingError(T("Výška " + num(child.height) + " cm je vo veku " + ageText(ageMonths(child.birth, child.today)) +
      " veľmi neobvyklá. Skontrolujte dátum narodenia a výšku (skutočnú dĺžku tela, nie veľkosť oblečenia).",
      "A height of " + num(child.height) + " cm is very unusual at the age of " + ageText(ageMonths(child.birth, child.today)) +
      ". Check the date of birth and the height (the real body length, not the clothing size).") +
      (corr || ageMonths(child.birth, child.today) >= 24 ? "" : T(" Ak sa dieťa narodilo predčasne, zadajte týždeň narodenia.",
        " If the child was born preterm, enter the week of birth.")), "birth");
    if (Math.abs(z) > MAX_Z) {
      // A real child outside the usual range: follow the child's own curve instead of forcing it inside.
      notes.push(T("Dieťa je mimo bežného rozsahu pre svoj vek, počítame s jeho vlastnou rastovou krivkou.",
        "The child is outside the usual range for their age, so we follow the child's own growth curve."));
      if (Math.abs(z) > RARE_Z) notes.push(T("Takáto výška je na tento vek veľmi zriedkavá – skontrolujte, či ste zadali skutočnú dĺžku tela, nie veľkosť oblečenia.",
        "Such a height is very rare at this age – check that you entered the real body length, not the clothing size."));
      if (z < 0 && age0 < INFANT_END && !corr) notes.push(T("Ak sa narodilo predčasne, zadajte týždeň narodenia, výsledok bude presnejší.",
        "If the child was born preterm, enter the week of birth for a more precise result."));
    }
    var tr = zTracking(age0, age1), zt = z * tr[0], velUsed = false, velNotes = [];
    if (age0 / 12 >= PARENTS_FROM_AGE && child.prevHeight && child.prevDate) {
      var dz = velocityShift(child, age0, age1, z, velNotes);
      if (dz !== null) {
        velUsed = true;
        var before = heightAt(child.sex, age1, zt);
        zt += dz;
        var moved = heightAt(child.sex, age1, zt) - before;
        velNotes.push(Math.abs(moved) >= 0.5 ? T("Predpoveď sme preto posunuli o " + num(Math.round(Math.abs(moved) * 10) / 10) + " cm " + (moved > 0 ? "vyššie" : "nižšie") + ".",
          "We have therefore moved the forecast " + num(Math.round(Math.abs(moved) * 10) / 10) + " cm " + (moved > 0 ? "up" : "down") + ".")
          : T("Predpoveď sa tým takmer nemení.", "This barely changes the forecast."));
      }
    }
    var pred = Math.max(child.height, heightAt(child.sex, age1, zt));
    if (age0 < INFANT_END) { // keep expected infant growth within a plausible band around median growth
      var mg = heightAt(child.sex, age1, 0) - heightAt(child.sex, age0, 0);
      pred = clamp(pred, child.height + 0.67 * mg, child.height + 1.4 * mg);
    }
    var low = heightAt(child.sex, age1, zt - tr[1]), high = heightAt(child.sex, age1, zt + tr[1]);
    var extra = lateExtra(child.sex, age0, age1) * (velUsed ? VELOCITY_EXTRA_SHARE : 1), pn = pubertyNote(child.sex, age0, age1, extra >= 0.5);
    high += extra;
    if (pn) notes.push(pn);
    notes.push.apply(notes, velNotes);
    if (age0 / 12 >= PARENTS_FROM_AGE) {
      if (child.mother && child.father) {
        var sh = parentsShift(child.sex, age0, age1, z, midParentalZ(child.mother, child.father));
        pred = Math.max(child.height, pred + sh); low += sh; high += sh;
        notes.push(Math.abs(sh) >= 0.5
          ? T("Zohľadnili sme výšku rodičov: predpoveď je o " + num(Math.round(Math.abs(sh) * 10) / 10) + " cm " + (sh > 0 ? "vyššia" : "nižšia") + ", než by bola len podľa výšky dieťaťa.",
            "We took the parents' heights into account: the forecast is " + num(Math.round(Math.abs(sh) * 10) / 10) + " cm " + (sh > 0 ? "higher" : "lower") + " than from the child's height alone.")
          : T("Zohľadnili sme výšku rodičov; na predpoveď k tomuto termínu má len malý vplyv (pod 0,5 cm).",
            "We took the parents' heights into account; they make little difference to the forecast for this date (under 0.5 cm)."));
      } else if (child.mother || child.father) {
        notes.push(T("Výšku rodičov zohľadníme, keď zadáte výšku matky aj otca.", "We'll use the parents' heights once you enter both the mother's and the father's height."));
      }
      var missing = missingHint(!child.mother && !child.father, !child.prevHeight);
      if (pn && missing) notes.push(missing);
    } else if (child.mother || child.father || child.prevHeight) {
      notes.push(T("Výšku rodičov a staršie meranie výšky používame až od 8 rokov, keď sa blíži puberta; pri mladších deťoch predpoveď nespresňujú.",
        "We use the parents' heights and an earlier height only from 8 years, when puberty gets close; for younger children they don't refine the forecast."));
    }
    low = Math.max(Math.min(low, pred - MEAS_ERR), child.height - MEAS_ERR);
    high = Math.max(high, pred + MEAS_ERR);
    return { value: pred, low: low, high: high, notes: notes };
  }
  function forecastFoot(child, target, itemName) {
    var a0 = growthAge(child, child.today) / 12, a1 = growthAge(child, target) / 12;
    if (a0 < FOOT_MIN_AGE) throw new SizingError(T("Rast chodidla počítame od 1 roka, keď deti začínajú chodiť. Prvé topánky vyberte podľa aktuálne zmeraného chodidla.",
      "We forecast foot growth from 1 year, when children start walking. Choose first shoes by the foot as measured today."));
    if (!child.foot || child.foot < 0) throw new SizingError(T("Pre „" + itemName + "“ zadajte dĺžku chodidla dieťaťa. Obuv počítame podľa chodidla, nie podľa výšky.",
      "For “" + itemName + "”, enter the child's foot length. Footwear is sized by the foot, not by height."), "foot");
    var ratio = child.foot / footRef(child.sex, a0);
    if (ratio < FOOT_RATIO_MIN || ratio > FOOT_RATIO_MAX) throw new SizingError(T("Dĺžka chodidla " + num(child.foot) + " cm nezodpovedá veku " +
      ageText(ageMonths(child.birth, child.today)) + ". Skontrolujte dátum narodenia a dĺžku chodidla.",
      "A foot length of " + num(child.foot) + " cm does not match the age of " + ageText(ageMonths(child.birth, child.today)) +
      ". Check the date of birth and the foot length."), "birth");
    var pred = child.foot * (footRef(child.sex, a1) / footRef(child.sex, a0)); // same order as Python
    var band = 0.2 + 0.25 * (pred - child.foot);
    var notes = a0 < 2 ? [T("Pri deťoch do 2 rokov je odhad rastu chodidla len orientačný.", "For children under 2, the foot growth estimate is only a rough guide.")] : [];
    var fpn = footPubertyNote(child.sex, a0, a1);
    if (fpn) notes.push(fpn);
    return { value: pred, low: Math.max(child.foot - 0.2, pred - band), high: pred + band, notes: notes };
  }
  function forecastHead(child, target) {
    var a1 = growthAge(child, target) / 12, ref1 = interp(HEAD, a1);
    if (!child.head) {
      return { value: ref1, low: ref1 - 1.5, high: ref1 + 1.5, notes: [
        T("Obvod hlavy nie je zadaný – použil som priemer pre vek. Pre prilbu ho radšej zmerajte krajčírskym metrom tesne nad obočím.",
          "Head circumference not entered – I used the average for the age. For a helmet, measure it with a tape measure just above the eyebrows.")] };
    }
    var a0 = growthAge(child, child.today) / 12;
    var pred = child.head * (ref1 / interp(HEAD, a0));
    return { value: pred, low: pred - 0.5, high: pred + 0.5, notes: [] };
  }

  // ------------------------------------------------------------------ rules
  function fmtSize(v, unit) {
    switch (unit) {
      case "inch": return num(v) + "″";
      case "cm": return num(v) + " cm";
      case "eu": return "EU " + num(v);
      case "mondo": return "MP " + num(v);
      case "height_cm": return T("veľ. ", "size ") + num(v);
      case "head_cm": return T("obvod " + num(v) + " cm", num(v) + " cm head");
      case "number": return T("č. ", "size ") + num(v);
      default: return String(v);
    }
  }
  function ordered(values, primary) {
    var seen = {}, out = [];
    values.forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
    return out.sort(function (a, b) { return Math.abs(a - primary) - Math.abs(b - primary) || a - b; });
  }
  function itemNote(item, fmt) {
    var t = item.params.note;
    if (!t) return [];
    return [t.replace("{lo}", fmt ? fmt.lo : "").replace("{hi}", fmt ? fmt.hi : "")];
  }

  var RULES = {
    clothing: function (item, ctx) {
      var custom = !!item.params.series, series = item.params.series || CLOTHING_SIZES, h = ctx.height(), child = ctx.child;
      var bottom = item.fit === "bottom";
      function indexFor(x) { for (var i = 0; i < series.length; i++) if (series[i] >= x - 1e-9) return i; return series.length - 1; }
      var iP = indexFor(h.value), iS = indexFor(h.low), iL = indexFor(h.high);
      var build = custom ? noBuild() : buildFor(item, child, h, series, iP), shift = build.shift;
      var step = series.length > 1 ? series[1] - series[0] : 6, heightSize = series[iP], last = series.length - 1, notes = [];
      iP += shift;
      if (iP > last) {
        var m = build.measure || (bottom ? MEASURES.waist : MEASURES.chest);
        var girth = build.girth !== null ? build.girth : m.table[m.table.length - 1][1] + 3 * (iP - last);
        var ad = adultSize(child.sex, girth, m.adult);
        notes.push(T("Podľa " + build.reason + " už dieťaťu pravdepodobne sedia dospelé veľkosti: " + ad[1] + " " + (m.kind ? m.kind + " " : "") +
          ad[0] + " (obvod " + m.name + " približne " + num(Math.round(girth)) + " cm). Porovnajte s tabuľkou výrobcu.",
          "Based on the " + build.reason + ", adult sizes probably fit the child already: " + ad[1] + " " + (m.kindEn ? m.kindEn + " " : "") +
          ad[0] + " (" + m.nameEn + " girth about " + num(Math.round(girth)) + " cm). Compare with the brand's size chart."));
        if (build.byWeight) notes.push(measureTip(bottom));
        return { unit: "label", candidates: [ad[0]], forecast: h, notes: notes.concat(itemNote(item)), tips: itemNote(item),
          fit: { eff: series[last] + 1, shift: shift, heightIndex: iP - shift, reason: build.reason, byWeight: build.byWeight, slim: false, bottom: bottom } };
      }
      var idx = [];
      for (var j = iS + shift; j <= iL + shift; j++) if (j <= last && idx.indexOf(j) < 0) idx.push(j);
      if (!idx.length) idx = [iP];
      var p = series[iP], c = ordered(idx.sort(function (a, b) { return a - b; }).map(function (i) { return series[i]; }), p);
      if (shift) {
        notes.push(T("Podľa výšky by stačila veľkosť " + num(heightSize) + ", ale podľa " + build.reason + " odporúčame o " + shift +
          (shift === 1 ? " veľkosť" : " veľkosti") + " väčšiu: " + num(p) + ".",
          "By height size " + num(heightSize) + " would do, but based on the " + build.reason + " we recommend " + shift +
          (shift === 1 ? " size" : " sizes") + " larger: " + num(p) + "."));
        if (shift === 1 && bottom && heightSize >= 134 && !build.slim) notes.push(T("Alternatíva: veľkosť " + num(heightSize) +
          " v strihu Big/Plus, ak ju výrobca ponúka (nohavice nebudú zbytočne dlhé).",
          "Alternative: size " + num(heightSize) + " in a Big/Plus cut, if the brand offers it (the legs won't be too long)."));
      } else notes.push(T("Veľkosť " + num(p) + " je pre deti vysoké viac ako " + num(p - step) + " cm, najviac " + num(p) + " cm.",
        "Size " + num(p) + " is for children taller than " + num(p - step) + " cm, up to " + num(p) + " cm."));
      var altNote = c.length > 1 ? T("Na celú sezónu je istejšia väčšia z ponúkaných veľkostí.", "For the whole season, the larger of the suggested sizes is the safer choice.") : null;
      if (altNote) notes.push(altNote);
      if (h.value > series[series.length - 1] && !shift) notes.push(T("Predpokladaná výška je nad detskými veľkosťami – použite tínedžerské či dospelé (XS/S).",
        "The expected height is above children's sizes – use teen or adult sizes (XS/S)."));
      if (build.byWeight && shift) notes.push(measureTip(bottom));
      if (build.slim) notes.push(build.slim);
      return { unit: "height_cm", candidates: c.map(function (x) { return fmtSize(x, "height_cm"); }), forecast: h, notes: notes.concat(itemNote(item)), altNote: altNote,
        tips: itemNote(item), fit: { eff: shift ? p - step + 0.1 : null, shift: shift, reason: build.reason, byWeight: build.byWeight,
          slim: !!build.slim && !shift, bottom: bottom } };
    },
    height_band: function (item, ctx) {
      var unit = item.params.unit || "inch", bands = item.params.bands, h = ctx.height(), notes = [];
      var over = bands.filter(function (b) { return b[1] <= h.high && b[2] >= h.low; });
      function center(b) { return (b[1] + b[2]) / 2; }
      if (!over.length) {
        var nearest = bands.slice().sort(function (a, b) { return Math.abs(center(a) - h.value) - Math.abs(center(b) - h.value); })[0];
        over = [nearest];
        var below = h.value < bands[0][1];
        notes.push(item.params[below ? "below_note" : "above_note"] ||
          T("Predpokladaná výška " + Math.round(h.value) + " cm je mimo bežnej tabuľky – vybral som najbližšiu veľkosť.",
            "The expected height of " + Math.round(h.value) + " cm is outside the usual chart – I chose the nearest size."));
      }
      over.sort(function (a, b) { return Math.abs(center(a) - h.value) - Math.abs(center(b) - h.value) || (String(a[0]) < String(b[0]) ? -1 : 1); });
      var labels = over.map(function (b) { return unit === "label" ? String(b[0]) : fmtSize(b[0], unit); });
      if (labels.length > 1) notes.push(T("Predpokladaná výška " + Math.round(h.low) + "–" + Math.round(h.high) + " cm je na hranici veľkostí (" +
        labels.join(" / ") + "). " + labels[0] + " sedí najlepšie, väčšia vydrží dlhšie.",
        "The expected height of " + Math.round(h.low) + "–" + Math.round(h.high) + " cm is on the border between sizes (" +
        labels.join(" / ") + "). " + labels[0] + " fits best, the larger one lasts longer."));
      return { unit: unit, candidates: labels, forecast: h, notes: notes.concat(itemNote(item)), tips: itemNote(item) };
    },
    height_length: function (item, ctx) {
      var p = item.params, f = p.factor || 1, step = p.step || 5, h = ctx.height();
      var ideal = clamp(pyRound((h.value * f + p.ideal) / step) * step, p.min_len, p.max_len);
      var shortest = roundHalfUp(Math.min(clamp(h.low * f + p.min, p.min_len, p.max_len), ideal));
      var longest = roundHalfUp(Math.max(clamp(h.high * f + p.max, p.min_len, p.max_len), ideal));
      var stock = [];
      for (var x = Math.ceil(shortest / step) * step; x <= Math.floor(longest / step) * step; x += step) stock.push(x);
      var c = ordered(stock.concat([ideal]), ideal).slice(0, 4);
      return { unit: "cm", candidates: c.map(function (v) { return fmtSize(v, "cm"); }), forecast: h,
        notes: itemNote(item, { lo: num(shortest), hi: num(longest) }), tips: [] };
    },
    foot: function (item, ctx) {
      var unit = item.params.unit || "eu", allow = (item.params.allowance_mm || 12) / 10, foot = ctx.foot();
      var footCm = num(up1(foot.value)), innerCm = num(up1(foot.value + allow)); // rounded up like measure and predictor.py
      var notes = [T("Odporúčaná veľkosť už obsahuje rezervu " + num(allow * 10) + " mm, nič nepripočítavajte. Chodidlo v termíne ≈ " +
        footCm + " cm + " + num(allow * 10) + " mm = vnútorná dĺžka topánky (stielka) približne " +
        innerCm + " cm. Veľkosti sa líšia podľa značky – túto dĺžku porovnajte s tabuľkou výrobcu.",
        "The recommended size already includes " + num(allow * 10) + " mm of room; don't add anything. Foot at the date ≈ " + footCm + " cm + " +
        num(allow * 10) + " mm = inner length of the shoe (insole) about " + innerCm + " cm. Sizes differ between brands – compare this length with the brand's size chart."),
        T("Šírku chodidla a výšku priehlavku kalkulačka nepredpovedá. Ak sa tvar nohy zmenil, vyskúšajte aj iné značky alebo modely so širším strihom.",
          "The calculator does not predict foot width or instep height. If the shape of the foot has changed, try other brands or wider models too.")];
      // around EU 33-37 (inner length 22.0-24.7 cm) children's lines end and adult lasts begin
      if (foot.value + allow >= 22.0 && foot.value + allow <= 24.7) notes.push(T("Okolo veľkosti 35–36 končia detské série a začínajú dospelé modely s iným strihom (kopytom). Dĺžka platí aj pre ne, strih však treba vyskúšať.",
        "Around size 35–36, children's ranges end and adult models with a different last begin. The length still applies, but try the fit."));
      notes = notes.concat(itemNote(item));
      var tips = notes.slice(1); // width, adult lasts and the item's own advice hold whatever the size label
      function eu(fc) { return roundHalfUp((fc + allow) * 1.5); }
      if (unit === "mondo") {
        function mp(fc) { return Math.ceil((fc + allow) * 2 - 1e-9) / 2; }
        var p = mp(foot.value), s = mp(foot.low), l = mp(foot.high), list = [];
        for (var i = 0; i <= Math.round((l - s) * 2); i++) list.push(s + 0.5 * i);
        notes.push(T("Mondopoint " + fmtSize(p, "mondo") + " zodpovedá približne EU " + num(mondoToEu(p)) + " (podľa bežnej prevodovej tabuľky; značky sa líšia).",
          "Mondopoint " + fmtSize(p, "mondo") + " is about EU " + num(mondoToEu(p)) + " (by the common conversion chart; brands differ)."));
        return { unit: unit, candidates: ordered(list, p).map(function (v) { return fmtSize(v, "mondo"); }), forecast: foot, notes: notes, tips: tips };
      }
      var pe = eu(foot.value), se = eu(foot.low), le = eu(foot.high), sizes = [];
      for (var k = se; k <= le; k++) sizes.push(k);
      return { unit: unit, candidates: ordered(sizes, pe).map(function (v) { return fmtSize(v, "eu"); }), forecast: foot, notes: notes, tips: tips };
    },
    head: function (item, ctx) {
      var head = ctx.head(), label = fmtSize(roundHalfUp(head.value), "head_cm");
      return { unit: "head_cm", candidates: [label], forecast: head, tips: [], notes: [
        T("Vyberajte veľkosť s rozsahom, ktorý obsahuje " + roundHalfUp(head.value) + " cm (napr. " + (roundHalfUp(head.value) - 2) +
        "–" + (roundHalfUp(head.value) + 2) + " cm).", "Choose a size whose range includes " + roundHalfUp(head.value) + " cm (e.g. " +
        (roundHalfUp(head.value) - 2) + "–" + (roundHalfUp(head.value) + 2) + " cm).")] };
    },
    age_band: function (item, ctx) {
      var unit = item.params.unit || "number", age = ctx.ageYears, bands = item.params.bands;
      var cur = bands.filter(function (b) { return b[0] <= age && age < b[1]; })[0] || bands[bands.length - 1];
      var chosen = [cur];
      var next = bands.filter(function (b) { return b[0] === cur[1]; })[0];
      if (next && cur[1] - age <= 0.5) chosen.push(next);
      var labels = chosen.map(function (b) { return unit === "label" ? String(b[2]) : fmtSize(b[2], unit); });
      return { unit: unit, candidates: labels, forecast: null, notes: itemNote(item), tips: itemNote(item) };
    },
    none: function () {
      return { unit: "none", candidates: [], forecast: null, tips: [], notes: [T("Pri tomto tovare sa veľkosť nerieši.", "This item has no size.")] };
    }
  };

  var BASIS = { clothing: "height", height_band: "height", height_length: "height", foot: "foot", head: "head", age_band: "age", none: "none" };

  // What the parent should look up in a brand's size chart: the forecast measurement itself. Brands number sizes
  // differently, but a height or an insole length in cm means the same everywhere. `leads` says whether the
  // measurement (not the size label) should be shown first: clothing, shoes and skates in EU sizes, helmets.
  var MONTH_LOC = ["v januári", "vo februári", "v marci", "v apríli", "v máji", "v júni", "v júli", "v auguste", "v septembri",
    "v októbri", "v novembri", "v decembri"];
  var MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function whenText(target, today) {
    var year = target.getUTCFullYear() !== today.getUTCFullYear() ? " " + target.getUTCFullYear() : "";
    if (LANG === "en") return "in " + MONTH_NAMES_EN[target.getUTCMonth()] + year;
    var t = MONTH_LOC[target.getUTCMonth()] + year;
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function r1(x) { return Math.round(x * 10) / 10; }
  // 104.03 -> 104.1: never shown below a size boundary it crossed (same as models.up_tenth/down_tenth)
  function up1(x) { return Math.ceil(x * 10 - 1e-9) / 10; }
  function down1(x) { return Math.floor(x * 10 + 1e-9) / 10; }
  function measureFor(item, rule, f, basis, target, today) {
    if (!f || (basis !== "height" && basis !== "foot" && basis !== "head")) return null;
    var when = whenText(target, today), m = { kind: basis, leads: false, innerLength: null, instructionDetail: "", typical: "", duplicateNote: null };
    if (basis === "height") {
      m.value = up1(f.value); m.low = down1(f.low); m.high = up1(f.high);
      m.lead = T(when + " bude merať približne", "Expected height " + when); m.valueText = num(m.value) + " cm";
      m.range = T("rozsah ", "range ") + num(m.low) + "–" + num(m.high) + " cm";
      var forHeight = T("pre výšku " + (m.high > m.value ? num(m.value) + " až " + num(m.high) : num(m.value)) + " cm.",
        "for a height of " + (m.high > m.value ? num(m.value) + "–" + num(m.high) : num(m.value)) + " cm.");
      if (item.sizing === "clothing") {
        m.leads = true;
        m.instruction = T("V tabuľke veľkostí konkrétnej značky hľadajte veľkosť ", "In the brand's size chart, look for the size ") + forHeight;
        m.instructionDetail = T("Horná hranica počíta s tým, že dieťa môže vyrásť aj viac.", "The upper end allows for the child growing more.");
        m.typical = T("Bežne je to", "Typically this is");
      } else m.instruction = T("Ak výrobca uvádza tabuľku podľa výšky dieťaťa, hľadajte v nej veľkosť ",
        "If the maker gives a chart by the child's height, look for the size ") + forHeight;
    } else if (basis === "foot") {
      var allow = (item.params.allowance_mm || 12) / 10;
      m.value = up1(f.value); m.low = down1(f.low); m.high = up1(f.high); m.innerLength = up1(f.value + allow);
      m.lead = T(when + " bude mať chodidlo približne", "Expected foot length " + when); m.valueText = num(m.value) + " cm";
      m.range = T("rozsah ", "range ") + num(m.low) + "–" + num(m.high) + " cm";
      if ((item.params.unit || "eu") !== "mondo") {
        m.leads = true;
        m.instruction = T("Hľadajte vnútornú dĺžku (stielku) aspoň " + num(m.innerLength) + " cm.",
          "Look for an inner length (insole) of at least " + num(m.innerLength) + " cm.");
        m.instructionDetail = T("Túto dĺžku nájdite v tabuľke veľkostí konkrétnej značky. Rezerva " + num(allow * 10) + " mm na pohodlie je už započítaná.",
          "Find this length in the brand's size chart. The " + num(allow * 10) + " mm of room for comfort is already included.");
        m.typical = T("Bežne je to", "Typically this is");
        m.duplicateNote = rule.notes[0];
      } else m.instruction = T("Mondopoint je dĺžka chodidla v cm, preto sa medzi značkami líši len málo.",
        "Mondopoint is the foot length in cm, so it varies little between brands.");
    } else {
      m.value = m.low = m.high = roundHalfUp(f.value);
      m.lead = T(when + " bude mať obvod hlavy približne", "Expected head circumference " + when); m.valueText = m.value + " cm"; m.range = "";
      m.leads = true;
      m.instruction = T("Vyberte prilbu alebo čiapku, ktorej rozsah obsahuje " + m.value + " cm (napr. " + (m.value - 2) + "–" + (m.value + 2) + " cm).",
        "Choose a helmet or hat whose range includes " + m.value + " cm (e.g. " + (m.value - 2) + "–" + (m.value + 2) + " cm).");
      m.instructionDetail = T("Označenie S, M, L sa medzi značkami líši, centimetre nie.", "S, M and L labels differ between brands; centimetres don't.");
      m.duplicateNote = rule.notes[0];
    }
    m.summary = T(m.lead + " " + m.valueText, m.lead + ": " + m.valueText) + (m.range ? " (" + m.range + ")" : "");
    return m;
  }

  // ---------------------------------------------------------------------------------------------------------
  // The shop's own size chart (widget only; predictor.py has no counterpart). GearGrow forecasts the measurement,
  // the chart turns it into the shop's own size label, so the result is exact for that brand.
  //   { basis: "height", rows: [{ label: "122", min: 117, max: 122 }, ...] }          height of the child, cm
  //   { basis: "foot", measure: "insole", rows: [{ label: "31", length: 20.1 }, ...] }  inner length of the shoe, cm
  //   { basis: "foot", measure: "foot", rows: [{ label: "31", min: 19.0, max: 19.6 }] } foot length the size fits, cm
  //   { basis: "head", rows: [{ label: "S", min: 50, max: 54 }, ...] }                  head circumference, cm
  // ---------------------------------------------------------------------------------------------------------
  var CHART_LIMITS = { height: [40, 210], foot: [8, 36], head: [30, 66] };
  function validateChartIn(chart) {
    var problems = [];
    if (!chart || typeof chart !== "object") return [T("Tabuľka veľkostí chýba.", "The size chart is missing.")];
    if (!CHART_LIMITS[chart.basis]) problems.push(T("Tabuľka musí mať basis \"height\", \"foot\" alebo \"head\".", "The chart needs basis \"height\", \"foot\" or \"head\"."));
    var insole = chart.basis === "foot" && chart.measure === "insole";
    if (chart.basis === "foot" && chart.measure !== "insole" && chart.measure !== "foot") problems.push(T("Pri obuvi uveďte measure \"insole\" (dĺžka stielky) alebo \"foot\" (dĺžka chodidla).",
      "For footwear, set measure to \"insole\" (insole length) or \"foot\" (foot length)."));
    if (!Array.isArray(chart.rows) || !chart.rows.length) return problems.concat([T("Tabuľka nemá žiadne riadky.", "The chart has no rows.")]);
    var lim = CHART_LIMITS[chart.basis] || [0, 1000], seen = {};
    chart.rows.forEach(function (row, i) {
      var where = T("Riadok ", "Row ") + (i + 1) + (row && row.label ? " (" + row.label + ")" : "") + ": ";
      if (!row || row.label === undefined || String(row.label).trim() === "") { problems.push(where + T("chýba označenie veľkosti.", "the size label is missing.")); return; }
      if (seen[row.label]) problems.push(where + T("veľkosť je v tabuľke dvakrát.", "this size is in the chart twice."));
      seen[row.label] = true;
      var nums = insole ? [row.length] : [row.min, row.max];
      if (nums.some(function (v) { return typeof v !== "number" || !(v >= lim[0] && v <= lim[1]); })) {
        problems.push(where + T((insole ? "dĺžka stielky" : "rozsah od–do") + " musí byť číslo v cm (",
          (insole ? "the insole length" : "the from–to range") + " must be a number in cm (") + lim[0] + "–" + lim[1] + ").");
      } else if (!insole && row.min > row.max) problems.push(where + T("hodnota od je väčšia ako do.", "the from value is greater than the to value."));
    });
    return problems;
  }
  function validateSizeChart(chart, lang) { return withLang(lang, function () { return validateChartIn(chart); }); }
  function parseNumber(text) { var v = parseFloat(String(text).trim().replace(",", ".")); return isNaN(v) ? null : v; }
  // CSV or text pasted from a spreadsheet: "label;min;max" (or "label;length" for insole charts), one size per line.
  function parseSizeChart(text, basis, measure) {
    var insole = basis === "foot" && measure === "insole", rows = [];
    String(text || "").split(/\r?\n/).forEach(function (line) {
      if (!line.trim()) return;
      var cells = line.split(line.indexOf("\t") >= 0 ? "\t" : line.indexOf(";") >= 0 ? ";" : ",").map(function (c) { return c.trim().replace(/^"|"$/g, ""); });
      var a = parseNumber(cells[1]), b = parseNumber(cells[2]);
      if (a === null) return; // header or note line
      rows.push(insole ? { label: cells[0], length: a } : { label: cells[0], min: a, max: b === null ? a : b });
    });
    var chart = { basis: basis, rows: rows };
    if (basis === "foot") chart.measure = measure;
    return chart;
  }
  function chartSizes(chart, value, high) {
    var insole = chart.measure === "insole";
    var rows = chart.rows.slice().sort(function (a, b) { return insole ? a.length - b.length : a.max - b.max || a.min - b.min; });
    var top = function (row) { return insole ? row.length : row.max; };
    var fits = function (v) { for (var i = 0; i < rows.length; i++) if (top(rows[i]) >= v - 1e-9) return rows[i]; return null; };
    var first = fits(value), second = fits(high);
    return { rows: rows, primary: first, alt: second && second !== first ? second : null, beyond: !first, largest: rows[rows.length - 1], top: top };
  }
  function applySizeChart(result, chart, item, rule) {
    var m = result.measure, f = result.forecast, kind = result.basis;
    if (!chart) return result;
    var problems = validateChartIn(chart);
    var BY = LANG === "en" ? { height: "height", foot: "foot length", head: "head circumference", age: "age", none: "nothing" }
      : { height: "výšky", foot: "chodidla", head: "obvodu hlavy", age: "veku", none: "ničoho" };
    if (!problems.length && chart.basis !== kind) problems = [T("Tabuľka obchodu je podľa " + BY[chart.basis] + ", ale " + item.name + " sa určuje podľa " + BY[kind] + ".",
      "The shop's chart is by " + BY[chart.basis] + ", but " + item.name + " is sized by " + BY[kind] + ".")];
    if (problems.length || !f || !m) { result.sizeChartUsed = false; result.sizeChartProblems = problems.length ? problems : [T("Pre túto vec sa tabuľka nepoužíva.", "The chart is not used for this item.")]; return result; }
    var allow = kind === "foot" && chart.measure === "insole" ? (item.params.allowance_mm || 12) / 10 : 0;
    var need = f.value + allow, needHigh = Math.max(f.high, f.value) + allow, fit = rule.fit, byHeight = null;
    // A wider build (chest, waist or BMI) moves clothing up just as without the chart: the size the generic rule chose
    // stands for a body height, which is looked up in the shop's chart.
    if (fit && fit.eff !== null) { byHeight = chartSizes(chart, need, need).primary; need = Math.max(need, fit.eff); needHigh = Math.max(needHigh, need); }
    var pick = chartSizes(chart, need, needHigh), unitText = function (v) { return num(Math.round(v * 10) / 10) + " cm"; };
    var notes = f.notes.slice(), labels, altNote = null;
    if (pick.beyond) {
      labels = [String(pick.largest.label)];
      notes.unshift(T("Dieťa bude podľa predpovede väčšie ako najväčšia veľkosť v tabuľke tohto obchodu (" + pick.largest.label + "). Skontrolujte väčšie veľkosti alebo dospelú kolekciu.",
        "By the forecast, the child will be bigger than the largest size in this shop's chart (" + pick.largest.label + "). Check larger sizes or the adult range."));
    } else {
      labels = [String(pick.primary.label)].concat(pick.alt ? [String(pick.alt.label)] : []);
      var row = pick.primary;
      var span = row.min === row.max ? unitText(row.max) : num(row.min) + "–" + unitText(row.max);
      notes.unshift(chart.measure === "insole"
        ? T("Podľa tabuľky veľkostí tohto obchodu: veľkosť " + row.label + " má stielku " + unitText(row.length) + ". Dieťa bude potrebovať aspoň " + unitText(up1(need)) + " (chodidlo + rezerva " + num(allow * 10) + " mm).",
            "By this shop's size chart, size " + row.label + " has a " + unitText(row.length) + " insole. The child will need at least " + unitText(up1(need)) + " (foot + " + num(allow * 10) + " mm of room).")
        : T("Podľa tabuľky veľkostí tohto obchodu je veľkosť " + row.label + " pre " + ({ height: "výšku", foot: "chodidlo", head: "obvod hlavy" })[kind] + " " + span + ".",
            "By this shop's size chart, size " + row.label + " is for a " + ({ height: "height", foot: "foot length", head: "head circumference" })[kind] + " of " + span + "."));
      if (pick.alt) notes.push(altNote = T("Ak dieťa vyrastie viac, ako je priemer, na celú sezónu je istejšia veľkosť " + pick.alt.label + ".",
        "If the child grows more than average, size " + pick.alt.label + " is the safer choice for the whole season."));
    }
    if (fit) {
      if (fit.shift && byHeight && byHeight !== pick.primary) notes.push(T("Podľa výšky by stačila veľkosť " + byHeight.label + ", ale podľa " + fit.reason +
        " odporúčame väčšiu: " + labels[0] + ".", "By height size " + byHeight.label + " would do, but based on the " + fit.reason + " we recommend a larger one: " + labels[0] + "."));
      if (fit.shift && fit.bottom) notes.push(T("Ak obchod ponúka strih Big/Plus, veľkosť podľa výšky v tomto strihu môže sedieť lepšie (nohavice nebudú príliš dlhé).",
        "If the shop offers a Big/Plus cut, the size by height in that cut may fit better (the legs won't be too long)."));
      if (fit.shift && fit.byWeight) notes.push(measureTip(fit.bottom));
      if (fit.slim) notes.push(slimTip(!fit.byWeight));
    }
    notes = notes.concat(rule.tips || []);
    result.primary = labels[0]; result.alternatives = labels.slice(1); result.candidates = labels;
    result.notes = notes; result.alternativeNote = altNote; result.sizeChartUsed = true; result.sizeChartProblems = [];
    m.leads = false; m.typical = ""; m.duplicateNote = null; m.instructionDetail = "";
    m.instruction = T("Veľkosť je vypočítaná podľa tabuľky veľkostí tohto obchodu.", "The size is worked out from this shop's size chart.");
    return result;
  }

  function findRaw(id) { for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i]; return null; }
  function findItem(id, lang) { return withLang(lang, function () { return localItem(findRaw(id)); }); }
  function catalog(lang) { return withLang(lang, function () { return CATALOG.map(localItem); }); }

  /* child: {birth: Date, sex: "male"|"female"|"unspecified", height: cm, foot?: cm, head?: cm, weight?: kg, chest?: cm, waist?: cm,
     birthWeek?: 22-36, mother?: cm, father?: cm (parents' heights, used from 8 years),
     prevHeight?: cm, prevDate?: Date (an earlier height measurement, used from 8 years), today?: Date} */
  function recommend(child, itemId, targetSpec, options) {
    return withLang(options && options.lang, function () { return recommendIn(child, itemId, targetSpec, options); });
  }
  function recommendIn(child, itemId, targetSpec, options) {
    var item = localItem(findRaw(itemId));
    if (!item) throw new SizingError(T("Vyberte, čo hľadáte.", "Choose what you are looking for."), "item");
    child = Object.assign({ today: new Date() }, child);
    child.today = toUTC(child.today);
    if (!child.birth || isNaN(child.birth)) throw new SizingError(T("Zadajte dátum narodenia.", "Enter the date of birth."), "birth");
    child.birth = toUTC(child.birth);
    if (child.birth > child.today) throw new SizingError(T("Dátum narodenia nemôže byť v budúcnosti.", "The date of birth can't be in the future."), "birth");
    var ageNow = ageMonths(child.birth, child.today) / 12;
    if (ageNow > 18) throw new SizingError(T("Kalkulačka je pre deti do 18 rokov.", "The calculator is for children up to 18."), "birth");
    // Height is needed only for things sized by height; for shoes, helmets or balls it may be left out.
    if (BASIS[item.sizing] === "height" ? !(child.height >= 40 && child.height <= 210) : child.height && !(child.height >= 40 && child.height <= 210))
      throw new SizingError(T("Zadajte výšku dieťaťa v cm (40–210).", "Enter the child's height in cm (40–210)."), "height");
    if (child.foot && !(child.foot >= 9 && child.foot <= 33)) throw new SizingError(T("Dĺžka chodidla má byť v cm, napr. 18,5.", "Enter the foot length in cm, e.g. 18.5."), "foot");
    if (child.birthWeek && !(child.birthWeek >= 22 && child.birthWeek <= 42)) throw new SizingError(T("Týždeň narodenia má byť medzi 22 a 42.", "The week of birth must be between 22 and 42."), "birth");
    if (child.weight && !(child.weight >= 2 && child.weight <= 150)) throw new SizingError(T("Hmotnosť má byť v kg, napr. 32.", "Enter the weight in kg, e.g. 32."), "weight");
    if (child.chest && !(child.chest >= 30 && child.chest <= 150)) throw new SizingError(T("Obvod hrudníka má byť v cm, napr. 70.", "Enter the chest girth in cm, e.g. 70."), "chest");
    if (child.waist && !(child.waist >= 30 && child.waist <= 150)) throw new SizingError(T("Obvod pásu má byť v cm, napr. 60.", "Enter the waist girth in cm, e.g. 60."), "waist");
    if (child.head && !(child.head >= 30 && child.head <= 64)) throw new SizingError(T("Obvod hlavy má byť v cm, napr. 52.", "Enter the head circumference in cm, e.g. 52."), "head");
    if (child.mother && !(child.mother >= 120 && child.mother <= 220)) throw new SizingError(T("Výšku matky zadajte v cm, napr. 166.", "Enter the mother's height in cm, e.g. 166."), "mother");
    if (child.father && !(child.father >= 120 && child.father <= 220)) throw new SizingError(T("Výšku otca zadajte v cm, napr. 180.", "Enter the father's height in cm, e.g. 180."), "father");
    if (child.prevHeight) {
      if (!(child.prevHeight >= 40 && child.prevHeight <= 210)) throw new SizingError(T("Predchádzajúcu výšku zadajte v cm, napr. 146.", "Enter the earlier height in cm, e.g. 146."), "prevHeight");
      if (!child.prevDate || isNaN(child.prevDate)) throw new SizingError(T("Zadajte, kedy ste dieťa predtým merali.", "Enter when you measured the child before."), "prevDate");
      child.prevDate = toUTC(child.prevDate);
      if (child.prevDate < child.birth || child.prevDate >= child.today) throw new SizingError(T("Predchádzajúce meranie musí byť medzi narodením a dneškom.",
        "The earlier measurement must be between the birth and today."), "prevDate");
    }
    var target = resolveTarget(targetSpec, child.today);
    if (target < child.today) throw new SizingError(T("Zvolený mesiac už je minulosťou – vyberte budúci.", "That month has already passed – choose a future one."), "target");
    var cache = {};
    var ctx = {
      child: child,
      ageYears: ageMonths(child.birth, target) / 12,
      height: function () { return cache.h || (cache.h = forecastHeight(child, target)); },
      foot: function () { return cache.f || (cache.f = forecastFoot(child, target, item.name)); },
      head: function () { return cache.hd || (cache.hd = forecastHead(child, target)); }
    };
    var r = RULES[item.sizing](item, ctx);
    var basis = BASIS[item.sizing], f = r.forecast, basisText = "";
    if (f && basis === "height") basisText = T("Predpokladaná výška v termíne: ", "Expected height at the date: ") + num(up1(f.value)) + " cm (" + num(down1(f.low)) + "–" + num(up1(f.high)) + " cm)";
    if (f && basis === "foot") basisText = T("Predpokladaná dĺžka chodidla v termíne (bez rezervy): ", "Expected foot length at the date (without room): ") + num(up1(f.value)) + " cm (" +
      num(down1(f.low)) + "–" + num(up1(f.high)) + " cm)";
    if (f && basis === "head") basisText = T("Predpokladaný obvod hlavy v termíne: ≈ ", "Expected head circumference at the date: ≈ ") + Math.round(f.value) + " cm";
    if (basis === "age") basisText = T("Vek v termíne: " + num(Math.round(ctx.ageYears * 10) / 10) + " r.", "Age at the date: " + num(Math.round(ctx.ageYears * 10) / 10) + " years");
    var result = {
      item: item, target: target, targetText: fmtDate(target), basis: basis, basisText: basisText,
      primary: r.candidates[0] || T("bez veľkosti", "no size"), alternatives: r.candidates.slice(1),
      candidates: r.candidates, forecast: f, notes: (f ? f.notes : []).concat(r.notes),
      measure: measureFor(item, r, f, basis, target, child.today), sizeChartUsed: false, sizeChartProblems: [],
      // The note in `notes` that only explains `alternatives` (null if none). A widget that shows the alternatives
      // in its own way, or only some of them, leaves this note out; the website shows it as it is.
      alternativeNote: r.altNote || null
    };
    return options && options.sizeChart ? applySizeChart(result, options.sizeChart, item, r) : result;
  }

  // Mondopoint -> EU shoe size, common comfort-fit chart (evo.com kids' chart; size.ly); same as predictor.py.
  var MONDO_TO_EU = [[15,25],[15.5,25],[16,26],[16.5,26],[17,27],[17.5,28],[18,29],[18.5,29],[19,30],[19.5,30],[20,31],[20.5,32],
    [21,33],[21.5,34],[22,35],[22.5,36],[23,36.5],[23.5,37],[24,38],[24.5,38.5],[25,39],[25.5,40],[26,40.5],[26.5,41],[27,42],
    [27.5,42.5],[28,43],[28.5,44],[29,44.5],[29.5,45],[30,45.5],[30.5,46],[31,47],[31.5,47.5],[32,48],[32.5,48.5],[33,49],[33.5,50],[34,51]];
  function mondoToEu(mp) {
    var first = MONDO_TO_EU[0], last = MONDO_TO_EU[MONDO_TO_EU.length - 1];
    if (mp < first[0]) return roundHalfUp(first[1] - (first[0] - mp));
    if (mp > last[0]) return roundHalfUp(last[1] + 1.5 * (mp - last[0]));
    for (var i = 0; i < MONDO_TO_EU.length; i++) if (MONDO_TO_EU[i][0] === mp) return MONDO_TO_EU[i][1];
    return interp(MONDO_TO_EU, mp);
  }

  // Which form fields an item needs, for a child of a given birth date (both optional): a widget shows only these.
  function fieldsFor(itemId, birth, today) {
    var item = findRaw(itemId);
    if (!item) return null;
    var basis = BASIS[item.sizing], age = birth ? ageMonths(toUTC(birth), toUTC(today || new Date())) / 12 : null;
    var required = item.sizing === "none" ? [] : ["birth"], optional = [];
    if (basis === "height") required.push("height");
    if (basis === "foot") required.push("foot");
    if (basis === "head") optional.push("head");
    if (basis === "height" || basis === "foot") optional.push("sex");
    if (item.sizing === "clothing" && !item.params.series) {
      if (age === null || age >= 5) optional.push("weight"); // the weight is used through WHO BMI-for-age, 5-19 years
      optional.push("chest", "waist");
    }
    if ((basis === "height" || basis === "foot" || basis === "head") && (age === null || age < 2)) optional.push("birthWeek");
    if (basis === "height" && (age === null || age >= PARENTS_FROM_AGE)) optional.push("mother", "father", "prevHeight", "prevDate");
    return { required: required, optional: optional };
  }
  // A size label in a plain form for matching a shop's variants: 20″ / 20" / 20'' -> 20, EU 31 -> 31, MP 21,5 -> 21.5,
  // veľ. 122 / size 122 -> 122, 115 cm -> 115; other labels (S, JR, XL) are only lower-cased.
  function normalizeSize(label) {
    var t = String(label === null || label === undefined ? "" : label).trim().toLowerCase();
    t = t.replace(/[″”“]|''/g, '"').replace(/^\((.*)\)$/, "$1").trim();
    t = t.replace(/^(veľkosť|velkost|veľ\.?|vel\.?|size|sz\.?|gr\.?|größe|eur|eu|mondopoint|mp|č\.?|c\.|obvod)\s*[:.\-]?\s*/, "");
    t = t.replace(/\s*(cm head|cm|eur|eu|mp|")\s*$/, "").trim();
    return /^\d+([.,]\d+)?$/.test(t) ? t.replace(",", ".") : t;
  }

  var api = { VERSION: VERSION, fieldsFor: fieldsFor, normalizeSize: normalizeSize, LANGUAGES: ["sk", "en"], CATALOG: CATALOG, SEASON_LABELS: SEASON_LABELS, recommend: recommend, resolveTarget: resolveTarget,
    findItem: findItem, catalog: catalog, SizingError: SizingError, validateSizeChart: validateSizeChart, parseSizeChart: parseSizeChart,
    fmtDate: function (d, lang) { return withLang(lang, function () { return fmtDate(d); }); },
    seasonLabels: function (lang) { return lang === "en" ? SEASON_LABELS_EN : SEASON_LABELS; } };
  global.GearGrow = api;
  if (typeof module === "object" && module && module.exports) module.exports = api; // Node / bundlers
})(typeof window !== "undefined" ? window : globalThis);

/*! GearGrow size widget 2.0.3 – the "What size will my child need?" box for any e-shop.
 *
 * Needs the GearGrow engine (engine-1.4.4.js or newer) loaded first; dist/geargrow.js contains both.
 *
 *   <script src="geargrow.js" defer></script>
 *   <div data-geargrow data-item="zimna_bunda"></div>
 *
 * Options (data attributes on the element):
 *   data-item          catalog id (see README) or "auto" = guessed from data-title / page heading
 *   data-title         product title for "auto"
 *   data-lang          "sk" | "en" (default: page language, else sk)
 *   data-size-option   name of the shop's size option, e.g. "Veľkosť" (where to pre-select the variant)
 *   data-chart         the shop's size chart as CSV text ("122;117;122" per line), or "#id" of an element holding it
 *   data-chart-measure for footwear charts: "insole" (insole length, default) or "foot" (foot length the size fits)
 *   data-open          "true" = form shown expanded
 *   data-accent        accent colour, e.g. "#2E7D32"
 *   data-autoselect    "false" = no "Select size" button
 *
 * Events: "geargrow:result" (detail = engine result) and "geargrow:error" (detail = { message, field }) bubble from the element.
 * Everything runs in the visitor's browser; nothing is stored or sent anywhere.
 */
(function (root) {
  "use strict";
  var G = root.GearGrow;
  if (typeof document === "undefined") return;
  if (!G) { if (root.console) console.error("GearGrow widget: load engine-1.4.4.js before the widget."); return; }
  var ev = String(G.VERSION).split(".").map(Number);
  if ((ev[0] * 1e6 + ev[1] * 1e3 + ev[2]) < 1004004 && root.console)
    console.warn("GearGrow widget 2.0.3 needs engine 1.4.4 or newer (alternativeNote); engine " + G.VERSION + " is loaded.");

  var WIDGET_VERSION = "2.0.3";
  var KEYWORDS = {"body_dupacky":["body pre bábätko","sleepsuits","overalčeky","bodysuits","dupačky","rompers","body"],"kombineza_babatko":["zimná kombinéza pre bábätko","baby snowsuit","zimný overal"],"ciapka_babatko":["čiapka pre bábätko","baby hat"],"prve_topanky":["prvé topánky","first shoes","capačky"],"odrazadlo":["balance bike","odrážadlo"],"bicykel":["bicykel","bike"],"kolobezka":["detská kolobežka","kolobežka","scooter"],"prilba_bicykel":["detská prilba na bicykel","cyklistická prilba","prilba na bicykel","bike helmet"],"lyze":["zjazdové lyže","downhill skis","detské lyže","lyže"],"lyziarky":["ski boots","lyžiarky"],"lyziarske_palice":["lyžiarske palice","ski poles"],"lyziarska_prilba":["lyžiarska prilba","ski helmet"],"lyziarske_okuliare":["detské lyžiarske okuliare","lyžiarske okuliare","ski goggles"],"snowboard":["snowboard"],"snowboard_topanky":["snowboardové topánky","snowboard boots"],"bezky":["cross-country skis","bežky"],"bezky_topanky":["cross-country ski boots","topánky na bežky"],"lyziarska_bunda":["lyžiarska bunda","ski jacket"],"lyziarske_nohavice":["lyžiarske nohavice","ski trousers","oteplováky"],"kombineza":["lyžiarska kombinéza","zimná kombinéza","snowsuit","ski suit","zimná"],"termopradlo":["detské termoprádlo","thermal underwear","termoprádlo"],"lyziarske_rukavice":["lyžiarske rukavice","ski gloves"],"korcule_ladove":["ľadové korčule","ice skates","korčule"],"korcule_hokejove":["hokejové korčule","hockey skates"],"korcule_kolieskove":["kolieskové korčule","inline skates"],"hokejka":["hockey stick","hokejka"],"hokejova_prilba":["hokejová prilba","hockey helmet"],"hokejova_vystroj":["hockey protective gear","hokejové chrániče","hokejová výstroj"],"chranice":["chrániče na korčuľovanie","chrániče na korčule","detské chrániče","skating pads"],"kopacky":["football boots","kopačky"],"halovky":["turf shoes","halovky","indoor","turfy"],"chranice_holeni":["chrániče holení","shin guards"],"futbalova_lopta":["futbalová lopta","football"],"basketbalova_lopta":["basketbalová lopta","basketball"],"futbalovy_dres":["futbalový dres","football kit","športový","sports"],"tenisova_raketa":["tenisová raketa","tennis racket"],"plavky":["detské plavky","swim shorts","swimsuit","plavky"],"neopren":["detský neoprén","neoprén","wetsuit"],"plavecke_okuliare":["plavecké okuliare","swimming goggles"],"obuv_do_vody":["obuv do vody","water shoes"],"turisticka_obuv":["trekové topánky","turistická obuv","hiking boots"],"softshell_bunda":["softshellová bunda","softshell jacket"],"nepremokava_bunda":["nepremokavá bunda","waterproof jacket"],"softshell_nohavice":["softshellové nohavice","softshell trousers"],"cvicky":["ballet slippers","gym shoes","baletky","cvičky"],"kimono":["kimono","gi"],"gymnasticky_dres":["gymnastický dres","dance leotard","tanečný dres","gymnastický","gymnastics"],"tenisky":["detské tenisky","trainers","sneakers","tenisky","botasky"],"bezecka_obuv":["running shoes","bežecká obuv"],"zimna_obuv":["zimné topánky","winter boots","snow boots","snehule"],"gumaky":["gumené čižmy","wellies","gumáky"],"sandale":["sandals","sandále"],"papuce":["indoor shoes","prezuvky","slippers","papuče"],"zimna_bunda":["winter jacket","zimná bunda"],"prechodna_bunda":["prechodná bunda","autumn jacket","spring"],"mikina":["sweatshirt","mikina","hoodie"],"teplaky":["tracksuit bottoms","tepláky"],"nohavice":["detské nohavice","trousers","nohavice","rifle","jeans"],"tricko":["t-shirt","tričko"],"leginy":["leggings","legíny"],"pyzamo":["pyjamas","pyžamo"],"ciapka":["detská čiapka","čiapka","hat"],"rukavice":["detské rukavice","zimné rukavice","winter gloves"],"sanky":["bobsled","sledge","sánky","boby"]};
  var STYLES = ":host { display: block; font: inherit; color: inherit; margin: 1rem 0; max-width: 600px; } :host([hidden]) { display: none; } * { box-sizing: border-box; } [hidden] { display: none !important; } .gg { --gg-accent: #2E7D32; --gg-line: rgba(0, 0, 0, .14); --gg-soft: color-mix(in srgb, var(--gg-accent) 9%, #fff); line-height: 1.45; } button { font: inherit; cursor: pointer; } .gg-toggle { display: inline-flex; align-items: center; gap: .45em; background: #fff; border: 1.5px solid var(--gg-accent); color: var(--gg-accent); border-radius: 999px; padding: .6em 1.15em; font-weight: 600; } .gg-toggle:hover, .gg-toggle[aria-expanded=\"true\"] { background: var(--gg-soft); } .gg-toggle:focus-visible, .gg-submit:focus-visible, .gg-select:focus-visible, summary:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid color-mix(in srgb, var(--gg-accent) 45%, transparent); outline-offset: 2px; } .gg-panel { margin-top: .75rem; padding: 1.1rem; border: 1px solid var(--gg-line); border-radius: 14px; background: #fff; } .gg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: .8rem 1rem; } .gg-field { display: flex; flex-direction: column; gap: .3em; min-width: 0; } .gg-field label { font-weight: 600; font-size: .93em; } .gg-opt { font-weight: 400; opacity: .65; } .gg-field small { font-size: .8em; opacity: .7; } input, select { font: inherit; color: inherit; width: 100%; padding: .55em .65em; border: 1px solid rgba(0, 0, 0, .28); border-radius: 9px; background: #fff; min-height: 2.6em; } input[aria-invalid=\"true\"] , select[aria-invalid=\"true\"] { border-color: #b3261e; background: #fff6f5; } .gg-err { margin: 0; color: #b3261e; font-size: .85em; font-weight: 500; } .gg-err-box { padding: .65em .8em; border-radius: 9px; background: #fdecea; } .gg-more { margin-top: .9rem; border-top: 1px dashed var(--gg-line); padding-top: .7rem; } .gg-more summary { cursor: pointer; color: var(--gg-accent); font-weight: 600; font-size: .92em; margin-bottom: .6rem; } .gg-actions { margin-top: 1rem; } .gg-submit, .gg-select { background: var(--gg-accent); color: #fff; border: 0; border-radius: 10px; padding: .7em 1.35em; font-weight: 700; } .gg-select { margin-top: .8rem; } .gg-select[disabled] { background: var(--gg-soft); color: var(--gg-accent); cursor: default; } .gg-small { font-size: .8em; opacity: .7; margin: .6em 0 0; } .gg-brand a { color: inherit; } .gg-result:not(:empty) { margin-top: 1.1rem; padding-top: 1.1rem; border-top: 1px solid var(--gg-line); } .gg-card { display: flex; flex-direction: column; gap: .15rem; } .gg-lead { margin: 0; font-size: .92em; opacity: .8; } .gg-big { margin: 0; font-size: 2em; font-weight: 800; color: var(--gg-accent); line-height: 1.15; letter-spacing: -.01em; } .gg-range { margin: 0 0 .35rem; opacity: .8; } .gg-box { margin: .5rem 0 .2rem; padding: .75em .9em; border-radius: 11px; background: var(--gg-soft); border-left: 4px solid var(--gg-accent); } .gg-box p { margin: 0; } .gg-instr { font-weight: 600; } .gg-detail { margin-top: .25em !important; font-size: .9em; opacity: .85; } .gg-typical { margin: .45rem 0 0; } .gg-notes { margin: .9rem 0 0 1.1em; padding: 0; font-size: .9em; } .gg-notes li { margin: .25em 0; } @media (max-width: 420px) { .gg-panel { padding: .9rem; } .gg-big { font-size: 1.75em; } }";

  // ------------------------------------------------------------------ texts
  var UI = {
    sk: {
      toggle: "Akú veľkosť bude mať vaše dieťa?", submit: "Zistiť veľkosť", recalc: "Prepočítať",
      privacy: "Počíta sa priamo vo vašom prehliadači. Nič sa neukladá ani neodosiela.",
      birth: "Dátum narodenia", sex: "Pohlavie", sex_female: "Dievča", sex_male: "Chlapec", sex_unspecified: "Neuvádzam (priemer)",
      height: "Výška dnes (cm)", height_hint: "Bez topánok, pri stene.",
      foot: "Dĺžka chodidla dnes (cm)", foot_hint: "V stoji, od päty po najdlhší prst.",
      head: "Obvod hlavy (cm)", head_hint: "Nepovinné. Krajčírskym metrom tesne nad obočím.",
      weight: "Hmotnosť (kg)", chest: "Obvod hrudníka (cm)", chest_hint: "Pod pazuchami cez najširšie miesto.",
      waist: "Obvod pásu (cm)", waist_hint: "V najužšom mieste, zvyčajne tesne nad pupkom.",
      birthWeek: "Narodilo sa predčasne?", birthWeek_no: "Nie, v termíne", week: "narodené v {w}. týždni",
      mother: "Výška matky (cm)", father: "Výška otca (cm)",
      prevHeight: "Staršie meranie výšky (cm)", prevHeight_hint: "Napr. z preventívnej prehliadky.",
      prevDate: "Kedy bolo staršie meranie", prevDate_hint: "Pred 3 až 24 mesiacmi.",
      target: "Kedy to bude nosiť?", now: "Hneď (o 2 týždne)", months: "Konkrétny mesiac",
      season_spring: "Na jar", season_summer: "Na leto", season_autumn: "Na jeseň", season_winter: "Na zimu",
      group_build: "Spresniť podľa postavy (nepovinné)", group_older: "Spresniť: výška rodičov a staršie meranie (nepovinné)",
      optional: "nepovinné", recommended: "Odporúčaná veľkosť", or: "alebo",
      typical_suffix: "– orientačne, každá značka čísluje trochu inak.", alt: "Ak dieťa vyrastie viac:",
      select: "Vybrať veľkosť {size}", selected: "Veľkosť {size} je vybraná ✓",
      oops: "Výpočet sa nepodaril. Skontrolujte zadané údaje a skúste to znova.", brand: "Výpočet: GearGrow"
    },
    en: {
      toggle: "What size will your child need?", submit: "Find the size", recalc: "Recalculate",
      privacy: "Calculated in your browser. Nothing is stored or sent anywhere.",
      birth: "Date of birth", sex: "Sex", sex_female: "Girl", sex_male: "Boy", sex_unspecified: "Not specified (average)",
      height: "Height today (cm)", height_hint: "Without shoes, against a wall.",
      foot: "Foot length today (cm)", foot_hint: "Standing, heel to longest toe.",
      head: "Head circumference (cm)", head_hint: "Optional. Tape measure just above the eyebrows.",
      weight: "Weight (kg)", chest: "Chest (cm)", chest_hint: "Under the armpits, around the widest part.",
      waist: "Waist (cm)", waist_hint: "At the narrowest point, usually just above the navel.",
      birthWeek: "Born prematurely?", birthWeek_no: "No, at term", week: "born in week {w}",
      mother: "Mother's height (cm)", father: "Father's height (cm)",
      prevHeight: "Earlier height measurement (cm)", prevHeight_hint: "E.g. from a check-up.",
      prevDate: "Date of the earlier measurement", prevDate_hint: "3 to 24 months ago.",
      target: "When will it be worn?", now: "Now (in 2 weeks)", months: "A specific month",
      season_spring: "In spring", season_summer: "In summer", season_autumn: "In autumn", season_winter: "In winter",
      group_build: "Refine by body build (optional)", group_older: "Refine: parents' heights and an earlier measurement (optional)",
      optional: "optional", recommended: "Recommended size", or: "or",
      typical_suffix: "– a guide only, every brand numbers sizes a little differently.", alt: "If the child grows more:",
      select: "Select size {size}", selected: "Size {size} is selected ✓",
      oops: "Something went wrong. Check the details and try again.", brand: "Sizing by GearGrow"
    }
  };
  var MONTHS = {
    sk: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  function fmt(s, vars) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; }); }

  // ------------------------------------------------------------------ helpers
  function cssEscape(s) { return root.CSS && root.CSS.escape ? root.CSS.escape(s) : String(s).replace(/["\\]/g, "\\$&"); }
  function norm(s) { return String(s || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  // Today's calendar day as a UTC date, so the engine never sees "yesterday" shortly after midnight.
  function todayUTC() { var d = new Date(); return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); }
  function dateFromInput(v) { return /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? new Date(v + "T00:00:00Z") : null; }
  // Form text -> number for the engine: empty -> null, "18,5" -> 18.5, anything else -> -1 (engine then names the field).
  function parseNum(v) {
    var s = String(v == null ? "" : v).trim().replace(/\s/g, "").replace(",", ".");
    if (!s) return null;
    return /^\d+(\.\d+)?$/.test(s) ? parseFloat(s) : -1;
  }

  // "auto": the catalog item whose keyword appears in the product title (longest match wins).
  function guessItem(title) {
    var t = " " + norm(title).replace(/[^a-z0-9]+/g, " ") + " ", best = null, bestLen = 0;
    Object.keys(KEYWORDS).forEach(function (id) {
      KEYWORDS[id].forEach(function (kw) {
        var k = norm(kw).replace(/[^a-z0-9]+/g, " ").trim();
        if (k.length > bestLen && t.indexOf(" " + k + " ") !== -1) { best = id; bestLen = k.length; }
      });
    });
    return best;
  }

  // Does a shop variant text fit a size label? Both sides through G.normalizeSize; "122/128" checks each part;
  // a numeric range such as "29-32" (adjustable skates) contains a numeric size, but not an age range ("7-8 rokov").
  function variantMatches(text, label) {
    var want = G.normalizeSize(label);
    if (!want) return false;
    var parts = [text].concat(String(text).split(/\s*[\/|;]\s*/));
    for (var i = 0; i < parts.length; i++) if (G.normalizeSize(parts[i]) === want) return true;
    if (/^\d+(\.\d+)?$/.test(want) && !/rok|r\.|year|yrs|mes|month|kg/i.test(norm(text))) {
      var m = /(\d+(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d+)?)/.exec(String(text));
      if (m) { var a = parseFloat(m[1].replace(",", ".")), b = parseFloat(m[2].replace(",", ".")), w = parseFloat(want);
        if (b > a && b - a <= 6 && w >= a && w <= b) return true; }
    }
    return false;
  }
  var SIZE_WORDS = ["size", "velkost", "velikost", "grosse", "groesse", "taille", "rozmer", "cislo", "eu", "variant", "option"];
  function controlContext(el) {
    var bits = [el.name, el.id, el.getAttribute("aria-label"), el.getAttribute("data-option-name")];
    var fs = el.closest && el.closest("fieldset"), lg = fs && fs.querySelector("legend");
    if (lg) bits.push(lg.textContent);
    if (el.id) { var l = document.querySelector('label[for="' + cssEscape(el.id) + '"]'); if (l) bits.push(l.textContent); }
    var wrap = el.closest && el.closest("[data-option-name],[class*='variant'],[class*='option'],[class*='size'],[class*='velkost'],[class*='parameter']");
    if (wrap) bits.push(wrap.getAttribute("data-option-name") || "", wrap.className || "");
    return norm(bits.join(" "));
  }
  // Size option controls on the page (radios and selects), never quantity or country selects.
  function sizeControls(optionName) {
    var want = optionName ? [norm(optionName)] : SIZE_WORDS;
    var els = Array.prototype.slice.call(document.querySelectorAll('input[type="radio"], select'));
    return els.filter(function (el) {
      if (el.disabled) return false;
      var ctx = controlContext(el);
      return want.some(function (w) { return ctx.indexOf(w) !== -1; });
    });
  }
  function radioText(r) {
    var lab = r.closest("label") || (r.id && document.querySelector('label[for="' + cssEscape(r.id) + '"]'));
    return [r.value, lab ? lab.textContent : ""];
  }
  // -> { label, apply() } for the first candidate size that exists as a variant, or null.
  function findVariant(labels, optionName) {
    var ctrls = sizeControls(optionName);
    for (var i = 0; i < labels.length; i++) {
      for (var j = 0; j < ctrls.length; j++) {
        var el = ctrls[j];
        if (el.tagName === "SELECT") {
          for (var k = 0; k < el.options.length; k++) {
            var op = el.options[k];
            if (!op.disabled && op.value !== "" && (variantMatches(op.value, labels[i]) || variantMatches(op.text, labels[i])))
              return { label: labels[i], apply: selectOption.bind(null, el, op.value) };
          }
        } else if (radioText(el).some(function (t) { return t && variantMatches(t.trim(), labels[i]); })) {
          return { label: labels[i], apply: clickRadio.bind(null, el) };
        }
      }
    }
    return null;
  }
  function selectOption(sel, value) {
    sel.value = value;
    sel.dispatchEvent(new Event("input", { bubbles: true }));
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function clickRadio(r) {
    if (!r.checked) r.click();
    r.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // Where a size label stands from small to large: in the shop's size chart (by its upper limit or insole length),
  // in the catalog's own order for letter sizes (YTH < JR < INT < SR, XS < S < M < L), otherwise by its number.
  // NaN = unknown order.
  function sizeRank(label, item, chart) {
    var key = G.normalizeSize(label);
    if (chart && chart.rows) {
      for (var i = 0; i < chart.rows.length; i++) {
        var row = chart.rows[i];
        if (G.normalizeSize(row.label) === key) return row.length != null ? row.length : row.max;
      }
      return NaN;
    }
    var p = item && item.params;
    if (p && p.unit === "label" && p.bands) {
      for (var j = 0; j < p.bands.length; j++) {
        var b = p.bands[j], name = item.sizing === "age_band" ? b[2] : b[0];
        if (G.normalizeSize(String(name)) === key) return j;
      }
      return NaN;
    }
    return parseFloat(key);
  }
  // Alternatives that are surely larger than the primary size; any whose order is unknown is left out.
  function largerThan(primary, alternatives, item, chart) {
    var p = sizeRank(primary, item, chart);
    return (alternatives || []).filter(function (a) {
      var v = sizeRank(a, item, chart);
      return !isNaN(p) && !isNaN(v) && v > p;
    });
  }

  function readChart(host, item) {
    var spec = host.getAttribute("data-chart");
    if (!spec) return null;
    if (/^#[\w-]+$/.test(spec.trim())) { var src = document.querySelector(spec.trim()); spec = src ? src.textContent : ""; }
    var basis = ({ clothing: "height", height_band: "height", height_length: "height", foot: "foot", head: "head" })[item.sizing];
    if (!basis || !spec.trim()) return null;
    var measure = basis === "foot" ? (host.getAttribute("data-chart-measure") === "foot" ? "foot" : "insole") : undefined;
    return G.parseSizeChart(spec, basis, measure);
  }

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === "text") e.textContent = v; else if (k === "html") e.innerHTML = v; else e.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }

  // ------------------------------------------------------------------ the widget
  var uid = 0;
  function Widget(host, opts) {
    this.host = host;
    this.opts = opts || {};
    var lang = (this.opt("lang") || document.documentElement.lang || "sk").slice(0, 2).toLowerCase();
    this.lang = UI[lang] ? lang : (lang === "cs" ? "sk" : "en");
    this.t = UI[this.lang];
    var id = this.opt("item") || "auto";
    if (id === "auto") {
      var h1 = document.querySelector("h1"), og = document.querySelector('meta[property="og:title"]');
      id = guessItem(this.opt("title") || (h1 && h1.textContent) || (og && og.content) || "");
    }
    this.item = id ? G.findItem(id, this.lang) : null;
    if (id && !this.item && root.console) console.warn("GearGrow widget: unknown item \"" + id + "\" – see the catalog in README.");
    this.id = "gg" + (++uid);
  }
  Widget.prototype.opt = function (k) {
    if (this.opts[k] != null) return String(this.opts[k]);
    var v = this.host.getAttribute("data-" + k.replace(/[A-Z]/g, function (c) { return "-" + c.toLowerCase(); }));
    return v == null ? null : v;
  };

  Widget.prototype.render = function () {
    var self = this, t = this.t, item = this.item;
    if (!item || item.sizing === "none") { this.host.hidden = true; return false; }
    this.root = this.host.shadowRoot || (this.host.attachShadow ? this.host.attachShadow({ mode: "open" }) : this.host);
    this.root.innerHTML = "";
    this.root.appendChild(el("style", { text: STYLES }));
    var accent = this.opt("accent");
    var box = el("div", { "class": "gg", style: accent && /^#[0-9a-f]{3,8}$|^rgb/i.test(accent) ? "--gg-accent:" + accent : null });
    var open = this.opt("open") === "true";
    this.toggle = el("button", { type: "button", "class": "gg-toggle", "aria-expanded": String(open), "aria-controls": this.id + "-panel" },
      [el("span", { "aria-hidden": "true", text: "📏" }), " " + t.toggle]);
    this.panel = el("div", { "class": "gg-panel", id: this.id + "-panel", hidden: !open });
    this.toggle.addEventListener("click", function () {
      var show = self.panel.hidden; self.panel.hidden = !show; self.toggle.setAttribute("aria-expanded", String(show));
      if (show) { var f = self.panel.querySelector("input,select"); if (f) f.focus(); }
    });
    box.appendChild(this.toggle); box.appendChild(this.panel);
    this.root.appendChild(box);
    this.buildForm();
    return true;
  };

  Widget.prototype.field = function (name, input, hint, optional) {
    var t = this.t, fid = this.id + "-" + name;
    input.id = fid; input.name = name;
    var err = el("p", { "class": "gg-err", id: fid + "-err", role: "alert", hidden: true });
    input.setAttribute("aria-describedby", (hint ? fid + "-hint " : "") + fid + "-err");
    var wrap = el("div", { "class": "gg-field", "data-field": name }, [
      el("label", { "for": fid }, [t[name], optional ? el("span", { "class": "gg-opt", text: " (" + t.optional + ")" }) : null]),
      input, hint ? el("small", { id: fid + "-hint", text: hint }) : null, err]);
    this.fields[name] = { wrap: wrap, input: input, err: err };
    return wrap;
  };
  function numInput(ph) { return el("input", { type: "text", inputmode: "decimal", autocomplete: "off", placeholder: ph || null }); }

  Widget.prototype.buildForm = function () {
    var self = this, t = this.t, item = this.item, lang = this.lang;
    this.fields = {};
    var today = todayUTC(), maxDate = today.toISOString().slice(0, 10);
    var sex = el("select", {}, ["unspecified", "female", "male"].map(function (v) { return el("option", { value: v, text: t["sex_" + v] }); }));
    var week = el("select", {}, [el("option", { value: "", text: t.birthWeek_no })]);
    for (var w = 36; w >= 22; w--) week.appendChild(el("option", { value: String(w), text: fmt(t.week, { w: w }) }));

    // Target: now, the four seasons (item's own season first) and the next 24 months.
    var target = el("select", {});
    target.appendChild(el("option", { value: "now", text: t.now }));
    var seasons = ["spring", "summer", "autumn", "winter"].map(function (s) { return [s, G.resolveTarget("next_" + s, today)]; })
      .sort(function (a, b) { return a[1] - b[1]; });
    seasons.forEach(function (s) {
      target.appendChild(el("option", { value: "next_" + s[0], text: t["season_" + s[0]] + " (" + G.fmtDate(s[1], lang) + ")" }));
    });
    var og = el("optgroup", { label: t.months });
    for (var i = 1; i <= 24; i++) {
      var d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + i, 1));
      og.appendChild(el("option", { value: d.toISOString().slice(0, 7), text: MONTHS[lang][d.getUTCMonth()] + " " + d.getUTCFullYear() }));
    }
    target.appendChild(og);
    target.value = item.season && item.season !== "any" ? "next_" + item.season : "now";

    var main = el("div", { "class": "gg-grid" }, [
      this.field("birth", el("input", { type: "date", max: maxDate, required: true })),
      this.field("sex", sex),
      this.field("height", numInput("120"), t.height_hint),
      this.field("foot", numInput(lang === "en" ? "18.5" : "18,5"), t.foot_hint),
      this.field("head", numInput("52"), t.head_hint),
      this.field("target", target),
      this.field("birthWeek", week)
    ]);
    var build = el("details", { "class": "gg-more", "data-group": "build" }, [el("summary", { text: t.group_build }), el("div", { "class": "gg-grid" }, [
      this.field("weight", numInput()), this.field("chest", numInput(), t.chest_hint), this.field("waist", numInput(), t.waist_hint)])]);
    var older = el("details", { "class": "gg-more", "data-group": "older" }, [el("summary", { text: t.group_older }), el("div", { "class": "gg-grid" }, [
      this.field("mother", numInput("166")), this.field("father", numInput("180")),
      this.field("prevHeight", numInput(), t.prevHeight_hint), this.field("prevDate", el("input", { type: "date", max: maxDate }), t.prevDate_hint)])]);
    this.groups = { build: build, older: older };

    this.form = el("form", { "class": "gg-form", novalidate: true }, [main, build, older,
      el("div", { "class": "gg-actions" }, [el("button", { type: "submit", "class": "gg-submit", text: t.submit })]),
      el("p", { "class": "gg-small", text: t.privacy })]);
    this.result = el("div", { "class": "gg-result", "aria-live": "polite" });
    this.panel.appendChild(this.form);
    this.panel.appendChild(this.result);

    this.fields.birth.input.addEventListener("change", function () { self.updateFields(); });
    this.form.addEventListener("submit", function (e) { e.preventDefault(); self.calculate(); });
    this.form.addEventListener("input", function (e) { self.clearError(e.target.name); });
    this.updateFields();
  };

  // Show only what this item needs for this child (engine's fieldsFor); "target" is always shown.
  Widget.prototype.updateFields = function () {
    var birth = dateFromInput(this.fields.birth.input.value);
    var need = G.fieldsFor(this.item.id, birth, todayUTC()) || { required: [], optional: [] };
    var show = need.required.concat(need.optional, ["target"]);
    var self = this;
    Object.keys(this.fields).forEach(function (name) { self.fields[name].wrap.hidden = show.indexOf(name) === -1; });
    this.fields.birthWeek.wrap.hidden = show.indexOf("birthWeek") === -1 || !birth; // ask only once we know the child is under 2
    ["build", "older"].forEach(function (g) {
      var any = Array.prototype.some.call(self.groups[g].querySelectorAll("[data-field]"), function (f) { return !f.hidden; });
      self.groups[g].hidden = !any;
    });
    this.groups.older.hidden = this.groups.older.hidden || !birth;
  };

  Widget.prototype.value = function (name) {
    var f = this.fields[name];
    return f && !f.wrap.hidden && !(f.wrap.closest("details") && f.wrap.closest("details").hidden) ? f.input.value : "";
  };
  Widget.prototype.child = function () {
    var v = this.value.bind(this);
    var c = { birth: dateFromInput(v("birth")), sex: v("sex") || "unspecified", today: todayUTC() };
    ["height", "foot", "head", "weight", "chest", "waist", "mother", "father", "prevHeight"].forEach(function (k) { c[k] = parseNum(v(k)); });
    c.birthWeek = v("birthWeek") ? parseInt(v("birthWeek"), 10) : null;
    c.prevDate = dateFromInput(v("prevDate"));
    return c;
  };

  Widget.prototype.clearError = function (name) {
    var f = this.fields[name];
    if (f) { f.err.hidden = true; f.err.textContent = ""; f.input.removeAttribute("aria-invalid"); }
  };
  Widget.prototype.showError = function (message, field) {
    var self = this;
    Object.keys(this.fields).forEach(function (n) { self.clearError(n); });
    this.result.innerHTML = "";
    var f = field && this.fields[field];
    if (f && !f.wrap.hidden) {
      var det = f.wrap.closest("details"); if (det) det.open = true;
      f.err.textContent = message; f.err.hidden = false; f.input.setAttribute("aria-invalid", "true"); f.input.focus();
    } else {
      this.result.appendChild(el("p", { "class": "gg-err gg-err-box", role: "alert", text: message }));
    }
    this.host.dispatchEvent(new CustomEvent("geargrow:error", { bubbles: true, composed: true, detail: { message: message, field: field || null } }));
  };

  Widget.prototype.calculate = function () {
    var t = this.t, r, chart = readChart(this.host, this.item);
    var self = this;
    Object.keys(this.fields).forEach(function (n) { self.clearError(n); });
    try {
      r = G.recommend(this.child(), this.item.id, this.fields.target.input.value, { lang: this.lang, sizeChart: chart || undefined });
    } catch (e) {
      if (e instanceof G.SizingError) return this.showError(e.message, e.field);
      if (root.console) console.error("GearGrow widget:", e);
      return this.showError(t.oops, null);
    }
    if (chart && r.sizeChartProblems && r.sizeChartProblems.length && root.console)
      console.warn("GearGrow: shop size chart not used –", r.sizeChartProblems.join(" | "));
    this.chartUsed = r.sizeChartUsed ? chart : null;
    this.showResult(r);
    this.form.querySelector(".gg-submit").textContent = t.recalc;
    this.host.dispatchEvent(new CustomEvent("geargrow:result", { bubbles: true, composed: true, detail: r }));
  };

  // Layout as recommended in ENGINE.md: centimetres first when measure.leads, otherwise the size first.
  Widget.prototype.showResult = function (r) {
    // One recommended size; a larger one only as "if the child grows more". A smaller alternative (from the low end of
    // the forecast range) is never offered: parents buy for growth, and three sizes at once only confuse.
    var t = this.t, m = r.measure, out = this.result, bigger = largerThan(r.primary, r.alternatives, this.item, this.chartUsed),
      sizes = [r.primary].concat(bigger);
    out.innerHTML = "";
    var card = el("div", { "class": "gg-card" });
    if (m && m.leads) {
      card.appendChild(el("p", { "class": "gg-lead", text: m.lead }));
      card.appendChild(el("p", { "class": "gg-big", text: m.valueText }));
      if (m.range) card.appendChild(el("p", { "class": "gg-range", text: m.range }));
      card.appendChild(el("div", { "class": "gg-box" }, [el("p", { "class": "gg-instr", text: m.instruction }),
        m.instructionDetail ? el("p", { "class": "gg-detail", text: m.instructionDetail }) : null]));
      if (m.typical) card.appendChild(el("p", { "class": "gg-typical" }, [m.typical + " ", el("strong", { text: r.primary }), " " + t.typical_suffix]));
      if (m.typical && bigger.length) card.appendChild(el("p", { "class": "gg-range", text: t.alt + " " + bigger.join(", ") }));
    } else {
      card.appendChild(el("p", { "class": "gg-lead", text: t.recommended }));
      card.appendChild(el("p", { "class": "gg-big", text: r.primary }));
      if (bigger.length) card.appendChild(el("p", { "class": "gg-range", text: t.alt + " " + bigger.join(", ") }));
      if (m) card.appendChild(el("div", { "class": "gg-box" }, [el("p", { "class": "gg-instr", text: m.summary }),
        m.instruction ? el("p", { "class": "gg-detail", text: m.instruction }) : null]));
      else if (r.basisText) card.appendChild(el("p", { "class": "gg-range", text: r.basisText }));
    }
    out.appendChild(card);

    if (this.opt("autoselect") !== "false") {
      var v = findVariant(sizes, this.opt("sizeOption"));
      if (v) {
        var shown = v.label.replace(/^(veľ\.|size)\s+/i, "");
        var btn = el("button", { type: "button", "class": "gg-select", text: fmt(t.select, { size: shown }) });
        btn.addEventListener("click", function () { v.apply(); btn.textContent = fmt(t.selected, { size: shown }); btn.disabled = true; });
        out.appendChild(btn);
      }
    }
    var dup = m && m.leads ? m.duplicateNote : null;
    // r.alternativeNote only explains the engine's own list of sizes; the widget shows the larger size itself next to
    // the result, so that note is left out (by the field, never by its wording, which may change in a new engine).
    var notes = r.notes.filter(function (n) { return n && n !== dup && n !== r.alternativeNote; });
    if (notes.length) out.appendChild(el("ul", { "class": "gg-notes" }, notes.map(function (n) { return el("li", { text: n }); })));
    out.appendChild(el("p", { "class": "gg-small gg-brand" }, [el("a", { href: "https://geargrow.sk", target: "_blank", rel: "noopener", text: t.brand })]));
  };

  // ------------------------------------------------------------------ boot
  function mount(host, opts) {
    if (!host || host.__geargrow) return host && host.__geargrow;
    var w = new Widget(host, opts);
    host.__geargrow = w;
    w.render();
    return w;
  }
  function boot() { Array.prototype.forEach.call(document.querySelectorAll("[data-geargrow]"), function (h) { mount(h); }); }

  root.GearGrowWidget = {
    VERSION: WIDGET_VERSION, ENGINE_VERSION: G.VERSION, mount: mount, boot: boot,
    _internal: { guessItem: guessItem, variantMatches: variantMatches, parseNum: parseNum, findVariant: findVariant,
      sizeRank: sizeRank, largerThan: largerThan }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  document.addEventListener("shopify:section:load", boot);
  // Widgets added later (single-page themes, quick-view popups) are mounted too; checks are batched per frame.
  var pending = false;
  if (root.MutationObserver) new MutationObserver(function () {
    if (pending) return; pending = true;
    (root.requestAnimationFrame || setTimeout)(function () { pending = false; boot(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})(typeof window !== "undefined" ? window : globalThis);
