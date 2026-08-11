document.documentElement.classList.add("js");
/* 刷新 / 重开页面时始终从第一屏开始：不恢复滚动位置，也不跳到地址栏里的锚点 */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) {
  try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
}
window.scrollTo(0, 0);
window.addEventListener("load", () => window.scrollTo(0, 0));
/* ============================================================
   周雨悦 · YUYUE ZHOU — Portfolio
   作品数据 + 交互逻辑
   ============================================================ */

/* ------------------------------------------------------------
   ★ 视频外链配置（给视频作品添加「在线观看」链接）
   把视频上传到 B 站 / 视频号 / 网盘后，把链接填到下面即可。
   留空（""）时，弹窗会显示「联系我获取完整视频」。
   ------------------------------------------------------------ */
const VIDEO_LINKS = {
  gongyi: "https://b23.tv/qSVVKEf",  // 《看不见的伙伴》AI 公益广告（B站）
  grading: "https://b23.tv/RdkVtl2", // 调色划像对比-婚礼（B站）
  mcd: "https://b23.tv/JlGxBq2",     // 麦当劳「百人派对」活动视频（B站）
  wahaha: "https://b23.tv/6H7W8jh",  // 娃哈哈 广告视频（B站）
  ae: "https://b23.tv/4tjR2TU",     // AE 特效合集（B站）
  trailer: "https://b23.tv/lLo4Ok1", // 预告片剪辑（B站）
};

/* ------------------------------------------------------------
   设备能力检测（自定义光标 / 3D 卡片 / 鼠标光效只在鼠标设备开启）
   ------------------------------------------------------------ */
const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------
   作品数据
   ------------------------------------------------------------ */
