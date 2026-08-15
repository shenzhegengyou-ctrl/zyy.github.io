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
  mcd: "https://b23.tv/JlGxBq2",     // 麦当劳「百人派对」宣传片（B站）
  wahaha: "https://b23.tv/6H7W8jh",  // 娃哈哈 广告视频（B站）
  ae: "https://b23.tv/4tjR2TU",     // AE 特效合集（B站）
  trailer: "https://b23.tv/lLo4Ok1", // 预告片剪辑（B站）
  movie: "https://b23.tv/WCr1Zhw",   // 电影剪辑练习（B站）
  promo: "https://b23.tv/qoJkcgd",   // 宣传片剪辑（B站）
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
      "📄 提案 PPT《米米的 360°「大揭秘」》可下载 · 完整策划案可联系我",
      "品牌奇妙夜大赛 · 团队第五名",
    ],
    media: [
      { type: "pdf", file: "assets/pdf/mimi-360.pdf", download: "assets/pdf/mimi-360.pdf", label: "提案 PPT《米米的 360°「大揭秘」》", hint: "需要完整策划案可以联系我" },
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
    title: "麦当劳「百人派对」宣传片",
    short: "麦当劳宣传片",
    role: "活动策划 · 宣发视频剪辑",
    badge: "60+ 家庭到场",
    year: "2025",
    summary:
      "本片是麦当劳「百人派对」线下项目的宣发视频：基于活动真实现场素材剪辑，突出亲子互动的趣味亮点，用于活动线上传播与私域触达。该项目由团队协作完成全流程策划与落地执行，累计吸引 60+ 家庭到场，获麦当劳最佳策划方案团队奖。",
    bullets: [
      "本片为「百人派对」项目的宣发视频，本人负责剪辑",
      "突出亲子互动亮点 · 用于线上传播与私域触达",
      "项目全流程策划 · 60+ 家庭到场 · 最佳策划方案团队奖",
    ],
    media: { type: "link", id: "mcd", label: "▶ 前往 B 站观看宣传片", hint: "麦当劳「百人派对」宣发视频 · 本人剪辑" },
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
    id: "movie-edit",
    cat: "video",
    catLabel: "视频剪辑",
    theme: "e",
    art: "FILM",
    title: "电影剪辑练习（多机位 · 全英无字幕）",
    short: "电影剪辑练习",
    role: "视频剪辑 · DaVinci Resolve",
    year: "2026",
    summary:
      "使用 DaVinci Resolve 剪辑多机位片段完成的电影剪辑练习：在多机位画面之间精准切换，同步人物走位与对白节奏，成片为全英无字幕视频，锻炼了对英文素材的理解力与剪辑节奏感。",
    bullets: [
      "DaVinci Resolve 多机位剪辑（Multicam）",
      "多机位切换与叙事节奏把控",
      "全英无字幕素材 · 音画同步处理",
      "▶ B站已上线，可在线观看",
    ],
    media: { type: "link", id: "movie", label: "▶ 前往 B 站观看练习视频", hint: "电影剪辑练习 · DaVinci Resolve" },
  },
  {
    id: "promo-edit",
    cat: "video",
    catLabel: "视频剪辑",
    theme: "c",
    art: "PROMO",
    title: "宣传片剪辑（多机位 · 全英无字幕）",
    short: "宣传片剪辑",
    role: "视频剪辑 · DaVinci Resolve",
    year: "2026",
    summary:
      "使用 DaVinci Resolve 剪辑多机位片段完成的宣传片作品：通过多机位切换与节奏化剪辑突出内容亮点，成片为全英无字幕视频，展现了英文内容的理解与宣传片叙事能力。",
    bullets: [
      "DaVinci Resolve 多机位剪辑（Multicam）",
      "宣传片节奏化剪辑与亮点呈现",
      "全英无字幕素材 · 音画同步处理",
      "▶ B站已上线，可在线观看",
    ],
    media: { type: "link", id: "promo", label: "▶ 前往 B 站观看宣传片", hint: "宣传片剪辑 · DaVinci Resolve" },
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
    id: "copy-999",
    cat: "copy",
    catLabel: "广告文案",
    theme: "d",
    art: "999",
    title: "999感冒灵「普通的英雄」品牌广告文案",
    short: "999感冒灵文案",
    role: "品牌广告文案 · 策略 + 文案",
    year: "2024",
    summary:
      "面向 18-25 岁年轻人的品牌广告文案练习：从目标人群的生存状态与焦虑出发，提炼「普通人打不倒的精神」，完成品牌定位、品牌主张与长文案《普通的英雄》，核心概念「999 陪伴你斩关夺隘」。",
    bullets: [
      "品牌定位：家庭健康守护者 · 品牌主张：温暖的关心",
      "人群洞察：年轻人的 5 件焦虑 / 5 件自豪",
      "长文案《普通的英雄》致敬「打不倒的我们」",
      "核心概念：999 陪伴你斩关夺隘",
      "📄 可下载完整文案",
    ],
    media: { type: "download", label: "下载完整文案", file: "assets/pdf/999感冒灵品牌广告文案.docx", hint: "Word 文档" },
  },
  {
    id: "copy-supnice",
    cat: "copy",
    catLabel: "广告文案",
    theme: "a",
    art: "SUPNICE",
    title: "超能SupNice运动衣物洗衣液 广告文案",
    short: "超能SupNice文案",
    role: "产品广告文案 · 人群洞察 + 文案",
    year: "2026",
    summary:
      "为超能SupNice运动衣物洗衣液撰写的产品广告文案：围绕「为家人解决运动汗味困扰」的妈妈丽燕展开人群画像，完成 5W2H 策略梳理、卖点提炼与文案创作，让产品卖点落到真实生活场景。",
    bullets: [
      "人群洞察：妈妈丽燕 × 爱打篮球的女儿",
      "5W2H 策略梳理：购买动机 / 渠道 / 时机",
      "卖点提炼：根源去异味配方",
      "标题《告别汗味尴尬，守护你的荣光！》",
      "📄 可下载完整文案",
    ],
    media: { type: "download", label: "下载完整文案", file: "assets/pdf/超能SupNice运动衣物洗衣液.docx", hint: "Word 文档" },
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
      if (m.hint) btns += `<span class="modal-note">${m.hint}</span>`;
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

/* ------------------------------------------------------------
   关于我 · 互动卡片打字机（循环输出一句话）
   ------------------------------------------------------------ */
const ABOUT_PHRASES = [
  "小红书单篇 4万+ 浏览 · 赞藏 7000+",
  "抖音爆款最高 160万+ 播放",
  "一个人跑通 AI 视频全流程",
  "品牌策划全案 · 团队第五名",
];
const aboutTypeEl = document.getElementById("aboutTypeText");
if (aboutTypeEl) {
  let api = 0, aci = 0, adeleting = false;
  const aboutTick = () => {
    const p = ABOUT_PHRASES[api];
    if (!adeleting) {
      aci++;
      aboutTypeEl.textContent = p.slice(0, aci);
      if (aci === p.length) {
        setTimeout(() => { adeleting = true; aboutTick(); }, 2200);
        return;
      }
      setTimeout(aboutTick, 55 + Math.random() * 60);
    } else {
      aci--;
      aboutTypeEl.textContent = p.slice(0, aci);
      if (aci === 0) {
        adeleting = false;
        api = (api + 1) % ABOUT_PHRASES.length;
        setTimeout(aboutTick, 400);
        return;
      }
      setTimeout(aboutTick, 28);
    }
  };
  setTimeout(aboutTick, 600);
}

/* ------------------------------------------------------------
   关于我 · 复制微信号 + 轻提示
   ------------------------------------------------------------ */
const WECHAT_ID = "zyy2005yyyy";
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  document.body.removeChild(ta);
  return Promise.resolve(ok);
}
const copyWechatBtn = document.getElementById("copyWechat");
if (copyWechatBtn) {
  copyWechatBtn.addEventListener("click", () => {
    copyText(WECHAT_ID).then((ok) => {
      showToast(ok ? "✅ 微信号已复制，去微信搜索 zyy2005yyyy 添加我吧" : "微信：zyy2005yyyy（长按复制）");
    });
  });
}

