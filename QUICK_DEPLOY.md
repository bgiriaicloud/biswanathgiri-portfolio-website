# Quick Start: GitHub Actions Deployment

## ⚡ Quick Setup (3 Steps)

### 1️⃣ Generate Firebase Token
```bash
firebase login:ci
```
Copy the token that appears in your terminal.

### 2️⃣ Add to GitHub Secrets
1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `FIREBASE_TOKEN`
4. Value: Paste your token
5. Click **Add secret**

### 3️⃣ Push to Deploy
```bash
git add .
git commit -m "Enable auto-deployment"
git push origin main
```

## ✅ That's It!

Your site will automatically deploy to:
**https://aitech-465715.web.app**

## 📊 Monitor Deployment

Go to **Actions** tab in GitHub to watch the deployment live.

## 🔄 Manual Trigger

**Actions** → **Deploy to Firebase Hosting** → **Run workflow**

---

For detailed setup and troubleshooting, see [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)