const works = [
  {
    id: "xiuhu",
    cat: "ai",
    catLabel: "AI 创作",
    theme: "c",
    art: "RUST LAKE",
    title: "《锈湖血灾》AI 二创视频（《锈湖》系列同人）",
    short: "锈湖血灾",
    role: "独立创作 · 粉丝二创",
    badge: "100+ 点赞",
    year: "2026",
    summary:
      "出于对《锈湖》系列游戏的热爱制作的粉丝二创视频：使用 Midjourney、可灵、即梦生成画面素材，录制并截取游戏内音频，用 PR、剪映对游戏内容进行卡点二创剪辑，发布到个人抖音号并获得 100+ 点赞。",
    bullets: [
      "粉丝二创：以《锈湖》系列游戏为灵感制作的卡点混剪",
      "AI 素材：Midjourney · 可灵 · 即梦",
      "音频：录制截取游戏内原声",
      "后期：PR + 剪映卡点剪辑",
      "发布个人抖音号，获 100+ 点赞",
      "▶ 前往抖音观看完整视频",
    ],
    media: { type: "link", href: "https://v.douyin.com/gLipPWBzaSw/", label: "▶ 前往抖音观看完整视频", hint: "恐怖国王饼 · 抖音《锈湖血灾》" },
  },
  {
    id: "gongyi",
    cat: "ai",
    catLabel: "AI 创作",
    theme: "b",
    art: "INVISIBLE",
    title: "《看不见的伙伴》AI 公益广告",
    short: "看不见的伙伴",
    role: "AI 全流程创作",
    badge: "AI 全流程独立完成",
    year: "2025",
    summary:
      "以「盲道」为第一视角的 AI 公益广告：盲道精灵「泡泡」一直守护着视障朋友小林，直到共享单车占满盲道的那一天——她拼尽全力，用最后的能量保护了小林。短片呼吁「别让盲道失去守护」。全片由 AI 工具独立完成，B 站已上线。",
    bullets: [
      "创意：以盲道精灵的视角讲述「共享单车占道」议题，温情结尾引发共鸣",
      "AI 制作：即梦视频生成 3.0（首尾帧 / 主体功能）+ Midjourney 风格化画面",
      "画面参考：Jon Klassen 绘本风格（--niji 5）",
      "音频：AI 生成独白配音与环境音",
      "后期：剪映完成剪辑拼贴",
      "▶ B 站已上线，可在线观看",
    ],
    notes: [
      { q: "灵感从哪来？", a: "当时我对 AI 生成视频有浓厚兴趣，又是广告学学生，希望能做一支有思考、对社会有帮助的作品，于是想到了盲人出行这个选题——想让更多人看见「盲道被占」这件事。" },
    ],
    media: { type: "link", id: "gongyi", label: "▶ 前往 B 站观看完整视频", hint: "《看不见的伙伴》AI 公益广告" },
  },
  {
    id: "freego",
    cat: "plan",
    catLabel: "品牌策划",
    theme: "a",
    art: "FREEGO",
    title: "Freego 品牌策划全案（含提案 PPT《米米的 360°「大揭秘」》）",
    short: "Freego 全案",
    role: "全案策划 · 独立负责市场 / 产品 / 脚本",
    badge: "团队第五名",
    year: "2025–2026",
    summary:
      "针对 Freego 爆品打造需求，完成新品概念设计与完整品牌策划全案，涵盖行业调研、竞品分析、品牌策略与整合营销传播，团队荣获品牌奇妙夜大赛第五名。最终以《米米的 360°「大揭秘」》提案 PPT 完成大赛上台汇报。",
    bullets: [
      "独立负责市场分析、用户调研、新品概念设计与视频广告脚本",
      "构建从新产品设计到传播的完整闭环方案",
      "《米米的 360°「大揭秘」》为大赛最终提案汇报 PPT",
      "品牌奇妙夜大赛 · 团队第五名",
    ],
    media: [
      { type: "download", label: "下载完整策划方案", file: "assets/pdf/freego-plan.docx", hint: "Word 文档 · 约 15MB" },
      { type: "pdf", file: "assets/pdf/mimi-360.pdf", download: "assets/pdf/mimi-360.pdf", label: "提案 PPT《米米的 360°「大揭秘」》" },
    ],
  },
  {
    id: "zoo",
    cat: "ai",
    catLabel: "AI 创作",
    theme: "e",
    art: "ZOO",
    action: "🎮 在线试玩",
    title: "《动物园怪谈》AI 互动文字游戏",
    short: "动物园怪谈",
    role: "团队成果 · 兔耳象工作室（创客实验课）",
    badge: "小红书曝光 9000+",
    year: "2025–2026",
    summary:
      "规则怪谈题材的轻量化 AI 互动文字游戏：玩家扮演游客「沈叙」，进入表面正常、实则暗藏玄机的「诡异动物园」，在「认知污染」的影响下做出选择、探寻真相或逃离。游戏为团队「兔耳象工作室」共同成果，我在团队中负责每次汇报、多版 PPT 制作、BGM / 音效制作与整合、焦点小组访谈提纲、用户实地观察分析、用户测试全程组织，以及抖音 / 小红书网络宣发与微信测试群私域运营。",
    bullets: [
      "规则怪谈题材 · 轻量化文字互动网页游戏（Sugarcube2 + AIGC 内容生成）",
      "多结局剧情，文字风格随「认知污染」程度动态变化",
      "团队成果：兔耳象工作室 · 创客实验课",
      "个人负责：汇报 / PPT / BGM+音效（Suno + Stable Audio）/ 用户调研 / 网络宣发",
      "🎮 在线试玩（建议电脑浏览器打开，卡顿可开加速器）",
      "📕 小红书宣传：视频帖《欢迎光临欢乐动物园》+ 图文帖《慎入！这个兔耳大象把我们整懵了》",
    ],
    notes: [
      { q: "灵感从哪来？", a: "我本身就是解谜游戏爱好者，也一直对「动物园怪谈」的故事很感兴趣。很幸运遇到了一群志同道合的小伙伴，在创客实验课上一起把这个项目做成了。" },
      { q: "有没有翻过车？怎么改的？", a: "有。初版很粗糙，展示出来连我们自己都觉得不行。我们通过请教老师建议、参考竞品、做多轮用户调研，一步步迭代产品和网站架构；很多同学、网友（尤其是最后一轮测试）真诚地给出用户体验建议，给了我们很大帮助，团队很感动。" },
    ],
    media: [
      { type: "link", href: "https://zoo-horror-game.netlify.app/", label: "🎮 在线试玩游戏", hint: "建议电脑浏览器打开 · 卡顿可开加速器" },
      { type: "link", href: "http://xhslink.cn/o/5Y7snjjPtAm", label: "📕 小红书宣传帖（视频）", hint: "兔耳象工作室《动物园怪谈》" },
      { type: "link", href: "http://xhslink.cn/o/AcRAWwxEEDQ", label: "📕 小红书图文宣传帖", hint: "《慎入！这个兔耳大象把我们整懵了》" },
    ],
  },
  {
    id: "xhs",
    cat: "account",
    catLabel: "账号运营",
    theme: "e",
    art: "XHS",
    action: "📕 查看主页",
    title: "个人小红书账号（运营中）",
    short: "小红书账号",
    role: "内容创作 · 账号运营",
    badge: "13.7K 赞藏",
    year: "持续运营",
    summary:
      "长期运营的个人小红书账号，累计收获 13.7K 次赞与收藏，单篇笔记最高浏览量 4 万+、赞藏 7000+。以真实的内容审美与网感持续产出，验证了从选题、内容到账号运营的全链路能力。",
    bullets: [
      "累计收获 13.7K 次赞与收藏",
      "单篇笔记最高浏览 4 万+、赞藏 7000+",
      "持续内容产出与账号运营",
      "📕 前往我的小红书主页看看",
    ],
    media: { type: "link", href: "https://xhslink.cn/m/6EMojsXOShR", label: "📕 前往我的小红书主页", hint: "看看我的主页" },
  },
  {
    id: "dy-game",
    cat: "douyin",
    catLabel: "抖音创作",
    theme: "b",
    art: "GAME",
    action: "▶ 去抖音看",
    title: "抖音游戏视频《谢谢猪哥》（饥荒联机版）",
    short: "谢谢猪哥",
    role: "个人抖音号「恐怖国王饼」",
    year: "2025",
    summary:
      "在个人抖音号发布的《饥荒联机版》游戏内容视频《谢谢猪哥》，以游戏题材创作娱乐向内容，展现对年轻用户内容喜好与平台玩法的理解。",
    bullets: [
      "游戏内容创作：《饥荒联机版》",
      "个人抖音号「恐怖国王饼」发布",
      "▶ 前往抖音查看",
    ],
    media: { type: "link", href: "https://v.douyin.com/Z9IbFRpUA80/", label: "▶ 前往抖音观看", hint: "恐怖国王饼 · 抖音" },
  },
  {
    id: "dy-trend",
    cat: "douyin",
    catLabel: "抖音创作",
    theme: "c",
    art: "HOT",
    action: "▶ 去抖音看",
    title: "抖音热点爆款图文《皇后杀了皇后，AI 杀了 AI》",
    short: "AI 杀了 AI",
    role: "个人抖音号「恐怖国王饼」",
    year: "2025",
    summary:
      "紧跟热点事件创作的抖音图文爆款《皇后杀了皇后，AI 杀了 AI》：借势 AI 话题热度快速产出内容，展现选题敏感度与热点借势能力。",
    bullets: [
      "紧跟热点事件的内容借势创作",
      "图文形式快速产出爆款",
      "个人抖音号「恐怖国王饼」发布",
      "▶ 前往抖音查看",
    ],
    badge: "160万+ 播放 · 3.4万 点赞",
    notes: [
      { q: "爆款是怎么来的？", a: "内容来自我自己的亲身经历。发布时为了蹭热点，我在文案里带上了当时很火的梗——「AI 杀了 AI」「以后不能说 AI，要说滚滚长江东逝水」，最后很幸运地火了。" },
    ],
    media: { type: "link", href: "https://v.douyin.com/2h4gI70So2o/", label: "📱 前往抖音查看", hint: "恐怖国王饼 · 抖音" },
  },
  {
    id: "mcd",
    cat: "video",
    catLabel: "视频广告",
    theme: "b",
    art: "MCD",
    title: "麦当劳「百人派对」活动",
    short: "麦当劳百人派对",
    role: "活动策划 · 落地执行 · 社群运营",
    badge: "60+ 家庭到场",
    year: "2025",
    summary:
      "与团队协作完成百人派对全流程策划与线下执行，针对亲子家庭设计趣味互动环节，累计吸引 60+ 家庭到场，并完成私域社群沉淀，获麦当劳最佳策划方案团队奖。",
    bullets: [
      "全流程策划，精准触达亲子家庭核心受众",
      "线下落地执行与现场体验保障",
      "参与家庭导入品牌微信群，沉淀私域流量",
    ],
    media: { type: "link", id: "mcd", label: "▶ 前往 B 站观看活动视频", hint: "麦当劳「百人派对」· 本人剪辑" },
  },
  {
    id: "wahaha",
    cat: "video",
    catLabel: "视频广告",
    theme: "d",
    art: "WAHAHA",
    title: "娃哈哈 广告视频",
    short: "娃哈哈广告",
    role: "脚本 · 拍摄 · 剪辑",
    year: "2024",
    summary:
      "从 PPM 脚本到成片的广告视频作业，独立完成创意构思、脚本撰写与视频制作全流程，体现扎实的视频广告基本功。",
    bullets: ["PPM 脚本策划", "视频拍摄与执行", "后期剪辑与包装"],
    media: { type: "link", id: "wahaha", label: "▶ 前往 B 站观看广告", hint: "娃哈哈 广告视频" },
  },
  {
    id: "ae",
    cat: "video",
    catLabel: "视频广告",
    theme: "c",
    art: "AE",
    title: "AE 特效合集（动态设计作品集）",
    short: "AE 特效合集",
    role: "动态设计 · After Effects",
    year: "2024",
    summary: "使用 After Effects 完成的动态设计 / 特效作品合集，涵盖 MG 动画、文字动效、视觉合成与特效包装。B 站已上线。",
    bullets: ["MG 动画", "文字动效", "视觉合成与特效", "▶ B站已上线，可在线观看"],
    media: { type: "link", id: "ae", label: "▶ 前往 B 站观看特效合集", hint: "AE 动态设计 · 特效合集" },
  },
  {
    id: "trailer",
    cat: "video",
    catLabel: "视频广告",
    theme: "a",
    art: "TRAILER",
    title: "预告片剪辑",
    short: "预告片剪辑",
    role: "视频剪辑 · 包装",
    year: "2026",
    summary: "预告片剪辑作品：对素材进行节奏化剪辑与声音包装，营造悬念与氛围感，成片已上线 B 站。",
    bullets: [
      "节奏化剪辑与氛围营造",
      "配乐卡点与音效设计",
      "包装与字幕设计",
      "▶ B站已上线，可在线观看",
    ],
    media: { type: "link", id: "trailer", label: "▶ 前往 B 站观看预告片", hint: "预告片剪辑作品" },
  },
  {
    id: "design",
    cat: "design",
    catLabel: "平面设计",
    theme: "a",
    art: "DESIGN",
    title: "平面设计合集",
    short: "平面设计",
    role: "Photoshop · Illustrator",
    year: "2024–2026",
    summary: "海报、主视觉、品牌物料等平面设计作品合集，均由 Photoshop / Illustrator 独立完成。",
    bullets: ["海报与主视觉设计", "品牌物料与延展", "版式与字体应用"],
    media: { type: "download", label: "下载平面设计合集", file: "assets/pdf/平面设计合集.pdf", hint: "PDF · 约 14MB" },
  },
  {
    id: "pr",
    cat: "pr",
    catLabel: "公关",
    theme: "e",
    art: "PR",
    title: "小米汽车前舱门事件 公关应对分析",
    short: "小米危机公关",
    role: "危机公关案例分析",
    year: "2025",
    summary:
      "围绕小米汽车前舱门事件的公关应对分析，涵盖舆情研判、回应策略与传播节奏建议，展示危机公关的系统思考能力。",
    bullets: ["舆情发展与风险研判", "回应策略与话术建议", "传播节奏与效果评估"],
    media: { type: "pdf", file: "assets/pdf/mi-pr-analysis.pdf", download: "assets/pdf/mi-pr-analysis.pdf" },
  },
  {
    id: "grading",
    cat: "grading",
    catLabel: "调色",
    theme: "d",
    art: "COLOR",
    title: "调色划像对比 · 婚礼",
    short: "调色划像对比",
    role: "DaVinci Resolve",
    year: "2025–2026",
    summary:
      "完整调色作品为婚礼视频，使用 DaVinci Resolve 完成电影感调色，并以「划像对比」的方式直观呈现前后差异。建议先观看完整视频（B 站已上线），下方为调色前后对比预览图。",
    bullets: [
      "完整作品：婚礼视频调色（DaVinci Resolve）",
      "以「划像对比」直观呈现调色前后差异",
      "▶ 建议先观看完整视频，再看下方预览图",
      "肤色与环境色校正 · 电影感色调塑造",
    ],
    coverImg: "assets/img/color-grading.webp",
    media: [
      { type: "link", id: "grading", label: "▶ 前往 B 站观看完整视频", hint: "《调色划像对比-婚礼》· 建议先看完整视频，再看下方预览" },
      { type: "image", src: "assets/img/color-grading.webp", caption: "调色前后对比 · 预览图" },
    ],
  },
];

