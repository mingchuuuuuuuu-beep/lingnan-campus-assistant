/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Comprehensive Knowledge Base & Disambiguated Bilingual Semantic Chunks
 * Bilingual (zh / en) Data Support — Zero Keyword Collision
 */

const LINGNAN_DATA = {
  // Official Knowledge Base Overview (11 Verified Sources)
  knowledgeBase: [
    {
      id: "KB-01",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      filterKey: "Courses",
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
      filterKey: "Courses",
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
      filterKey: "Courses",
      title: "Registry — Course Registration User Guide & FAQs",
      url: "https://www.ln.edu.hk/reg/faqs",
      fileUrl: "https://www.ln.edu.hk/reg/f/page/40852/cr_userguide.pdf",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "選科系統操作指引、CRN 定義、常見錯誤代碼 (Prerequisite / Time Conflict)、常規選科時段與重修規定。",
      summaryEn: "Course registration user guide, CRN definition, error code meanings, regular registration windows, and retake rules."
    },
    {
      id: "KB-04",
      category: "Courses & Registration (選科及註冊)",
      categoryEn: "Courses & Registration",
      filterKey: "Courses",
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
      filterKey: "ILP",
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
      filterKey: "ILP",
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
      filterKey: "ILP",
      title: "OSA — ILP Rules (Attendance, Completion Rate, Reflection)",
      url: "https://www.ln.edu.hk/osa/ilp/about/requirements",
      retrievedDate: "2026-10-30",
      status: "Active (HTTP 200)",
      summary: "出席率要求 (80%)、遲到處理、問卷與反思報告 (Reflection) 提交期限及違規罰則。",
      summaryEn: "80% attendance rule, late arrival penalties, reflection submission deadlines, and non-attendance sanctions."
    },
    {
      id: "KB-08",
      category: "Hostel 宿舍",
      categoryEn: "Hostel & Housing",
      filterKey: "Hostel",
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
      filterKey: "Hostel",
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
      filterKey: "Transport",
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
      filterKey: "Transport",
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
      { label: "🔍 什麼是 CRN 與選科錯誤", query: "乜嘢係 CRN？選科出現 prerequisite error 點解？" },
      { label: "✈️ 機場與深圳灣抵校交通", query: "由香港機場或者深圳灣口岸點去嶺南大學？" },
      { label: "🍽️ 飯堂時間 (測試誠實拒答)", query: "今晚嶺大飯堂幾點關門？" }
    ],
    en: [
      { label: "🚶 Walk route from Siu Hong", query: "How do I get to Lingnan from Siu Hong MTR station?" },
      { label: "🎓 75 ILP Units for 2026 Intake", query: "I entered in 2026 on a 4-year programme. How many ILP units do I need to graduate?" },
      { label: "📚 Credit Limits & Add/Drop Dates", query: "I'm a Year-2 student. Can I take 18 credits in both Term 1 and Term 2, and when is Term 2 add/drop?" },
      { label: "🏠 Room Swapping Procedures", query: "Can I change my hostel room?" },
      { label: "🌏 Non-local Hostel Guarantee", query: "I am a non-local student, do I need to apply for hostel myself?" },
      { label: "🔍 What is CRN & Reg Errors", query: "What is CRN and what does prerequisite error mean?" },
      { label: "✈️ Airport & Border Transport", query: "How do I get to Lingnan University from the airport or Shenzhen Bay Port?" },
      { label: "🍽️ Canteen Hours (Unverified Test)", query: "What time does the campus canteen close tonight?" }
    ]
  },

  // Disambiguated Granular RAG Semantic Chunks (No Stopword Collisions)
  semanticChunks: [
    {
      chunkId: "CHK-01",
      category: "Transport",
      keywords: [
        "兆康", "siu hong", "k51", "f出口", "exit f", "屯馬綫", "tuen ma",
        "點行去嶺南", "點行去嶺大", "點去嶺大", "點去嶺南", "行去嶺大", "步行至嶺大",
        "get to lingnan", "walk to lingnan", "walk from siu hong", "how to get to lingnan", "mtr to lingnan"
      ],
      shortAnswer: "由港鐵屯馬綫兆康站前往嶺南大學主要有步行或搭乘接駁巴士兩種方式：",
      shortAnswerEn: "There are two main ways to travel from Siu Hong MTR Station (Tuen Ma Line) to Lingnan University:",
      bullets: [
        "步行路線（約 8–10 分鐘）：從兆康站 F 出口步出，沿著有蓋行人天橋直行，即可直達嶺南大學主校園行人天橋入口。",
        "接駁巴士（約 3–5 分鐘）：於兆康站南公共運輸交匯處乘搭港鐵接駁巴士 K51（往富泰方向），在「嶺南大學」站下車即達正門。"
      ],
      bulletsEn: [
        "Walking (~8–10 mins): Take Exit F at Siu Hong MTR Station and follow the covered pedestrian footbridge directly to the Lingnan main campus footbridge entrance.",
        "Feeder Bus (~3–5 mins): Take MTR Feeder Bus K51 (towards Fu Tai) from the Siu Hong South Public Transport Interchange and alight at the 'Lingnan University' stop right at the main gate."
      ],
      source: "Getting to Lingnan University (https://www.ln.edu.hk/about-lu/getting-to-lingnan)",
      sourceEn: "Getting to Lingnan University (https://www.ln.edu.hk/about-lu/getting-to-lingnan)",
      nextStep: "初次抵達的新生可在正門保安崗位索取校園平面地圖，或查看校園指示牌。",
      nextStepEn: "First-time visitors can pick up a campus map at the main gate security post."
    },
    {
      chunkId: "CHK-02",
      category: "Transport",
      keywords: [
        "機場", "airport", "hkia", "a33x", "e33p", "深圳灣", "shenzhen bay",
        "b3a", "落馬洲", "lok ma chau", "皇崗", "口岸", "border", "高鐵", "抵港", "b1"
      ],
      shortAnswer: "由香港國際機場或各大陸路口岸前往嶺南大學的公共交通路線如下：",
      shortAnswerEn: "Public transport routes to Lingnan University from Hong Kong International Airport (HKIA) and mainland border crossings:",
      bullets: [
        "香港國際機場出發：於機場地面運輸中心搭乘龍運巴士 A33X 或 E33P 往屯門方向，於兆康站或富泰邨附近下車步行前往。",
        "深圳灣口岸出發：過關後搭乘城巴 B3A 巴士直達屯門富泰邨 / 嶺南大學站，車程約 15–20 分鐘。",
        "落馬洲（福田口岸）出發：搭乘九巴 B1 至元朗站，再轉乘港鐵屯馬綫（往屯門方向）至兆康站 F 出口。"
      ],
      bulletsEn: [
        "From HKIA (Airport): Take Long Win Bus A33X or E33P from the Airport Ground Transportation Centre directly to Tuen Mun / Fu Tai.",
        "From Shenzhen Bay Port: Take Citybus B3A directly to Fu Tai Estate / Lingnan University (~15–20 mins).",
        "From Lok Ma Chau / Futian Port: Take KMB Bus B1 to Yuen Long, then transfer to the MTR Tuen Ma Line to Siu Hong Station (Exit F)."
      ],
      source: "OSA — Transportation & Arrivals Guide (https://www.ln.edu.hk/osa/student-experience/cultural-integration/living-in-hong-kong/transportation)",
      sourceEn: "OSA — Transportation & Arrivals Guide (https://www.ln.edu.hk/osa/student-experience/cultural-integration/living-in-hong-kong/transportation)",
      nextStep: "攜帶大型行李的新生亦可於口岸或機場乘搭新界綠色的士（Green Taxi）直達嶺大校園。",
      nextStepEn: "Students with heavy luggage may also take a New Territories Green Taxi directly to campus."
    },
    {
      chunkId: "CHK-03",
      category: "ILP",
      keywords: [
        "ilp", "綜合學習計劃", "integrated learning", "75 unit", "75 units", "75個",
        "nso", "six core domains", "六大核心範疇", "free electives", "ilp要求", "ilp 畢業"
      ],
      shortAnswer: "2026-27 學年或之後入學的四年制全日制本科生，畢業需累計修滿 75 個 ILP（綜合學習計劃）單位：",
      shortAnswerEn: "For 4-year full-time undergraduate students admitted in AY2026-27 or after, a total of 75 Integrated Learning Programme (ILP) units are required for graduation:",
      bullets: [
        "六大核心範疇 (6 Core Domains)：每個範疇必須修滿至少 3 個單位（合共 18 units）。",
        "自由選修單位 (Free Electives)：由學生自由選讀各範疇認可活動，累計 42 個單位。",
        "新生定向活動 (New Student Orientation, NSO)：第一學年必須完成 15 個 NSO 單位。"
      ],
      bulletsEn: [
        "Six Core Domains: You must complete at least 3 units in each of the six core domains (totaling 18 units minimum).",
        "Free Electives: 42 units freely chosen by the student from any approved ILP activities.",
        "New Student Orientation (NSO): You must complete 15 NSO units during your first year of study."
      ],
      source: "OSA — ILP Unit Requirements for Admitted AY2026-27+ (https://www.ln.edu.hk/osa/ilp/about/ilp-unit-requirements-for-students-admitted-in-ay2026-27-or-after)",
      sourceEn: "OSA — ILP Unit Requirements for Admitted AY2026-27+ (https://www.ln.edu.hk/osa/ilp/about/ilp-unit-requirements-for-students-admitted-in-ay2026-27-or-after)",
      nextStep: "學生可隨時登入 myLingnan Portal 內的 ILP System 查閱個人修讀進度及報名活動。",
      nextStepEn: "Students can log in to the myLingnan Portal at any time to monitor their real-time ILP progress."
    },
    {
      chunkId: "CHK-04",
      category: "ILP",
      keywords: [
        "出席率", "ilp出席", "ilp attendance", "80%", "reflection", "反思報告",
        "ilp遲到", "2025入學", "2025-26", "舊生ilp", "ilp罰則", "缺席ilp"
      ],
      shortAnswer: "ILP 活動出席率、反思報告 (Reflection) 及 2025-26 或之前入學舊生規範如下：",
      shortAnswerEn: "ILP attendance rules, reflection requirements, and pre-2026 intake regulations are as follows:",
      bullets: [
        "出席率要求：每項 ILP 活動必須達到至少 80% 出席率；遲到或早退超過規定時間將不獲發該活動之 ILP 單位。",
        "問卷與反思報告 (Reflection)：指定活動要求於活動結束後限期內在系統提交評估問卷及反思報告，逾期未交不予計算單位。",
        "2025-26 或之前入學舊生：適用入學當年之舊制 ILP 單位總數及範疇要求，詳情請參閱 OSA 舊生過渡條款網頁。"
      ],
      bulletsEn: [
        "Attendance Rule: Students must achieve at least 80% attendance in each ILP session; late arrival or early departure forfeits the units.",
        "Post-Activity Reflection & Survey: Designated activities require submitting an evaluation survey and reflection within the deadline to earn units.",
        "Students Admitted in AY2025-26 or Before: Follow the transitional ILP unit requirements corresponding to their admission cohort."
      ],
      source: "OSA — ILP Rules & Requirements (https://www.ln.edu.hk/osa/ilp/about/requirements)",
      sourceEn: "OSA — ILP Rules & Requirements (https://www.ln.edu.hk/osa/ilp/about/requirements)",
      nextStep: "報名前請先在 myLingnan Portal 細閱該活動之具體出席與反思要求。",
      nextStepEn: "Check specific attendance and reflection requirements on the myLingnan Portal before registering for an ILP event."
    },
    {
      chunkId: "CHK-05",
      category: "Courses",
      keywords: [
        "學分上限", "credit limit", "credit load", "33學分", "33 credits", "36學分", "36 credits",
        "18學分", "18 credits", "term credit adjustment", "overload", "超修", "超額學分",
        "修讀上限", "最多幾多學分", "幾個學分", "幾多學分", "max credit", "maximum credit", "都修 18"
      ],
      shortAnswer: "嶺南大學高年級學生每學年設有嚴格的學分上限規範（正常每學期 15–18 學分）：",
      shortAnswerEn: "Lingnan University enforces strict credit limits per academic year (normal load is 15–18 credits per term):",
      bullets: [
        "全年學分上限：Year-2 或以上學生每學年最高修讀上限為 33 學分（即若 Term 1 修 18 學分，Term 2 正常最多只可修 15 學分）。",
        "兩學期皆修 18 分之限制：若 T1、T2 均修 18 學分（全年合共 36 學分），已超出 33 分年度上限，Banner 系統會阻擋選科。",
        "超額申請流程：如需超修，學生必須透過 Portal 提交「Term Credit Adjustment」申請表格，並獲 Programme Director 特批。"
      ],
      bulletsEn: [
        "Annual Credit Limit: The maximum annual credit load for Year-2 or above students is 33 credits (e.g., 18 credits in Term 1 + 15 credits in Term 2).",
        "Taking 18 credits in both terms: Taking 18 credits in both Term 1 and Term 2 (total 36 credits) exceeds the 33-credit annual cap and is blocked by default.",
        "Credit Overload Application: You must submit a 'Term Credit Adjustment' form via the Portal for Programme Director approval."
      ],
      source: "Registry — Regulations and Guidelines on Credit Load (https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines)",
      sourceEn: "Registry — Regulations and Guidelines on Credit Load (https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines)",
      nextStep: "建議於開學前登入 Banner 系統查閱個人 Degree Works 學分進度。",
      nextStepEn: "Check your Degree Works evaluation in the Banner system before the term starts."
    },
    {
      chunkId: "CHK-06",
      category: "Courses",
      keywords: [
        "add/drop", "add drop", "加退選", "改科", "幾時改科", "important dates", "重要日期",
        "academic calendar", "校曆", "考試期", "幾時考試", "exam period", "examination",
        "congregation", "畢業典禮停課", "t2 幾時", "term 2 add"
      ],
      shortAnswer: "2026-27 學年課程加退選 (Add/Drop Period) 及校曆重要時程安排如下：",
      shortAnswerEn: "Key academic dates and Add/Drop schedules for Academic Year 2026-27:",
      bullets: [
        "第一學期 (Term 1) 課堂結束日：2026 年 11 月 30 日。",
        "畢業典禮 (Congregation) 停課期：2026 年 12 月 1 日至 2 日全校日間課堂停課。",
        "第一學期考試週：2026 年 12 月 8 日起展開。",
        "第二學期 (Term 2) 加退選時段：於 2027 年 1 月開學首兩週內進行（詳見教務處 Important Dates 公佈之確切時間表）。"
      ],
      bulletsEn: [
        "Term 1 Classes End: 30 November 2026.",
        "Congregation (Classes Suspended): 1–2 December 2026.",
        "Term 1 Final Examination Period: Starts on 8 December 2026.",
        "Term 2 Add/Drop Period: Conducted during the first two weeks of Term 2 in January 2027 (refer to Registry Important Dates for exact time slots)."
      ],
      source: "Registry — Important Dates & Academic Calendar 2026-27 (https://www.ln.edu.hk/reg/undergraduate-programmes/important-dates)",
      sourceEn: "Registry — Important Dates & Academic Calendar 2026-27 (https://www.ln.edu.hk/reg/undergraduate-programmes/important-dates)",
      nextStep: "請於加退選首日提早登入 Banner 系統排隊及確認選科時段。",
      nextStepEn: "Log in early on the first morning of Add/Drop to secure your preferred courses in Banner."
    },
    {
      chunkId: "CHK-07",
      category: "Courses",
      keywords: [
        "crn", "course reference number", "prerequisite", "先修", "test score error",
        "選科錯誤", "registration error", "error code", "錯誤代碼", "time conflict",
        "撞堂", "closed section", "banner錯誤", "reg科錯誤"
      ],
      shortAnswer: "關於 CRN（課程編號）及常見選科系統錯誤代碼 (Registration Error Codes) 解釋如下：",
      shortAnswerEn: "Explanation of CRN (Course Reference Number) and common Banner course registration error messages:",
      bullets: [
        "什麼是 CRN：CRN (Course Reference Number) 是 Banner 選科系統中每個課堂分班 (Section) 的獨立 4 至 5 位數字識別碼，加退選時輸入 CRN 可直接快速加科。",
        "Prerequisite and Test Score Error：代表你尚未修畢該科目的先修課程 (Prerequisite) 或未達指定語文/公開試成績要求，系統自動阻擋選修。",
        "其他常見錯誤：Time Conflict（上課時間撞堂）、Closed Section（該班名額已滿）、Major/Cohort Restriction（限特定主修或年級修讀）。"
      ],
      bulletsEn: [
        "What is CRN: Course Reference Number (CRN) is a unique 4-to-5 digit code identifying a specific course section in the Banner registration system.",
        "Prerequisite and Test Score Error: Indicates you have not completed the required prior course(s) or test score threshold needed to enroll in that course.",
        "Other Common Errors: 'Time Conflict' (overlapping schedule), 'Closed Section' (class full), or 'Major/Class Restriction' (reserved for specific majors/years)."
      ],
      source: "Registry — Course Registration User Guide & FAQs (https://www.ln.edu.hk/reg/faqs)",
      sourceEn: "Registry — Course Registration User Guide & FAQs (https://www.ln.edu.hk/reg/faqs)",
      nextStep: "若具同等學歷欲申請豁免先修條件，請向開辦該科目的學系辦公室提交 Prerequisite Waiver 申請。",
      nextStepEn: "If you have equivalent background, contact the offering department office to request a Prerequisite Waiver."
    },
    {
      chunkId: "CHK-08",
      category: "Hostel",
      keywords: [
        "非本地生", "non-local", "non local", "宿舍申請", "apply for hostel", "hostel application",
        "宿位保證", "住宿保證", "hostel guarantee", "residency guarantee", "要唔要自己申請",
        "交換生宿舍", "exchange hostel", "申請宿舍"
      ],
      shortAnswer: "非本地生及新生在嶺南大學的宿舍申請資格與宿位分配政策如下：",
      shortAnswerEn: "Hostel residency eligibility and allocation policy for non-local and new students at Lingnan University:",
      bullets: [
        "全日制 UGC 資助本科新生：享有首兩年 100% 宿位保證政策，但仍必須於指定截止日前在系統提交宿位確認及繳交宿費。",
        "自資學士或研究生：不設自動宿位保證，需於指定申請輪次自行提出申請，名額按計分或抽籤分配。",
        "國際交換生 (Exchange Students)：宿位由全球教育處 (OGE) 統籌預先保留，按入學通知書指引確認即可。"
      ],
      bulletsEn: [
        "Full-time UGC-funded Freshmen: Enjoy a 100% residency guarantee for their first two years of study, provided online confirmation and fee payment deadlines are met.",
        "Self-financed Undergraduate / Postgraduate Students: Must apply through designated hostel rounds; allocations are subject to lottery/points.",
        "International Exchange Students: Hall places are pre-reserved and coordinated directly by the Office of Global Education (OGE)."
      ],
      source: "OSA — Student Hostel Policy & Freshmen Information (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      sourceEn: "OSA — Student Hostel Policy & Freshmen Information (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      nextStep: "請留意個人嶺大學生電郵 (@ln.hk) 以獲取宿位確認通知及繳費單。",
      nextStepEn: "Monitor your official Lingnan student email (@ln.hk) for room allocation notices and payment deadlines."
    },
    {
      chunkId: "CHK-09",
      category: "Hostel",
      keywords: [
        "換房", "轉房", "調房", "room swap", "room swapping", "swap room",
        "change room", "change my hostel room", "mutual swap", "雙向對換", "互換房間"
      ],
      shortAnswer: "嶺大宿舍換房 (Room Swapping) 實施嚴格的「雙向對換」原則（請問你屬於哪一個學期，以及是否已找到願意互換的宿生？）：",
      shortAnswerEn: "Room swapping in Lingnan University student hostels requires a mutual exchange (Could you clarify which term you are applying for and whether you have found a swap partner?):",
      bullets: [
        "雙向對換原則 (Mutual Swap)：宿舍管理處只接受兩名同性別宿生雙方達成共識的互換申請，不設單方面調房。",
        "開放申請時段：通常於第一學期尾（12 月中旬）及第二學期開學第一週內開放辦理。",
        "違規處分：嚴禁宿生私下擅自調換床位或房間鑰匙，違者將被取消住宿資格。"
      ],
      bulletsEn: [
        "Mutual Swap Principle: The hostel office only accepts room swap requests where two same-gender residents have reached mutual consent.",
        "Application Window: Typically opens in mid-December and during the first week of Term 2.",
        "Strict Prohibition: Unauthorized private bed/key swapping is strictly prohibited and may result in immediate termination of hall residency."
      ],
      source: "OSA — Student Hostel Application & Room Swapping Procedures (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      sourceEn: "OSA — Student Hostel Application & Room Swapping Procedures (https://www.ln.edu.hk/osa/residential-life/student-hostel)",
      nextStep: "如已找到互換對象，請雙方一同向所屬宿舍 Warden's Office 或 Resident Tutor (RT) 索取並提交對換表格。",
      nextStepEn: "Once you have a swap partner, both students should contact your Resident Tutor (RT) or Warden's Office to submit the mutual swap form."
    },
    {
      chunkId: "CHK-10",
      category: "Hostel",
      keywords: [
        "入宿", "退宿", "check-in", "check in", "check-out", "宿舍設施",
        "hostel facilities", "洗衣", "laundry", "冷氣", "air-con", "新生手冊", "freshmen handbook"
      ],
      shortAnswer: "關於學生宿舍入住手續、生活設施及新生手冊指引如下：",
      shortAnswerEn: "Information regarding student hostel check-in procedures, hall facilities, and the Freshmen Handbook:",
      bullets: [
        "入宿報到 (Check-in)：宿生須攜帶學生證 (LU Card) 及宿費繳費證明，於指定入宿日前往所屬宿舍大堂櫃檯辦理登記及領取房卡。",
        "宿舍基本設施：每間雙人/三人房均配備床架、床墊、書桌、衣櫃、冷氣機（使用儲值智能卡）及免費校園 Wi-Fi；各樓層設共用洗手間、淋浴間及茶水間。",
        "自備物品建議：學生需自備枕頭、床單被鋪（單人尺寸）、衣架及個人洗漱用品。"
      ],
      bulletsEn: [
        "Check-in Procedure: Present your Student ID (LU Card) and hostel fee payment receipt at your assigned hostel lobby counter to collect your room keycard.",
        "Hall Facilities: Rooms include bed frames, mattresses, desks, wardrobes, air-conditioning (smartcard meter), and campus Wi-Fi; shared washrooms, showers, and pantries are on each floor.",
        "Items to Bring: Students should bring their own pillow, bedsheets/quilt (single size), hangers, and personal toiletries."
      ],
      source: "OSA — Freshmen Handbook & Cultural Integration FAQs (https://www.ln.edu.hk/osa/student-experience/cultural-integration/frequently-asked-questions)",
      sourceEn: "OSA — Freshmen Handbook & Cultural Integration FAQs (https://www.ln.edu.hk/osa/student-experience/cultural-integration/frequently-asked-questions)",
      nextStep: "可於 OSA 網站下載最新學年《Handbook for Freshmen》查閱完整入宿清單。",
      nextStepEn: "Download the latest 'Handbook for Freshmen' PDF from the OSA website for the complete packing checklist."
    },
    {
      chunkId: "CHK-11",
      category: "MissingInfo",
      keywords: [
        "飯堂", "餐廳", "canteen", "食堂", "幾點關門", "幾點收工", "closing time",
        "餐單", "menu", "幾點開門", "opening hours", "宵夜"
      ],
      shortAnswer: "抱歉，本系統的官方規章知識庫並未收錄校園餐廳每日即時營業時間與餐單（堅持誠實拒答，不作 AI 幻覺猜測）：",
      shortAnswerEn: "Sorry, real-time daily canteen operating hours and menus are not included in our static official regulations knowledge base (no hallucination policy):",
      bullets: [
        "知識庫範圍說明：本助手僅根據教務處 (Registry) 及學生事務處 (OSA) 已核實之 11 份官方學術、ILP、宿舍與交通規章作答。",
        "避免錯誤資訊：由於校園餐廳（如康樂樓飯堂、學生村餐廳）於學期中、考試週及假期的營業時間會動態調整，系統不會憑空捏造時間。",
        "官方查閱途徑：請留意校園餐廳門外通告，或查閱財務處 / 學生事務處校園餐飲服務最新公告。"
      ],
      bulletsEn: [
        "Knowledge Base Scope: This assistant only answers from the 11 verified official Registry and OSA regulation documents.",
        "Anti-Hallucination Guarantee: Because catering outlets adjust hours dynamically during term time, exam weeks, and holidays, we do not guess or fabricate closing times.",
        "Where to Check: Please check notices posted at the Amenities Building / Hostel Canteen or visit the official Campus Catering webpage."
      ],
      source: "OSA / Office of the Comptroller — Campus Catering Notices (https://www.ln.edu.hk)",
      sourceEn: "OSA / Office of the Comptroller — Campus Catering Notices (https://www.ln.edu.hk)",
      nextStep: "建議直接前往康樂樓 (Amenities Building) 餐廳查看當日營業通告，或向 OSA 查詢。",
      nextStepEn: "Please check the notice board at the Amenities Building canteen or contact OSA directly."
    },
    {
      chunkId: "CHK-12",
      category: "SafetyGuard",
      keywords: [
        "代寫", "幫我寫功課", "寫論文", "write my essay", "do my homework", "do my assignment",
        "ignore previous instructions", "system prompt", "忽略上述指令", "天氣", "weather", "股票", "stock"
      ],
      shortAnswer: "安全守門攔截 (Safety Guard)：抱歉，此請求超出「嶺南校園助手」的服務範圍或違反學術誠信原則：",
      shortAnswerEn: "Safety Guard Intercept: Sorry, this request is outside the scope of the Lingnan Campus Assistant or violates academic integrity:",
      bullets: [
        "服務範圍限制：本助手專注於解答嶺南大學選科註冊、ILP 綜合學習計劃、學生宿舍及抵校交通之官方規章查詢。",
        "學術誠信守則：根據嶺南大學學術誠信規章，AI 助手嚴禁代寫作業、論文或考核項目。",
        "防提示詞注入 (Prompt Injection Defense)：系統拒絕任何試圖繞過安全守則或洩露系統內部指令的要求。"
      ],
      bulletsEn: [
        "Scope Limitation: I am dedicated exclusively to answering Lingnan University course registration, ILP, student hostel, and campus transport queries.",
        "Academic Integrity: In accordance with Lingnan University policy, I cannot write essays, complete assignments, or do coursework on your behalf.",
        "Prompt Security: Requests attempting to override system instructions or extract internal prompts are automatically blocked."
      ],
      source: "Lingnan University Academic Integrity & AI Safety Policy (https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines)",
      sourceEn: "Lingnan University Academic Integrity & AI Safety Policy (https://www.ln.edu.hk/reg/undergraduate-programmes/regulations-and-guidelines)",
      nextStep: "如有關於選科、ILP、宿舍或交通的問題，歡迎隨時向我發問！",
      nextStepEn: "Feel free to ask me any questions regarding Lingnan courses, ILP units, hostels, or campus transport!"
    }
  ]
};

if (typeof window !== "undefined") {
  window.LINGNAN_DATA = LINGNAN_DATA;
}
if (typeof global !== "undefined") {
  global.LINGNAN_DATA = LINGNAN_DATA;
}
