/**
 * Mermaid flow definitions per project, rendered at runtime by
 * <ArchitectureDiagram />. Keys match `Project.id` in portfolio.ts.
 * Node labels are quoted so Mermaid parses special characters safely.
 */

const styles = `
    classDef data fill:#f0f9ff,stroke:#0369a1,stroke-width:2px;
    classDef compute fill:#f5f3ff,stroke:#6d28d9,stroke-width:2px;
    classDef model fill:#1e40af,stroke:#1e3a8a,stroke-width:2px,color:#fff;
    classDef storage fill:#ecfdf5,stroke:#059669,stroke-width:2px;
    classDef ui fill:#fff7ed,stroke:#c2410c,stroke-width:2px;`;

// 1. RAG Chatbot
const ragMermaid = `graph TD${styles}

    subgraph Ingest ["1. Document Ingestion"]
        PDF["PDF Upload"] --> Extract["Text Extraction"]
        Extract --> Chunk["Chunking"]
        Chunk --> Embed["Sentence Transformers<br/>Embeddings"]
    end

    Embed --> Store[("ChromaDB<br/>Vector Store")]

    subgraph Query ["2. Question Answering"]
        User["User Question<br/>(Streamlit Chat)"] --> QEmbed["Embed Question"]
        QEmbed --> Search["Semantic Search"]
        Store --> Search
        Search --> Context["Top Relevant Passages"]
        Context --> LLM["Llama 3.2 via Ollama<br/>(runs locally)"]
        User --> LLM
    end

    LLM --> Answer["Grounded Answer"]

    class PDF,User data;
    class Extract,Chunk,Embed,QEmbed,Search,Context compute;
    class LLM model;
    class Store storage;
    class Answer ui;`;

// 2. JIRA Analytics Dashboard
const jiraMermaid = `graph LR${styles}

    Reports["Monthly JIRA Reports"] --> Upload["Upload"]

    subgraph Backend ["Python Backend"]
        Upload --> Process["Pandas Processing<br/>& Aggregation"]
        Process --> ORM["SQLAlchemy"]
        API["FastAPI REST APIs"]
    end

    ORM --> DB[("PostgreSQL<br/>+ Upload History")]
    DB --> API

    subgraph Frontend ["React Dashboard (Vite, Tailwind)"]
        API --> KPIs["KPIs"]
        API --> Filters["Filters"]
        API --> Charts["Recharts Trends<br/>& Historical Views"]
    end

    class Reports data;
    class Upload,Process,ORM,API compute;
    class DB storage;
    class KPIs,Filters,Charts ui;`;

// 3. FarmBuddy
const farmMermaid = `graph TD${styles}

    subgraph Field ["IoT Sensors"]
        Soil["Soil Moisture Sensor"]
        DHT["DHT11<br/>Temperature & Humidity"]
    end

    Soil & DHT --> API["FastAPI Backend"]
    API --> DB[("Supabase PostgreSQL")]

    subgraph Intelligence ["ML & Decision Logic"]
        API --> RF["Random Forest<br/>Crop Recommendation"]
        Weather["OpenWeatherMap<br/>Rain Forecast"] --> Irrigate{"Irrigate?"}
        API --> Irrigate
    end

    Irrigate -->|Dry, no rain due| Pump["Automated Irrigation"]
    Irrigate -->|Rain expected| Skip["Skip Watering"]

    DB & RF & Irrigate --> Dash["React Dashboard"]

    class Soil,DHT,Weather data;
    class API,Irrigate compute;
    class RF model;
    class DB storage;
    class Pump,Skip,Dash ui;`;

// 4. Plant Leaf Disease Classifier
const leafMermaid = `graph LR${styles}

    Images["Leaf Images"] --> Aug["Data Augmentation"]
    Pre["Pretrained ResNet<br/>(ImageNet weights)"] --> FT
    Aug --> FT["Fine-tuning<br/>(PyTorch)"]
    FT --> Model["Leaf Disease<br/>Classifier"]
    Model --> Eval["Evaluation on<br/>Held-out Images"]
    Eval --> Pred["Healthy / Diseased<br/>Prediction"]

    class Images,Pre data;
    class Aug,FT,Eval compute;
    class Model model;
    class Pred ui;`;

// 5. Garbage Detection
const garbageMermaid = `graph LR${styles}

    subgraph Training ["Training"]
        Data["1,000+ Images"] --> Label["Roboflow<br/>Labelling & Export"]
        Label --> Train["YOLO Training"]
    end

    Train --> YOLO["YOLO Detector"]

    subgraph Inference ["Real-time Inference"]
        Cam["Camera / Video"] --> Frames["OpenCV Frames"]
        Frames --> YOLO
        YOLO --> Boxes["Plastic · Paper · Bottle<br/>Boxes & Labels"]
    end

    class Data,Cam data;
    class Label,Train,Frames compute;
    class YOLO model;
    class Boxes ui;`;

// 6. Hand Gesture Recognition
const gestureMermaid = `graph LR${styles}

    Cam["Webcam"] --> Frames["OpenCV Frame Capture"]
    Frames --> Seg["Hand Segmentation<br/>(thresholding, contours)"]
    Seg --> Rec["Gesture Recognition"]
    Rec --> Map["Gesture → Action Mapping"]
    Map --> PC["Touchless Computer Control"]

    class Cam data;
    class Frames,Seg,Map compute;
    class Rec model;
    class PC ui;`;

// 7. Biologically Inspired Vision Vehicle
const vehicleMermaid = `graph LR${styles}

    Cam["On-board Camera"] --> Frames["OpenCV Frames"]
    Frames --> Detect["Real-time<br/>Obstacle Detection"]
    Detect --> Decide{"Obstacle ahead?"}
    Decide -->|Yes| Steer["Steer Away"]
    Decide -->|No| Forward["Move Forward"]
    Steer & Forward --> Motors["Fish-inspired<br/>Vehicle Motors"]

    class Cam data;
    class Frames,Decide compute;
    class Detect model;
    class Steer,Forward,Motors ui;`;

export const projectMermaid: Record<number, string> = {
  1: ragMermaid,
  2: jiraMermaid,
  3: farmMermaid,
  4: leafMermaid,
  5: garbageMermaid,
  6: gestureMermaid,
  7: vehicleMermaid,
};

export function getProjectMermaid(projectId: number): string | undefined {
  return projectMermaid[projectId];
}
