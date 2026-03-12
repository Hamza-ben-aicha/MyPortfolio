import { useState, useEffect, useRef } from "react";

const COLORS = {
  dark: {
    bg: "#0d0d0d",
    surface: "#111111",
    card: "#1a1a1a",
    border: "#272727",
    text: "#f0ede8",
    muted: "#777",
    accent: "#e8a030",
    accentDim: "#e8a03018",
    overlay: "rgba(0,0,0,0.85)",
  },
  light: {
    bg: "#f5f2ed",
    surface: "#ffffff",
    card: "#faf8f5",
    border: "#e0dbd2",
    text: "#1a1a1a",
    muted: "#888",
    accent: "#c47d10",
    accentDim: "#c47d1012",
    overlay: "rgba(0,0,0,0.6)",
  },
};

/* ─── ALL PROJECT DATA ─── */
const PROJECTS = {
  fr: [
    {
      title: "STE SMASS — Oil Inspection Dashboard",
      period: "Sep – Déc 2025",
      type: "Fullstack Freelance",
      desc: "Dashboard web complet pour une compagnie pétrolière. Gestion des inspecteurs, navires, vols, factures. Automatisation des rapports, emails et facturation.",
      tags: ["Node.js", "Express", "ReactJS", "MySQL"],
      icon: "⚙️",
      idea: "STE SMASS est une compagnie pétrolière majeure dont les inspecteurs se déplacent sur le terrain pour contrôler des produits pétroliers, chimiques et gaziers. Tout leur processus était géré manuellement via des fichiers Excel et des emails. L'objectif était de digitaliser entièrement ce workflow.",
      features: [
        "Dashboard centralisé : gestion des compagnies pétrolières, inspecteurs, navires, vols et sociétés d'inspection",
        "Gestion des missions d'inspection avec suivi en temps réel",
        "Génération automatique de rapports PDF après chaque inspection terminée",
        "Système de facturation avec calcul automatique des coûts et revenus",
        "Envoi automatique d'emails aux parties concernées à chaque étape",
        "Gestion des rôles : admin, inspecteur, client",
        "API REST sécurisée avec authentification JWT",
      ],
      challenge:
        "Modéliser un workflow métier complexe avec de nombreuses entités interdépendantes (missions ↔ inspecteurs ↔ navires ↔ factures) tout en garantissant la cohérence des données.",
    },
    {
      title: "TunisMove — Car Rental App",
      period: "Jan – Jun 2025",
      type: "Développeur Flutter",
      desc: "Location de véhicules à la consommation. Détection de dommages IA (TFLite), scan CIN/OCR, maps, paiement Stripe et backend cloud.",
      tags: [
        "Flutter",
        "Firebase",
        "Supabase",
        "Node.js",
        "TFLite",
        "Stripe",
        "Cloudinary",
      ],
      icon: "🚗",
      idea: "Contrairement aux agences de location classiques qui facturent à la journée, TunisMove propose la location de véhicules à la consommation : tu paies uniquement pour le trajet effectué. L'application gère tout le cycle de location depuis le mobile.",
      features: [
        "Modèle TFLite de détection de dommages : photos avant/après location comparées automatiquement",
        "Modèle TFLite de détection de véhicule : valide que la photo capturée est bien un véhicule",
        "Scan de CIN et extraction automatique des données d'identité via OCR",
        "Intégration OpenStreetMap pour le calcul d'itinéraires et le suivi GPS en temps réel",
        "Paiement en ligne sécurisé via Stripe",
        "Stockage des photos via Cloudinary",
        "Backend Supabase (cloud functions + base de données de backup)",
        "Cron jobs Node.js pour la gestion des locations expirées et notifications",
      ],
      challenge:
        "Intégrer des modèles TFLite légers qui fonctionnent en temps réel sur mobile sans dégrader les performances, tout en gérant un flux de données complexe entre Firebase, Supabase et Cloudinary.",
    },
    {
      title: "Linguify — Language Learning App",
      period: "Jun – Aoû 2024",
      type: "Développeur Flutter",
      desc: "App d'apprentissage des langues par échange culturel. Système de matching et correction orthographique via DeepSeek API.",
      tags: ["Flutter", "Firebase", "DeepSeek API"],
      icon: "🌍",
      idea: "Linguify repense l'apprentissage des langues : plutôt que des leçons classiques, l'application connecte des utilisateurs de langues différentes pour qu'ils s'enseignent mutuellement leur langue à travers des échanges culturels authentiques.",
      features: [
        "Système de matching intelligent entre apprenants selon la langue cible et la langue maternelle",
        "Chat en temps réel avec synchronisation Firebase",
        "Correction orthographique et grammaticale intelligente via l'API DeepSeek",
        "Profils culturels : partage de traditions, expressions, contenus locaux",
        "Authentification et gestion des utilisateurs via Firebase Auth",
        "Stockage des médias et données via Firestore",
      ],
      challenge:
        "Concevoir un algorithme de matching pertinent qui tient compte de la langue cible, du niveau et des centres d'intérêt pour créer des paires d'apprenants compatibles.",
    },
    {
      title: "QuizApp ISET Sousse — Android",
      period: "2021 – 2022",
      type: "Projet Académique",
      desc: "Application Android de gestion de quiz pour enseignants et étudiants. Les enseignants créent des examens, les étudiants passent les tests et reçoivent leurs notes.",
      tags: ["Java", "XML", "Firebase"],
      icon: "🎓",
      idea: "Application mobile Android développée pour l'ISET Sousse afin de digitaliser les évaluations. Les enseignants peuvent créer des quiz et les publier pour des groupes spécifiques d'étudiants. Les étudiants passent les examens sur leur téléphone et reçoivent leurs résultats immédiatement.",
      features: [
        "Interface enseignant : création de quiz avec questions à choix multiples",
        "Publication du quiz vers un ou plusieurs groupes d'étudiants",
        "Interface étudiant : accès aux examens disponibles pour son groupe",
        "Passage de l'examen sur mobile avec timer",
        "Calcul automatique des notes et affichage immédiat du résultat",
        "Historique des résultats pour enseignants et étudiants",
        "Synchronisation en temps réel via Firebase Realtime Database",
      ],
      challenge:
        "Gérer la synchronisation en temps réel entre enseignants et étudiants avec Firebase, notamment pour l'affichage instantané des résultats dès la soumission.",
    },
    {
      title: "Africa Management Services — ISO Platform",
      period: "Fév – Jun 2022",
      type: "Fullstack (PFE)",
      desc: "Plateforme de digitalisation du processus d'audit ISO. Workflow complet : missions, PDF auto, emails automatiques, gestion des rôles.",
      tags: ["Node.js", "Express", "ReactJS", "MySQL"],
      icon: "📋",
      idea: "Africa Management Services est un cabinet de conseil spécialisé dans l'audit et la certification ISO. Leur processus d'inspection était entièrement manuel : formulaires papier, fichiers Excel, emails non structurés. Ce projet est ma PFE, réalisé pour digitaliser intégralement ce workflow.",
      features: [
        "Conception complète du système : analyse des besoins, modélisation UML, maquettes Figma",
        "Gestion des missions d'audit : création, assignation aux consultants, suivi",
        "Suivi des non-conformités détectées lors des audits",
        "Planification des inspections avec calendrier intégré",
        "Génération automatique de rapports PDF à l'issue de chaque audit",
        "Envoi automatique d'emails aux clients et consultants",
        "Système d'authentification et gestion des rôles (consultants / entreprises / administrateurs)",
        "Optimisation de la base de données MySQL : relations, intégrité, performance",
      ],
      challenge:
        "Premier projet fullstack end-to-end mené seul en contexte professionnel réel, avec des contraintes métier strictes imposées par le cabinet.",
    },
  ],
  en: [
    {
      title: "STE SMASS — Oil Inspection Dashboard",
      period: "Sep – Dec 2025",
      type: "Fullstack Freelance",
      desc: "Full web dashboard for a major oil company. Manage inspectors, vessels, flights, invoices. Automated inspection reports, emails, and invoicing.",
      tags: ["Node.js", "Express", "ReactJS", "MySQL"],
      icon: "⚙️",
      idea: "STE SMASS is a major oil company whose inspectors travel to sites to inspect petroleum, chemical, and gas products. Their entire process was managed manually via Excel files and emails. The goal was to fully digitize this workflow.",
      features: [
        "Centralized dashboard: manage oil companies, inspectors, vessels, flights, and inspection firms",
        "Mission management with real-time tracking",
        "Automatic PDF report generation after each completed inspection",
        "Invoicing system with automatic cost and revenue calculation",
        "Automatic email notifications to all parties at each workflow step",
        "Role management: admin, inspector, client",
        "Secure REST API with JWT authentication",
      ],
      challenge:
        "Modeling a complex business workflow with many interdependent entities (missions ↔ inspectors ↔ vessels ↔ invoices) while ensuring data consistency.",
    },
    {
      title: "TunisMove — Car Rental App",
      period: "Jan – Jun 2025",
      type: "Flutter Developer",
      desc: "Per-trip vehicle rental app. AI damage detection (TFLite), ID card OCR scan, maps, Stripe payments, and cloud backend.",
      tags: [
        "Flutter",
        "Firebase",
        "Supabase",
        "Node.js",
        "TFLite",
        "Stripe",
        "Cloudinary",
      ],
      icon: "🚗",
      idea: "Unlike traditional car rental agencies that charge per day, TunisMove offers consumption-based rental: you only pay for the trip you actually make. The app manages the entire rental cycle from the mobile device.",
      features: [
        "TFLite damage detection model: before/after rental photos automatically compared",
        "TFLite vehicle detection model: validates the captured photo is actually a vehicle",
        "ID card scan with automatic data extraction via OCR",
        "OpenStreetMap integration for route calculation and real-time GPS tracking",
        "Secure online payment via Stripe",
        "Photo storage via Cloudinary",
        "Supabase backend (cloud functions + backup database)",
        "Node.js cron jobs for expired rental management and notifications",
      ],
      challenge:
        "Integrating lightweight TFLite models that run in real-time on mobile without performance degradation, while managing a complex data flow between Firebase, Supabase, and Cloudinary.",
    },
    {
      title: "Linguify — Language Learning App",
      period: "Jun – Aug 2024",
      type: "Flutter Developer",
      desc: "Language learning app through cultural exchange. User matching system and AI-powered spell correction via DeepSeek API.",
      tags: ["Flutter", "Firebase", "DeepSeek API"],
      icon: "🌍",
      idea: "Linguify rethinks language learning: instead of traditional lessons, the app connects users from different languages so they teach each other through authentic cultural exchanges.",
      features: [
        "Smart matching system between learners based on target language and native language",
        "Real-time chat with Firebase synchronization",
        "Intelligent spell and grammar correction via the DeepSeek API",
        "Cultural profiles: share traditions, expressions, local content",
        "Authentication and user management via Firebase Auth",
        "Media and data storage via Firestore",
      ],
      challenge:
        "Designing a relevant matching algorithm that accounts for target language, level, and interests to create compatible learner pairs.",
    },
    {
      title: "QuizApp ISET Sousse — Android",
      period: "2021 – 2022",
      type: "Academic Project",
      desc: "Android quiz management app for teachers and students. Teachers create exams, students take tests and instantly receive their grades.",
      tags: ["Java", "XML", "Firebase"],
      icon: "🎓",
      idea: "Android mobile app developed for ISET Sousse to digitize student assessments. Teachers can create quizzes and publish them to specific student groups. Students take exams on their phone and receive results immediately.",
      features: [
        "Teacher interface: create quizzes with multiple choice questions",
        "Publish quiz to one or multiple student groups",
        "Student interface: access available exams for their group",
        "Take exam on mobile with countdown timer",
        "Automatic grade calculation with instant result display",
        "Result history for both teachers and students",
        "Real-time synchronization via Firebase Realtime Database",
      ],
      challenge:
        "Managing real-time synchronization between teachers and students with Firebase, especially for instant result display upon submission.",
    },
    {
      title: "Africa Management Services — ISO Platform",
      period: "Feb – Jun 2022",
      type: "Fullstack (Final Year)",
      desc: "Web platform digitizing ISO audit & certification workflows. Auto PDF generation, automated emails, full role management.",
      tags: ["Node.js", "Express", "ReactJS", "MySQL"],
      icon: "📋",
      idea: "Africa Management Services is a consulting firm specializing in ISO audit and certification. Their inspection process was entirely manual: paper forms, Excel files, unstructured emails. This project is my final year thesis, built to fully digitize their workflow.",
      features: [
        "Full system design: requirements analysis, UML modeling, Figma wireframes",
        "Audit mission management: creation, consultant assignment, tracking",
        "Non-conformity tracking detected during audits",
        "Inspection scheduling with integrated calendar",
        "Automatic PDF report generation after each audit",
        "Automatic email notifications to clients and consultants",
        "Authentication and role management (consultants / companies / admins)",
        "MySQL database optimization: relationships, integrity, performance",
      ],
      challenge:
        "First end-to-end fullstack project managed solo in a real professional context, with strict business constraints imposed by the firm.",
    },
  ],
};

