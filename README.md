# 🌐 URL Shortener API

A simple backend + frontend URL shortener service built with support for custom slugs, expiration dates, and UTM tracking parameters.

---

## 📦 Features

- Create short URLs with custom slugs
- Add UTM tracking parameters
- Set expiration dates for links
- Auto-redirect via shortened links
- Redis caching for fast redirects
- MySQL-backed persistent storage

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express, MySQL, Redis
- **Frontend:** Vite + (your frontend framework here)
- **Database:** MySQL + Redis
- **API:** RESTful JSON endpoints

---

## 🚀 Getting Started

### Backend Setup

1. Install dependencies:

   ```bash
   npm install
   ```
2. Create .env file in server folder with the ff:
   ```js
   PORT=8080
   MYSQL_HOST=your-mysql-host
   MYSQL_USER=your-mysql-user
   MYSQL_PW=your-mysql-password
   MYSQL_DB=your-mysql-database
   
   REDIS_HOST=your-redis-host
   REDIS_PORT=your-redis-port
   REDIS_PW=your-redis-password
   
   BASE_URL=http://localhost:8080
   ```
3. Make sure you have MySQL and Redis installed on your device and both of them should be running.
4. Run the command ```npm run start:dev``` in your terminal
