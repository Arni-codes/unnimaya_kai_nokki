// KAI NOKKI - Mock Data & AI Persona Fallbacks

export const MOCK_PALM_FEATURES = {
  hand: "right",
  palm_width: 520,
  palm_height: 610,
  aspect_ratio: 1.17,
  palm_shape: "slightly_long",
  life_line_curve: 0.72,
  heart_line_curve: 0.43,
  head_line_length: 0.81,
  fate_line_strength: 0.28,
  mount_of_venus: "overdeveloped",
  finger_gap: "wide",
  sun_line: "interrupted",
};

export const SCANNER_STATES = {
  WAITING: {
    statusText: "WAITING FOR PALM",
    malayalamMessage: "Kai kaanikkeda mone...",
    englishSubText: "Place your palm inside the mystical aura frame",
    progress: 5,
    soundKey: "show_hand",
  },
  CONNECTING: {
    statusText: "ESTABLISHING WebRTC LINK",
    malayalamMessage: "Camera sync aavunnu...",
    englishSubText: "Connecting PC console to camera feed",
    progress: 15,
    soundKey: "connecting",
  },
  NO_HAND: {
    statusText: "NO HAND DETECTED",
    malayalamMessage: "Da... kai evide?",
    englishSubText: "Position one palm directly in front of the lens",
    progress: 10,
    soundKey: "no_hand",
  },
  HAND_DETECTED: {
    statusText: "HAND DETECTED ✓",
    malayalamMessage: "Aah... kai kitti.",
    englishSubText: "Palm identified. Hold frame position...",
    progress: 35,
    soundKey: "detected",
  },
  MOVE_CLOSER: {
    statusText: "TOO FAR AWAY",
    malayalamMessage: "Kurach closer aayi vekku...",
    englishSubText: "Bring palm closer to camera center",
    progress: 45,
    soundKey: "move_closer",
  },
  MOVE_BACK: {
    statusText: "TOO CLOSE TO LENS",
    malayalamMessage: "Onnu pinnottu maari vekku...",
    englishSubText: "Step back slightly so fingers fit in viewport",
    progress: 45,
    soundKey: "move_back",
  },
  ALIGN: {
    statusText: "ALIGNMENT REQUIRED",
    malayalamMessage: "Kai correct ayi vekku da...",
    englishSubText: "Match palm angle with target scanner silhouette",
    progress: 55,
    soundKey: "align",
  },
  STABILIZING: {
    statusText: "STABILITY CHECK...",
    malayalamMessage: "Steady ayi vekka da... onnu mitharam nillu!",
    englishSubText: "Keep hand completely still for snapshot",
    progress: 80,
    soundKey: "steady",
  },
  CAPTURING: {
    statusText: "CAPTURING PALM MAP",
    malayalamMessage: "Onnu nokkatte... snapshot edukkunnu!",
    englishSubText: "Extracting palm lines & geometrical coordinates",
    progress: 95,
    soundKey: "capturing",
  },
  ANALYZING: {
    statusText: "AI ASTROLOGICAL COMPUTATION",
    malayalamMessage: "Hmmmm... ithoru interesting case aanallo...",
    englishSubText: "Consulting ancient Kerala planetary matrix algorithm...",
    progress: 100,
    soundKey: "analyzing",
  },
};

