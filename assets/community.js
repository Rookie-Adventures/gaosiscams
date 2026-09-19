// 反詐騙社群 — 匿名發布遭遇（localStorage 演示，無後端）
(function () {
  var KEY = "gszp_community_posts";
  var TYPES = ["電信詐騙", "網路投資", "假冒客服", "求職詐騙", "假交友", "其他"];

  var SEED = [
    {
      id: "s1", type: "網路投資", title: "假投資平台騙走我畢生積蓄",
      body: "上個月在社群看到廣告，說穩賺不賠。先投入小錢真的有出金，後來加碼到 80 萬就發現平台登不進去，客服也消失了。提醒大家千萬別信「保證獲利」。",
      ts: Date.now() - 2 * 86400000, hugs: 12, helped: false
    },
    {
      id: "s2", type: "假冒客服", title: "接到假冒銀行客服說我帳戶被盜",
      body: "對方報出我的姓名與部分卡號，要我點連結「凍結帳戶」，還催我快點否則錢會被轉走。我掛掉直接打銀行官方電話，才發現是詐騙。冷靜最重要！",
      ts: Date.now() - 1 * 86400000, hugs: 8, helped: false
    },
    {
      id: "s3", type: "求職詐騙", title: "打工變成人頭帳戶",
      body: "應徵在家兼職，對方說只是代收代轉款項，日薪很高。後來才發現帳戶被用來洗錢，我已主動報案。千萬不要出租出售自己的帳戶！",
      ts: Date.now() - 5 * 3600000, hugs: 5, helped: false
    }
  ];

  function load() {
    try { var d = localStorage.getItem(KEY); if (d) return JSON.parse(d); } catch (e) {}
    return null;
  }
  function save(arr) {
    try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
  }
  var posts = load();
  if (!posts) { posts = SEED; save(posts); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(ts) {
    var d = new Date(ts), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  var feed = document.getElementById("feed");
  var form = document.getElementById("cform");

  function render() {
    if (!feed) return;
    feed.innerHTML = "";
    posts.slice().sort(function (a, b) { return b.ts - a.ts; }).forEach(function (p) {
      var el = document.createElement("div");
      el.className = "post";
      el.innerHTML =
        '<div class="ptop"><span class="ptype">' + esc(p.type) + '</span>' +
        '<span class="ptime">🕒 ' + fmt(p.ts) + '</span></div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<div class="pbody">' + esc(p.body) + '</div>' +
        '<div class="staff">🛡️ <b>反詐志工：</b>我們已收到您的遭遇。請保留所有對話與轉帳紀錄，並撥打公益專線 0800-090-010。' +
        '您並不孤單，這裡有許多相同遭遇的朋友，歡迎在下方「抱團」互相打氣、交換資訊。</div>' +
        '<div class="actions">' +
        '<button class="btn-hug" data-id="' + p.id + '">👥 同樣遭遇，抱團 (' + (p.hugs || 0) + ')</button>' +
        '<span class="ptime">匿名發布</span>' +
        '</div>';
      feed.appendChild(el);
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var type = form.type.value;
      var title = form.title.value.trim();
      var body = form.body.value.trim();
      if (!title || !body) { alert("請填寫標題與遭遇描述"); return; }
      posts.push({ id: "u" + Date.now(), type: type, title: title, body: body, ts: Date.now(), hugs: 0, helped: false });
      save(posts);
      render();
      form.reset();
      document.getElementById("feed").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (feed) {
    feed.addEventListener("click", function (e) {
      var b = e.target.closest(".btn-hug");
      if (!b) return;
      var id = b.getAttribute("data-id");
      posts.forEach(function (p) { if (p.id === id) p.hugs = (p.hugs || 0) + 1; });
      save(posts);
      render();
    });
  }

  render();
})();
