# 📚 Publication System - README

## Overview

This portfolio website includes a **code-first publication system** where articles are written as Markdown files and automatically deployed via GitHub Actions.

## Quick Links

- 📖 **[Quick Start Guide](./QUICK_START.md)** - How to add new articles
- 🏗️ **[Architecture Guide](./PUBLICATION_ARCHITECTURE.md)** - System design and workflow
- 📊 **[Architecture Diagram](./PUBLICATION_DIAGRAM.md)** - Visual system overview
- ✅ **[Implementation Summary](./PUBLICATION_SUMMARY.md)** - Complete feature list

## 🚀 Publishing Workflow

```bash
# 1. Create article
echo "---
title: \"My Article\"
excerpt: \"Description\"
tags: [\"AI\", \"Cloud\"]
createdAt: \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"
updatedAt: \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"
slug: \"my-article\"
author: \"Biswanath Giri\"
---

# Content here
" > content/articles/my-article.md

# 2. Commit and push
git add content/articles/my-article.md
git commit -m "📝 Add: My Article"
git push origin main

# 3. Article goes live automatically! ✨
```

## 📁 Project Structure

```
myprotfolio/
├── content/
│   └── articles/              # 📝 Your Markdown articles
│       ├── agentic-ai-architecture.md
│       └── mcp-vs-rag.md
│
├── src/
│   ├── app/publication/       # 🌐 Public pages
│   └── lib/markdown.ts        # 🔧 MD processor
│
├── .github/workflows/
│   └── deploy.yml             # 🚀 Auto-deployment
│
└── Documentation:
    ├── QUICK_START.md         # How to add articles
    ├── PUBLICATION_ARCHITECTURE.md
    ├── PUBLICATION_DIAGRAM.md
    └── PUBLICATION_SUMMARY.md
```

## 🔒 Security

- ✅ **Write Access**: Only repository collaborators
- ✅ **Read Access**: Public (anyone)
- ✅ **No Public Editor**: Code-first only
- ✅ **Git History**: Full audit trail

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## 📝 Sample Articles

Two sample articles are included:

1. **Agentic AI Architecture** - `/publication/articles/agentic-ai-architecture`
2. **MCP vs RAG** - `/publication/articles/mcp-vs-rag`

## 🎯 Features

- ✅ Markdown-based authoring
- ✅ YAML frontmatter metadata
- ✅ Static site generation (SSG)
- ✅ GitHub Actions CI/CD
- ✅ Firebase Hosting
- ✅ Syntax highlighting
- ✅ Tag filtering
- ✅ SEO optimized

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](./QUICK_START.md) | How to add articles |
| [PUBLICATION_ARCHITECTURE.md](./PUBLICATION_ARCHITECTURE.md) | System architecture |
| [PUBLICATION_DIAGRAM.md](./PUBLICATION_DIAGRAM.md) | Visual diagrams |
| [PUBLICATION_SUMMARY.md](./PUBLICATION_SUMMARY.md) | Complete summary |

## 🔗 Live URLs

- **Production**: https://aitech-465715.web.app/publication
- **Articles**: https://aitech-465715.web.app/publication/articles
- **Tags**: https://aitech-465715.web.app/publication/tags

## 🎓 Tech Stack

- **Framework**: Next.js 16 (Static Export)
- **Markdown**: gray-matter + remark + remark-html
- **Styling**: Tailwind CSS 4
- **Deployment**: GitHub Actions + Firebase Hosting
- **Architecture**: JAMstack + GitOps

## 📦 Key Dependencies

```json
{
  "gray-matter": "Parse YAML frontmatter",
  "remark": "Markdown processor",
  "remark-html": "MD → HTML conversion",
  "remark-gfm": "GitHub Flavored Markdown",
  "rehype-highlight": "Syntax highlighting"
}
```

## 🚨 Troubleshooting

### Build Fails
- Check frontmatter syntax
- Verify all required fields
- Review GitHub Actions logs

### Article Not Showing
- Ensure file is in `content/articles/`
- Check `.md` extension
- Verify frontmatter is valid YAML
- Rebuild: `npm run build`

## 🎉 Success!

You now have a professional, code-first publication system!

**Write in Markdown → Push to GitHub → Live in 1 minute** 🚀

---

For detailed instructions, see [QUICK_START.md](./QUICK_START.md)
