 AI-Powered Scheduling and Performance Dashboard

It is an intelligent employee scheduling and performance tracking system designed for retail environments like sweet shops and supermarkets. The system dynamically adjusts task assignments based on daily order volume, employee performance, and feedback using AI-driven scheduling logic. It also provides a modern, interactive dashboard for real-time tracking and visualization.

## 🚀 Features

- 🎯 **AI-Based Dynamic Task Assignment**  
  Uses historical and synthetic data to predict underperformance and assign work accordingly.

- 📊 **Interactive Frontend Dashboard**  
  Built using **Next.js**, **Tailwind CSS**, and **Chart.js** for a clean, dark-mode interface with responsive charts and employee tables.

- ⚙️ **Flask Backend with REST API**  
  Easily integrates your scheduling logic and feedback mechanisms into an accessible API for frontend consumption.

- 🗂️ **Role-Based Data Processing**  
  Handles scheduling for:
  - Sweets Makers
  - Sweets Packagers
  - Retailers

- 🧮 **Employee Feedback Integration**  
  Adjusts future schedules based on feedback and past performance.

---

## 🧠 AI Logic Summary

- **Rule-Based Initial Engine:**  
  Assigns tasks based on current order volume and employee availability.

- **Performance-Driven Adjustments:**  
  Utilizes feedback and predicted underperformance to fine-tune task distribution.

- **Scheduling Goals:**  
  - Avoid overloading underperformers  
  - Balance workload across employees  
  - Encourage top-performing individuals

---

## 🧪 API Endpoints

### **`POST /calculate`**  
Calculates dynamic task assignments for sweets makers, packagers, and retailers.

#### Request Body (JSON):
```json
{
  "orderVolume": 200,
  "excludeEmployeeId": ["SM02", "SP03"],  // optional
  "workerGroup": "sweetsMakers"          // optional
}
```

#### Response (JSON):
Returns task assignment and performance predictions:
```json
{
  "sweetsMakers": [
    {
      "Employee_ID": "SM04",
      "Assigned_Jalebis": 52.5,
      "Adjusted_Assigned_Jalebis": 52.5,
      "Predicted_Underperform": 0
    },
    ...
  ],
  "packagers": [...],
  "retailers": [...]
}
```

---

## 💻 Frontend Tech Stack

- **Next.js** – App framework with API integration  
- **Tailwind CSS** – Styling and dark mode support  
- **TypeScript** – Type-safe development  
- **Chart.js** – Data visualization (bar graphs, line charts, heatmaps)

---

## 📦 Backend Tech Stack

- **Flask** – Lightweight Python server  
- **Scikit-learn** – ML logic for scheduling engine  
- **Pandas** – Data manipulation for employee CSVs  
- **CORS** – For frontend-backend integration

---

## 📁 Project Structure

```
RetailSyncAI/
├── backend/
│   ├── app.py               # Flask API
│   └── finalscheduler.py    # Core AI scheduling logic
├── frontend/
│   ├── pages/
│   ├── components/
│   └── utils/
├── data/
│   ├── Synthetic_SweetsMakers.csv
│   ├── Synthetic_SweetsPackagers.csv
│   └── Synthetic_Orders.csv
```

---

## 📂 Sample Data

- **Synthetic_SweetsMakers.csv** – Production & performance  
- **Synthetic_SweetsPackagers.csv** – Time-based packaging logs  
- **Synthetic_Orders.csv** – Daily order volume & peak times

---

## 📌 Future Improvements

- [ ] Add database integration (SQLite or MongoDB)  
- [ ] Enable admin authentication and employee dashboards  
- [ ] Enhance AI with reinforcement learning from live feedback  
- [ ] Deploy to cloud (Render/Heroku/Vercel)

---

## 👨‍💻 Developed by

**Joshua S**  
