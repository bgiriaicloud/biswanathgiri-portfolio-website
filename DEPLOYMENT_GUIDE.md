# 🚀 Professional Portfolio: Dynamic Deployment Guide

This guide explains how to deploy your portfolio as a **Dynamic Next.js Application** to Firebase Hosting. This method supports your live publication system, API routes, and automated GCS uploads.

---

## 🏗️ Technical Stack
- **Framework**: Next.js (Dynamic App Mode)
- **Backend**: Firebase Functions (managed by Web Frameworks)
- **Storage**: Google Cloud Storage (`blogscontent` bucket)
- **CI/CD**: GitHub Actions

---

## � Local Deployment

Since your portfolio now uses a backend for the Publication system, standard static exports are no longer used. Firebase will now automatically containerize your app.

### 1. Prerequisites
- Install Firebase CLI: `npm install -g firebase-tools`
- Enable the experimental frameworks support:
  ```bash
  firebase experiments:enable webframeworks
  ```

### 2. Manual Deployment
```bash
# Firebase will automatically build and deploy your Next.js app
firebase deploy --only hosting
```

---

## 🤖 CI/CD Automation (GitHub Actions)

Your portfolio is pre-configured for **Automated Deployment**. Every time you push to the `main` branch, GitHub will build your dynamic app and update the live site.

### 🛠️ Configuration Steps

1.  **Firebase Project ID**:
    Ensure your `.firebaserc` points to `aitech-465715`.

2.  **GitHub Secret**:
    - Go to your repository on GitHub.
    - **Settings > Secrets and variables > Actions**.
    - Add a secret named `FIREBASE_TOKEN`.
    - To get the token, run `firebase login:ci` locally and copy the result.

3.  **Experimental Flags**:
    The GitHub Action is configured to enable `webframeworks` automatically.

---

## ⚙️ Project Architecture
- **`.github/workflows/deploy.yml`**: The automation engine. It uses `FIREBASE_CLI_EXPERIMENTS=webframeworks` to handle the Next.js server.
- **`firebase.json`**: Configured with `source: "."` to tell Firebase this is a full-stack application.
- **`next.config.ts`**: Handles the image optimization and remote patterns for your GCS bucket.

### 💡 Pro Tip
If you see errors related to "Functions" during deployment, ensure your Firebase project is on the **Blaze (Pay-as-you-go)** plan, as Cloud Functions require billing to be enabled (even though there is a large free tier).

Congratulations! Your portfolio is now a full-stack, enterprise-ready technical showcase! 🚀🔥
