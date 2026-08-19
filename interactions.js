/* 个人网站 · 交互脚本 v2
   - 液态背景挂载(Hero) — 清新浅色调
   - 滚动揭示 (IntersectionObserver)
   - 奇妙世界 Hover 切换人物表情 + 3D tilt + 浮动
   - 导航高亮 + 平滑滚动
   - 联系区复制
   尊重 prefers-reduced-motion */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 液态背景 (复用 threejs-components, 经 CDN) ---------- */
  function mountLiquid() {
    var canvas = document.getElementById("liquid-canvas");
    if (!canvas) return;

    function makeImage() {
      var dpr = window.devicePixelRatio || 1;
      var w = window.innerWidth, h = window.innerHeight;
      var off = document.createElement("canvas");
      off.width = w * dpr; off.height = h * dpr;
      var ctx = off.getContext("2d");
      if (!ctx) return null;
      ctx.scale(dpr, dpr);

      // 基底：浅天蓝 → 米白
      var grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#b7dcf4");
      grad.addColorStop(0.6, "#f4f6f5");
      grad.addColorStop(1, "#f4f6f5");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 彩色软斑：给液态扭曲提供可见的形体与反光
      function blob(x, y, r, color) {
        var g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      // 清晰可见的彩色软斑，给液态扭曲提供形体
      blob(w * 0.72, h * 0.28, w * 0.34, "rgba(140,200,240,0.80)");  // 天蓝
      blob(w * 0.18, h * 0.72, w * 0.30, "rgba(140,222,198,0.72)");  // 薄荷
      blob(w * 0.56, h * 0.86, w * 0.30, "rgba(255,198,168,0.62)");  // 蜜桃
      blob(w * 0.30, h * 0.16, w * 0.22, "rgba(180,212,246,0.66)");  // 浅蓝
      return off.toDataURL("image/png");
    }

    var url = makeImage();
    import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js")
      .then(function (mod) {
        var LiquidBackground = mod.default;
        var app = LiquidBackground(canvas);
        app.loadImage(url);
        app.liquidPlane.material.metalness = 0.3;
        app.liquidPlane.material.roughness = 0.5;
        app.liquidPlane.uniforms.displacementScale.value = 1.4; // 清晰的液态扭曲
        app.setRain(true);                           // 开启动态涟漪，液态效果可见；屏闪与液态无关(已定位为视频循环接缝)
        window.__liquidApp = app;
      })
      .catch(function (e) { console.warn("液态背景加载失败(需联网):", e); });
  }

  /* ---------- 滚动揭示 ---------- */
  function mountReveal() {
    var els = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 奇妙世界: Hover 切换人物表情 + 3D tilt ---------- */
  function mountUniverse() {
    var cards = document.querySelectorAll(".card-float");
    var charPh = document.querySelector(".universe__char .ph__label");
    var expressions = {
      "AI Wiki": "思考中 · 推敲知识边界",
      "OfferFlow": "写代码 · 搭求职 Agent",
      "海星 App": "刷手机 · 打磨体验",
      "GymBuddy": "动起来 · 自律打卡"
    };
    var def = charPh ? charPh.textContent : "默认 · 微笑抱臂";

    // 持续轻微浮动动画
    if (!reduce) {
      var time = 0;
      function floatLoop() {
        time += 0.02;
        cards.forEach(function (c, i) {
          if (c.matches(":hover")) return;
          var offset = Math.sin(time + i * 1.2) * 5;
          var baseTransform = c.style.transform || "";
          // 保留原有 rotate，仅增加 translateY
          var rotate = "";
          var m = baseTransform.match(/rotate\([^)]+\)/);
          if (m) rotate = m[0];
          c.style.transform = "translateY(" + offset + "px) " + rotate;
        });
        requestAnimationFrame(floatLoop);
      }
      floatLoop();
    }

    cards.forEach(function (c) {
      // Hover 切换表情
      c.addEventListener("mouseenter", function () {
        var name = c.getAttribute("data-name");
        if (charPh && expressions[name]) charPh.textContent = expressions[name];
      });
      c.addEventListener("mouseleave", function () {
        if (charPh) charPh.textContent = def;
      });

      // 3D tilt 效果
      if (reduce) return;
      c.addEventListener("mousemove", function (e) {
        var rect = c.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rx = (y - cy) / cy * -8;
        var ry = (x - cx) / cx * 8;
        c.style.transform = "perspective(600px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) scale(1.04) translateY(-8px)";
        c.style.zIndex = "10";
      });
      c.addEventListener("mouseleave", function () {
        c.style.transform = "";
        c.style.zIndex = "";
      });
    });
  }

  /* ---------- 导航高亮 + 平滑滚动 ---------- */
  function mountNav() {
    var links = document.querySelectorAll('.nav__links a[href^="#"]');
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("is-active"); });
            var a = map[en.target.id];
            if (a) a.classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) io.observe(sec);
      });
    }
  }

  /* ---------- 联系区复制 ---------- */
  function mountCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var txt = el.getAttribute("data-copy");
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () {
          var old = el.textContent;
          el.textContent = "已复制";
          setTimeout(function () { el.textContent = old; }, 1200);
        });
      });
    });
  }

  /* ---------- 人物图/视频加载状态清理 ---------- */
  function mountVideo() {
    var v = document.querySelector(".hero__video");
    if (!v) return;
    var done = function () { v.setAttribute("data-loading", "0"); };
    if (v.tagName === "IMG") {
      if (v.complete) { done(); } else { v.addEventListener("load", done); }
      v.addEventListener("error", done);
    } else {
      v.addEventListener("loadeddata", done);
      v.addEventListener("canplay", done);
      v.addEventListener("error", done);
    }
    setTimeout(done, 2500);
  }

  function init() {
    mountLiquid();
    mountReveal();
    mountUniverse();
    mountNav();
    mountCopy();
    mountVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
