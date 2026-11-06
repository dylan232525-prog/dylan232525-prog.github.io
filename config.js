// ============================================================
//  网站所有内容都在这个文件里。改这里 = 改网站。
// ============================================================

window.SITE = {
  name: "Dylan Li",                       // ← 你的英文名
  role: "Automotive & Sports Photographer",
  location: "Los Angeles, CA",
  email: "dylan232525@gmail.com",           // ← 接收询价的邮箱
  instagram: "dylanontherunn",                 // ← 不带 @

  formspreeId: "",   // 留空 = 表单通过 FormSubmit 直接发到上面的 email;填 Formspree ID 则改用 Formspree
  calendlyUrl: "",   // ← Calendly 链接(例如 "https://calendly.com/yourname/15min")。留空显示占位

  heroImage: "images/hero.jpg",     // ← 首页大图,例如 "images/hero.jpg"。留空显示占位
  heroLine: "Cars in motion. Games in the moment.",

  intro:
    "I'm a Los Angeles–based photographer focused on cars and sports. " +
    "I work with private owners who want their car shot the way they see it, " +
    "with dealerships and brands that need images that sell, " +
    "and with teams and athletes who need the decisive moment — delivered fast.",

  aboutPhoto: "",    // ← 你本人的照片,例如 "images/me.jpg"

  services: [
    { title: "Private Owners", text: "Rolling shots, detail sets and location shoots for your car — from daily drivers to garage queens." },
    { title: "Dealers & Brands", text: "Inventory, launch and campaign imagery for dealerships, tuners and automotive brands." },
    { title: "Sports", text: "Game coverage, athlete portraits and action for teams, leagues and sponsors." },
  ],

  process: [
    { step: "Inquiry", text: "Tell me about your car, team or project — dates, location and what the images are for." },
    { step: "Plan", text: "We hop on a quick call, lock in the concept, locations and timing, and I send a quote." },
    { step: "Shoot", text: "Golden hour, studio, track or arena — I handle the logistics so you can enjoy the day." },
    { step: "Deliver", text: "Edited, high-resolution images in a private online gallery, typically within 5–7 days." },
  ],

  testimonials: [
    { quote: "Placeholder — paste a real client quote here. Short and specific works best.", who: "Client Name", what: "Porsche 911 owner" },
    { quote: "Placeholder — e.g. what it was like to work with you and how the photos were used.", who: "Client Name", what: "Dealership, Los Angeles" },
    { quote: "Placeholder — a team manager, athlete or brand contact.", who: "Client Name", what: "Team / League" },
  ],

  // ---------------- 作品项目 ----------------
  // category: "automotive" 或 "sports"
  // cover: 封面图; photos: 项目里的照片
  // 真实照片写法:横图 { src: "images/xxx.jpg", wide: true },竖图 { src: "images/xxx.jpg" }
  // 照片还没放进来时,写 { ph: "3/2" }(横)或 { ph: "4/5" }(竖)会显示占位框
  projects: [
    {
      slug: "corvette-c8-alameda", category: "automotive",
      title: "Corvette C8", subtitle: "Private owner · Turo host", location: "San Francisco, CA", year: 2026,
      summary: "A blacked-out C8 at golden hour on the old naval air station, with the USS Hornet as the backdrop.",
      cover: { src: "images/c8-02.jpg", wide: true },
      photos: [
        { src: "images/c8-04.jpg", wide: true },
        { src: "images/c8-03.jpg", wide: true },
        { src: "images/c8-01.jpg", wide: true },
        { src: "images/c8-02.jpg", wide: true },
        { src: "images/c8-05.jpg", wide: true },
        { src: "images/c8-06.jpg", wide: true },
      ],
    },
    {
      slug: "mercedes-cle-amg-sf", category: "automotive",
      title: "Mercedes CLE AMG", subtitle: "Private owner · Turo host", location: "San Francisco, CA", year: 2026,
      summary: "Top up, top down and into dusk — a CLE cabriolet on the waterfront under the Bay Bridge.",
      cover: { src: "images/cle-02.jpg", wide: true },
      photos: [
        { src: "images/cle-03.jpg", wide: true },
        { src: "images/cle-01.jpg", wide: true },
        { src: "images/cle-04.jpg", wide: true },
        { src: "images/cle-05.jpg", wide: true },
        { src: "images/cle-06.jpg", wide: true },
      ],
    },
    {
      slug: "temple-city-hoco-2025", category: "sports",
      title: "Homecoming Night", subtitle: "Athlete & family · Football", location: "Temple City High School", year: 2025,
      summary: "Temple City vs. South Pasadena under the lights — the 2025 homecoming game, shot for a player and his family.",
      cover: { src: "images/hoco25-02.jpg", pos: "50% 62%" },
      hero: { src: "images/hoco25-02.jpg", pos: "50% 52%" },
      photos: [
        { src: "images/hoco25-01.jpg" },
        { src: "images/hoco25-02.jpg" },
        { src: "images/hoco25-03.jpg" },
        { src: "images/hoco25-04.jpg" },
        { src: "images/hoco25-05.jpg" },
        { src: "images/hoco25-06.jpg" },
      ],
    },
    {
      slug: "toyota-gr-rolling", category: "automotive",
      title: "Toyota GR", subtitle: "Private owners · Rolling shots", location: "Los Angeles, CA", year: 2026,
      summary: "A GR Supra and a GR86, car-to-car at blue hour — across the 6th Street Viaduct and out on the freeway.",
      cover: { src: "images/gr86-01.jpg", pos: "50% 57%" },   // pos = 竖图裁切时对准车身的位置
      photos: [
        { src: "images/supra-01.jpg" },
        { src: "images/supra-02.jpg" },
        { src: "images/gr86-01.jpg" },
        { src: "images/gr86-02.jpg" },
      ],
    },
    {
      slug: "soccer-athlete", category: "sports",
      title: "On the Pitch", subtitle: "Athlete portraits", location: "Carson, CA", year: 2025,
      summary: "Action and portrait set for a club athlete.",
      cover: { ph: "3/2" },
      photos: [{ ph: "4/5" }, { ph: "4/5" }, { ph: "3/2" }, { ph: "3/2" }],
    },
    {
      slug: "bmw-740i-dtla", category: "automotive",
      title: "BMW 740i", subtitle: "Private owner · Turo host", location: "DTLA", year: 2026,
      summary: "Golden hour against the downtown skyline, then after dark in the garage — a full listing and social set for a Turo host's 740i.",
      cover: { src: "images/bmw740i-01.jpg", wide: true },
      photos: [
        { src: "images/bmw740i-02.jpg", wide: true },
        { src: "images/bmw740i-03.jpg", wide: true },
        { src: "images/bmw740i-01.jpg", wide: true },
        { src: "images/bmw740i-07.jpg" },
        { src: "images/bmw740i-05.jpg", wide: true },
        { src: "images/bmw740i-06.jpg", wide: true },
        { src: "images/bmw740i-04.jpg", wide: true },
      ],
    },
  ],
};
