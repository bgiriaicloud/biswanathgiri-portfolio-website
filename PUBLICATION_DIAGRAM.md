# Code-First Publication System - Architecture Diagram

## System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPER (OWNER)                            │
│                                                                  │
│  1. Write Article in Markdown                                   │
│     content/articles/my-article.md                              │
│                                                                  │
│  2. Commit & Push to GitHub                                     │
│     git push origin main                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  content/articles/                                        │  │
│  │  ├── agentic-ai-architecture.md                          │  │
│  │  ├── mcp-vs-rag.md                                       │  │
│  │  └── my-article.md                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Trigger: Push to main branch                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GITHUB ACTIONS CI/CD                           │
│                                                                  │
│  Step 1: Checkout code                                          │
│  Step 2: Setup Node.js 20                                       │
│  Step 3: npm ci (install dependencies)                          │
│  Step 4: npm run build                                          │
│          │                                                       │
│          ├─> Read Markdown files                                │
│          ├─> Parse frontmatter (gray-matter)                    │
│          ├─> Convert MD → HTML (remark)                         │
│          ├─> Generate static pages (Next.js SSG)                │
│          └─> Output: out/ directory                             │
│                                                                  │
│  Step 5: firebase deploy --only hosting                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FIREBASE HOSTING (CDN)                         │
│                                                                  │
│  Static Files:                                                   │
│  ├── /publication/index.html                                    │
│  ├── /publication/articles/index.html                           │
│  ├── /publication/articles/agentic-ai-architecture.html         │
│  ├── /publication/articles/mcp-vs-rag.html                      │
│  └── /publication/tags/index.html                               │
│                                                                  │
│  Features:                                                       │
│  ✅ Global CDN                                                   │
│  ✅ HTTPS                                                        │
│  ✅ Fast delivery                                                │
│  ✅ Automatic caching                                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PUBLIC USERS                                  │
│                                                                  │
│  Browser → https://aitech-465715.web.app/publication            │
│                                                                  │
│  Actions:                                                        │
│  ✅ Browse articles                                              │
│  ✅ Read content                                                 │
│  ✅ Filter by tags                                               │
│  ❌ Cannot edit                                                  │
│  ❌ Cannot delete                                                │
│  ❌ Cannot comment                                               │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Markdown File (Source)
    │
    ├─> gray-matter (Parse frontmatter)
    │   └─> Extract: title, excerpt, tags, dates, author
    │
    ├─> remark (Process Markdown)
    │   ├─> remark-gfm (GitHub Flavored Markdown)
    │   └─> remark-html (Convert to HTML)
    │
    ├─> Next.js SSG (Static Site Generation)
    │   ├─> generateStaticParams() → List all articles
    │   └─> Pre-render HTML pages at build time
    │
    └─> Firebase Hosting (Deploy)
        └─> Serve static HTML via CDN
