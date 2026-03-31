# **DPRES — Version 4.0** (Prototype)

## **Building Resilient Communities Through Education & Active Response**
*The evolution from interactive UI to a fully functional, highly secure, full-stack emergency management system.*

---

## 🖼️ **Preview**

### **SDMA Command Center — Live Interactive Map**


### **Student Portal — Live SOS Integration**


---

## 🚀 **Overview**

**DPRES 4.0** marks the transition of the Disaster Preparedness Response System from a visual prototype into a **production-ready, full-stack application**. 

This version introduces a live React frontend paired with a powerful Python FastAPI backend and a Neon PostgreSQL database. The core focus of Phase 4 is the **Live Emergency SOS Pipeline**, featuring real-time browser geolocation, interactive command center mapping, automated email dispatch, and enterprise-grade security hardening.

### 🎯 **Core Focus Areas**
- **Live SOS Pipeline**: End-to-end emergency triggering using live GPS coordinates.
- **Interactive Command Center**: Real-time Leaflet map for SDMA admins to track and resolve active distress signals.
- **Role-Based Authentication**: Secure JWT infrastructure separating Students, Institution Admins, and SDMA Admins.
- **Enterprise Security**: Hardened APIs, brute-force protection, and strict data validation.

---

## 🧩 **What's New in Version 4.0**

### 🚨 **The Emergency Response Pipeline**
- **Live Geolocation Tracking**: Student SOS buttons now capture real-time browser GPS coordinates upon a 5-second countdown.
- **Automated Dispatch Engine**: Backend SMTP integration instantly sends "Help is on the way" acknowledgment emails to distressed students.
- **Event Resolution Workflow**: SDMA Admins can mark emergencies as "Resolved," generating exact `resolved_at` timestamps for post-disaster auditing.

### 🗺️ **SDMA Interactive Map (Leaflet)**
- **Live Marker Plotting**: Active SOS alerts appear dynamically as red markers on an interactive map of India.
- **Contextual Details Panel**: Clicking a map marker reveals the student's name, ID, exact timestamp, and geographical coordinates.
- **Real-Time UI Updates**: Resolving an alert immediately clears the marker from the active board.

### 🔐 **Enterprise-Grade Security Architecture**
- **Rate Limiting (`slowapi`)**: Strict limits (5 requests/minute) on all authentication endpoints to prevent brute-force attacks.
- **Cryptographic Tokens**: Weak numeric codes replaced with 32-character URL-safe tokens for email verification and password resets.
- **Strict Data Validation**: Pydantic schemas enforce exact geographical boundaries (Latitude -90 to 90, Longitude -180 to 180) to reject forged API payloads.
- **Frontend Shielding**: Implementation of strict `vercel.json` headers (X-Frame-Options: DENY, HSTS, nosniff) to completely prevent clickjacking and MIME exploits.
- **Hardened CORS Policy**: API strictly limits allowed methods and headers, removing wildcard vulnerabilities.

---

## 🏗️ **Tech Stack**

**Frontend:** React (TypeScript), Vite, Tailwind CSS, React-Leaflet, Vercel
**Backend:** Python 3, FastAPI, SQLAlchemy (ORM), Alembic, passlib/bcrypt, Render
**Database:** PostgreSQL (Neon Serverless)

---

## ⚙️ **Getting Started** (Full-Stack Setup)

DPRES 4.0 now requires both the frontend and backend servers to run locally.

### 1. **Backend Setup (FastAPI)**
```bash
cd dpres-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the API server
uvicorn app.main:app --reload
```
*Backend runs on `http://localhost:8000`*

### 2. **Frontend Setup (React/Vite)**
```bash
# In the root frontend directory
npm install

# Start the development server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 📈 **Changelog**

### **v4.0**
- ✨ Full FastAPI backend and PostgreSQL database integration
- 🚨 End-to-end Live SOS Geolocation trigger with automated email confirmation
- 🗺️ SDMA Command Center Map using `react-leaflet`
- 🛡️ Massive Security Audit Sweep (Rate limiting, CORS hardening, Vercel headers)
- ⚙️ Alembic database migration pipeline established
- 🔐 Secure JWT Role-Based Access Control implementation

---

## 💡 **Contribution Guidelines**

1. **Fork the repository**
2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit with clear messages**
   ```bash
   git commit -m "Added new map filtering module"
   ```
4. **Push & Create a Pull Request**

**Please include:**
- Before-and-after screenshots for UI changes.
- Ensure backend changes include corresponding Alembic migrations if database models are altered.

---

## 📜 **License**

**Copyright © 2026 Team Oryza. All Rights Reserved.**

This project is a proprietary prototype developed for educational, research, and competition purposes.

### **Permitted Uses:**
- ✅ Viewing and evaluating the codebase for educational purposes
- ✅ Academic reference and citation
- ✅ Portfolio demonstration and showcase

### **Restrictions:**
- ❌ No commercial use without explicit written permission
- ❌ No redistribution or reproduction
- ❌ No modification or derivative works
- ❌ No public deployment without authorization

**For licensing inquiries or collaboration opportunities, contact:** repomerm23@gmail.com

---

## 📬 **Contact / Feedback**

💬 **Issues & Feedback**: Open a GitHub issue with screenshots or logs.  
🧑‍🎨 **Technical Queries**: repomerm23@gmail.com  
📅 **Next Milestone**: Digital Compliance Certificates & Bulk SMS/IVR Command Center.

---

## 🧠 **"Preparedness isn't a feature — it's a mindset."**

— Team Oryza
```
