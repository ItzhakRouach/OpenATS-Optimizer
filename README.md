# 🎯 OpenATS Optimizer

Full-stack application that helps users optimize their resumes for Applicant Tracking Systems (ATS). By leveraging a localized LLM (Llama 3), this tool securely analyzes PDF resumes against target job descriptions and provides actionable, keyword-focused feedback without sending sensitive personal data to the cloud.

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express, TypeScript, Multer
- **AI Integration:** Ollama (running Llama 3 locally)
- **Architecture:** Clean Architecture (Controllers, Use Cases, Webserver routing)
- **DevOps:** Docker, Docker Compose (Multi-stage builds, Internal Networking)

## 🧠 Core Features

- **Local AI Inference:** Uses Ollama to run Llama 3 entirely on your machine, ensuring zero data leakage.
- **Secure PDF Parsing:** Extracts text from uploaded resumes in memory (RAM) without writing temporary files to the disk.
- **Clean Architecture:** Backend logic is strictly separated into Use Cases and Controllers for high maintainability and easy testing.
- **Dockerized Environment:** The entire stack (Frontend, Backend, and AI) runs in isolated containers with automated internal networking.

## Project Demo Gallery

 <p align="center">
  <img src="assets/input.png" alt="ATS Analysis Dashboard" width="32%" />
  <img src="assets/Result.png" alt="AI Insight" width="32%" />
  <img src="assets/interview.png" alt="Mock Interview Feature" width="32%" />
</p>

---

## 🏗️ Project Structure

```text
OpenATS/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (InterviewPrep, OptimizerForm)
│   │   ├── services/       # API call definitions
│   │   └── types/          # TypeScript interfaces
│   └── package.json
│
├── server/                 # Node.js Backend (Clean Architecture)
│   ├── src/
│   │   ├── domain/         # Core business interfaces (IAIService)
│   │   ├── use-cases/      # Application logic (GenerateInterview)
│   │   └── infrastructure/ # Express controllers, Routes, OllamaService
│   └── package.json
│
└── docker-compose.yml      # Container orchestration

## 🐳 How to Run (Docker)

You don't need to install Node modules manually. The entire application is containerized.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Quick Start

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/yourusername/open-ats-optimizer.git
    cd open-ats-optimizer
    \`\`\`

2.  **Spin up the containers:**
    \`\`\`bash
    docker compose up --build
    \`\`\`

3.  **Pull the AI Model (First time only):**
    Open a new terminal window and tell the Ollama container to download the Llama 3 model:
    \`\`\`bash
    docker exec -it ollama_service ollama pull llama3
    \`\`\`

4.  **Open the App:**
    Navigate to \`http://localhost\` in your browser.

_(Note: The first analysis might take a moment as the AI model loads into memory)._

## 🛑 Stopping the Application

To cleanly stop the application and remove the containers (your AI model data will remain safely stored in a Docker volume):
\`\`\`bash
docker compose down
\`\`\`
```
