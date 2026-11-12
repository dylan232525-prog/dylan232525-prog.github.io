(() => {
  const S = window.SITE;
  S.projects = S.projects.filter(p => !p.hidden);   // hidden: true 的项目暂不显示
  const page = document.body.dataset.page;
  const $ = (q, el = document) => el.querySelector(q);
  const app = $("#app");
  const CAT = { automotive: "Automotive", sports: "Sports" };

  // ---------- helpers ----------
  const media = (p, alt = "") =>
    p && p.src
      ? `<img src="${p.src}" alt="${alt}" loading="lazy"${p.pos ? ` style="object-position:${p.pos}"` : ""} />`
      : `<div class="ph" style="aspect-ratio:${(p && p.ph) || "3/2"}"></div>`;
  const projUrl = p => `project.html?p=${encodeURIComponent(p.slug)}`;

  const observe = sel => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(sel).forEach((el, i) => { el.style.transitionDelay = `${(i % 2) * 90}ms`; io.observe(el); });
  };

  const card = p => `
    <a class="card" href="${projUrl(p)}">
      <div class="media">${media(p.cover, p.title)}</div>
      <span class="tag">${CAT[p.category]}</span>
      <div class="info"><h3>${p.title}</h3><small>${p.subtitle} · ${p.location}</small></div>
    </a>`;

  // ---------- shell: nav + footer ----------
  const links = [["index.html", "Home", "home"], ["work.html", "Work", "work"], ["about.html", "About", "about"]];
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="nav ${page === "home" ? "" : "solid"}" id="nav">
      <div class="wrap">
        <a class="brand" href="index.html">${S.name}</a>
        <button class="burger" aria-label="Menu">☰</button>
        <nav>
          ${links.map(([h, t, k]) => `<a href="${h}" class="${page === k || (k === "work" && page === "project") ? "on" : ""}">${t}</a>`).join("")}
          <a href="contact.html" class="cta ${page === "contact" ? "on" : ""}">Get in Touch</a>
        </nav>
      </div>
    </header>`);
  document.body.insertAdjacentHTML("beforeend", `
    <footer><div class="wrap">
      <span>© ${new Date().getFullYear()} ${S.name} — ${S.role}, ${S.location}</span>
      <span><a href="mailto:${S.email}">${S.email}</a>${S.instagram ? ` · <a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}</span>
    </div></footer>`);
  const nav = $("#nav");
  $(".burger").onclick = () => nav.classList.toggle("menu");
  if (page === "home") {
    const f = () => nav.classList.toggle("solid", scrollY > 60);
    addEventListener("scroll", f, { passive: true }); f();
  }

  // ---------- pages ----------
  const ctaBand = `
    <section class="band reveal${S.ctaImage ? " photo" : ""}">${S.ctaImage ? `<img class="band-bg" src="${S.ctaImage}" alt="" loading="lazy" />` : ""}<div class="wrap">
      <span class="eyebrow">Get in touch</span>
      <h2>Got a car worth shooting?</h2>
      <p>Tell me what you have in mind — I'll get back to you within 24 hours.</p>
      <a class="btn solid" href="contact.html">Get in Touch →</a>
    </div></section>`;

  const quotes = () => `
    <section><div class="wrap">
      <div class="head"><h2>Kind words</h2></div>
      <div class="quotes">${S.testimonials.map(t => `
        <div class="quote reveal"><p>${t.quote}</p><b>${t.who}</b><span>${t.what}</span></div>`).join("")}</div>
    </div></section>`;

  const steps = () => `
    <div class="steps">${S.process.map(s => `<div class="step reveal"><h3>${s.step}</h3><p>${s.text}</p></div>`).join("")}</div>`;

  // 首页项目聚焦
  const spotlight = () => {
    const sp = S.spotlight, p = sp && S.projects.find(x => x.slug === sp.project);
    if (!p) return "";
    return `
        <section style="padding-top:0"><div class="wrap">
          <div class="spot">
            <a class="spot-main reveal" href="${projUrl(p)}"><img src="${sp.main}" alt="${p.title}" loading="lazy" /></a>
            <div class="spot-side reveal">
              <span class="eyebrow">Spotlight</span>
              <h2>${p.title}</h2>
              <p>${sp.story}</p>
              <small>${p.subtitle} · ${p.location}</small>
              <div class="spot-thumbs">${(sp.thumbs || []).map(t => `<a href="${projUrl(p)}"><img src="${t}" alt="" loading="lazy" /></a>`).join("")}</div>
              <a class="link-arrow" href="${projUrl(p)}">View project →</a>
            </div>
          </div>
        </div></section>`;
  };

  const pages = {
    home() {
      document.title = `${S.name} — ${S.role} | ${S.location}`;
      const featured = (c, n) => S.projects.filter(p => p.category === c).slice(0, n).map(card).join("");
      // 开场动画:从站外进来(或刷新)时播放;站内点回首页不播。网址加 ?intro 可强制播放
      const internal = document.referrer && new URL(document.referrer).origin === location.origin;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && (!internal || location.search.includes("intro"))) document.documentElement.classList.add("intro");
      let li = 0;
      const letters = S.name.split(" ").map(w => `<span class="word">${[...w].map(ch => `<span class="ch"><i style="--i:${li++}">${ch}</i></span>`).join("")}</span>`).join(" ");
      app.innerHTML = `
        <section class="hero" style="padding:0">
          <div class="media">${S.heroImage ? `<img src="${S.heroImage}" alt="" />` : `<div class="ph"></div>`}</div>
          <div class="veil"></div>
          <div class="scroll-cue" aria-hidden="true"><span><em>Scroll</em><b></b></span></div>
          <div class="wrap">
            <div>
              <span class="eyebrow">${S.role} · ${S.location}</span>
              <h1 aria-label="${S.name}">${letters}</h1>
              <p class="line">${S.heroLine}</p>
            </div>
            <div class="actions"><a class="btn" href="work.html">View Work</a><a class="btn solid" href="contact.html">Get in Touch</a></div>
          </div>
        </section>

        <section><div class="wrap">
          <div class="head"><div><span class="eyebrow">Selected</span><h2>Recent Work</h2></div><a class="link-arrow" href="work.html">All work →</a></div>
          <div class="cards feature">${S.projects.filter(p => p.category === "automotive").slice(0, 5).map(card).join("")}</div>
        </div></section>

        ${spotlight()}

        <section style="padding-top:0"><div class="wrap">
          <div class="head"><div><span class="eyebrow">Services</span><h2>What I shoot</h2></div></div>
          <div class="svc-grid">${S.services.map((s, i) => `
            <div class="svc reveal">
              ${s.img ? `<img src="${s.img}" alt="" loading="lazy" />` : ""}
              <div class="svc-text"><span class="n">0${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></div>
            </div>`).join("")}</div>
        </div></section>

        <section style="padding-top:0"><div class="wrap">
          <div class="head"><div><span class="eyebrow">Process</span><h2>How it works</h2></div></div>
          ${steps()}
        </div></section>

        ${ctaBand}`;   // Kind words 暂时不显示,有真实评价后加回 ${quotes()}
    },

    work() {
      document.title = `Work — ${S.name}`;
      const cats = Object.keys(CAT).filter(c => S.projects.some(p => p.category === c));   // 只显示有作品的分类
      app.innerHTML = `
        <div class="wrap page-top"><span class="eyebrow">Portfolio</span><h1>Work</h1></div>
        <section style="padding-top:20px"><div class="wrap">
          <div class="head" style="margin-bottom:30px">
            ${cats.length > 1 ? `<div class="filters">
              <button data-f="all">All</button>${cats.map(c => `<button data-f="${c}">${CAT[c]}</button>`).join("")}
            </div>` : "<div></div>"}
            <span class="muted" id="count"></span>
          </div>
          <div class="cards" id="cards"></div>
        </div></section>
        ${ctaBand}`;
      const render = f => {
        const list = S.projects.filter(p => f === "all" || p.category === f);
        $("#cards").innerHTML = list.map(card).join("");
        $("#count").textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
        document.querySelectorAll(".filters button").forEach(b => b.classList.toggle("on", b.dataset.f === f));
        observe(".card");
      };
      if ($(".filters")) $(".filters").onclick = e => { const b = e.target.closest("button"); if (b) { history.replaceState(null, "", b.dataset.f === "all" ? "work.html" : "#" + b.dataset.f); render(b.dataset.f); } };
      render(cats.includes(location.hash.slice(1)) ? location.hash.slice(1) : "all");
    },

    project() {
      const slug = new URLSearchParams(location.search).get("p");
      const i = Math.max(0, S.projects.findIndex(p => p.slug === slug));
      const p = S.projects[i];
      const prev = S.projects[(i - 1 + S.projects.length) % S.projects.length];
      const next = S.projects[(i + 1) % S.projects.length];
      document.title = `${p.title} — ${S.name}`;
      const isWide = ph => ph.ph ? ph.ph === "3/2" || ph.ph === "16/9" : ph.wide;
      // portraits sit in pairs; a portrait without a partner is centered on its own row
      const layout = []; let open = -1;
      p.photos.forEach((ph, k) => {
        if (isWide(ph)) { if (open >= 0) { layout[open] = "solo"; open = -1; } layout[k] = "wide"; }
        else if (open >= 0) { layout[k] = ""; open = -1; } else { layout[k] = ""; open = k; }
      });
      if (open >= 0) layout[open] = "solo";
      app.innerHTML = `
        <div class="proj-hero"><div class="media">${media(p.hero || p.cover, p.title)}</div></div>
        <div class="wrap">
          <div class="proj-meta">
            <div><span class="eyebrow">${CAT[p.category]}</span><h1>${p.title}</h1></div>
            <div><p>${p.summary}</p>
              <div class="facts">
                <div><small>Client</small>${p.subtitle}</div>
                <div><small>Location</small>${p.location}</div>
                <div><small>Year</small>${p.year}</div>
              </div>
            </div>
          </div>
          <div class="gallery">${p.photos.map((ph, k) => `
            <div class="g ${layout[k]}" data-k="${k}" ${ph.ph ? `style="aspect-ratio:${ph.ph}"` : ""}>${media(ph, `${p.title} ${k + 1}`)}</div>`).join("")}
          </div>
          <div class="proj-nav">
            <a href="${projUrl(prev)}"><small>← Previous</small><span>${prev.title}</span></a>
            <a href="${projUrl(next)}"><small>Next →</small><span>${next.title}</span></a>
          </div>
        </div>
        <div style="height:60px"></div>
        ${ctaBand}`;
      observe(".g");
      lightbox(p.photos);
    },

    about() {
      document.title = `About — ${S.name}`;
      app.innerHTML = `
        <div class="wrap page-top"><span class="eyebrow">About</span><h1>${S.name}</h1></div>
        <section style="padding-top:30px"><div class="wrap about-grid">
          <div class="media reveal">${S.aboutPhoto ? `<img src="${S.aboutPhoto}" alt="${S.name}" />` : `<div class="ph" style="height:100%"></div>`}</div>
          <div class="reveal">
            <p>${S.intro}</p>
            <div class="services" style="grid-template-columns:1fr">${S.services.map((s, i) => `
              <div class="service" style="border-right:0;border-bottom:1px solid var(--line);padding:22px 0"><span class="n">0${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></div>`).join("")}</div>
          </div>
        </div></section>
        <section style="padding-top:0"><div class="wrap">
          <div class="head"><div><span class="eyebrow">How it works</span><h2>From idea to delivery</h2></div></div>
          ${steps()}
        </div></section>
        ${ctaBand}`;   // Kind words 暂时不显示,有真实评价后加回 ${quotes()}
    },

    contact() {
      document.title = `Contact — ${S.name}`;
      app.innerHTML = `
        <div class="wrap page-top"><span class="eyebrow">Get in touch</span><h1>Let's talk</h1>
          <p>Got a car, a project or a collab in mind? Drop me a message and I'll get back to you within 24 hours.</p></div>
        <section style="padding-top:30px"><div class="wrap contact-grid">
          <form class="form" id="form">
            <div class="row">
              <label>Name<input name="name" required /></label>
              <label>Email<input name="email" type="email" required /></label>
            </div>
            <div class="row">
              <label>Shoot type
                <select name="type" required>
                  <option value="">Select…</option>
                  <option>Private car shoot</option>
                  <option>Dealership / brand</option>
                  <option>Rolling shots</option>
                  <option>Turo / rental listing</option>
                  <option>Other</option>
                </select>
              </label>
              <label>Phone (optional)<input name="phone" type="tel" /></label>
            </div>
            <div class="row">
              <label>Car<input name="subject" placeholder="e.g. 2024 911 GT3" /></label>
              <label>Preferred date<input name="date" type="date" /></label>
            </div>
            <label>Tell me more<textarea name="message" rows="5" required placeholder="Location ideas, how you'll use the photos, anything else…"></textarea></label>
            <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />
            <button class="btn solid" type="submit">Send Message →</button>
            <p class="form-note" id="note"></p>
          </form>

          <div class="side">
            ${S.calendlyUrl ? `<div class="box">
              <h3>Prefer to talk first?</h3>
              <p>Grab a quick 15-minute call to go over your idea.</p>
              <div id="cal"><div class="calendly-inline-widget" data-url="${S.calendlyUrl}?hide_gdpr_banner=1&background_color=121214&text_color=f3f1ec&primary_color=e3a548"></div></div>
            </div>` : ""}
            <div class="box direct">
              <h3>Direct</h3>
              <a href="mailto:${S.email}">${S.email}</a>
              ${S.instagram ? `<a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">@${S.instagram}</a>` : ""}
              <a>${S.location}</a>
            </div>
          </div>
        </div></section>`;

      if (S.calendlyUrl) {
        const s = document.createElement("script");
        s.src = "https://assets.calendly.com/assets/external/widget.js"; s.async = true;
        document.body.appendChild(s);
      }

      const form = $("#form"), note = $("#note");
      form.addEventListener("submit", async e => {
        e.preventDefault();
        const data = new FormData(form);
        if (data.get("_gotcha")) return;
        const btn = form.querySelector("button[type=submit]");
        const fields = {
          Name: data.get("name"), Email: data.get("email"), "Shoot type": data.get("type"),
          Phone: data.get("phone") || "-", Car: data.get("subject") || "-",
          "Preferred date": data.get("date") || "-", Message: data.get("message"),
        };
        const subject = `New shoot inquiry — ${data.get("type")} — ${data.get("name")}`;
        // Send straight from the page — the client never has to open an email app
        const endpoint = S.formspreeId ? `https://formspree.io/f/${S.formspreeId}` : `https://formsubmit.co/ajax/${S.email}`;
        const payload = S.formspreeId
          ? { ...fields, _subject: subject, _replyto: data.get("email") }
          : { ...fields, _subject: subject, _replyto: data.get("email"), _template: "table", _captcha: "false" };
        note.className = "form-note"; note.textContent = "Sending…"; btn.disabled = true;
        try {
          const r = await fetch(endpoint, { signal: AbortSignal.timeout(12000), method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
          const j = await r.json().catch(() => ({}));
          if (!r.ok || j.success === "false" || j.success === false) throw 0;
          form.reset(); note.className = "form-note ok"; note.textContent = "Thanks! Your message is in — I'll reply within 24 hours.";
        } catch {
          note.className = "form-note err";
          note.innerHTML = `Something went wrong. Please email me directly at <a href="mailto:${S.email}" style="text-decoration:underline">${S.email}</a>.`;
        } finally { btn.disabled = false; }
      });
    },
  };

  // ---------- lightbox ----------
  function lightbox(photos) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="lightbox" id="lb" aria-hidden="true">
        <button class="lb-close" aria-label="Close">×</button>
        <button class="lb-prev" aria-label="Previous">‹</button>
        <div class="stage" id="stage"></div>
        <button class="lb-next" aria-label="Next">›</button>
        <div class="count" id="lbCount"></div>
      </div>`);
    const lb = $("#lb"); let idx = 0;
    const show = i => { idx = (i + photos.length) % photos.length; $("#stage").innerHTML = media(photos[idx]); $("#lbCount").textContent = `${idx + 1} / ${photos.length}`; };
    const open = i => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    document.querySelectorAll(".g").forEach(g => g.onclick = () => open(+g.dataset.k));
    $(".lb-close").onclick = close; $(".lb-prev").onclick = () => show(idx - 1); $(".lb-next").onclick = () => show(idx + 1);
    lb.onclick = e => { if (e.target === lb || e.target.id === "stage") close(); };
    addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close(); if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1);
    });
    let sx = 0;
    lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1)); });
  }

  pages[page]();

  // 首页大图视差:背景比文字滑得慢,名字和按钮随滚动淡出
  const hero = $(".hero");
  if (hero && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const m = $(".media", hero), w = $(".wrap", hero), cue = $(".scroll-cue", hero);
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = scrollY, h = hero.offsetHeight;
      if (y > h) return;
      m.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      w.style.opacity = Math.max(0, 1 - y / (h * 0.5));
      w.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      if (cue) cue.style.opacity = Math.max(0, 1 - y / 120);
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  observe(".card");
  observe(".reveal");
})();