const skills = [
  { cat: "Frontend", items: ["ReactJS", "HTML", "CSS", "JavaScript"] },
  { cat: "Mobile", items: ["Flutter", "Dart", "Java"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST API"] },
  { cat: "Databases", items: ["MySQL", "MongoDB", "Firestore", "Supabase"] },
  {
    cat: "Cloud & BaaS",
    items: ["Firebase", "Supabase", "Cloudinary", "Azure"],
  },
  { cat: "AI & Tools", items: ["TFLite", "DeepSeek API", "OCR", "Stripe"] },
  { cat: "DevOps", items: ["Docker", "Git", "Postman", "Figma"] },
  { cat: "Architecture", items: ["MVC", "MVVM", "Clean Arch", "UML"] },
];

const UI = {
  fr: {
    role: "Développeur Fullstack & Mobile",
    available: "DISPONIBLE — OPEN TO WORK",
    heroSub:
      "je conçois et développe des applications complètes, de la maquette jusqu'au déploiement.",
    heroBtn1: "Voir mes projets →",
    heroBtn2: "Me contacter",
    stat1: "Projets livrés",
    stat2: "Ingénieur",
    stat3: "Tout le cycle",
    aboutLabel: "À propos",
    aboutTitle1: "Je construis des",
    aboutTitle2: "solutions complètes.",
    aboutP1:
      "Ingénieur logiciel (Bac+5) passionné par la transformation d'idées en produits réels. Je pilote chaque projet seul : analyse des besoins, architecture système, Figma, développement fullstack & mobile, et déploiement.",
    aboutP2:
      "Spécialisé dans la digitalisation de processus métier, l'automatisation de workflows et l'intégration de modèles IA.",
    aboutBold: "digitalisation de processus métier",
    cards: [
      ["🏗️", "Architecture", "Conception système, UML, BDD"],
      ["🤖", "IA Intégrée", "TFLite, OCR, DeepSeek API"],
      ["⚡", "Automatisation", "PDF, emails, cron jobs"],
      ["📱", "Cross-Platform", "Web + Mobile"],
    ],
    projectsLabel: "Projets",
    projectsTitle: "Ce que j'ai construit",
    readMore: "Voir les détails →",
    close: "Fermer",
    ideaLabel: "L'idée",
    featuresLabel: "Fonctionnalités clés",
    challengeLabel: "Défi technique",
    certLabel: "Certification",
    certTitle: "Microsoft Azure Fundamentals",
    certSub:
      "AZ-900 — Certification Microsoft validée en 2024. Couvre les fondamentaux du cloud Azure : services, sécurité, conformité et tarification.",
    certBtn: "Voir le certificat →",
    skillsLabel: "Stack",
    skillsTitle: "Compétences techniques",
    contactLabel: "Contact",
    contactTitle: "Travaillons ensemble",
    contactSub:
      "Disponible pour des opportunités freelance ou des postes en entreprise.",
    navLabels: {
      about: "à propos",
      projects: "projets",
      skills: "stack",
      contact: "contact",
    },
    footerRole: "Développeur Fullstack & Mobile",
    contactItems: [
      [
        "✉️",
        "Email",
        "hamza.ben.aicha@outlook.com",
        "mailto:hamza.ben.aicha@outlook.com",
      ],
      ["📞", "Téléphone", "+216 51 761 176", "tel:+21651761176"],
      [
        "💼",
        "LinkedIn",
        "linkedin.com/in/Hamza-Ben-Aicha",
        "https://www.linkedin.com/in/Hamza-Ben-Aicha",
      ],
      [
        "🐙",
        "GitHub",
        "github.com/Hamza-ben-aicha",
        "https://github.com/Hamza-ben-aicha",
      ],
    ],
  },
  en: {
    role: "Fullstack & Mobile Developer",
    available: "AVAILABLE — OPEN TO WORK",
    heroSub:
      "I design and build complete applications, from wireframes to production deployment.",
    heroBtn1: "See my projects →",
    heroBtn2: "Contact me",
    stat1: "Projects delivered",
    stat2: "Engineer",
    stat3: "Full cycle",
    aboutLabel: "About",
    aboutTitle1: "I build",
    aboutTitle2: "complete solutions.",
    aboutP1:
      "Software engineer (Master's degree) passionate about turning ideas into real products. I run each project solo: requirements analysis, system architecture, Figma, fullstack & mobile development, and deployment.",
    aboutP2:
      "Specialized in business process digitization, workflow automation, and AI model integration.",
    aboutBold: "business process digitization",
    cards: [
      ["🏗️", "Architecture", "System design, UML, DB"],
      ["🤖", "Integrated AI", "TFLite, OCR, DeepSeek API"],
      ["⚡", "Automation", "PDF, emails, cron jobs"],
      ["📱", "Cross-Platform", "Web + Mobile"],
    ],
    projectsLabel: "Projects",
    projectsTitle: "What I've built",
    readMore: "See details →",
    close: "Close",
    ideaLabel: "The idea",
    featuresLabel: "Key features",
    challengeLabel: "Technical challenge",
    certLabel: "Certification",
    certTitle: "Microsoft Azure Fundamentals",
    certSub:
      "AZ-900 — Microsoft certification validated in 2024. Covers Azure cloud fundamentals: services, security, compliance and pricing.",
    certBtn: "View certificate →",
    skillsLabel: "Stack",
    skillsTitle: "Technical skills",
    contactLabel: "Contact",
    contactTitle: "Let's work together",
    contactSub: "Available for freelance opportunities or full-time positions.",
    navLabels: {
      about: "about",
      projects: "projects",
      skills: "stack",
      contact: "contact",
    },
    footerRole: "Fullstack & Mobile Developer",
    contactItems: [
      [
        "✉️",
        "Email",
        "hamza.ben.aicha@outlook.com",
        "mailto:hamza.ben.aicha@outlook.com",
      ],
      ["📞", "Phone", "+216 51 761 176", "tel:+21651761176"],
      [
        "💼",
        "LinkedIn",
        "linkedin.com/in/Hamza-Ben-Aicha",
        "https://www.linkedin.com/in/Hamza-Ben-Aicha",
      ],
      [
        "🐙",
        "GitHub",
        "github.com/Hamza-ben-aicha",
        "https://github.com/Hamza-ben-aicha",
      ],
    ],
  },
};

/* ─── HOOKS ─── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .6s ease ${delay}s,transform .6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function Label({ color, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          width: "28px",
          height: "2px",
          background: color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: ".68rem",
          fontWeight: 700,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color,
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── PROJECT MODAL ─── */
function Modal({ project, ui, c, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: c.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.card,
          border: `1px solid ${c.border}`,
          borderRadius: "18px",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "32px",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: c.border,
            border: "none",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            color: c.text,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "2.2rem", flexShrink: 0 }}>
            {project.icon}
          </span>
          <div>
            <div
              style={{
                fontSize: ".68rem",
                color: c.accent,
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {project.type} · {project.period}
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "1.15rem",
                lineHeight: 1.3,
                color: c.text,
              }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        {/* Idea */}
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              fontSize: ".68rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: c.accent,
              marginBottom: "8px",
            }}
          >
            💡 {ui.ideaLabel}
          </div>
          <p style={{ color: c.muted, fontSize: ".85rem", lineHeight: 1.8 }}>
            {project.idea}
          </p>
        </div>

        {/* Features */}
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              fontSize: ".68rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: c.accent,
              marginBottom: "10px",
            }}
          >
            ⚡ {ui.featuresLabel}
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            {project.features.map((f, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: c.accent,
                    flexShrink: 0,
                    marginTop: "2px",
                    fontSize: ".8rem",
                  }}
                >
                  →
                </span>
                <span
                  style={{
                    color: c.muted,
                    fontSize: ".83rem",
                    lineHeight: 1.65,
                  }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenge */}
        <div
          style={{
            background: c.accentDim,
            border: `1px solid ${c.accent}33`,
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              fontSize: ".68rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: c.accent,
              marginBottom: "8px",
            }}
          >
            🎯 {ui.challengeLabel}
          </div>
          <p style={{ color: c.text, fontSize: ".83rem", lineHeight: 1.75 }}>
            {project.challenge}
          </p>
        </div>

        {/* Tags */}
        <div>
          {project.tags.map((tg) => (
            <span
              key={tg}
              style={{
                display: "inline-block",
                fontSize: ".68rem",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "20px",
                border: `1px solid ${c.border}`,
                background: c.accentDim,
                color: c.accent,
                margin: "3px",
              }}
            >
              {tg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("fr");
  const [active, setActive] = useState("hero");
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const c = dark ? COLORS.dark : COLORS.light;
  const t = UI[lang];
  const projects = PROJECTS[lang];
  const navIds = ["about", "projects", "skills", "contact"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.3 },
    );
    ["hero", ...navIds].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: "'DM Sans',sans-serif",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        transition: "background .4s,color .4s",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{width:100%;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${c.accent};border-radius:2px}
        .tag{display:inline-block;font-size:.67rem;font-weight:600;letter-spacing:.03em;padding:3px 8px;border-radius:20px;border:1px solid ${c.border};background:${c.accentDim};color:${c.accent};margin:2px}
        .sk{font-size:.74rem;padding:4px 9px;border-radius:6px;background:${c.card};border:1px solid ${c.border};color:${c.muted};transition:all .2s;margin:3px 3px 3px 0;display:inline-block;cursor:default}
        .sk:hover{border-color:${c.accent};color:${c.text};transform:translateY(-2px)}
        .pc{border:1px solid ${c.border};border-radius:14px;padding:22px;background:${c.card};transition:transform .25s,border-color .25s,box-shadow .25s;height:100%;display:flex;flex-direction:column}
        .pc:hover{transform:translateY(-4px);border-color:${c.accent}55;box-shadow:0 10px 34px ${c.accent}12}
        .nl{cursor:pointer;font-size:.76rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;transition:color .2s;color:${c.muted};border:none;background:none;padding:0}
        .nl:hover,.nl.on{color:${c.accent}}
        .cc{border:1px solid ${c.border};border-radius:12px;padding:18px 20px;background:${c.card};display:flex;align-items:center;gap:13px;transition:border-color .2s,transform .2s;text-decoration:none;color:inherit}
        .cc:hover{border-color:${c.accent};transform:translateY(-3px)}
        .ib{background:${c.card};border:1px solid ${c.border};border-radius:8px;width:33px;height:33px;cursor:pointer;font-size:.88rem;display:flex;align-items:center;justify-content:center;transition:all .2s;color:${c.text};flex-shrink:0}
        .ib:hover{border-color:${c.accent}}
        .lb{background:${c.card};border:1px solid ${c.border};border-radius:8px;padding:0 10px;height:33px;cursor:pointer;font-size:.7rem;font-weight:700;letter-spacing:.06em;transition:all .2s;color:${c.muted};flex-shrink:0;display:flex;align-items:center}
        .lb:hover{border-color:${c.accent};color:${c.accent}}
        .moreBtn{margin-top:auto;padding-top:14px;background:none;border:none;color:${c.accent};font-size:.76rem;font-weight:700;cursor:pointer;letter-spacing:.04em;text-align:left;transition:opacity .2s}
        .moreBtn:hover{opacity:.7}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes spinring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .ar{position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(${c.accent},transparent 55%,${c.accent});animation:spinring 3s linear infinite}
        .ari{position:absolute;inset:3px;border-radius:50%;background:${c.bg}}
        @media(max-width:860px){.dnav{display:none!important}.mnav{display:flex!important}.hg,.pg,.cg{grid-template-columns:1fr!important}.sg{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.sg{grid-template-columns:1fr!important}}
      `}</style>

      {modal && (
        <Modal project={modal} ui={t} c={c} onClose={() => setModal(null)} />
      )}

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `${c.bg}f2`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${c.border}`,
          padding: "0 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "58px",
          transition: "background .4s",
          width: "100%",
        }}
      >
        <span
          onClick={() => go("hero")}
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            color: c.accent,
            cursor: "pointer",
            letterSpacing: ".02em",
            flexShrink: 0,
          }}
        >
          HBA<span style={{ color: c.muted }}>.</span>
        </span>
        <div
          className="dnav"
          style={{ display: "flex", gap: "22px", alignItems: "center" }}
        >
          {navIds.map((id) => (
            <button
              key={id}
              className={`nl${active === id ? " on" : ""}`}
              onClick={() => go(id)}
            >
              {t.navLabels[id]}
            </button>
          ))}
          <button
            className="lb"
            onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
          >
            {lang === "fr" ? "EN 🇬🇧" : "FR 🇫🇷"}
          </button>
          <button className="ib" onClick={() => setDark((d) => !d)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
        <div
          className="mnav"
          style={{ display: "none", gap: "8px", alignItems: "center" }}
        >
          <button
            className="lb"
            onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button className="ib" onClick={() => setDark((d) => !d)}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="ib" onClick={() => setMenu((m) => !m)}>
            {menu ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {menu && (
        <div
          style={{
            position: "fixed",
            top: "58px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: c.surface,
            borderBottom: `1px solid ${c.border}`,
            padding: "16px 6%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            width: "100%",
          }}
        >
          {navIds.map((id) => (
            <button
              key={id}
              className="nl"
              style={{ textAlign: "left", color: c.muted }}
              onClick={() => go(id)}
            >
              {t.navLabels[id]}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "78px 6% 60px",
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${c.border} 1px,transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "5%",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: `radial-gradient(circle,${c.accent}18 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "820px",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "106px",
              height: "106px",
              marginBottom: "24px",
            }}
          >
            <div className="ar" />
            <div className="ari" />
            <img
              src="./photo.png"
              alt="Hamza Ben Aicha"
              style={{
                position: "absolute",
                inset: "4px",
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: c.accentDim,
              border: `1px solid ${c.accent}44`,
              borderRadius: "20px",
              padding: "4px 12px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#50c878",
                display: "inline-block",
                animation: "pulse 2s infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: ".66rem",
                color: c.accent,
                fontWeight: 700,
                letterSpacing: ".08em",
                whiteSpace: "nowrap",
              }}
            >
              {t.available}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,6vw,4.6rem)",
              lineHeight: 1.06,
              letterSpacing: "-.02em",
              marginBottom: "16px",
            }}
          >
            Hamza
            <br />
            <span style={{ color: c.accent }}>Ben Aicha</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(.88rem,2vw,1.08rem)",
              color: c.muted,
              maxWidth: "490px",
              lineHeight: 1.82,
              marginBottom: "30px",
            }}
          >
            <strong style={{ color: c.text }}>{t.role}</strong> — {t.heroSub}
          </p>
          <div
            style={{
              display: "flex",
              gap: "11px",
              flexWrap: "wrap",
              marginBottom: "44px",
            }}
          >
            <button
              onClick={() => go("projects")}
              style={{
                padding: "10px 22px",
                borderRadius: "8px",
                background: c.accent,
                color: "#fff",
                border: "none",
                fontWeight: 700,
                fontSize: ".82rem",
                letterSpacing: ".04em",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = ".85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t.heroBtn1}
            </button>
            <button
              onClick={() => go("contact")}
              style={{
                padding: "10px 22px",
                borderRadius: "8px",
                background: "transparent",
                color: c.accent,
                border: `1.5px solid ${c.accent}`,
                fontWeight: 700,
                fontSize: ".82rem",
                letterSpacing: ".04em",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.accentDim;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t.heroBtn2}
            </button>
          </div>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {[
              ["5+", t.stat1],
              ["Bac+5", t.stat2],
              ["End-to-end", t.stat3],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: c.accent,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: ".65rem",
                    color: c.muted,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{ padding: "88px 6%", background: c.surface, width: "100%" }}
      >
        <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }}>
          <FadeIn>
            <Label color={c.accent} text={t.aboutLabel} />
          </FadeIn>
          <div
            className="hg"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <FadeIn delay={0.05}>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem,3vw,2.4rem)",
                  lineHeight: 1.15,
                  marginBottom: "18px",
                }}
              >
                {t.aboutTitle1}
                <br />
                <span style={{ color: c.accent }}>{t.aboutTitle2}</span>
              </h2>
              <p
                style={{
                  color: c.muted,
                  lineHeight: 1.84,
                  fontSize: ".88rem",
                  marginBottom: "13px",
                }}
              >
                {t.aboutP1}
              </p>
              <p
                style={{ color: c.muted, lineHeight: 1.84, fontSize: ".88rem" }}
              >
                {t.aboutP2.split(t.aboutBold).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <strong style={{ color: c.text }}>{t.aboutBold}</strong>
                    )}
                  </span>
                ))}
              </p>
            </FadeIn>
            <FadeIn delay={0.13}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {t.cards.map(([icon, title, desc]) => (
                  <div
                    key={title}
                    style={{
                      background: c.card,
                      border: `1px solid ${c.border}`,
                      borderRadius: "12px",
                      padding: "15px",
                      transition: "border-color .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = c.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = c.border)
                    }
                  >
                    <div style={{ fontSize: "1.25rem", marginBottom: "7px" }}>
                      {icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: ".81rem",
                        marginBottom: "3px",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        color: c.muted,
                        fontSize: ".72rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "88px 6%", width: "100%" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }}>
          <FadeIn>
            <Label color={c.accent} text={t.projectsLabel} />
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                marginBottom: "36px",
              }}
            >
              {t.projectsTitle}
            </h2>
          </FadeIn>
          <div
            className="pg"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
              width: "100%",
            }}
          >
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.07}>
                <div className="pc">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "11px",
                    }}
                  >
                    <span style={{ fontSize: "1.7rem" }}>{p.icon}</span>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: ".66rem",
                          color: c.accent,
                          fontWeight: 700,
                          letterSpacing: ".04em",
                        }}
                      >
                        {p.type}
                      </div>
                      <div style={{ fontSize: ".66rem", color: c.muted }}>
                        {p.period}
                      </div>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: ".9rem",
                      marginBottom: "8px",
                      lineHeight: 1.35,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: c.muted,
                      fontSize: ".76rem",
                      lineHeight: 1.72,
                      marginBottom: "12px",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ marginBottom: "4px" }}>
                    {p.tags.map((tg) => (
                      <span key={tg} className="tag">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <button className="moreBtn" onClick={() => setModal(p)}>
                    {t.readMore}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section style={{ padding: "0 6% 88px", width: "100%" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }}>
          <FadeIn>
            <div
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: "16px",
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>🏅</div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div
                  style={{
                    fontSize: ".68rem",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: c.accent,
                    marginBottom: "6px",
                  }}
                >
                  {t.certLabel}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    marginBottom: "6px",
                  }}
                >
                  {t.certTitle}
                </div>
                <p
                  style={{ color: c.muted, fontSize: ".8rem", lineHeight: 1.7 }}
                >
                  {t.certSub}
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1VgZFAHFuTO37qTXqythagVriihwSKQZg/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: c.accent,
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: ".8rem",
                  letterSpacing: ".04em",
                  cursor: "pointer",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "opacity .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t.certBtn}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: "88px 6%", background: c.surface, width: "100%" }}
      >
        <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }}>
          <FadeIn>
            <Label color={c.accent} text={t.skillsLabel} />
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                marginBottom: "36px",
              }}
            >
              {t.skillsTitle}
            </h2>
          </FadeIn>
          <div
            className="sg"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
              width: "100%",
            }}
          >
            {skills.map((s, i) => (
              <FadeIn key={s.cat} delay={i * 0.05}>
                <div
                  style={{
                    background: c.card,
                    border: `1px solid ${c.border}`,
                    borderRadius: "12px",
                    padding: "15px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".64rem",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: c.accent,
                      marginBottom: "10px",
                    }}
                  >
                    {s.cat}
                  </div>
                  <div>
                    {s.items.map((item) => (
                      <span key={item} className="sk">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "88px 6%", width: "100%" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", width: "100%" }}>
          <FadeIn>
            <Label color={c.accent} text={t.contactLabel} />
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                marginBottom: "10px",
              }}
            >
              {t.contactTitle}
            </h2>
            <p
              style={{
                color: c.muted,
                fontSize: ".88rem",
                marginBottom: "36px",
                maxWidth: "420px",
                lineHeight: 1.8,
              }}
            >
              {t.contactSub}
            </p>
          </FadeIn>
          <div
            className="cg"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "13px",
              width: "100%",
            }}
          >
            {t.contactItems.map(([icon, label, val, href], i) => (
              <FadeIn key={label} delay={i * 0.06}>
                <a href={href} target="_blank" rel="noreferrer" className="cc">
                  <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>
                    {icon}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: ".63rem",
                        color: c.accent,
                        fontWeight: 700,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        color: c.text,
                        fontSize: ".8rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val}
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      color: c.muted,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: `1px solid ${c.border}`,
          padding: "20px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            color: c.accent,
            fontSize: ".9rem",
          }}
        >
          HBA.
        </span>
        <span style={{ fontSize: ".7rem", color: c.muted }}>
          Hamza Ben Aicha — {t.footerRole}
        </span>
        <span style={{ fontSize: ".7rem", color: c.muted }}>Tunis 🇹🇳</span>
      </footer>
    </div>
  );
}