```

## Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        WRITE ACCESS                              │
│                                                                  │
│  GitHub Repository Collaborators ONLY                            │
│  ├─> Owner: Full access                                         │
│  ├─> Collaborators: Push to main (if granted)                   │
│  └─> Pull Requests: Review before merge                         │
│                                                                  │
│  Authentication: GitHub OAuth                                    │
│  Authorization: Repository permissions                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        READ ACCESS                               │
│                                                                  │
│  Public (Anyone on the internet)                                 │
│  ├─> No authentication required                                 │
│  ├─> Static HTML served via CDN                                 │
│  └─> No backend API calls                                       │
│                                                                  │
│  Security: Read-only, no write endpoints exposed                │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND                                    │
│                                                                  │
│  Next.js 16.1.6                                                  │
│  ├─> React 19.2.3                                               │
│  ├─> TypeScript 5                                               │
│  ├─> Tailwind CSS 4                                             │
│  └─> Static Export (output: 'export')                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   MARKDOWN PROCESSING                            │
│                                                                  │
│  gray-matter: YAML frontmatter parsing                           │
│  remark: Markdown processor                                      │
│  remark-html: MD → HTML conversion                              │
│  remark-gfm: GitHub Flavored Markdown                            │
│  rehype-highlight: Syntax highlighting                           │
│  highlight.js: Code highlighting                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CI/CD                                       │
│                                                                  │
│  GitHub Actions                                                  │
│  ├─> Trigger: Push to main                                      │
│  ├─> Runner: ubuntu-latest                                      │
│  ├─> Node.js: 20                                                │
│  └─> Deploy: Firebase CLI                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      HOSTING                                     │
│                                                                  │
│  Firebase Hosting                                                │
│  ├─> Global CDN                                                 │
│  ├─> HTTPS (automatic)                                          │
│  ├─> Custom domain support                                      │
│  └─> Automatic caching                                          │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
myprotfolio/
│
├── content/                        # 📝 Content (Git-tracked)
│   ├── articles/                   # Markdown articles
│   │   ├── agentic-ai-architecture.md
│   │   └── mcp-vs-rag.md
│   └── media/                      # Static assets
│
├── src/
│   ├── app/
│   │   └── publication/            # 🌐 Public pages
│   │       ├── layout.tsx          # Navigation
│   │       ├── page.tsx            # Landing
│   │       ├── articles/
│   │       │   ├── page.tsx        # List
│   │       │   └── [id]/
│   │       │       └── page.tsx    # Detail (SSG)
│   │       └── tags/
│   │           └── page.tsx        # Tag filter
│   └── lib/
│       └── markdown.ts             # 🔧 MD processor
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # 🚀 CI/CD
│
├── public/                         # Static assets
├── out/                            # Build output (gitignored)
│
├── firebase.json                   # Firebase config
├── next.config.ts                  # Next.js config
├── package.json                    # Dependencies
│
└── PUBLICATION_ARCHITECTURE.md     # 📚 Documentation
```

## Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT STAGES                             │
└─────────────────────────────────────────────────────────────────┘

Stage 1: CODE COMMIT
├─> Developer writes Markdown
├─> git add content/articles/new-article.md
├─> git commit -m "📝 Add: New Article"
└─> git push origin main

Stage 2: CI TRIGGER
├─> GitHub detects push to main
├─> Starts GitHub Actions workflow
└─> Allocates ubuntu-latest runner

Stage 3: BUILD
├─> Checkout repository
├─> Setup Node.js 20
├─> npm ci (install dependencies)
├─> npm run build
│   ├─> Read all .md files from content/articles/
│   ├─> Parse frontmatter with gray-matter
│   ├─> Convert Markdown to HTML with remark
│   ├─> Generate static pages with Next.js
│   └─> Output to out/ directory
└─> Build artifacts ready

Stage 4: DEPLOY
├─> firebase deploy --only hosting
├─> Upload out/ to Firebase Hosting
├─> Invalidate CDN cache
└─> Deployment complete

Stage 5: LIVE
├─> Article accessible at public URL
├─> Served via global CDN
├─> HTTPS enabled
└─> Fast delivery worldwide
```

## Performance Characteristics

```
┌─────────────────────────────────────────────────────────────────┐
│                      PERFORMANCE                                 │
└─────────────────────────────────────────────────────────────────┘

Build Time:
├─> Markdown parsing: ~50ms per article
├─> HTML generation: ~100ms per article
├─> Next.js build: ~2-3 seconds total
└─> Firebase deploy: ~10-20 seconds

Runtime Performance:
├─> First Contentful Paint: <1s
├─> Time to Interactive: <1.5s
├─> Lighthouse Score: 95+
└─> CDN latency: <100ms globally

Scalability:
├─> Articles: Unlimited (static files)
├─> Concurrent users: Unlimited (CDN)
├─> Build time: O(n) where n = number of articles
└─> Storage: Minimal (static HTML)
```

---

**Architecture Type**: JAMstack (JavaScript, APIs, Markup)
**Pattern**: GitOps + Static Site Generation
**Security**: Code-first, read-only public access
**Deployment**: Continuous Deployment via GitHub Actions
