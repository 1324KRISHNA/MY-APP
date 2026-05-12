# 🦠 OutbreakWatch — Web Dashboard for Tracking Disease Outbreaks

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application for tracking disease outbreaks across different regions worldwide.

---

## 📁 Project Structure

```
outbreak-tracker/
├── README.md
├── client/                          # React Frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js                 # App entry point
│       ├── App.js                   # Routes & layout
│       ├── api.js                   # Axios API layer
│       ├── styles/
│       │   └── index.css            # Global styles
│       ├── components/
│       │   ├── Navbar.js            # Navigation bar
│       │   ├── StatCard.js          # Stats card widget
│       │   ├── OutbreakMap.js       # Leaflet map with markers
│       │   ├── Charts.js            # Chart.js charts (Bar, Pie, Line)
│       │   ├── OutbreakTable.js     # Data table
│       │   └── Filters.js           # Filter controls
│       └── pages/
│           ├── Home.js              # Landing page
│           ├── Dashboard.js         # Main dashboard
│           ├── ReportCase.js        # Report outbreak form
│           ├── About.js             # About page
│           └── Login.js             # Auth (sign in / sign up)
│
└── server/                          # Node.js + Express Backend
    ├── package.json
    ├── .env.example                 # Environment variables template
    ├── server.js                    # Express + Socket.IO server
    ├── seed.js                      # Database seeder script
    ├── config/
    │   └── db.js                    # MongoDB connection
    ├── models/
    │   ├── Outbreak.js              # Mongoose outbreak schema
    │   └── User.js                  # Mongoose user schema (bcrypt)
    ├── controllers/
    │   ├── authController.js        # Auth logic (register/login/profile)
    │   └── outbreakController.js    # CRUD + stats + trends
    ├── middleware/
    │   └── auth.js                  # JWT auth & admin middleware
    └── routes/
        ├── authRoutes.js            # POST /register, /login, GET /profile
        └── outbreakRoutes.js        # CRUD + /stats + /trends
```

---

## 🚀 How to Run in VS Code

### Prerequisites

1. **Node.js** (v18+) — [Download](https://nodejs.org/)
2. **MongoDB** — [Download Community Server](https://www.mongodb.com/try/download/community)
   - Or use **MongoDB Atlas** (free cloud): [atlas.mongodb.com](https://www.mongodb.com/atlas)
3. **VS Code** — [Download](https://code.visualstudio.com/)

### Step-by-Step Setup

#### 1. Open the project in VS Code
```bash
cd outbreak-tracker
code .
```

#### 2. Set up the Backend
Open a terminal in VS Code (`Ctrl+`` `) and run:

```bash
cd server
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/outbreak_tracker
JWT_SECRET=your_super_secret_key_here
```

> 💡 For MongoDB Atlas, use: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/outbreak_tracker`

Install dependencies and seed sample data:
```bash
npm install
node seed.js
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Seeded 20 outbreak records
✅ Admin user created (admin@outbreak.com / admin123)
🚀 Server running on port 5000
```

#### 3. Set up the Frontend
Open a **second terminal** in VS Code and run:

```bash
cd client
npm install
npm start
```

The app opens at **http://localhost:3000**

---

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, get JWT token | No |
| GET | `/api/auth/profile` | Get current user | Yes |
| GET | `/api/outbreaks` | List all outbreaks (supports filters) | No |
| GET | `/api/outbreaks/stats` | Aggregated statistics | No |
| GET | `/api/outbreaks/trends` | Daily case/death trends | No |
| GET | `/api/outbreaks/:id` | Get single outbreak | No |
| POST | `/api/outbreaks` | Create new outbreak | Yes |
| PUT | `/api/outbreaks/:id` | Update outbreak | Yes |
| DELETE | `/api/outbreaks/:id` | Delete outbreak | Admin |

### Query Parameters for GET `/api/outbreaks`
- `disease` — Filter by disease name
- `region` — Filter by region
- `severity` — Filter by severity (low/medium/high/critical)
- `from` — Filter from date (YYYY-MM-DD)
- `to` — Filter to date (YYYY-MM-DD)

---

## 🗄️ MongoDB Schema

### Outbreak Schema
```javascript
{
  disease_name: String,     // Required, e.g. "COVID-19"
  region: String,           // Required, e.g. "South Asia"
  country: String,          // Required, e.g. "India"
  latitude: Number,         // -90 to 90
  longitude: Number,        // -180 to 180
  cases_count: Number,      // Default: 0
  deaths_count: Number,     // Default: 0
  recovered_count: Number,  // Default: 0
  severity: String,         // Enum: low | medium | high | critical
  description: String,      // Optional, max 2000 chars
  date_reported: Date,      // Default: Date.now
  is_verified: Boolean,     // Default: false
  reported_by: ObjectId,    // Reference to User
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

### User Schema
```javascript
{
  name: String,             // Required
  email: String,            // Required, unique, lowercase
  password: String,         // Required, min 6 chars (hashed with bcrypt)
  role: String,             // Enum: user | admin
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✨ Features

- ✅ Responsive dashboard with stat cards, charts, maps, and tables
- ✅ Interactive Leaflet map with color-coded outbreak markers
- ✅ Chart.js visualizations (bar, pie, line charts)
- ✅ Filters by disease, region, severity, and date range
- ✅ JWT-based authentication (sign in / sign up)
- ✅ RESTful API with full CRUD operations
- ✅ Real-time updates via Socket.IO
- ✅ Admin role for delete operations
- ✅ Database seeder with 20 sample records
- ✅ Input validation and error handling
- ✅ Clean MVC folder structure

---

## 🎨 Demo Credentials

- **Email:** admin@outbreak.com
- **Password:** admin123

---

## 📝 License

MIT License — free for educational and personal use.
