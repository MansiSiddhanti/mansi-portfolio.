import { resumeUrl } from "./resume";

export const personal = {
  name: "Mansi Siddhanti",
  tagline:
    "Driven by curiosity, powered by creativity, and inspired by possibilities. I love transforming ideas into meaningful experiences through technology and innovation.",
  role: "AI & Data Science Engineer",
  /** Shown in the hero badge */
  availability: "Open to Data Science, ML & AI roles",
  bio: [
    "I’m an AI & Data Science engineer who enjoys the whole journey: cleaning and modelling data, building and evaluating models, and shipping the dashboard or app that puts the results in front of people.",
    "At Finlabs India I built a full-stack JIRA analytics platform with Python, PostgreSQL, FastAPI and React. At Stomatobot Technology I developed a real-time video monitoring system with OpenCV. Alongside that, I’ve built projects with LLMs and RAG, deep learning, YOLO object detection and IoT-driven machine learning.",
  ],
  location: "Pune, India",
  email: "siddhantimansi11@gmail.com",
  phone: "+91 95299 03062",
  github: "https://github.com/MansiSiddhanti",
  githubHandle: "github.com/MansiSiddhanti",
  linkedin: "https://linkedin.com/in/mansisiddhanti",
  linkedinHandle: "linkedin.com/in/mansisiddhanti",
  resumeUrl,
};

export const experience = [
  {
    id: 1,
    role: "AI/ML Intern",
    company: "Finlabs India Pvt Ltd",
    period: "Jun 2026 – Oct 2026",
    location: "Pune, India",
    bullets: [
      "Built a full-stack JIRA analytics dashboard to analyse resource allocation, project effort, employee utilisation, epic performance and worklog trends from monthly JIRA reports.",
      "Engineered data processing pipelines with Python, Pandas, SQLAlchemy and PostgreSQL, maintaining historical upload records and serving dynamic analytics through FastAPI REST APIs.",
      "Developed a React dashboard (Vite, Tailwind CSS, Recharts) with KPIs, filters and historical views.",
    ],
  },
  {
    id: 2,
    role: "Data Science Intern",
    company: "Stomatobot Technology Pvt Ltd",
    period: "Jan 2025 – Jun 2025",
    location: "Pune, India",
    bullets: [
      "Engineered a real-time CCTV health monitoring system with OpenCV to detect video loss, frozen or corrupted frames, and low-visibility conditions.",
      "Reduced false detection alerts by 30% while developing automated logging and repair components for a video quality assurance framework.",
    ],
  },
];

export type SkillTier = "core" | "proficient" | "familiar";

export interface SkillItem {
  name: string;
  tier: SkillTier;
}

export const skills: { category: string; items: SkillItem[] }[] = [
  {
    category: "Languages & Data",
    items: [
      { name: "Python", tier: "core" },
      { name: "SQL", tier: "core" },
      { name: "Pandas", tier: "core" },
      { name: "NumPy", tier: "core" },
      { name: "PostgreSQL", tier: "proficient" },
      { name: "SQLAlchemy", tier: "proficient" },
      { name: "Supabase", tier: "proficient" },
      { name: "Tableau", tier: "proficient" },
      { name: "Jupyter Notebook", tier: "proficient" },
      { name: "C", tier: "familiar" },
      { name: "C++", tier: "familiar" },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "Scikit-learn", tier: "core" },
      { name: "Predictive modeling", tier: "core" },
      { name: "PyTorch", tier: "proficient" },
      { name: "CNNs", tier: "proficient" },
      { name: "Transfer learning", tier: "proficient" },
      { name: "TensorFlow", tier: "familiar" },
    ],
  },
  {
    category: "Generative AI & Computer Vision",
    items: [
      { name: "RAG", tier: "core" },
      { name: "OpenCV", tier: "core" },
      { name: "LLMs", tier: "proficient" },
      { name: "Prompt engineering", tier: "proficient" },
      { name: "Ollama", tier: "proficient" },
      { name: "ChromaDB", tier: "proficient" },
      { name: "Sentence Transformers", tier: "proficient" },
      { name: "YOLO", tier: "proficient" },
      { name: "Image processing", tier: "proficient" },
      { name: "Roboflow", tier: "familiar" },
    ],
  },
  {
    category: "Development & Tools",
    items: [
      { name: "FastAPI", tier: "core" },
      { name: "REST APIs", tier: "core" },
      { name: "React.js", tier: "proficient" },
      { name: "Streamlit", tier: "proficient" },
      { name: "Git", tier: "proficient" },
      { name: "Recharts", tier: "familiar" },
      { name: "Tailwind CSS", tier: "familiar" },
    ],
  },
];