/* ------------------------------------------------------------
   渲染作品卡片
   ------------------------------------------------------------ */
const grid = document.getElementById("workGrid");
const SPAN_PATTERN = [7, 5, 6];

function coverHTML(w, index) {
  const art = w.art ? `<div class="cover-art" aria-hidden="true">${w.art}</div>` : "";
  const actionLabel =
    w.action ||
    (mediaList(w.media).some((m) => m.type === "video" || (m.type === "link" && (VIDEO_LINKS[m.id] || m.href)))
      ? "▶ 观看作品"
      : "查看详情 →");

  if (w.coverImg) {
    return `
      <div class="cover cover--img">
        <img src="${w.coverImg}" alt="${w.title}封面" loading="lazy">
        <div class="cover-img-shade"></div>
        <span class="cover-index">${String(index + 1).padStart(2, "0")}</span>
        ${w.badge ? `<span class="cover-badge">${w.badge}</span>` : ""}
        <span class="cover-cat">${w.catLabel}</span>
        <h3 class="cover-title">${w.short}</h3>
        <p class="cover-sub">${w.year}</p>
        <span class="cover-action">${actionLabel}</span>
      </div>`;
  }

  return `
    <div class="cover" data-theme="${w.theme}">
      ${art}
      <span class="cover-index">${String(index + 1).padStart(2, "0")}</span>
      ${w.badge ? `<span class="cover-badge">${w.badge}</span>` : ""}
      <span class="cover-cat">${w.catLabel}</span>
      <h3 class="cover-title">${w.short}</h3>
      <p class="cover-sub">${w.year} · ${w.role.split("·")[0].trim()}</p>
      <span class="cover-action">${actionLabel}</span>
    </div>`;
}

