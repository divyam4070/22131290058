# React URL Shortener Web App

## Project Overview
This project is a **React-based URL Shortener Web Application** that allows users to shorten URLs, optionally provide custom shortcodes and validity periods, and track click statistics — all managed entirely on the client-side using browser localStorage. It integrates a custom **Logging Middleware** to track key operations and errors, ensuring extensive logging without relying on console logs.

---

## Features

- **Shorten up to 5 URLs concurrently:** Users can enter multiple URLs at once.
- **Custom shortcodes:** Optionally specify your own shortcode (validated for uniqueness).
- **Validity period:** Specify how long the short link is valid (defaults to 30 minutes).
- **Client-side routing and redirection:** Short URLs redirect users to the original URL using React Router.
- **Statistics Page:** View all shortened URLs with creation date, expiry date, total clicks, and detailed click information including timestamps and sources.
- **Robust client-side validation and error handling:** Malformed URLs, shortcode collisions, and expired links are handled gracefully.
- **Logging Middleware Integration:** All important actions (URL creation, redirections, errors) are logged to a remote logging API using a reusable logging function.


## Folder Structure (Simplified)

22131290058/
├── frontend/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components/
│       │   ├── HomePage.js
│       │   ├── RedirectPage.js
│       │   ├── ShortUrlCard.js
│       │   └── StatsPage.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── services/
│       │   └── logger.js
│       └── setupTests.js
└── Logging Middleware/
    ├── .gitignore
    ├── logger.js
    ├── package-lock.json
    ├── package.json
    └── test.js




## How It Works

### URL Shortening
- Users enter one or more URLs (up to 5) on the **Home Page**, along with optional shortcode and validity time.
- The app validates inputs (URL format, shortcode uniqueness).
- If no shortcode is provided, a unique one is generated.
- Each shortened URL is saved to `localStorage` with metadata: original URL, shortcode, creation time, expiry time, and clicks array.
- The shortened URL is shown with expiry info.
- Each URL creation event is logged using the Logging Middleware.

### Redirection
- When users visit a short URL (e.g., `http://localhost:3000/abc123`), **RedirectPage** looks up the shortcode in `localStorage`.
- If found and not expired, the app logs the click (timestamp, referrer source).
- User is redirected to the original URL.
- If expired or not found, an error message is shown.

### Statistics
- The **Stats Page** displays all shortened URLs saved in `localStorage`.
- For each URL, it shows:
  - Short URL link
  - Creation and expiry dates
  - Total number of clicks
  - Detailed click list (timestamp, source, location if available)
- Users can expand/collapse click details.
- Visiting the Stats Page triggers a log event.

---

## Getting Started

### Prerequisites
- Node.js & npm installed
- Basic familiarity with React

### Installation

```bash
cd frontend
npm install
npm start
