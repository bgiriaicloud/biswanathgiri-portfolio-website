# GitHub Actions Automatic Deployment Setup

This guide will help you set up automatic deployment to Firebase Hosting using GitHub Actions.

## 🎯 Overview

Your portfolio website will automatically deploy to Firebase Hosting whenever you:
- Push code to the `main` branch (production deployment)
- Manually trigger the workflow from GitHub Actions tab

## 📋 Prerequisites

- GitHub repository for your project
- Firebase project (`aitech-465715`)
- Firebase CLI installed locally

## 🔐 Step 1: Generate Firebase Token

You need to generate a Firebase CI token to allow GitHub Actions to deploy on your behalf.

### Generate the Token

Run this command in your terminal:

```bash
firebase login:ci
```

This will:
1. Open your browser for authentication
2. Ask you to log in to your Google account
3. Generate a token and display it in the terminal

**Important:** Copy the token immediately and store it securely. It looks like:
```
1//0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Alternative: Using Existing Token

If you already have a Firebase token, you can skip the generation step and use your existing token.

## 🔑 Step 2: Add Firebase Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:

### FIREBASE_TOKEN

- **Name:** `FIREBASE_TOKEN` (must be exactly this)
- **Value:** Paste the token you got from `firebase login:ci`

5. Click **Add secret**

## 🚀 Step 3: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. If prompted, click **I understand my workflows, go ahead and enable them**

## 📦 Step 4: Push Your Code

Once you've set up the secret, simply push your code to trigger the deployment:

```bash
# Add all changes
git add .

# Commit your changes
git commit -m "Set up GitHub Actions deployment"

# Push to main branch
git push origin main
```

## 🔍 Step 5: Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. Watch the deployment progress in real-time
4. Once complete, you'll see a deployment summary with your live URL

## 🌐 Deployment URL

**Production:** https://aitech-465715.web.app

## 🔄 Workflow Features

### Automatic Triggers

- ✅ **Push to main:** Deploys to production
- ✅ **Manual:** Can be triggered from Actions tab

### Build Optimizations

- 📦 **Dependency Caching:** Faster builds by caching npm packages and Next.js cache
- 🗜️ **Build Artifacts:** Stores build output for 7 days
- 🧹 **Linting:** Runs ESLint before deployment (non-blocking)

### Workflow Steps

1. **Checkout code** - Gets your latest code
2. **Setup Node.js** - Installs Node.js 20 with npm caching
3. **Cache dependencies** - Speeds up builds
4. **Install dependencies** - Runs `npm ci`
5. **Lint code** - Checks code quality
6. **Build static site** - Runs `npm run build`
7. **Upload artifacts** - Saves build output
8. **Deploy to Firebase** - Deploys to Firebase Hosting
9. **Deployment Summary** - Shows deployment details

## 🛠️ Troubleshooting

### Deployment Fails with "Invalid Token"

**Solution:** 
1. Generate a new token: `firebase login:ci`
2. Update the `FIREBASE_TOKEN` secret in GitHub
3. Re-run the workflow

### Build Fails

**Solution:** Test the build locally first:
```bash
npm ci
npm run build
```

Check the error message in the Actions tab for specific issues.

### Secret Not Found

**Solution:** 
1. Verify the secret name is exactly `FIREBASE_TOKEN`
2. Ensure there are no extra spaces in the token value
3. Re-create the secret if necessary

### Firebase CLI Not Found

**Solution:** The workflow automatically installs Firebase CLI, but if you see this error:
1. Check the workflow logs
2. Ensure the deployment step has internet access
3. Try re-running the workflow

## 📝 Manual Deployment (Fallback)

If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

Or using the token:

```bash
firebase deploy --only hosting --token "YOUR_FIREBASE_TOKEN"
```

## 🔒 Security Best Practices

1. ✅ Never commit the Firebase token to your repository
2. ✅ Keep your token secure and don't share it
3. ✅ Rotate tokens periodically (generate new ones)
4. ✅ Use GitHub's secret scanning to detect leaked tokens
5. ✅ Review deployment logs regularly

## 🎯 Manual Workflow Trigger

You can manually trigger a deployment without pushing code:

1. Go to **Actions** tab in GitHub
2. Click on **Deploy to Firebase Hosting** workflow
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

## 📊 Environment Configuration

The workflow uses GitHub Environments for better control:

- **Environment Name:** `production`
- **URL:** https://aitech-465715.web.app

You can add protection rules:
1. Go to **Settings** → **Environments** → **production**
2. Add required reviewers (optional)
3. Add deployment branches (already set to `main`)

## 🎉 Success Indicators

After a successful deployment, you'll see:
- ✅ Green checkmark on your commit
- 📊 Deployment summary in the Actions tab showing:
  - Project ID
  - Environment
  - Live URL
  - Commit SHA
- 🌐 Live site accessible at https://aitech-465715.web.app

## 🔄 Token Expiration

Firebase CI tokens don't expire automatically, but you should:
- Regenerate tokens if you suspect they're compromised
- Update the token if you change your Google account password
- Keep a backup of your token in a secure password manager

## 📚 Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## 🚨 Common Issues

### "Error: HTTP Error: 401, Unauthorized"
- Your token is invalid or expired
- Generate a new token and update the secret

### "Error: No project active"
- Check that `.firebaserc` exists and has the correct project ID
- Verify `firebase.json` is properly configured

### Build succeeds but deployment fails
- Check Firebase Hosting is enabled in your Firebase project
- Verify the `out/` directory exists after build
- Ensure `firebase.json` points to the correct public directory

---

**Need Help?** Check the Actions tab for detailed logs of each deployment step.
