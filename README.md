# Mindset Retrain

A full-stack wellbeing application that combines mood tracking, wellness logging, and mindfulness features with personalized animal companion feedback.

## Project Overview

Mindset Retrain is a personal wellness app designed to help users track their emotional states, physical health, and mindset shifts. Each user selects a companion animal (cat, dog, bird, rabbit, or tiger) that appears throughout the app, creating a consistent, supportive presence.

**Why I built this:** To consolidate my learning of full-stack JavaScript development while creating something I would actually use for daily wellbeing practice.

## Tech Stack

**Frontend:**
- React (Vite)
- React Hooks (useState, useEffect)
- CSS for styling
- Fetch API for backend communication

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- CORS for cross-origin requests

**Database:**
- MongoDB (NoSQL)
- Collections: moods, foods, exercises

## Architecture

The app follows a three-tier architecture:
React Frontend (localhost:5173)
↓ (HTTP requests via Fetch)
Node.js Backend (localhost:5000)
↓ (MongoDB driver)
MongoDB Atlas (Cloud database)

**How it works:**
1. User interacts with React frontend
2. Frontend sends fetch requests to backend endpoints
3. Backend processes requests and queries MongoDB
4. Data persists in MongoDB (survives server restarts)
5. Backend returns JSON response to frontend
6. Frontend updates UI with fresh data

## Features

- **Pet Selection:** Choose from 5 companion animals
- **Mood Tracker:** Log daily moods with timestamps
- **Food Logger:** Track calories consumed
- **Exercise Log:** Record workouts and track BMI
- **Inspiration:** Mood-based motivational quotes
- **Affirmations:** Positive reinforcement by category
- **Emotional Cup:** Visual metaphor for emotional capacity

## Problem-Solving Examples

### CORS Error
**Problem:** React (localhost:5173) couldn't communicate with backend (localhost:5000). Browser blocked the request.

**Solution:** Added `npm install cors` and `app.use(cors())` in Express. This allows cross-origin requests between different localhost ports.

**Learning:** Understood that browsers block requests between different origins for security. CORS headers explicitly allow this communication.

### MongoDB Connection String
**Problem:** Special character (@) in MongoDB password broke the connection string.

**Solution:** URL-encoded the @ symbol to %40 in the password. Final string: `mongodb+srv://admin:password%40@cluster0.../`

**Learning:** Connection strings have reserved characters. URL encoding allows special characters to be included safely.

### Database Connection Timing
**Problem:** Routes tried to access database before connection established, causing "undefined" errors.

**Solution:** Used `.then()` to wait for `connectDB()` to finish before starting the Express server:

```javascript
connectDB().then(() => {
  app.listen(PORT, () => console.log("Server running"));
});
```

**Learning:** Async operations require proper sequencing. Database connection must complete before server accepts requests.

## How to Run

### Prerequisites
- Node.js installed
- MongoDB Atlas account with connection string

### Installation

```bash
# Frontend setup
cd mindset-retrain-react
npm install
npm run dev

# Backend setup (in another terminal)
cd mindset-retrain-backend
npm install
# Update db.js with your MongoDB connection string
node server.js
```

### Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## What I Learned

**JavaScript Fundamentals**
- Variables, operators, conditionals, loops
- Functions, arrays, objects
- DOM manipulation, event handling
- Async/await and fetch API

**React**
- Components and JSX
- State with useState
- Side effects with useEffect
- Props for component communication

**Node.js & Backend**
- Express.js routing (GET, POST)
- Request/response cycle
- Middleware (CORS, JSON parsing)
- Async route handlers

**Databases**
- NoSQL vs SQL concepts
- MongoDB collections and documents
- Permanent data persistence
- Connection strings and authentication

**Problem-Solving**
- Reading error messages accurately
- Using browser console for debugging
- Testing endpoints independently
- Thinking through data flow

## Next Steps

- Add user authentication (login/signup)
- Convert to TypeScript
- Deploy to production
- Implement data validation and error handling
- Add animations for pet companion

## Deployment

Deployment coming soon. Current status: fully functional locally with MongoDB Atlas backend.

---

Built by Sarah | @mindsetretrain on TikTok