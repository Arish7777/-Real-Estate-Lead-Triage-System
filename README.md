<<<<<<< HEAD
# 🏠 Real Estate Lead Triage System

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

An AI-powered lead scoring and triage system for real estate professionals. Automatically score, classify, and prioritize incoming leads using rule-based scoring and LLM-powered intent analysis.

---

## ✨ Features

- **📊 Smart Lead Scoring** - Rule-based scoring system evaluating Location, Budget, Timeframe, Contact Completeness, and Message Quality
- **🤖 AI Intent Analysis** - LLM-powered classification of lead intent (serious buyer, seller, casual inquiry, spam, etc.)
- **🎯 Automatic Tier Assignment** - Leads are categorized as HOT, MEDIUM, LOW, or JUNK with recommended actions
- **📈 Interactive Dashboard** - Visual analytics with charts showing lead distribution and scoring breakdown
- **🔥 Hot Leads Report** - Real-time report of high-priority leads grouped by source
- **📱 PWA Ready** - Progressive Web App support for mobile access
- **🎨 Modern UI** - Glassmorphism design with smooth animations

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│              React + Vite + Bootstrap                       │
│    ┌─────────┬───────────┬──────────┬────────────┐         │
│    │Dashboard│ LeadTable │ Filters  │ HotLeads   │         │
│    └─────────┴───────────┴──────────┴────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP REST API
┌────────────────────────▼────────────────────────────────────┐
│                        Backend                              │
│                  FastAPI + Python                           │
│    ┌─────────────┬─────────────────┬────────────────┐      │
│    │ CSV Loader  │  Rule Scoring   │  AI Intent     │      │
│    │             │  Engine         │  (OpenRouter)  │      │
│    └─────────────┴─────────────────┴────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 7 | Build Tool |
| Bootstrap 5 | CSS Framework |
| Recharts | Data Visualization |
| Framer Motion | Animations |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI | REST API Framework |
| Uvicorn | ASGI Server |
| Pandas | CSV Processing |
| OpenAI SDK | LLM Integration |
| Pydantic | Data Validation |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+
- **OpenAI API Key** (or OpenRouter API key)

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd realestate-triage
```

### 2️⃣ Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key
echo "OPENAI_API_KEY=your-api-key-here" > .env

# Start the backend server
uvicorn app:app --reload --port 8000
```

### 3️⃣ Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4️⃣ Access the Application
Open your browser and navigate to `http://localhost:5173`

---

## 📦 Vercel Deployment (Frontend)

> ⚠️ **Note:** The backend must be hosted separately (e.g., Railway, Render, Fly.io). Vercel only hosts the frontend.

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set the **Root Directory** to `frontend`

3. **Configure Environment Variables**
   In the Vercel dashboard, add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your frontend will be live at `https://your-project.vercel.app`

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com` |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/process` | Upload CSV file to process leads |
| `GET` | `/leads` | Get all processed leads |
| `GET` | `/report` | Get HOT leads grouped by source |
| `DELETE` | `/clear` | Clear all leads |

### CSV Format
Your CSV file should include these columns:
```csv
name,email,phone,property_type,budget,location_preference,timeframe_to_move,message,source
John Doe,john@example.com,555-1234,House,$500000,Downtown,1-3 months,Looking for a family home,website
```

---

## 📊 Scoring System

| Factor | Weight | Criteria |
|--------|--------|----------|
| Location | 30 pts | Downtown/Prime = 30, Suburb = 20, Rural = 10 |
| Budget | 25 pts | >$500k = 25, $200k-$500k = 15, <$200k = 5 |
| Timeframe | 20 pts | <3 months = 20, 3-6 months = 12, 6+ months = 5 |
| Contact | 15 pts | Email+Phone = 15, Email or Phone = 8 |
| Message | 10 pts | Detailed = 10, Brief = 5, None = 0 |

### Tier Thresholds
- **🔥 HOT:** 80+ points → Immediate follow-up
- **🟡 MEDIUM:** 60-79 points → 24-hour follow-up
- **🟢 LOW:** 40-59 points → Weekly nurture
- **⚫ JUNK:** <40 points → Archive

---

## 📁 Project Structure

```
realestate-triage/
├── backend/
│   ├── app.py              # FastAPI main application
│   ├── ai_intent.py        # LLM intent analysis
│   ├── scoring.py          # Rule-based scoring engine
│   ├── leads_loader.py     # CSV parsing
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main application
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   ├── LeadDetailModal.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── HotLeadsPanel.jsx
│   │   │   └── ...
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── public/
│   │   ├── manifest.json   # PWA manifest
│   │   └── icons/          # App icons
│   ├── vercel.json         # Vercel configuration
│   ├── .env.example        # Environment template
│   └── package.json        # Node dependencies
│
└── README.md               # This file
```

---

## 🧪 Development

### Run Tests
```bash
# Backend tests (if available)
cd backend
pytest

# Frontend lint
cd frontend
npm run lint
```

### Build for Production
```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`.

---

## 🔧 Troubleshooting

### CORS Errors
Ensure the backend CORS settings include your frontend URL:
```python
# backend/app.py
allow_origins=["http://localhost:5173", "https://your-vercel-app.vercel.app"]
```

### API Connection Issues
1. Verify `VITE_API_URL` is set correctly
2. Check if the backend is running and accessible
3. Verify there are no firewall/network issues

### Mock AI Mode
If no OpenAI API key is provided, the system runs in mock mode with default intent classifications.

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ for Real Estate Professionals**
=======
# -Real-Estate-Lead-Triage-System
An AI-powered lead scoring and triage system for real estate professionals. Automatically score, classify, and prioritize incoming leads using rule-based scoring and LLM-powered intent analysis.
>>>>>>> d31243baaba75598d041c3bad5d145fef6767d05
