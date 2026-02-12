# 🚀 Professional Portfolio: Static Firebase Hosting Guide

This guide explains how to deploy your portfolio as a **Static Website** to Firebase Hosting. This method is high-performance, cost-effective, and fully automated.

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

### 2. Manual Deployment
If you want to deploy quickly from your machine:
```bash
npm run build
firebase deploy --only hosting
```

---

## 🤖 CI/CD Automation (GitHub Actions)

Your portfolio is pre-configured for **Zero-Touch Deployment**. Every time you push to the `main` branch, GitHub will automatically build and deploy your site.

### 🛠️ Setup Steps for Automation

1.  **Generate a Firebase Token**:
    Run this command in your terminal and follow the browser prompts:
    ```bash
    firebase login:ci
    ```
    *Copy the long token string provided in the output.*

2.  **Add Secret to GitHub**:
    - Go to your code repository on [GitHub.com](https://github.com/).
    - Navigate to **Settings > Secrets and variables > Actions**.
    - Click **"New repository secret"**.
    - **Name**: `FIREBASE_TOKEN`
    - **Value**: *Paste the token you copied in Step 1.*

3.  **Trigger Deployment**:
    Push your latest changes to GitHub:
    ```bash
    git add .
    git commit -m "🚀 feat: enable automated deployment"
    git push origin main
    ```

### 🔍 Monitoring
You can monitor the status of your deployments in the **Actions** tab of your GitHub repository.

---

## ⚙️ Project Architecture
- **`.github/workflows/deploy.yml`**: The automation engine that builds your Next.js site and deploys it using the secure `FIREBASE_TOKEN`.
- **`next.config.ts`**: Configured with `output: 'export'` for static serving.
- **`firebase.json`**: Directs Firebase to serve the `out/` folder and handles Single Page Application (SPA) routing.

Congratulations! Your portfolio is now a professional, automated, and high-performance technical showcase! 🚀🔥
