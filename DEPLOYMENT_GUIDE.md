# 🚀 Professional Portfolio: Static Website Guide

This workspace is configured as a **Next.js Static Website**. It deploys to Firebase Hosting without using Cloud Functions, ensuring maximum speed and zero server costs.

---

## 🏗️ Technical Architecture

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15+ (SSG Export) | Optimized Static HTML/CSS/JS |
| **Storage** | Google Cloud Storage | Secure Image Hosting (Bucket: `blogscontent`) |
| **Automation** | GitHub Actions | Pro-grade Static Sync |

---

## 🔥 One-Time Cloud Setup

1.  **Firebase Billing**:
    - Static Hosting works on the **Spark (Free)** plan. No Blaze plan is required for this setup.
2.  **Storage Permission (Public visibility)**:
    - Bucket: `blogscontent`
    - Permission: Grant `Storage Object Viewer` to `allUsers`.
    - Verification: Images in your blog should load globally.

---

## 💻 Manual Deployment (Local)

Use this method to push immediate updates:

### 1. Build and Export
```bash
npm run build
```

### 2. Live Sync
```bash
# Deploys your static 'out' directory to the CDN
firebase deploy --only hosting
```

---

## 🤖 Automated Sync (GitHub Actions)

Your repository is pre-wired for **Zero-Touch Deployment**. Every `git push` to `main` updates your production environment.

### 🛠️ Configuration Steps

1.  **Generate your CI Token**:
    ```bash
    firebase login:ci
    ```
2.  **Inject Secret into GitHub**:
    - Repository **Settings > Secrets and variables > Actions**.
    - New secret: `FIREBASE_TOKEN`
    - Value: *Paste the multi-line token string generated in Step 1.*

### 🔍 Monitoring Status
Monitor your live deployment progress in the **Actions** tab of your GitHub repository. A green checkmark means your technical showcase is live!

---

## ⚙️ Key System Configuration

- **`firebase.json`**: Configured with `site: "aitech-465715"` and `public: "out"` for optimized CDN delivery.
- **`.gitignore`**: Prevents build artifacts and local environment secrets from leaking.
- **`next.config.ts`**: Configured with `output: 'export'` to generate the static distribution.

---

## �️ Performance Troubleshooting

- **"Authentication Error"**: Your CI token has expired. Refresh it with `firebase login:ci`.
- **"Large File Error"**: If Git rejects a push, double-check that `.firebase/` is not being tracked.
- **Live GCS Errors**: Ensure the `blogscontent` bucket has the correct public IAM permissions.

Congratulations! Your portfolio is now a state-of-the-art, automated, and institutionally-deployed technical asset! 🚀🔥📈
