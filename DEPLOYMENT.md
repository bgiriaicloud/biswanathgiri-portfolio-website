# Cloud Run Deployment Guide

This project is optimized for deployment on Google Cloud Run using Docker and Google Cloud Build.

## Prerequisites

1.  **Google Cloud Project**: You are using project `aitech-465715`.
2.  **gcloud CLI**: Ensure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and authenticated.
    ```bash
    gcloud auth login
    ```
3.  **Billing**: Ensure billing is enabled for your project.
4.  **APIs**: The deployment script will automatically enable:
    *   Cloud Run API
    *   Cloud Build API
    *   Container Registry API

## Deployment Steps

Run the automated deployment script:

```bash
./deploy.sh
```

This script will:
1. Set the active project to `aitech-465715`.
2. Enable necessary APIs.
3. Build your container image using Cloud Build (remote build).
4. Push the image to Google Container Registry (GCR).
5. Deploy the image to Cloud Run as a managed service.
6. Make the service publicly accessible.

## Technical Details

*   **Dockerfile**: Uses a multi-stage production build for Next.js.
*   **Standalone Mode**: Next.js is configured to output a standalone server to minimize container size.
*   **Port**: The service runs on port `3000`.
*   **Environment**: `NODE_ENV=production`.
