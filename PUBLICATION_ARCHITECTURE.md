# Code-First Publication System - Architecture Guide

## 🎯 Overview

This is a **GitOps-based, code-first publication system** where articles are written as Markdown files in the repository and automatically deployed to Firebase Hosting via GitHub Actions.

## 📁 Project Structure

```
myprotfolio/
├── content/
│   ├── articles/              # Markdown articles (source of truth)
│   │   ├── agentic-ai-architecture.md
│   │   └── mcp-vs-rag.md
│   └── media/                 # Static media assets
│       └── images/
├── src/
│   ├── app/
│   │   └── publication/
│   │       ├── page.tsx       # Landing page
│   │       ├── articles/
│   │       │   ├── page.tsx   # Article list
│   │       │   └── [id]/
│   │       │       └── page.tsx  # Article detail
│   │       └── tags/
│   │           └── page.tsx   # Tag filtering
│   └── lib/
│       └── markdown.ts        # Markdown processing
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD pipeline
└── firebase.json              # Firebase config
```

## 🔄 Publishing Workflow

### 1. **Write Article**
Create a new Markdown file in `content/articles/`:

```markdown
---
title: "Your Article Title"
excerpt: "Brief description"
coverImage: "/media/cover.jpg"
tags: ["AI", "Cloud"]
createdAt: "2026-02-14T12:00:00Z"
updatedAt: "2026-02-14T12:00:00Z"
slug: "your-article-slug"
author: "Biswanath Giri"
---

# Your Article Content

Write your content here using Markdown...
```

### 2. **Commit & Push**
```bash
git add content/articles/your-article.md
git commit -m "📝 Add new article: Your Title"
git push origin main
```

### 3. **Automatic Deployment**
GitHub Actions automatically:
- Builds the Next.js static site
- Processes Markdown → HTML
- Deploys to Firebase Hosting
- Article goes live instantly

## 🏗 Architecture Components

### Markdown Processing (`src/lib/markdown.ts`)
- Parses frontmatter metadata
- Converts Markdown to HTML
- Supports GitHub Flavored Markdown (GFM)
- Syntax highlighting for code blocks

### Static Site Generation
- All articles pre-rendered at build time
- SEO-optimized HTML pages
- Fast CDN delivery via Firebase

### CI/CD Pipeline (`.github/workflows/deploy.yml`)
```yaml
Trigger: Push to main
Steps:
  1. Checkout code
  2. Install dependencies
  3. Build static site (npm run build)
  4. Deploy to Firebase Hosting
```

## 🔒 Security Model

### Private Authoring
- ✅ Only repository collaborators can write/edit
- ✅ All changes tracked via Git history
- ✅ Pull request workflow for review

### Public Reading
- ✅ Anyone can read published articles
- ✅ No authentication required
- ✅ Fast CDN delivery
- ❌ No public editing interface
- ❌ No comments (can add later with external service)

## 🚀 Deployment

### Prerequisites
1. Firebase project created
2. Firebase CLI installed: `npm install -g firebase-tools`
3. GitHub repository with secrets configured

### Setup Firebase Token
```bash
firebase login:ci
# Copy the token
```

Add to GitHub Secrets:
- Go to: `Repository → Settings → Secrets → Actions`
- Add secret: `FIREBASE_TOKEN` = `<your-token>`

### Deploy
```bash
# Manual deployment
npm run build
firebase deploy --only hosting

# Automatic via GitHub
git push origin main
```

## 📝 Article Template

```markdown
---
title: "Article Title"
excerpt: "One-line description for previews"
coverImage: "/media/article-cover.jpg"
tags: ["Tag1", "Tag2", "Tag3"]
createdAt: "2026-02-14T12:00:00Z"
updatedAt: "2026-02-14T12:00:00Z"
slug: "url-friendly-slug"
author: "Biswanath Giri"
---

# Main Heading

Introduction paragraph...

## Section 1

Content with **bold**, *italic*, and [links](https://example.com).

### Code Example

\`\`\`python
def hello_world():
    print("Hello, Agentic AI!")
\`\`\`

## Conclusion

Final thoughts...
```

## 🎨 Features

### Implemented
- ✅ Markdown-based authoring
- ✅ Frontmatter metadata
- ✅ Static site generation
- ✅ GitHub Actions CI/CD
- ✅ Firebase Hosting
- ✅ Syntax highlighting
- ✅ Tag filtering
- ✅ SEO optimization

### Future Enhancements
- 🔄 Table of contents auto-generation
- 🔄 Reading time estimation
- 🔄 Search functionality
- 🔄 RSS feed
- 🔄 Social sharing cards
- 🔄 Comment system (via external service)

## 🛠 Development

### Local Development
```bash
# Run dev server
npm run dev

# Visit http://localhost:3000/publication
```

### Add New Article
```bash
# Create file
touch content/articles/my-new-article.md

# Edit with your favorite editor
code content/articles/my-new-article.md

# Commit and push
git add content/articles/my-new-article.md
git commit -m "📝 Add: My New Article"
git push origin main
```

### Preview Before Publishing
```bash
# Build locally
npm run build

# Preview production build
npm start
```

## 📊 Analytics & Monitoring

### Firebase Hosting
- View deployment history
- Monitor traffic
- Check performance

### GitHub Actions
- View build logs
- Monitor deployment status
- Debug failures

## 🔗 URLs

- **Production**: https://aitech-465715.web.app/publication
- **Repository**: https://github.com/bgiriaicloud/biswanathgiri-portfolio-website
- **Firebase Console**: https://console.firebase.google.com/project/aitech-465715

## 💡 Best Practices

1. **Consistent Naming**: Use kebab-case for slugs
2. **Metadata**: Always fill all frontmatter fields
3. **Images**: Optimize before committing
4. **Code Blocks**: Always specify language for syntax highlighting
5. **Git Messages**: Use conventional commits (📝 Add, 🐛 Fix, ♻️ Refactor)

## 🆘 Troubleshooting

### Build Fails
```bash
# Check logs in GitHub Actions
# Common issues:
# - Missing frontmatter field
# - Invalid YAML syntax
# - Markdown parsing error
```

### Article Not Showing
```bash
# Verify file is in content/articles/
# Check frontmatter is valid
# Ensure .md extension
# Rebuild: npm run build
```

---

**🎉 You now have a professional, code-first publication system!**

Write in Markdown → Push to GitHub → Automatically deployed → Live on the web