function cardHTML(w, index) {
  return `
    <article class="work-card" data-id="${w.id}" data-cat="${w.cat}" role="listitem">
      <button class="work-card-btn" data-open="${w.id}" aria-label="查看作品：${w.title}">
        ${coverHTML(w, index)}
      </button>
      <div class="card-meta">
        <span class="card-cat">${w.catLabel}</span>
        <span class="card-year">${w.year}</span>
      </div>
      <h3 class="card-title">${w.title}</h3>
      <p class="card-role">${w.role}</p>
    </article>`;
}

function renderGrid(filter) {
  const list = filter === "all" ? works : works.filter((w) => w.cat === filter);
  grid.innerHTML = list.map((w, i) => cardHTML(w, i)).join("");

  const cards = grid.querySelectorAll(".work-card");
  cards.forEach((el, i) => {
    el.style.setProperty("--span", SPAN_PATTERN[i % SPAN_PATTERN.length]);
  });

  cards.forEach((el) => {
    el.querySelector("[data-open]").addEventListener("click", () => openWork(el.dataset.id));
  });

  if (FINE_POINTER && !REDUCED_MOTION) {
    cards.forEach((el) => {
      const cover = el.querySelector(".cover");
      if (!cover) return;
      el.addEventListener("mousemove", (e) => {
        const r = cover.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cover.classList.add("is-tilting");
        cover.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener("mouseleave", () => {
        cover.classList.remove("is-tilting");
        cover.style.transform = "";
      });
    });
  }
}

/* ------------------------------------------------------------
   分类筛选
   ------------------------------------------------------------ */
const filters = document.getElementById("filters");
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  filters.querySelectorAll(".filter").forEach((f) => {
    f.classList.toggle("is-active", f === btn);
    f.setAttribute("aria-selected", f === btn ? "true" : "false");
  });
  renderGrid(btn.dataset.filter);
  requestAnimationFrame(() => {
    grid.querySelectorAll(".work-card").forEach((el) => {
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = "";
    });
  });
});

