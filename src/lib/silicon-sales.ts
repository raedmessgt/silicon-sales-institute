export const ssiApplyUrl =
  "https://perspectivefunnel.co/685276b117a780003b426a8e/687a10dda62010003b1c9ace/";

export const ssiContactEmail = "team@silicon-sales.com";

/** Brand-only placement roulette (logos + company names) */
export const ssiPlacementTiles = [
  { company: "HubSpot", logo: "/silicon-sales/logos/hubspot.webp" },
  { company: "Genesys", logo: "/silicon-sales/logos/genesys.png" },
  { company: "Deliveroo", logo: "/silicon-sales/logos/deliveroo.png" },
  { company: "ZoomInfo", logo: "/silicon-sales/logos/zoominfo.png" },
  { company: "Veya Tech", logo: "/silicon-sales/logos/veya.png" },
  { company: "Tonic AI", logo: "/silicon-sales/logos/tonic.png" },
  { company: "Zscaler", logo: "/silicon-sales/logos/zscaler.png" },
  { company: "Cato Networks", logo: "/silicon-sales/logos/cato.png" },
  { company: "Informa TechTarget", logo: "/silicon-sales/logos/informa.png" },
  { company: "One Advanced", logo: "/silicon-sales/logos/oneadvanced.png" },
] as const;

/** Clean speech-bubble wins pulled from real community screenshots */
export const ssiWinBubbles = [
  {
    quote: "Alhamdulillah… i got the job",
    highlight: "i got the job",
    meta: "Community win · 2 weeks after graduating",
  },
  {
    quote:
      "Alhamdulillah, it led me to a role at a respected company.",
    highlight: "led me to a role",
    meta: "Younes · BDR at Genesys, Dubai",
  },
  {
    quote:
      "Just landed a BDR role at a Fintech company. OTE 45k. Jazakallahu Khairan",
    highlight: "Just landed a BDR role",
    meta: "DM to coach · new chapter",
  },
  {
    quote:
      "Just had an initial meeting — and I closed it successfully, Alhamdulillah!",
    highlight: "closed it successfully",
    meta: "Ibrahim · community chat",
  },
  {
    quote:
      "The investment in this course is the best decision I have made.",
    highlight: "best decision I have made",
    meta: "Student DM · interviews already landing",
  },
] as const;

export const ssiVideos = {
  founder:
    "https://www.loom.com/embed/43234da978624fe582c701a57ba0e1a2?hideEmbedTopBar=true",
  students: [
    { name: "Selman", src: "https://www.youtube.com/embed/r3Cvl3QO1Gs" },
    { name: "Ilyas", src: "https://www.youtube.com/embed/Mddommz0NZw?start=54" },
    { name: "Ali", src: "https://www.youtube.com/embed/oNaadtyio1E" },
    { name: "Taha", src: "https://www.youtube.com/embed/pTmS-wHexa8" },
  ],
} as const;

export const ssiStudents = [
  {
    name: "Selman",
    role: "SDR at Veya Tech",
    outcome: "Hired in 6 days",
    quote:
      "I've always been hesitant about investing in programmes online, but they genuinely care about every student — and now I have a new job.",
    location: "London, UK",
  },
  {
    name: "Ilyas",
    role: "SDR · Marketing Tech",
    outcome: "Hired 3 weeks before graduation",
    quote:
      "If you're getting this quality of training, what's actually stopping you from breaking into tech sales?",
    location: "Fully remote",
  },
  {
    name: "Ali",
    role: "SDR at ZoomInfo",
    outcome: "Hired in 11 days",
    quote: "Real execution. Real feedback. The kind of coaching that actually moves you.",
    location: "Global",
  },
  {
    name: "Taha",
    role: "BDR at Deliveroo",
    outcome: "Hired in 12 days",
    quote: "From stuck applications to a role at a company I actually wanted.",
    location: "UK / Europe",
  },
  {
    name: "Thomas",
    role: "BDR at HubSpot",
    outcome: "Career unlock",
    quote:
      "I've been blown away by the quality. Deconstructing everything made all the difference.",
    location: "Dublin, Ireland",
  },
  {
    name: "Younes",
    role: "SDR at Genesys",
    outcome: "Life changed",
    quote:
      "Best investment in time and energy I've ever made. My life has completely changed since starting tech sales.",
    location: "Dubai, UAE",
  },
] as const;