export const MOCK_JOTHISHYAN_READINGS = [
  {
    id: "reading_1",
    overallScore: "94% Chaotic Genius",
    jothishyanOpening:
      "Kai kandappo thanne oru sambhavam manassilayi! Ivide simple problem alla... major cosmic confusion undu. Ninte palm lines nokkiyappo Jothishyan exact truth parayam...",
    love: {
      title: "LOVE & RELATIONSHIPS",
      icon: "❤️",
      manglish:
        "Heart line nokkiyappo oru kaaryam crystal clear aanu... Nee crushing nadathum, pakse single message ayakkunnathinu munpu 17 pravashyam draft type cheydhu delete cheyyum. Love life undo enn kettal... undu, pakse dramatic twists guaranteed!",
      advice: "WhatsApp text type cheydhu overthink cheyyalle mone.",
    },
    career: {
      title: "CAREER & AMBITION",
      icon: "💼",
      manglish:
        "Career path straight alla... Google Maps polum rerouting enn kaattum! Brain super powerful aanu, pakse project thudangumbo 100% enthusiasm, finishing point-il full laziness. Freelance Jothishyan aavan best scope undu.",
      advice: "5 minutes reels kaanunnath stop cheydhal PM position kittum.",
    },
    money: {
      title: "WEALTH & CASHFLOW",
      icon: "💰",
      manglish:
        "Cash varum... pakse Swiggy-ylum Amazon-ylum Zomato-yilum evide pokum ennathaanu mukhya chodyam. Fate line vertical aavendathinu pakaram Swiggy delivery route polleyanu kidakkunnath!",
      advice: "Salary varumbol direct FD-yilekku maattu, illenkil midnight order poykoom.",
    },
    personality: {
      title: "MIND & PERSONALITY",
      icon: "🧠",
      manglish:
        "Overthinking ninte braininte premium subscription replacement aanu! High IQ, hyperactive imagination, pakse ratri 2 AM-nu 2017-ile conversation-i ortthu vishamikkunna character.",
      advice: "Night phone off vekku. Brain-nu kurach rest kodu.",
    },
    future: {
      title: "DESTINY & DESTINATION",
      icon: "🎯",
      manglish:
        "Life long aanu... pakse procrastination athilum long aanu! Ivide foreign trip line clear aayi kanunnundu, pakshe passport office appointment kitto ennale prashnam.",
      advice: "Nale thudangam ennu parayanath thadayan aaru illathathukondu ennu thudangu!",
    },
  },
  {
    id: "reading_2",
    overallScore: "88% Cosmic Overthinker",
    jothishyanOpening:
      "Aha! Ee kai kandittu enikku chiri adakkan pattunnilla. Planetary positions onnum sahikkatha sthithiyilaanallo!",
    love: {
      title: "LOVE & RELATIONSHIPS",
      icon: "❤️",
      manglish:
        "Love side kurach complicated aanu. Nee parayunna dialogue aalukalkku puriyilla, nee vicharikkaathathum avarkku puriyum.",
      advice: "Crush-inte story-kku straight heart emoji idathe meme ayaykkukka.",
    },
    career: {
      title: "CAREER & AMBITION",
      icon: "💼",
      manglish:
        "Boss enthenkilum paranjal nee manassil full Malayalam movie dialogue adikkum. Promotion path-il small setback undu, pakse chai break-il nee aannu topper!",
      advice: "Meeting-il nod cheyyunna time-il camera check cheyyuka.",
    },
    money: {
      title: "WEALTH & CASHFLOW",
      icon: "💰",
      manglish:
        "Lakshmi Devi ninne nokki punchiri thunnu, pakse UPI notification ninne crying aakkum. Money line curvy aanu - curve marannu spending nadathum.",
      advice: "Account balance check cheyyatha daily habit dangerous aanu.",
    },
    personality: {
      title: "MIND & PERSONALITY",
      icon: "🧠",
      manglish:
        "Nee pure Kerala character aanu! Drama, emotion, mass entry, all in one package.",
      advice: "Relax mone, all cosmic issues are temporary.",
    },
    future: {
      title: "DESTINY & DESTINATION",
      icon: "🎯",
      manglish:
        "Future bright aanu! Pakse bill pay cheyyan marannal light cut aavum.",
      advice: "Future dark alla, just light switch search cheyyanam.",
    },
  },
];

export const MOCK_CHAT_RESPONSES = {
  love: [
    "Love life-inte kaaryam paranjal... Crush ninne story check cheyyunnundu, pakse reply tharatha secret star position-il aanu! Patience vakkeda mone.",
    "Heart line-il double intersection undu. Single status change aavum, pakse swantham salary-il candle light dinner kazhikkendi varum!",
    "Love varum, car-il alla, auto-yilo bus-ilo varum. Direct entry aayirikkum!",
  ],
  job: [
    "Job kittan bhagyam undu, pakse Monday morning alarm kelkkatha shani dashayundu! Work hard, resume update cheyyu.",
    "IT company-il desk position strong aanu. Pakse client call-il mute botton marannu parayunna dialogues control cheyyanam!",
    "Remote job scope clear aanu. Coffee kudi koodum, posture marum, pakse bank account steady aavum.",
  ],
  foreign: [
    "Abroad chance undu! Visa line clear aanu... Pakse flight ticket rate kandittu nee Cochin-il thanne return trip plannum!",
    "Dubai yilekkum UK yilekkum lines point cheyyunnundu. Packing thudangikko, pakse banana chips bag-il marakkathirikku!",
  ],
  overthinking: [
    "Overthinking stop cheyyan swantham mind-il off button illa. Ratri 1 AM-nu cosmic alignment overthinking push cheyyunnathukondu 8 hours urangu!",
    "Ente ponnu mone... Overthinking ninte full time job aakkiyal multi-billionaire aavum. Relax and have a chai!",
  ],
  generic: [
    "Hmmm... Palm features check cheydhapol njan kandu! Jothishyan spot on aayi parayam: Success ninne thhedi varunnundu, auto stand-il traffic block-il pettirikkuka aanu!",
    "Ninte kai parayunna rahasyam kelkkan mathram high AI compute backend devathakal use cheyyunnundu. Positive vibes mathram retain cheyyu!",
    "Da mone, njan parayunnath kelku. Life-il tension edukkathe, mass aayi Munnottu po!",
  ],
};

export const QUICK_CHAT_PROMPTS = [
  "Ente love life engane aanu?",
  "Job kittumo jothishyare?",
  "Enikku foreign pokan chance undo?",
  "Why am I always overthinking?",
  "Ente cash evide pokunnu?",
];
