# 🚀 Professional Portfolio: Enterprise Deployment Guide

This workspace is configured as a **Next.js Dynamic Full-Stack Application**. It uses Firebase Hosting with **Web Frameworks** support to manage both your frontend and the backend API routes for the live Blog system.

---

## 🏗️ Technical Architecture

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15+ (App Router) | UI, UX, and Dynamic Pages |
| **Backend** | Firebase Functions | API Routes (Upload, Save, Delete) |
| **Storage** | Google Cloud Storage | Image Hosting (Bucket: `blogscontent`) |
| **CI/CD** | GitHub Actions | Automated "Push-to-Deploy" |

---

## 🔥 One-Time Cloud Setup

Before your first deployment, ensure these cloud services are active:

1.  **Firebase Blaze Plan**: 
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Upgrade to the **Blaze (Pay-as-you-go)** plan. 
    - *Note: You stay within the free tier for low usage, but Cloud Functions require billing to be enabled.*
2.  **GCS Bucket Permissions**:
    - Ensure your bucket `blogscontent` exists.
    - Set **Public Access Prevention** to `Inherited`.
    - Grant `Storage Object Viewer` to `allUsers` for public visibility of blog images.
3.  **Required APIs**:
    - Ensure `Cloud Functions API`, `Cloud Build API`, and `Artifact Registry API` are enabled in your [Google Cloud Console](https://console.cloud.google.com/).

---

## 💻 Local Deployment

To deploy manually from your machine:

### 1. Enable Modern Frameworks
```bash
firebase experiments:enable webframeworks
```

### 2. Deploy Command
```bash
# This will build the Next.js app and deploy it as a dynamic server
firebase deploy --only hosting
```

---

## 🤖 CI/CD Automation (GitHub Actions)

Your repository is pre-configured for **Zero-Touch Deployment**. Every push to `main` triggers a production build.

### 🛠️ Setting up the Automation

1.  **Generate a CI Token**:
    ```bash
    firebase login:ci
    ```
2.  **Save to GitHub Secrets**:
    - Name: `FIREBASE_TOKEN`
    - Value: *The token generated above.*
3.  **Verification**: 
    - The deployment logic is handled by `.github/workflows/deploy.yml`.
    - It automatically uses `FIREBASE_CLI_EXPERIMENTS=webframeworks`.

---

## ⚙️ Key Configuration Files

- **`firebase.json`**: Controls the hosting behavior. We use `site: "aitech-465715"` to prevent assertion errors and `source: "."` for framework support.
- **`.firebaserc`**: Pinned to your project ID `aitech-465715`.
- **`next.config.ts`**: Configured to allow images from `storage.googleapis.com`.

---

## 🔍 Troubleshooting

- **"Assertion failed"**: This usually means the `FIREBASE_TOKEN` has expired. Run `firebase login:ci` to refresh it.
- **"Large File Error"**: Always ensure `.firebase/` is in your `.gitignore`.
- **Images not loading**: Check if the `blogscontent` bucket is set to "Public".

Congratulations! You have successfully deployed an institutional-grade portfolio with a live AI-powered blog system! 🚀🔥📈