/* ============================================================
   彩带引擎（成就解锁 / 彩蛋共用）
   ============================================================ */
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
let confettiParticles = [];
let confettiRaf = null;
const CONFETTI_COLORS = ["#CDFF45", "#FF5A1F", "#8B5CF6", "#22D3EE", "#FF3D81", "#F2F2EC"];

function resizeConfetti() {
  if (!confettiCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  confettiCanvas.width = Math.floor(window.innerWidth * dpr);
  confettiCanvas.height = Math.floor(window.innerHeight * dpr);
  confettiCanvas.style.width = window.innerWidth + "px";
  confettiCanvas.style.height = window.innerHeight + "px";
  if (confettiCtx) confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeConfetti);
resizeConfetti();

function fireConfetti(count, originX, originY) {
  if (!confettiCtx) return;
  const n = count || 160;
  const fromCenter = originX === undefined;
  for (let i = 0; i < n; i++) {
    confettiParticles.push({
      x: fromCenter ? Math.random() * window.innerWidth : originX,
      y: fromCenter ? -20 - Math.random() * 50 : originY,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      vx: (Math.random() - 0.5) * (fromCenter ? 7 : 11),
      vy: 2 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.22,
      life: 1,
    });
  }
  if (!confettiRaf) confettiRaf = requestAnimationFrame(confettiLoop);
}
function confettiLoop() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confettiParticles = confettiParticles.filter((p) => p.life > 0 && p.y < window.innerHeight + 80);
  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.rot += p.vr;
    p.life -= 0.007;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot);
    confettiCtx.globalAlpha = Math.max(p.life, 0);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();
  });
  if (confettiParticles.length) {
    confettiRaf = requestAnimationFrame(confettiLoop);
  } else {
    confettiRaf = null;
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

/* ============================================================
   成就解锁：看完整个作品集
   ============================================================ */
const contactSection = document.getElementById("contact");
let achievementUnlocked = false;
if (contactSection && "IntersectionObserver" in window) {
  const achObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !achievementUnlocked) {
          achievementUnlocked = true;
          achObserver.disconnect();
          fireConfetti(220);
          const banner = document.createElement("div");
          banner.className = "achievement";
          banner.setAttribute("role", "dialog");
          banner.setAttribute("aria-modal", "true");
          banner.innerHTML = `
            <div class="achievement-card">
              <span class="achievement-emoji">🏆</span>
              <h3>成就解锁</h3>
              <p>你竟然把作品集从头看到了尾——<br>这么有眼光的人，不加个微信认识一下？<br>微信：<span class="ach-wechat">zyy2005yyyy</span></p>
              <div class="achievement-actions">
                <button class="btn btn-primary" id="achCopyWechat" type="button">💬 复制微信号</button>
                <button class="btn btn-ghost" data-close-achievement>先不聊</button>
              </div>
            </div>`;
          document.body.appendChild(banner);
          const achCopy = banner.querySelector("#achCopyWechat");
          if (achCopy) {
            achCopy.addEventListener("click", () => {
              copyText(WECHAT_ID).then((ok) => {
                showToast(ok ? "✅ 微信号已复制，去微信搜索 zyy2005yyyy 添加我吧" : "微信：zyy2005yyyy（长按复制）");
              });
            });
          }
          const closeAch = () => banner.remove();
          banner.querySelector("[data-close-achievement]").addEventListener("click", closeAch);
          banner.addEventListener("click", (e) => { if (e.target === banner) closeAch(); });
          const footer = document.querySelector(".footer-inner");
          if (footer) {
            const badge = document.createElement("span");
            badge.className = "unlock-badge";
            badge.textContent = "🏆 已解锁：完整浏览";
            footer.appendChild(badge);
          }
        }
      });
    },
    { threshold: 0.3 }
  );
  achObserver.observe(contactSection);
}

