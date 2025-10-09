# **DPRES — Version 3.0** (Prototype)

## **Building Resilient Communities Through Education**
*A redesigned experience for disaster preparedness training — faster, modern, and beautifully intuitive.*

---

## 🖼️ **Preview**

### **Admin Dashboard — SDMA Command Center**
![Admin Dashboard](public/assets/VERSION%203.0.png)

### **Student Portal — Dashboard & Training Modules**
![Student Portal](public/assets/VERSION%203.01.png)

---

## 🚀 **Overview**

**DPRES 3.0** represents a major design evolution in the Disaster Preparedness Education System.  
This prototype introduces a **refined UI/UX system**, new **student dashboard**, and a powerful **admin interface** for centralized management and monitoring.

### 🎯 **Core Focus Areas**
- **Student Portal**: Personal dashboard with training progress, insights, and VR onboarding.
- **Training Modules**: Step-by-step preparedness learning, progress visualization, and college-level analytics.
- **Admin Dashboard**: Centralized SDMA Command Center for real-time stats, quick actions, and institution tracking.
- **New Interface**: Fully redesigned visual language for accessibility, clarity, and engagement.
- **Welcome Page**: Personalized entry with contextual actions and seamless navigation.

---

## 🧩 **What's New in Version 3.0**

### 👨‍🎓 **Student Portal**
- Clean, modular design for dashboards and modules.
- Progress visualization with comparison metrics (individual, college, friends).
- VR Training section (supports Smartphone, Cardboard VR, and Headphones setup).
- Personalized welcome card with quick navigation buttons.

### 🧠 **Training Modules**
- Guided Disaster Risk Management and Operational Plan lessons.
- Progress tracking across learning stages.
- Clear visual indicators for completion status and college averages.

### 🧑‍💼 **Admin Dashboard (SDMA Command Center)**
- Real-time statistics: active alerts, total institutions, active users.
- Quick Actions (Emergency, Broadcast, Institution Management).
- Institution list with sorting, filtering, and progress bars.
- Recent activity log and analytics snapshot.

### 🎨 **UI / UX Improvements**
- New dark-first theme for extended viewing comfort.
- Responsive grid layout for desktop and laptop users.
- Reworked navigation for simplicity and consistency.
- Refined typography and spacing system for readability.
- Enhanced accessibility and keyboard navigation support.

---

## 🧱 **Design Philosophy**

> **"Preparedness starts with clarity."**

- **Clarity**: Every data point and action is immediately visible.
- **Speed**: One-click access to VR, emergencies, and quick actions.
- **Learnability**: Progressive learning flow for disaster readiness.
- **Resilience**: Optimized layouts for stress and response conditions.
- **Accessibility**: WCAG-focused color tokens and readable contrast ratios.

---

## 🗂️ **Suggested Repository Structure**

```
/
├─ README.md
├─ package.json
├─ public/
│  ├─ index.html
│  └─ assets/
│     ├─ VERSION 3.0.png
│     └─ VERSION 3.01.png
├─ src/
│  ├─ App.jsx
│  ├─ pages/
│  │  ├─ StudentDashboard.jsx
│  │  ├─ TrainingModules.jsx
│  │  └─ AdminDashboard.jsx
│  ├─ components/
│  │  ├─ Card/
│  │  ├─ Table/
│  │  └─ QuickActions/
│  ├─ styles/
│  │  ├─ tokens.css
│  │  └─ dark-theme.css
│  └─ utils/
└─ design/
   ├─ figma-links.md
   └─ handoff-notes.md
```

*Adjust paths based on framework — React, Next.js, or Vue.*

---

## ⚙️ **Getting Started** (React Example)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd dpres-v3-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Visit**  
   👉 `http://localhost:3000`

---

## 🎨 **Design Tokens & Components**

| Category | Tokens / Elements | Description |
|----------|-------------------|-------------|
| **Color** | `--accent-primary`, `--danger`, `--surface`, `--muted` | Consistent color palette across modules |
| **Spacing** | `space-1` → `space-8` | 4px base modular grid |
| **Typography** | Display, Heading, Body | Optimized for data visibility |
| **Components** | Card, ProgressRow, DataTable, VROnboardingCard | Core reusable UI components |

---

## ♿ **Accessibility & Performance**

- ✅ High-contrast text and dark-mode readability.
- ✅ Keyboard and screen reader navigation supported.
- ✅ Lazy loading for heavy tables and modules.
- ✅ Optimized image sizes for faster load.

---

## 📈 **Changelog**

### **v3.0**
- ✨ New Student Portal UI
- 🧭 Redesigned Admin Dashboard / Command Center
- 🎓 Upgraded Training Modules Experience
- 🎨 Fully refreshed UI / UX framework
- 👋 New personalized Welcome Page

---

## 💡 **Contribution Guidelines**

1. **Fork the repository**
2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit with clear messages**
   ```bash
   git commit -m "Added new module view"
   ```
4. **Push & Create a Pull Request**

**Please include:**
- Before-and-after screenshots for UI changes.
- Accessible color combinations for all new elements.

---

## 📜 **License**

**Prototype © DPRES Team.**  
*All rights reserved — For internal and educational preview only.*

*(You may replace this with your actual license such as MIT, Apache 2.0, etc.)*

---

## 📬 **Contact / Feedback**

💬 **Issues & Feedback**: Open a GitHub issue with screenshots or design suggestions.  
🧑‍🎨 **Design Queries**: Include Figma reference links in `design/figma-links.md`.  
📅 **Next Milestone**: Integration of Student Progress API and Admin Alert System.

---

## 🧠 **"Preparedness isn't a feature — it's a mindset."**

*— DPRES 3.0 Team*

---