/* ------------------------------------------------------------
   作品弹窗
   ------------------------------------------------------------ */
const modal = document.getElementById("workModal");
const modalMedia = document.getElementById("modalMedia");

const mediaList = (m) => (Array.isArray(m) ? m : [m]);

function mediaItemHTML(w, m) {
  if (m.type === "video") {
    return `
      <video controls playsinline preload="metadata" src="${m.src}">
        你的浏览器不支持在线播放，<a href="${m.download}" download>点此下载视频</a>。
      </video>`;
  }
  if (m.type === "image") {
    return `<figure><img src="${m.src}" alt="${w.title}"><figcaption>${m.caption || ""}</figcaption></figure>`;
  }
  if (m.type === "pdf") {
    return `<iframe src="${m.file}" title="${w.title}"></iframe>`;
  }
  if (m.type === "download") {
    return `<a class="modal-media-link" href="${m.file}" download>
      <span class="mml-label">📄 ${m.label || "下载文件"}</span>
      <span class="mml-hint">${m.hint || "点击即可下载"}</span>
      <span class="mml-go">下载 ↓</span>
    </a>`;
  }
  if (m.type === "link") {
    const href = m.href || VIDEO_LINKS[m.id];
    if (!href) {
      return `<div class="modal-media-empty">🎬 完整视频整理上传中…<br><span>欢迎联系我获取完整版本</span></div>`;
    }
    const text = m.label || m.hint || "";
    const goText = text.includes("试玩") ? "开始试玩 ↗" : text.includes("观看") ? "前往观看 ↗" : "前往查看 ↗";
    return `<a class="modal-media-link" href="${href}" target="_blank" rel="noopener">
      <span class="mml-label">${m.label || "🎬 在线观看"}</span>
      <span class="mml-hint">${m.hint || "点击前往平台查看"}</span>
      <span class="mml-go">${goText}</span>
    </a>`;
  }
  return "";
}
function actionsHTML(w) {
  let btns = "";
  for (const m of mediaList(w.media)) {
    if (m.type === "video") {
      btns += `<a class="btn btn-ghost" href="${m.download}" download="周雨悦-${w.id}.mp4">下载原片 ↓</a>`;
    }
    if (m.type === "pdf") {
      btns += `<a class="btn btn-primary" href="${m.download}" download>下载 ${m.label || "PDF"} ↓</a>`;
    }
    if (m.type === "download") {
      btns += `<a class="btn btn-primary" href="${m.file}" download>${m.label} ↓</a>`;
      if (m.hint) btns += `<span class="modal-note">${m.hint}</span>`;
    }
    if (m.type === "link") {
      const href = m.href || VIDEO_LINKS[m.id];
      if (href) {
        btns += `<a class="btn btn-primary" href="${href}" target="_blank" rel="noopener">${m.label || "在线观看 ↗"}</a>`;
        if (m.hint) btns += `<span class="modal-note">${m.hint}</span>`;
      } else {
        btns += `<a class="btn btn-primary" href="mailto:3505652346@qq.com">📮 邮箱联系我获取</a>`;
        btns += `<span class="modal-note">或通过微信联系：zyy2005yyyy</span>`;
      }
    }
  }
  return btns;
}