export const ssiReasons = [
  {
    title: "High earning potential",
    body: "Top senior AEs clear $1M+. Your income scales with performance — not tenure.",
  },
  {
    title: "Fast progression",
    body: "SDR → AE in 12–18 months. Merit over politics. Execution over credentials.",
  },
  {
    title: "No degree required",
    body: "Lowest barrier into big tech. Drive and coachability beat a fancy CV.",
  },
  {
    title: "Remote + global",
    body: "Roles across UK, Europe, US, Australia, Middle East. Work from anywhere.",
  },
  {
    title: "Human skill, AI market",
    body: "Deals still close on trust, judgment, and conversation.",
  },
  {
    title: "Entrepreneur training",
    body: "Prospecting, objections, closing — paid practice for building anything later.",
  },
] as const;

export const ssiEarnings = [
  { level: "Entry", role: "SDR / BDR", range: "$75k – $110k" },
  { level: "Mid", role: "Account Executive", range: "$160k – $350k" },
  { level: "Top", role: "Senior AE", range: "$250k – $500k+" },
] as const;

export const ssiTraps = [
  { title: "Blind applications", body: "Spray-and-pray. Inbox stays quiet." },
  { title: "No proof", body: "Nothing that shows you can actually sell." },
  { title: "No system", body: "No outreach plan. No positioning." },
  { title: "Interview freeze", body: "You know the answers — until the call starts." },
  { title: "No accountability", body: "Motivation fades. Process never starts." },
] as const;

export const ssiSteps = [
  {
    n: "01",
    title: "Interview & assessment",
    body: "Application only. We take people we believe we can place.",
  },
  {
    n: "02",
    title: "Offer onto the institute",
    body: "You're in. Training starts with a clear plan.",
  },
  {
    n: "03",
    title: "12-week intensive",
    body: "Live coaching, real execution — not theory slides.",
  },
  {
    n: "04",
    title: "Certification",
    body: "Proof of competence hiring managers actually respect.",
  },
  {
    n: "05",
    title: "Land the role",
    body: "Average placement 30–45 days. Some in 7–10.",
  },
] as const;

export const ssiFeatures = [
  {
    title: "Live coaching · 5x / week",
    body: "Objections, tonality, interviews, mindset — reps that stick.",
  },
  {
    title: "1:1 performance coach",
    body: "Personal accountability. Weekly tracking. No drifting.",
  },
  {
    title: "Interview simulations",
    body: "Hiring-manager energy. Direct feedback. Until you're ready.",
  },
  {
    title: "AI platform + portfolio",
    body: "Silicon Sales Lab — proof you can do the job before day one.",
  },
  {
    title: "Cloud · Data · AI · Cyber",
    body: "Speak the language of the highest-paying verticals.",
  },
  {
    title: "Private community",
    body: "People who execute. Wins posted in real time.",
  },
] as const;

export const ssiFaqs = [
  {
    q: "What is Silicon Sales Institute?",
    a: "A performance-driven tech sales bootcamp. Live coaching, 1:1 accountability, interview prep, and a hiring strategy built to get you placed.",
  },
  {
    q: "Is this a paid programme?",
    a: "Yes. It’s a paid, application-only institute. Details are shared once you’re accepted.",
  },
  {
    q: "What results can I expect?",
    a: "Students regularly land SDR/BDR roles within weeks. Average placement is 30–45 days; some secure offers in under two weeks.",
  },
  {
    q: "I'm working a job — is this for me?",
    a: "Yes. Built for people who can execute around a schedule. Coachable and consistent is enough.",
  },
  {
    q: "How long does the programme take?",
    a: "The core intensive runs 12 weeks. Placement often happens during or shortly after.",
  },
  {
    q: "What support do I get?",
    a: "Five live sessions weekly, a dedicated lead performance coach, interview simulations, AI portfolio tools, and a private community.",
  },
  {
    q: "Is this guaranteed?",
    a: "We only accept candidates we’re confident we can place. Full guarantee details are shared after you’re accepted.",
  },
  {
    q: "What industries do you focus on?",
    a: "Cloud, Data, AI, and Cybersecurity — the verticals paying the most in tech sales.",
  },
  {
    q: "Remote or in person?",
    a: "Remote-first. Train from anywhere. Results across UK, Europe, US, Australia, and the Middle East.",
  },
  {
    q: "How do I apply?",
    a: "Hit Apply, complete the short application, and if you’re a fit we’ll invite you to the next step.",
  },
] as const;
