#!/bin/bash

# Configuration
PROJECT_ID="aitech-465715"
SERVICE_NAME="my-portfolio"
REGION="us-central1"
REPO_NAME="portfolio-repo"
IMAGE_NAME="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$SERVICE_NAME"

echo "🚀 Starting deployment for $SERVICE_NAME to Google Cloud Run..."

# Ensure gcloud is configured
echo "📍 Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Enable APIs
echo "🛠 Enabling required APIs (Cloud Run, Artifact Registry, Cloud Build)..."
gcloud services enable run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com

# Create Repository if it doesn't exist
echo "📦 Checking Artifact Registry repository..."
gcloud artifacts repositories describe $REPO_NAME --location=$REGION --project=$PROJECT_ID > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🏗 Creating Artifact Registry repository $REPO_NAME..."
    gcloud artifacts repositories create $REPO_NAME \
        --repository-format=docker \
        --location=$REGION \
        --description="Docker repository for portfolio"
fi

# Build and push the image
echo "📦 Building and pushing container image..."
gcloud builds submit --tag $IMAGE_NAME

# Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 3000

echo "✅ Deployment complete!"
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)'