function openWork(id) {
  const w = works.find((x) => x.id === id);
  if (!w) return;

  document.getElementById("modalCat").textContent = w.catLabel;
  document.getElementById("modalYear").textContent = w.year;
  document.getElementById("modalTitle").textContent = w.title;
  document.getElementById("modalRole").textContent = w.role;
  document.getElementById("modalSummary").textContent = w.summary;

  const bullets = document.getElementById("modalBullets");
  bullets.innerHTML = w.bullets.map((b) => `<li>${b}</li>`).join("");

  const notesEl = document.getElementById("modalNotes");
  if (w.notes && w.notes.length) {
    notesEl.innerHTML = `
      <div class="modal-notes">
        <h4 class="notes-title">🎨 我的创作手记</h4>
        ${w.notes.map((n) => `
          <div class="note-item">
            <p class="note-q">${n.q}</p>
            <p class="note-a">${n.a}</p>
          </div>`).join("")}
      </div>`;
  } else {
    notesEl.innerHTML = "";
  }

  const topMedia = [];
  const belowMedia = [];
  for (const m of mediaList(w.media)) {
    (m.type === "image" ? belowMedia : topMedia).push(m);
  }
  modalMedia.innerHTML = topMedia.map((m) => mediaItemHTML(w, m)).join("");
  document.getElementById("modalBelow").innerHTML = belowMedia.map((m) => mediaItemHTML(w, m)).join("");
  document.getElementById("modalActions").innerHTML = actionsHTML(w);

  modal.showModal();
  document.body.style.overflow = "hidden";
}