/* ============================================================
   爆款标题检测器
   ============================================================ */
function analyzeTitle(title) {
  const s = title.trim();
  const tips = [];
  let score = 30;
  if (s.length >= 6 && s.length <= 22) {
    score += 12;
    tips.push("✅ 长度适中，一眼能看完");
  } else if (s.length < 6) {
    score += 3;
    tips.push("⚠️ 太短了，信息太少，加个钩子");
  } else {
    score += 5;
    tips.push("⚠️ 偏长，前 10 个字就要抓住人");
  }
  if (/\d/.test(s)) {
    score += 10;
    tips.push("✅ 有数字，具体、可信、好记");
  }
  const hotWords = ["00后", "内幕", "揭秘", "千万别", "为什么", "挑战", "测评", "教程", "一招", "三天", "爆", "隐藏", "秘密", "惊", "第一次", "下头", "上头"];
  const hit = hotWords.filter((w) => s.includes(w));
  if (hit.length) {
    score += Math.min(hit.length * 6, 18);
    tips.push("✅ 踩中热门词：" + hit.slice(0, 3).join(" / "));
  }
  const people = ["宝妈", "学生党", "打工人", "00后", "家长", "设计师", "运营", "程序员", "考研", "减肥", "新手", "小白", "女生", "男生", "中年人", "年轻人", "房东", "老板"];
  const pplHit = people.filter((w) => s.includes(w));
  if (pplHit.length) {
    score += 8;
    tips.push("✅ 有人群定位（" + pplHit.slice(0, 2).join(" / ") + "），读者能对号入座");
  }
  if (/[？?]\s*$/.test(s)) {
    score += 10;
    tips.push("✅ 提问式收尾，直接和读者对话");
  } else if (/[？?]/.test(s)) {
    score += 6;
    tips.push("✅ 带问号，有互动感");
  }
  if (/…|\.\.\./.test(s)) {
    score += 7;
    tips.push("✅ 省略号留悬念，让人想点开看答案");
  }
  const conflict = ["竟然", "居然", "反转", "没想到", "打脸", "逆袭", "从0", "到1", "翻车", "血泪", "避雷", "白天", "晚上", "一边", "曾经", "现在", "0基础", "一招"];
  const cfHit = conflict.filter((w) => s.includes(w));
  if (cfHit.length) {
    score += 8;
    tips.push("✅ 有冲突 / 反差（" + cfHit.slice(0, 2).join(" / ") + "），容易引发好奇");
  }
  if (["绝", "神", "离谱", "封神", "炸裂", "泪目", "笑死", "上头", "气哭"].some((w) => s.includes(w))) {
    score += 6;
    tips.push("✅ 有情绪词，更容易被情绪驱动传播");
  }
  if (/你|我|大家/.test(s)) {
    score += 5;
    tips.push("✅ 有代入感，像在跟读者说话");
  }
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s)) {
    score += 3;
    tips.push("✅ 带 emoji，列表页更显眼");
  }
  if (s.length > 28) {
    score -= 8;
    tips.push("❌ 超过 28 字，容易被折叠");
  }
  if (!/[？?…]/.test(s) && !/\d/.test(s) && !hit.length && !cfHit.length) {
    score -= 6;
    tips.push("💡 没看到明显的钩子，试试数字 / 悬念 / 冲突");
  }
  score = Math.max(10, Math.min(Math.round(score), 98));
  let verdict;
  if (score >= 85) verdict = "🔥 爆款预定！人群、悬念、冲突都踩中了，发出去很可能真的会火";
  else if (score >= 70) verdict = "✨ 相当不错！钩子已经立起来了，再打磨一下开头更好";
  else if (score >= 50) verdict = "😉 有点意思，但钩子不够狠，试试加数字或悬念";
  else verdict = "🧊 稍显平淡，多埋点钩子，参考一下我的爆款方法论";
  if (!tips.length) tips.push("💡 试试加入数字 / 悬念 / 情绪词，让标题更有钩子");
  return { score, verdict, tips };
}

