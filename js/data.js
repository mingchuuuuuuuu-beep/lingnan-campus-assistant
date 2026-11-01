/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Comprehensive Knowledge Base & Detailed Semantic Chunks
 * Bilingual (zh / en) Data Support
 */

const LINGNAN_DATA = {
  // Official Knowledge Base Overview
  knowledgeBase: [
    {
      id: "KB-01",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      title: "Registry — Important Dates (add/drop, class periods)",
      url: "https://www.ln.edu.hk/reg/undergraduate-programmes/important-dates",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "Term 1 & Term 2 重要日期、加退選 (add/drop) 期間、開學及上課週數、考試期。",
      summaryEn: "Term 1 & Term 2 key dates, add/drop periods, class weeks, and final examination periods."
    },
    {
      id: "KB-02",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      title: "Registry — Academic Calendar 2026-27 (PDF)",
      url: "https://www.ln.edu.hk/reg/useful-links/academic-calendar",
      fileUrl: "https://www.ln.edu.hk/reg/f/page/40849/cal2026.pdf",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "2026-27 學年全校校曆，載明 Term 1 課堂於 30/11 完結，Congregation 1-2/12 停課，考試於 8/12 開始。",
      summaryEn: "AY2026-27 Academic Calendar: Term 1 ends 30/11, Congregation 1-2/12 (classes suspended), exams start 8/12."
    },
    {
      id: "KB-03",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      title: "Registry — Course Registration User Guide & FAQs",
      url: "https://www.ln.edu.hk/reg/faqs",
      fileUrl: "https://www.ln.edu.hk/reg/f/page/40852/cr_userguide.pdf",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "選科系統操作指引、常見錯誤代碼 (Error Codes)、常規選科時段與重修規定。",
      summaryEn: "Course registration user guide, error code meanings, regular registration windows, and retake regulations."
    },
    {
      id: "KB-04",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      title: "Registry — Add/Drop & Credit-Limit Regulations",
      url: "https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines",
      fileUrl: "https://www.ln.edu.hk/reg/f/page/40852/lmr.pdf",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "Year-2+ 每學年學分上限為 33 學分（每學期正常 15-18 學分）；Term Credit Adjustment 申請流程與 Programme Director 例外審批。",
      summaryEn: "Year-2+ yearly max is 33 credits (15-18 per term). Term Credit Adjustment workflow and Programme Director approval."
    },
    {
      id: "KB-05",
      category: "ILP 綜合學習計劃",
      categoryEn: "ILP Requirements",
      title: "OSA — ILP Unit Requirements (Admitted AY2026-27 or after)",
      url: "https://www.ln.edu.hk/osa/ilp/about/ilp-unit-requirements-for-students-admitted-in-ay2026-27-or-after",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "2026-27 及之後入學四年制本科生畢業需修滿 75 ILP units（6 大範疇各 3 units = 18 units + 自由選修 42 units + 新生定向 NSO 15 units）。",
      summaryEn: "Students admitted in AY2026-27 or after require 75 ILP units to graduate (6 domains x 3 = 18 + 42 electives + 15 NSO)."
    },
    {
      id: "KB-06",
      category: "ILP 綜合學習計劃",
      categoryEn: "ILP Requirements",
      title: "OSA — ILP Unit Requirements (Admitted AY2025-26 or before)",
      url: "https://www.ln.edu.hk/osa/ilp/about/ilp-unit-requirements-for-students-admitted-in-ay2025-26-or-before",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "舊生（2025-26 或之前入學）之 ILP 要求過渡條款及範疇規範對照。",
      summaryEn: "Transitional ILP unit requirements and domain regulations for students admitted in AY2025-26 or before."
    },
    {
      id: "KB-07",
      category: "ILP 綜合學習計劃",
      categoryEn: "ILP Requirements",
      title: "OSA — ILP Rules (Attendance, Completion Rate, Reflection)",
      url: "https://www.ln.edu.hk/osa/ilp/about/requirements",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "出席率要求、遲到處理、問卷與反思報告 (Reflection) 提交期限及違規罰則。",
      summaryEn: "80% attendance rule, late arrival penalties, reflection submission deadlines, and non-attendance sanctions."
    },
    {
      id: "KB-08",
      category: "Hostel 宿舍",
      categoryEn: "Hostel & Housing",
      title: "OSA — Student Hostel Application & Room Swapping",
      url: "https://www.ln.edu.hk/osa/residential-life/student-hostel",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "宿舍申請資格、入住退宿程序、換房申請期 (Room Swapping Window) 及 UGC 與自資學生之政策差異。",
      summaryEn: "Hostel eligibility, check-in/out, Room Swapping window (mid-Dec), and UGC vs self-financed student quotas."
    },
    {
      id: "KB-09",
      category: "Hostel 宿舍",
      categoryEn: "Hostel & Housing",
      title: "OSA — Frequently Asked Questions & Freshmen Handbook",
      url: "https://www.ln.edu.hk/osa/student-experience/cultural-integration/frequently-asked-questions",
      fileUrl: "https://www.ln.edu.hk/osa/f/upload/106915/Handbook%20for%20Freshmen%202025-26.pdf",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "非本地生常見問題、宿舍生活設施、入宿必備物品與報到指引。",
      summaryEn: "Non-local student FAQs, hostel facilities, check-in checklists, and campus life guide."
    },
    {
      id: "KB-10",
      category: "Transport 交通",
      categoryEn: "Campus Transport",
      title: "Getting to Lingnan University (Main Site & Routes)",
      url: "https://www.ln.edu.hk/about-lu/getting-to-lingnan",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "港鐵屯馬綫兆康站 F 出口行人天橋步行約 10 分鐘，或於兆康站乘接駁巴士 K51、九巴路線及的士搭乘點。",
      summaryEn: "Walk ~10 min via Exit F pedestrian bridge from Siu Hong MTR, or take feeder bus K51 or taxi."
    },
    {
      id: "KB-11",
      category: "Transport 交通",
      categoryEn: "Campus Transport",
      title: "OSA — Transportation & Border/Airport Arrivals",
      url: "https://www.ln.edu.hk/osa/student-experience/cultural-integration/living-in-hong-kong/transportation",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "香港國際機場抵港路線（機場快綫至九龍轉乘 / 機場巴士 A33X 或 E33P）、深圳灣 / 落馬洲口岸往嶺南之公共交通。",
      summaryEn: "Hong Kong International Airport routes (A33X/E33P) and border arrival routes via Shenzhen Bay and Lok Ma Chau."
    }
  ],

  // Bilingual Quick Question Chips
  quickChips: {
    zh: [
      { label: "🚶 兆康站步行至嶺大路線", query: "由兆康站點行去嶺南大學？" },
      { label: "🎓 2026 入學 75 ILP 要求", query: "我 2026 入學四年制，ILP 畢業要幾多 unit？" },
      { label: "📚 全年學分上限與加退選", query: "二年級想 T1、T2 都修 18 學分得唔得？T2 幾時可以改科？" },
      { label: "🏠 宿舍換房手續與限制", query: "我可唔可以換房？" },
      { label: "🌏 非本地新生宿舍保證", query: "我係非本地生，宿舍要唔要自己申請？" },
      { label: "🔍 什麼是 CRN 與選科錯誤", query: "乜嘢係 CRN？選科出現 prerequisite error 點解？" }
    ],
    en: [
      { label: "🚶 Walk route from Siu Hong", query: "How do I get to Lingnan from Siu Hong MTR station?" },
      { label: "🎓 75 ILP Units for 2026 Intake", query: "I entered in 2026 on a 4-year programme. How many ILP units do I need to graduate?" },
      { label: "📚 Credit Limits & Add/Drop Dates", query: "I'm a Year-2 student. Can I take 18 credits in both Term 1 and Term 2, and when is Term 2 add/drop?" },
      { label: "🏠 Room Swapping Procedures", query: "Can I change my hostel room?" },
      { label: "🌏 Non-local Hostel Guarantee", query: "I am a non-local student, do I need to apply for hostel myself?" },
      { label: "🔍 What is CRN & Reg Errors", query: "What is CRN and what does prerequisite error mean?" }
    ]
  },

  // Granular RAG Semantic Chunks
  semanticChunks: [
    {
      chunkId: "CHK-01",
      category: "Transport",
      keywords: ["兆康", "siu hong", "行去", "步行", "mtr", "港鐵", "出口", "f出口", "k51", "walk"],
      shortAnswer: "由港鐵屯馬綫兆康站前往嶺南大學主要有步行或搭乘接駁巴士兩種方式：",
      bullets: [
        "步行方式：從兆康站 F 出口步出，沿著行人天橋一路前行，步行約 8–10 分鐘即可直達嶺南大學主校園行人天橋入口。",
        "巴士方式：於兆康站南公共運輸交匯處乘搭港鐵接駁巴士 K51（往富泰方向），在「嶺南大學」站下車即達正門。"
      ],
      source: "Getting to Lingnan University (https://www.ln.edu.hk/about-lu/getting-to-lingnan)",
      nextStep: "初次抵達的新生可在正門保安崗位索取校園平面地圖。"
    },
    {
      chunkId: "CHK-02",
      category: "Transport",
      keywords: ["機場", "airport", "hkia", "抵港", "深圳灣", "口岸", "落馬洲", "高鐵"],
      shortAnswer: "由香港國際機場或各大陸路口岸前往嶺南大學交通路線如下：",
      bullets: [
        "香港國際機場出發：於機場地面運輸中心搭乘龍運巴士 A33X 或 E33P 直達屯門。",
        "深圳灣口岸出發：搭乘城巴 B3A 巴士抵達屯門市中心或富泰邨，鄰近嶺南大學校園。",
        "落馬洲口岸出發：搭乘九巴 B1 到元朗，轉乘港鐵屯馬綫至兆康站 F 出口。"
      ],
      source: "OSA — Transportation & Arrivals Guide (https://www.ln.edu.hk/osa/student-experience/cultural-integration/living-in-hong-kong/transportation)",
      nextStep: "非本地新生抵港前可先加入迎新群組留意機場專車接待資訊。"
    },
    {
      chunkId: "CHK-03",
      category: "ILP",
      keywords: ["ilp", "2026", "unit", "學分", "畢業要求", "畢業", "幾多", "requirement"],
      shortAnswer: "2026-27 學年或之後入學的四年制全日制本科生，畢業需累計修滿 75 個 ILP 單位：",
      bullets: [
        "六大核心範疇 (6 Core Domains)：每個範疇必須修滿至少 3 個單位（合共 18 units）。",
        "自由選修單位 (Free Electives)：由學生自由選讀各範疇認可活動，累計 42 個單位。",
        "新生定向活動 (New Student Orientation, NSO)：第一年必須完成 15 個 NSO 單位。"
      ],
      source: "OSA — ILP Unit Requirements for Admitted AY2026-27+ (https://www.ln.edu.hk/osa/ilp/about/ilp-unit-requirements-for-students-admitted-in-ay2026-27-or-after)",
      nextStep: "學生可隨時登入 myLingnan Portal 內的 ILP System 查閱個人修讀進度。"
    },
    {
      chunkId: "CHK-05",
      category: "Courses",
      keywords: ["學分", "上限", "credit", "credit limit", "18學分", "33學分", "36學分", "term credit adjustment"],
      shortAnswer: "嶺南大學高年級學生每學年設有嚴格的學分上限規範（正常每學期 15–18 學分）：",
      bullets: [
        "全年學分上限：Year-2 或以上學生全年最高修讀上限為 33 學分。",
        "兩學期皆修 18 分之情況：若兩學期均修讀 18 分（總和 36 分），已超出 33 分年度上限。",
        "超額申請流程：學生必須透過 Portal 提交「Term Credit Adjustment」申請表格由 Programme Director 審批。"
      ],
      source: "Registry — Regulations and Guidelines on Credit Load (https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines)",
      nextStep: "建議於開學前登入 Banner 系統查閱個人 Degree Works。"
    },
    {
      chunkId: "CHK-06",
      category: "Courses",
      keywords: ["add/drop", "加退選", "改科", "term 2 add drop", "幾時改科", "important dates"],
      shortAnswer: "2026-27 學年課程加退選 (Add/Drop Period) 及校曆重要時程安排如下：",
      bullets: [
        "第一學期 (Term 1) 課堂結束日：2026 年 11 月 30 日。",
        "畢業典禮 (Congregation) 停課期：2026 年 12 月 1 日至 2 日全校停課。",
        "第一學期考試週：2026 年 12 月 8 日起展開。",
        "第二學期 (Term 2) 加退選時段：2027 年 1 月 5 日至 1 月 14 日。"
      ],
      source: "Registry — Important Dates & Academic Calendar 2026-27 (https://www.ln.edu.hk/reg/undergraduate-programmes/important-dates)",
      nextStep: "請於加退選首日提早登入 Banner 系統排隊。"
    },
    {
      chunkId: "CHK-08",
      category: "Hostel",
      keywords: ["非本地生", "non-local", "宿舍申請", "hostel", "宿位", "住宿保證"],
      shortAnswer: "非本地生在嶺南大學的宿舍申請資格與宿位分配政策：",
      bullets: [
        "全日制 UGC 資助本科新生：享有首兩年 100% 宿位保證政策，但仍必須於截止日前確認繳費。",
        "自資學士或研究生：需於指定申請輪次自行提出申請，名額按抽籤分配。",
        "國際交換生：宿位由全球教育處 (OGE) 統籌預先保留。"
      ],
      source: "OSA — Student Hostel Policy & Freshmen Information (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      nextStep: "請留意個人學生電郵以獲取宿位確認通知。"
    },
    {
      chunkId: "CHK-09",
      category: "Hostel",
      keywords: ["換房", "room swap", "轉房", "調房"],
      shortAnswer: "嶺大宿舍換房 (Room Swapping) 實施嚴格的雙向對換原則：",
      bullets: [
        "雙向對換原則 (Mutual Swap)：宿舍管理處只接受雙方宿生達成共識的互換申請。",
        "開放時段：通常於 12 月中旬至下學期開學第一週內辦理。",
        "嚴禁私下調換床位，否則將被取消宿位。"
      ],
      source: "OSA — Student Hostel Application & Room Swapping Procedures (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      nextStep: "如需換房請聯絡 Resident Tutor 了解詳情。"
    }
  ]
};

if (typeof window !== "undefined") {
  window.LINGNAN_DATA = LINGNAN_DATA;
}
if (typeof global !== "undefined") {
  global.LINGNAN_DATA = LINGNAN_DATA;
}