function closeWork() {
  modal.close();
  modalMedia.innerHTML = ""; // 停止视频播放
  document.body.style.overflow = "";
}

modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeWork));
modal.addEventListener("cancel", closeWork);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeWork();
});

/* ------------------------------------------------------------
   入场动画
   ------------------------------------------------------------ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.setProperty("--d", `${Math.min(i % 6, 4) * 0.06}s`);
  revealObserver.observe(el);
});

/* ------------------------------------------------------------
   数字滚动
   ------------------------------------------------------------ */
const statsEl = document.getElementById("stats");
if (statsEl) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".stat-num").forEach((el) => {
          const target = parseInt(el.dataset.count || "0", 10);
          const first = el.childNodes[0];
          const prefix = first && first.nodeType === 3 ? (first.nodeValue.match(/^\D+/) || [""])[0] : "";
          const dur = 1400;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val = Math.round(target * ease);
            if (first && first.nodeType === 3) first.nodeValue = prefix + val;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  statObserver.observe(statsEl);
}

/* ------------------------------------------------------------
   导航 & 进度条
   ------------------------------------------------------------ */
const nav = document.getElementById("nav");
const progressBar = document.getElementById("progressBar");
const navBurger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

navBurger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navBurger.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navBurger.setAttribute("aria-expanded", "false");
  })
);