const viralInput = document.getElementById("viralInput");
const viralBtn = document.getElementById("viralBtn");
const viralResult = document.getElementById("viralResult");
const viralScore = document.getElementById("viralScore");
const viralBar = document.getElementById("viralBar");
const viralVerdict = document.getElementById("viralVerdict");
const viralTips = document.getElementById("viralTips");
const viralAgain = document.getElementById("viralAgain");
if (viralBtn && viralInput) {
  const runViral = () => {
    const title = viralInput.value.trim();
    if (!title) {
      showToast("先输入一个标题再检测～");
      return;
    }
    const info = analyzeTitle(title);
    viralResult.hidden = false;
    viralResult.classList.remove("is-done");
    viralScore.textContent = "0";
    viralBar.style.width = "0%";
    viralVerdict.textContent = "";
    viralTips.innerHTML = "";
    const t0 = performance.now();
    const dur = 850;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      viralScore.textContent = Math.round(info.score * eased);
      viralBar.style.width = (info.score * eased).toFixed(1) + "%";
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => {
      viralVerdict.textContent = info.verdict;
      viralTips.innerHTML = info.tips.map((t) => `<span>${t}</span>`).join("");
      viralResult.classList.add("is-done");
    }, 880);
  };
  viralBtn.addEventListener("click", runViral);
  viralInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runViral(); });
  if (viralAgain) viralAgain.addEventListener("click", () => { viralInput.focus(); runViral(); });
}

