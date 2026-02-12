# 🚀 Professional Portfolio: Cloud Run Deployment Guide

This guide provides a comprehensive, step-by-step walkthrough for deploying your AI & Cloud Expert portfolio to **Google Cloud Run** using modern **Keyless Authentication (Workload Identity Federation)**.

---

## 📋 Phase 1: Prerequisites

Before starting, ensure you have the following:

1.  **Google Cloud Project**: An active project (e.g., `aitech-465715`).
2.  **gcloud CLI**: Installed and authenticated on your local machine.
    ```bash
    gcloud auth login
    ```
3.  **GitHub Repository**: Your code pushed to a repo (e.g., `bgiriaicloud/biswanathgiri-portfolio-website`).
4.  **Billing**: Enabled in your Google Cloud Console.

---

## 🛠️ Phase 2: One-Time Cloud Infrastructure Setup

We use **Workload Identity Federation (WIF)** to eliminate static JSON keys for maximum security.

### 1. Enable Required APIs
```bash
gcloud services enable run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com \
                       iamcredentials.googleapis.com
```

### 2. Create the Service Account
```bash
gcloud iam service-accounts create "github-actions-deployer" \
    --display-name="GitHub Actions Deployer"
```

### 3. Setup Workload Identity Pool & Provider
```bash
# Create the Pool
gcloud iam workload-identity-pools create "github-pool" \
    --location="global" \
    --display-name="GitHub Actions Pool"

# Create the Provider linked to your GitHub
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
    --location="global" \
    --workload-identity-pool="github-pool" \
    --display-name="GitHub Actions Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-condition="assertion.repository == 'bgiriaicloud/biswanathgiri-portfolio-website'"
```

---

## 🔐 Phase 3: Identity & Access Management (IAM)

### 1. Grant Roles to the Service Account
Run these to give the deployer permission to manage your resources:
```bash
PROJECT_ID="aitech-465715"
SA_EMAIL="github-actions-deployer@$PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/run.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/artifactregistry.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/storage.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/cloudbuild.builds.editor"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA_EMAIL" --role="roles/iam.serviceAccountUser"
```

### 2. Allow GitHub to Impersonate the Service Account
This connects your GitHub repo to the GCP identity:
```bash
# Get the Pool Number (replace YOUR_PROJECT_NUMBER)
gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/YOUR_PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/bgiriaicloud/biswanathgiri-portfolio-website"
```

---

## 🚀 Phase 4: Deployment Methods

### Option A: Fully Automated (GitHub Actions)
This is the recommended production flow. Every push to the `main` branch triggers a build.
1.  Verify the `workload_identity_provider` string in `.github/workflows/deploy.yml` matches your setup.
2.  Push to GitHub:
    ```bash
    git add .
    git commit -m "feat: trigger deployment"
    git push origin main
    ```

### Option B: Manual Deployment (Scripted)
For quick updates or local testing before pushing:
1.  Make the script executable: `chmod +x deploy.sh`
2.  Run the script: `./deploy.sh`
    *   This builds the image remotely using **Cloud Build**.
    *   Deploys to **Cloud Run** and gives you a live URL.

---

## 📦 Phase 5: Container Architecture 
Your app uses a **Multi-Stage Dockerfile** for optimization:
- **Build Stage**: Compiles and minifies the code.
- **Run Stage**: Uses a slim Node.js image with **Standalone Output** (~100MB).
- **Security**: The container runs as a non-privileged `nextjs` user.

---

## 🔍 Phase 6: Monitoring & Maintenance
- **Logs**: View live application logs in the [Google Cloud Console](https://console.cloud.google.com/run).
- **Photos**: Keep your followers updated! Any images added to your GCS bucket `gs://biswanath-portfolio/` can be refreshed in `src/data/portfolio.ts` and pushed to update the "Album Grid".

Congratulations on deploying an institutional-grade, secure cloud platform! 🚀