/* ------------------------------------------------------------
   首次渲染
   ------------------------------------------------------------ */
renderGrid("all");

/* ------------------------------------------------------------
   Hero 鼠标光效（跟随光标的一团荧光）
   ------------------------------------------------------------ */
const heroEl = document.querySelector(".hero");
if (heroEl && FINE_POINTER && !REDUCED_MOTION) {
  heroEl.addEventListener("mousemove", (e) => {
    const r = heroEl.getBoundingClientRect();
    if (!r.width || !r.height) return;
    heroEl.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
    heroEl.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
  });
}

/* ------------------------------------------------------------
   Hero 打字机（循环输出一句话）
   ------------------------------------------------------------ */
const TYPE_PHRASES = [
  "拆爆款 · 造爆款 · 让数据说话",
  "一个人跑通 AI 视频全流程",
  "从策略到传播的全链路创意人",
];
const typeTextEl = document.getElementById("typeText");
if (typeTextEl) {
  let pi = 0, ci = 0, deleting = false;
  const typeTick = () => {
    const p = TYPE_PHRASES[pi];
    if (!deleting) {
      ci++;
      typeTextEl.textContent = p.slice(0, ci);
      if (ci === p.length) {
        setTimeout(() => { deleting = true; typeTick(); }, 2000);
        return;
      }
      setTimeout(typeTick, 70 + Math.random() * 70);
    } else {
      ci--;
      typeTextEl.textContent = p.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % TYPE_PHRASES.length;
        setTimeout(typeTick, 320);
        return;
      }
      setTimeout(typeTick, 32);
    }
  };
  setTimeout(typeTick, 800);
}

/* ------------------------------------------------------------
   自定义光标（荧光小圆点 + 跟随圆环，仅鼠标设备）
   ------------------------------------------------------------ */
if (FINE_POINTER && !REDUCED_MOTION) {
  document.documentElement.classList.add("has-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  if (cursorDot && cursorRing) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const ringLoop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);
    document.addEventListener("mouseover", (e) => {
      const interactive = e.target && e.target.closest ? e.target.closest("a, button, .filter, [data-open], input, textarea, select, dialog, [data-close]") : null;
      cursorRing.classList.toggle("is-hover", !!interactive);
      document.documentElement.classList.toggle("no-cursor", !!interactive);
    });
  }
}

/* ------------------------------------------------------------
   控制台彩蛋（面试官 F12 会看到）
   ------------------------------------------------------------ */
console.log("%c嗨，面试官，欢迎检查我的作品集 👋", "color:#CDFF45;font-size:20px;font-weight:bold;font-family:sans-serif");
console.log("%c周雨悦 · 广告学 2027 届 · 期待与你聊聊\n网站 / 作品 / 简历都在这里，欢迎随时联系～", "color:#9A9AA6;font-size:13px;font-family:sans-serif");

/* ------------------------------------------------------------
   爆款方法论：点击展开 / 收起
   ------------------------------------------------------------ */
const methodToggle = document.getElementById("methodToggle");
const methodContent = document.getElementById("methodContent");
const methodHint = document.getElementById("methodHint");
if (methodToggle && methodContent) {
  const setMethodOpen = (open) => {
    methodContent.classList.toggle("open", open);
    methodToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (methodHint) methodHint.textContent = open ? "收起" : "点击展开";
  };
  methodToggle.addEventListener("click", () => {
    setMethodOpen(!methodContent.classList.contains("open"));
  });
  document.querySelectorAll('a[href="#method"]').forEach((a) => {
    a.addEventListener("click", () => setMethodOpen(true));
  });
}
