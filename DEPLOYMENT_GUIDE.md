# 🚀 Professional Portfolio: Static Firebase Hosting Guide

This guide explains how to deploy your portfolio as a **Static Website** to Firebase Hosting. This method is high-performance, cost-effective, and does **not** require Cloud Run.

---

## 🏗️ Technical Stack
- **Framework**: Next.js (Static Export Mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Firebase Hosting (Static)

---

## 📥 Local Setup & Build

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Generate Static Site**:
    This command will create an `out/` directory containing your entire website as static HTML/CSS/JS.
    ```bash
    npm run build
    ```

---

## 🔥 Firebase Deployment

### 1. Prerequisites
- Install Firebase CLI: `npm install -g firebase-tools`
- Login: `firebase login`

### 2. Initialization
If you haven't initialized Firebase, run:
```bash
firebase init hosting
```
- **Project**: Select your project (`aitech-465715`).
- **Public Directory**: Type `out` (important!).
- **Configure as single-page app**: Yes.
- **GitHub Action**: Optional (No if you want manual control).

### 3. Manual Deployment
After every change, run:
```bash
npm run build
firebase deploy --only hosting
```

---

## ⚙️ Configuration Details
- **`next.config.ts`**: Set to `output: 'export'` to enable static generation.
- **`firebase.json`**: Configured to serve the `out/` folder and handle client-side routing.
- **Images**: Next.js Image optimization is disabled (`unoptimized: true`) because static hosting does not have a backend image processing server.

Congratulations! Your portfolio is now running as a lightning-fast static site on Firebase! 🚀
