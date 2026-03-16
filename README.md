# 🛡️ CloudGuard Frontend

> **React + TypeScript dashboard for the GenAI-Powered Cloud Security Copilot**
> Built for the Elasticsearch Agent Builder Hackathon & Amazon Nova AI Hackathon — 2026

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?style=for-the-badge)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Components](#-components)
- [API Integration](#-api-integration)
- [Setup & Installation](#-setup--installation)
- [Available Scripts](#-available-scripts)
- [Environment & Configuration](#-environment--configuration)
- [Backend Connection](#-backend-connection)

---

## 🎯 Overview

CloudGuard Frontend is a real-time security operations dashboard that connects to a FastAPI + Elasticsearch backend. It provides:

- **Live security posture scoring** — fetched from backend on every page load
- **Interactive findings explorer** — filter, sort, expand 200+ security findings
- **Cost waste analysis** — identify and quantify underutilized AWS resources
- **AI Security Copilot** — conversational interface powered by Amazon Nova 2 Lite
- **Scan history & trends** — track security posture improvement over time
- **Run Scan button** — triggers a live re-scan of all cloud resources

All data is fetched in real time from the backend API. There is no mock data.

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vite** | 5.x | Build tool and dev server |
| **React** | 18 | UI framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **shadcn/ui** | latest | Pre-built accessible components |
| **Recharts** | 2.x | Charts (line, pie, bar) |
| **React Router** | 6.x | Client-side routing |
| **Framer Motion** | latest | Page transition animations |
| **Lucide React** | latest | Icon library |
| **TanStack Query** | 5.x | Server state management |

---

## 📁 Project Structure

```
glow-app-architect/
├── src/
│   ├── data/
│   │   └── api.ts              # All backend API calls + TypeScript types
│   │
│   ├── pages/
│   │   ├── ProductOverview.tsx # Landing/home page (route: /)
│   │   ├── Index.tsx           # Main dashboard (route: /dashboard)
│   │   ├── Findings.tsx        # Security findings table (route: /findings)
│   │   ├── CostAnalysis.tsx    # Cost waste analysis (route: /cost)
│   │   ├── Copilot.tsx         # AI chat interface (route: /copilot)
│   │   ├── Logs.tsx            # System logs viewer (route: /logs)
│   │   ├── SettingsPage.tsx    # Settings (route: /settings)
│   │   └── NotFound.tsx        # 404 page (route: *)
│   │
│   ├── components/
│   │   ├── AppLayout.tsx       # Root layout — header + sidebar + page transitions
│   │   ├── AppHeader.tsx       # Top navigation bar (unused — logic in AppLayout)
│   │   ├── AppSidebar.tsx      # Slide-in navigation sidebar
│   │   ├── MetricCard.tsx      # KPI card (score, count, dollar amount)
│   │   ├── SeverityChart.tsx   # Donut chart — findings by severity
│   │   ├── TrendChart.tsx      # Line chart — security score over time
│   │   ├── SeverityBadge.tsx   # Colored badge (CRITICAL/HIGH/MEDIUM/LOW)
│   │   ├── NavLink.tsx         # Sidebar navigation link
│   │   └── ui/                 # shadcn/ui base components
│   │
│   ├── App.tsx                 # Router setup — all routes defined here
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles + Tailwind directives
│
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Pages

### `/` — Product Overview
Landing page introducing CloudGuard. No backend calls.

### `/dashboard` — Infrastructure Overview (`Index.tsx`)
Main dashboard. Fetches and displays:
- 4 metric cards: Security Score, Critical Findings, Monthly Waste, Resources Scanned
- Security Score Trend line chart (7-day history)
- Findings by Severity donut chart
- Top 5 risk findings table
- Recent events log (static)

**API calls:** `GET /api/score/` + `GET /api/findings/top?limit=5`

### `/findings` — Security Findings (`Findings.tsx`)
Full findings explorer with:
- Filter by severity (ALL / CRITICAL / HIGH / MEDIUM / LOW)
- Sort by risk score (ascending/descending)
- Click to expand — shows Description, Remediation, Business Impact
- Shows count per severity in filter buttons

**API calls:** `GET /api/findings/top?limit=200`

### `/cost` — Cost Analysis (`CostAnalysis.tsx`)
Cost waste dashboard showing:
- Total monthly waste, annual projection, idle resource count, savings rate
- Bar chart: Monthly Cost vs Estimated Waste per resource
- Detailed table: Resource ID, Type, Region, CPU Avg, Monthly Cost, Waste

**API calls:** `GET /api/findings/cost-waste`

### `/copilot` — AI Security Copilot (`Copilot.tsx`)
Conversational AI interface:
- Powered by Amazon Nova 2 Lite via the backend agent
- Shows which Elasticsearch tools were called per response
- Suggested question buttons for quick queries
- Typing indicator while agent is reasoning
- Falls back to informative message if backend is offline

**API calls:** `POST /api/chat/` with `{"message": "..."}`

### `/logs` — System Logs (`Logs.tsx`)
Terminal-style log viewer showing scan history and rule engine output. Static entries styled as real-time logs.

### `/settings` — Settings (`SettingsPage.tsx`)
Settings interface (UI only).

---

## 🧩 Components

### `AppLayout.tsx`
Root layout component wrapping every page. Contains:
- **Run Scan button** — calls `POST /api/score/scan`, shows spinner during scan, displays result message, auto-reloads page after completion
- **Last scan timestamp** — updates after each successful scan
- **Slide-in sidebar** — toggled by hamburger menu
- **Page transition animations** via Framer Motion

### `MetricCard.tsx`
Displays a single KPI with label, value, trend, and color-coded status.

Props:
```typescript
{
  label:  string                          // e.g. "Security Score"
  value:  string                          // e.g. "32/100"
  trend:  string                          // e.g. "↓ At Risk"
  status: "normal" | "warning" | "critical"
}
```

### `SeverityChart.tsx`
Recharts `PieChart` with donut style. Fetches live counts from `/api/findings/summary` on mount. Shows Critical/High/Medium/Low with percentages.

### `TrendChart.tsx`
Recharts `LineChart`. Fetches 7-day scan history from `/api/score/trend`. Shows Security and Cost Health score lines. Displays empty state message if fewer than 2 data points exist.

### `SeverityBadge.tsx`
Colored pill badge for severity levels:
- 🔴 CRITICAL — red
- 🟠 HIGH — orange
- 🟡 MEDIUM — yellow
- 🟢 LOW — green

### `AppSidebar.tsx`
Animated slide-in sidebar with navigation links to all pages. Shows system status indicator at bottom.

---

## 🔌 API Integration

All backend communication is centralized in `src/data/api.ts`.

### Base URL
```typescript
const BASE = "http://localhost:8000/api";
```

### Available Functions

```typescript
getScore()                    // GET /score/           → ScoreData
getScoreTrend(days?)          // GET /score/trend      → TrendPoint[]
getFindingsSummary()          // GET /findings/summary → FindingsSummary
getCriticalFindings()         // GET /findings/critical → Finding[]
getTopFindings(limit?)        // GET /findings/top     → Finding[]
getCostWaste()                // GET /findings/cost-waste → CostWasteResponse
sendChat(message)             // POST /chat/           → ChatResponse
runScan()                     // POST /score/scan      → ScanResult
buildMetrics(score)           // Helper — converts ScoreData to MetricData[]
```

### TypeScript Interfaces

```typescript
interface Finding {
  finding_id:      string;
  resource_id:     string;
  resource_type:   string;
  rule_id:         string;
  title:           string;
  description:     string;
  severity:        "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  risk_score:      number;
  remediation:     string;
  business_impact: string;
  detected_at:     string;
}

interface ScoreData {
  security_score:    number;
  cost_health_score: number;
  monthly_waste:     number;
  total_findings:    number;
  critical_count:    number;
  high_count:        number;
  last_scan:         string;
}

interface CostItem {
  resource_id:     string;
  instance_type:   string;
  region:          string;
  cpu_avg:         number;
  monthly_cost:    number;
  estimated_waste: number;
}
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:8000`

### Install dependencies
```bash
cd glow-app-architect
npm install
```

### Start development server
```bash
npm run dev
```

Frontend runs at: `http://localhost:8080`

### Build for production
```bash
npm run build
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start Vite dev server on :8080 |
| Build | `npm run build` | Production build to `dist/` |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | Run ESLint |
| Test | `npm run test` | Run Vitest tests |

---

## ⚙️ Environment & Configuration

No `.env` file needed for the frontend. The backend URL is configured directly in `src/data/api.ts`:

```typescript
const BASE = "http://localhost:8000/api";
```

To change the backend URL (e.g. for production deployment), update this line.

---

## 🔗 Backend Connection

The frontend expects the CloudGuard backend to be running at `http://localhost:8000`.

| Requirement | Value |
|-------------|-------|
| Backend URL | `http://localhost:8000` |
| CORS | Backend must allow `http://localhost:8080` |
| Required endpoints | `/api/score/`, `/api/findings/*`, `/api/chat/`, `/api/score/scan` |

### Start the backend
```bash
cd cloud-security-copilot/backend
source venv/bin/activate
uvicorn main:app --reload
```

### Run both together
```bash
# Terminal 1 — Backend
cd cloud-security-copilot/backend && source venv/bin/activate && uvicorn main:app --reload

# Terminal 2 — Frontend
cd glow-app-architect && npm run dev
```

---

## 🗺️ Route Map

| URL | Page | Component |
|-----|------|-----------|
| `/` | Product Overview | `ProductOverview.tsx` |
| `/dashboard` | Infrastructure Overview | `Index.tsx` |
| `/findings` | Security Findings | `Findings.tsx` |
| `/cost` | Cost Analysis | `CostAnalysis.tsx` |
| `/copilot` | AI Copilot | `Copilot.tsx` |
| `/logs` | System Logs | `Logs.tsx` |
| `/settings` | Settings | `SettingsPage.tsx` |
| `*` | Not Found | `NotFound.tsx` |

---

<div align="center">

**Part of the CloudGuard — GenAI-Powered Cloud Security Copilot**

[🔗 Backend Repository](https://github.com/Mustafa11300/cloud-security-copilot)

</div>