export interface Challenge {
  problem: string;
  solution: string;
}

export interface Project {
  id: number;
  title: string;
  icon: string;
  tagline: string;
  /** One-line scope for recruiters / hiring managers */
  ownership: string;
  description: string;
  tech: string[];
  featured: boolean;
  status: "Live" | "Completed" | "In Progress";
  period: string;
  problemStatement: string;
  architecture: string;
  features: string[];
  challenges: Challenge[];
  impact: string[];
  live: string | null;
  /** Repository link; null for private / company code */
  github: string | null;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "RAG Chatbot",
    icon: "MessageSquareText",
    tagline: "Chat with your documents — a fully local retrieval-augmented chatbot",
    ownership: "Built the ingestion, embeddings, retrieval and the Streamlit chat UI",
    description:
      "Embeds PDF text with Sentence Transformers, retrieves relevant passages from ChromaDB via semantic search, and answers with Llama 3.2 running locally on Ollama.",
    tech: ["Python", "Streamlit", "ChromaDB", "Ollama", "Llama 3.2", "Sentence Transformers"],
    featured: true,
    status: "Completed",
    period: "",
    problemStatement:
      "Finding answers inside long PDFs means scrolling and keyword-searching by hand, and sending private documents to a hosted LLM is not always acceptable. The goal was a chatbot that answers questions grounded in your own documents while running entirely on your machine.",
    architecture:
      "Uploaded PDFs are parsed and split into chunks, embedded with Sentence Transformers and stored in ChromaDB. Each question is embedded the same way, the closest chunks are retrieved by semantic search, and Llama 3.2 on Ollama generates an answer from that retrieved context inside a Streamlit chat interface.",
    features: [
      "PDF upload, text extraction and chunking",
      "Sentence Transformer embeddings stored in a ChromaDB vector store",
      "Semantic search to retrieve the passages most relevant to each question",
      "Answers generated by Llama 3.2 through Ollama — no data leaves the machine",
      "Simple Streamlit chat interface",
    ],
    challenges: [
      {
        problem: "Answers drift away from the document when the model relies on its own knowledge.",
        solution: "Grounded every prompt in the retrieved passages so responses are built from the document’s own text.",
      },
      {
        problem: "Running an LLM locally limits how much context can be sent per question.",
        solution: "Chunked documents and sent only the top semantically matched passages instead of the full text.",
      },
    ],
    impact: [
      "End-to-end RAG pipeline that runs fully offline with open-source models",
      "Keeps private documents on the local machine",
    ],
    live: null,
    github: "https://github.com/MansiSiddhanti/AI_Projects/tree/main/chat-with-your-documents",
  },
  {
    id: 2,
    title: "JIRA Analytics Dashboard",
    icon: "LayoutDashboard",
    tagline: "Full-stack analytics platform built during my internship at Finlabs India",
    ownership: "Built end to end: data pipelines, FastAPI backend and React dashboard",
    description:
      "Turns monthly JIRA reports into insight on resource allocation, project effort, employee utilisation, epic performance and worklog trends, with historical upload records.",
    tech: ["Python", "Pandas", "SQLAlchemy", "PostgreSQL", "FastAPI", "React", "Recharts", "Tailwind CSS"],
    featured: true,
    status: "Completed",
    period: "Jun 2026 – Oct 2026",
    problemStatement:
      "Monthly JIRA exports held the data needed to understand team effort and utilisation, but analysing them meant manual spreadsheet work each month, with no easy way to compare against previous months.",
    architecture:
      "Monthly JIRA reports are uploaded and processed with Python and Pandas, then stored in PostgreSQL through SQLAlchemy along with a history of every upload. FastAPI REST APIs serve the aggregated analytics, and a React dashboard (Vite, Tailwind CSS, Recharts) presents KPIs, filters and historical views.",
    features: [
      "Upload pipeline for monthly JIRA reports with historical records",
      "Analytics on resource allocation, project effort and employee utilisation",
      "Epic performance and worklog trend analysis",
      "FastAPI REST APIs serving dynamic analytics",
      "React dashboard with KPIs, filters and historical views",
    ],
    challenges: [
      {
        problem: "Each monthly report needed to be comparable with earlier months.",
        solution: "Stored every upload as a historical record in PostgreSQL so the dashboard can show trends over time.",
      },
      {
        problem: "Raw JIRA exports are not shaped for analytics.",
        solution: "Built Pandas processing pipelines to clean and aggregate the data before serving it through the API.",
      },
    ],
    impact: [
      "Replaced manual report analysis with an interactive dashboard",
      "Gave visibility into utilisation, effort and epic performance month over month",
    ],
    live: null,
    github: null,
  },
  {
    id: 3,
    title: "FarmBuddy",
    icon: "Sprout",
    tagline: "AI-powered smart farming assistant combining IoT sensors and ML",
    ownership: "Final-year project: sensors, ML models, FastAPI backend and React dashboard",
    description:
      "Integrates soil moisture and DHT11 sensors with ML-driven crop recommendations and automated irrigation, backed by FastAPI, Supabase PostgreSQL and a React dashboard.",
    tech: ["React", "FastAPI", "Supabase", "PostgreSQL", "Scikit-learn", "Random Forest", "IoT", "OpenWeatherMap API"],
    featured: true,
    status: "Completed",
    period: "",
    problemStatement:
      "Farmers often choose crops and schedule irrigation from experience alone, which wastes water and misses better-suited crops. FarmBuddy brings live field data and machine learning into those everyday decisions.",
    architecture:
      "Soil moisture and DHT11 (temperature and humidity) sensors stream readings to a FastAPI backend that stores them in Supabase PostgreSQL. A Random Forest model recommends crops from the field conditions, and the irrigation logic combines soil moisture with OpenWeatherMap rain forecasts before switching the pump. A React dashboard shows readings, recommendations and irrigation status.",
    features: [
      "Live soil moisture, temperature and humidity monitoring",
      "Random Forest crop recommendation model",
      "Automated irrigation that checks rain forecasts before watering",
      "FastAPI backend with Supabase PostgreSQL storage",
      "React dashboard for readings and recommendations",
    ],
    challenges: [
      {
        problem: "Watering on soil moisture alone wastes water when rain is about to fall.",
        solution: "Combined sensor readings with OpenWeatherMap rain forecasts before triggering irrigation.",
      },
      {
        problem: "Connecting hardware, ML and a web app into one system.",
        solution: "Used FastAPI as a single backend for sensor ingestion, model inference and the dashboard API.",
      },
    ],
    impact: [
      "Brought IoT sensing, ML and a web dashboard together in one working system",
      "Made irrigation decisions weather-aware",
    ],
    live: null,
    github: "https://github.com/MansiSiddhanti/Final_Year_Project",
  },
  {
    id: 4,
    title: "Plant Leaf Disease Classifier",
    icon: "Leaf",
    tagline: "Transfer learning with a pretrained ResNet to detect leaf disease",
    ownership: "Built the data augmentation, fine-tuning and evaluation",
    description:
      "Fine-tuned a pretrained ResNet CNN with transfer learning and data augmentation to detect disease from plant leaf images.",
    tech: ["Python", "PyTorch", "CNN", "ResNet", "Transfer learning"],
    featured: false,
    status: "Completed",
    period: "",
    problemStatement:
      "Spotting leaf disease early helps protect crops, but manual inspection needs expertise. An image classifier can flag diseased leaves from a photo.",
    architecture:
      "Leaf images are augmented and fed to a pretrained ResNet. The network is fine-tuned on the leaf dataset in PyTorch and evaluated on held-out images.",
    features: [
      "Transfer learning from a pretrained ResNet",
      "Data augmentation to improve generalisation",
      "Fine-tuning and evaluation in PyTorch",
    ],
    challenges: [
      {
        problem: "Training a deep CNN from scratch needs far more labelled images than were available.",
        solution: "Started from pretrained ResNet weights and fine-tuned, with augmentation to stretch the dataset.",
      },
    ],
    impact: ["Applied transfer learning to a real agricultural image problem"],
    live: null,
    github: "https://github.com/MansiSiddhanti/AI_Projects/tree/main/plant-leaf-disease-classifier",
  },
  {
    id: 5,
    title: "AI-Based Garbage Detection",
    icon: "Trash2",
    tagline: "Real-time YOLO detector for plastic, paper and bottles",
    ownership: "Built the dataset preparation, YOLO training and real-time inference",
    description:
      "A real-time YOLO object detector for plastic, paper and bottles, trained on 1,000+ images prepared with Roboflow.",
    tech: ["YOLO", "OpenCV", "Python", "Roboflow"],
    featured: false,
    status: "Completed",
    period: "",
    problemStatement:
      "Sorting waste by hand is slow and inconsistent. Detecting common waste types automatically from a camera feed is a first step towards automated sorting.",
    architecture:
      "1,000+ labelled images are prepared in Roboflow and used to train a YOLO model. OpenCV reads frames from a camera or video, the model detects plastic, paper and bottles, and boxes with labels are drawn in real time.",
    features: [
      "Detection of three waste classes: plastic, paper and bottles",
      "Trained on 1,000+ Roboflow-labelled images",
      "Real-time inference on camera or video frames with OpenCV",
    ],
    challenges: [
      {
        problem: "Waste items vary a lot in shape, colour and lighting.",
        solution: "Built a varied dataset of 1,000+ images with Roboflow for training.",
      },
    ],
    impact: ["Working real-time detector across three waste categories"],
    live: null,
    github: "https://github.com/MansiSiddhanti",
  },
  {
    id: 6,
    title: "Hand Gesture Recognition",
    icon: "Hand",
    tagline: "Touchless computer control with real-time gesture recognition",
    ownership: "Built the image processing pipeline and gesture-to-action mapping",
    description:
      "Real-time hand gesture recognition for touchless computer control using image processing with OpenCV.",
    tech: ["OpenCV", "Python", "Image processing"],
    featured: false,
    status: "Completed",
    period: "",
    problemStatement:
      "Controlling a computer without touching it is useful for accessibility and hands-busy situations. A webcam is enough to read simple hand gestures.",
    architecture:
      "Webcam frames are captured with OpenCV, the hand region is segmented with image processing, the gesture is recognised from the hand’s shape, and each gesture is mapped to a computer control action.",
    features: [
      "Real-time webcam capture and hand segmentation",
      "Gesture recognition from hand shape",
      "Gestures mapped to computer control actions",
    ],
    challenges: [
      {
        problem: "Backgrounds and lighting make the hand hard to separate from the scene.",
        solution: "Used image processing steps such as thresholding and contour analysis to isolate the hand.",
      },
    ],
    impact: ["Touchless control using only a standard webcam"],
    live: null,
    github: "https://github.com/MansiSiddhanti",
  },
  {
    id: 7,
    title: "Biologically Inspired Vision Vehicle",
    icon: "Fish",
    tagline: "Fish-inspired robotic vehicle with real-time obstacle detection",
    ownership: "Built the vision-based obstacle detection and control",
    description:
      "A fish-inspired robotic vehicle with real-time obstacle detection and autonomous control.",
    tech: ["OpenCV", "Python", "Robotics"],
    featured: false,
    status: "Completed",
    period: "",
    problemStatement:
      "Robots that move autonomously need to see and avoid obstacles. This project took inspiration from how fish navigate to build a small vision-guided vehicle.",
    architecture:
      "A camera on the vehicle feeds frames to an OpenCV pipeline that detects obstacles in real time. The control logic turns detections into steering decisions so the vehicle can move autonomously.",
    features: [
      "Fish-inspired vehicle design",
      "Real-time obstacle detection with OpenCV",
      "Autonomous movement driven by vision",
    ],
    challenges: [
      {
        problem: "Detection has to be fast enough for the vehicle to react while moving.",
        solution: "Kept the vision pipeline lightweight so it runs in real time.",
      },
    ],
    impact: ["Combined computer vision and robotics into an autonomous vehicle"],
    live: null,
    github: "https://github.com/MansiSiddhanti",
  },
];

export const stats = [
  { label: "Industry internships", value: "2" },
  { label: "Hands-on projects", value: "7" },
  { label: "B.Tech CGPA", value: "8.49" },
  { label: "Certifications", value: "8" },
];

export const education = [
  {
    degree: "B.Tech in Artificial Intelligence and Data Science",
    honours: "",
    institution: "Marathwada Mitra Mandal’s College of Engineering",
    year: "2026",
    location: "Pune",
    score: "8.49 CGPA",
  },
  {
    degree: "Diploma in Computer Engineering",
    honours: "",
    institution: "Government Polytechnic",
    year: "2023",
    location: "",
    score: "88.40%",
  },
];

export const certifications = [
  "Python",
  "Machine Learning",
  "Generative AI",
  "LLMs",
  "Prompt Engineering",
  "Intro to AI",
  "Intro to Cybersecurity",
  "Intro to Programming",
];