/* ============================================================
   简历按钮动画：📦 打包 → 下载
   ============================================================ */
document.querySelectorAll('a[href$="简历.pdf"][download]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    if (a.classList.contains("is-loading")) return;
    a.classList.add("is-loading");
    const originText = a.textContent;
    a.textContent = "📦 打包中…";
    const bar = document.createElement("span");
    bar.className = "resume-progress";
    a.appendChild(bar);
    setTimeout(() => {
      a.classList.remove("is-loading");
      a.textContent = originText;
      if (bar.parentNode) bar.parentNode.removeChild(bar);
      const tmp = document.createElement("a");
      tmp.href = a.href;
      tmp.download = a.getAttribute("download") || "周雨悦-简历.pdf";
      document.body.appendChild(tmp);
      tmp.click();
      document.body.removeChild(tmp);
      showToast("📄 简历已开始下载，谢谢你的关注！");
    }, 900);
  });
});

/* ============================================================
   留言墙：打分 + 留句话 → 生成邮件草稿
   ============================================================ */
const gbStars = document.getElementById("guestbookStars");
const gbScoreLabel = document.getElementById("guestbookScoreLabel");
const gbName = document.getElementById("guestbookName");
const gbMsg = document.getElementById("guestbookMsg");
const gbSend = document.getElementById("guestbookSend");
if (gbStars && gbSend) {
  const SCORE_LABELS = {
    1: "1 分 · 需要加油",
    2: "2 分 · 还行吧",
    3: "3 分 · 挺不错的",
    4: "4 分 · 很棒！",
    5: "5 分 · 超喜欢！",
  };
  const starEls = Array.from(gbStars.querySelectorAll(".star"));
  let gbScore = 5;
  const paintStars = (score) => {
    gbScore = score;
    starEls.forEach((el) => {
      const n = parseInt(el.dataset.score, 10);
      const on = n <= score;
      el.textContent = on ? "★" : "☆";
      el.classList.toggle("is-on", on);
      el.setAttribute("aria-checked", on ? "true" : "false");
    });
    if (gbScoreLabel) gbScoreLabel.textContent = SCORE_LABELS[score];
  };
  starEls.forEach((el) => {
    el.addEventListener("click", () => paintStars(parseInt(el.dataset.score, 10)));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        paintStars(parseInt(el.dataset.score, 10));
      }
    });
  });
  paintStars(5);

  gbSend.addEventListener("click", () => {
    const msg = gbMsg ? gbMsg.value.trim() : "";
    if (!msg) {
      showToast("先写句话再发送吧～");
      if (gbMsg) gbMsg.focus();
      return;
    }
    const name = (gbName ? gbName.value.trim() : "") || "匿名访客";
    const subject = `作品集留言：${name}（${gbScore}/5）`;
    const body = `评分：${gbScore}/5\n称呼：${name}\n\n留言：\n${msg}\n\n—— 来自作品集「留言墙」`;
    const mailto = `mailto:3505652346@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLink = document.createElement("a");
    mailtoLink.id = "gbMailto";
    mailtoLink.href = mailto;
    mailtoLink.style.display = "none";
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    mailtoLink.remove();
    showToast("📨 邮件应用已打开，点「发送」就能送达我啦！");
  });
}
