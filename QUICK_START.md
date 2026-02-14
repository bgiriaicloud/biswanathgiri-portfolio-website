# Quick Start: Adding New Articles

## 📝 3-Step Publishing Process

### Step 1: Create Markdown File

```bash
# Navigate to articles directory
cd content/articles

# Create new article
touch my-new-article.md
```

### Step 2: Write Content

```markdown
---
title: "Your Article Title Here"
excerpt: "A compelling one-line description that appears in previews"
coverImage: "/media/your-cover-image.jpg"
tags: ["AI", "Cloud", "Architecture"]
createdAt: "2026-02-14T12:00:00Z"
updatedAt: "2026-02-14T12:00:00Z"
slug: "my-new-article"
author: "Biswanath Giri"
---

# Main Heading

Your introduction paragraph goes here. Make it engaging!

## Section 1: Key Concept

Explain your first main point. Use **bold** for emphasis and *italic* for subtle highlights.

### Subsection

More detailed information here.

## Section 2: Code Examples

Show practical examples:

\`\`\`python
def example_function():
    """This is a Python example"""
    return "Hello, World!"
\`\`\`

\`\`\`typescript
interface User {
    name: string;
    email: string;
}

const user: User = {
    name: "Biswanath",
    email: "example@example.com"
};
\`\`\`

## Section 3: Lists

### Unordered List
- First point
- Second point
  - Nested point
  - Another nested point
- Third point

### Ordered List
1. First step
2. Second step
3. Third step

## Section 4: Links and Images

Check out [this resource](https://example.com) for more information.

![Alt text for image](/media/diagram.png)

## Conclusion

Wrap up your article with key takeaways and next steps.
```

### Step 3: Publish

```bash
# Add the file
git add content/articles/my-new-article.md

# Commit with a descriptive message
git commit -m "📝 Add: My New Article Title"

# Push to trigger deployment
git push origin main
```

---

## 🎯 Frontmatter Fields Explained

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ Yes | Article title | `"Agentic AI Architecture"` |
| `excerpt` | ✅ Yes | Short description (1-2 sentences) | `"Exploring the shift from RAG to agents"` |
| `coverImage` | ❌ No | Cover image URL | `"/media/cover.jpg"` |
| `tags` | ✅ Yes | Array of tags | `["AI", "Cloud"]` |
| `createdAt` | ✅ Yes | ISO 8601 date | `"2026-02-14T12:00:00Z"` |
| `updatedAt` | ✅ Yes | ISO 8601 date | `"2026-02-14T12:00:00Z"` |
| `slug` | ✅ Yes | URL-friendly identifier | `"agentic-ai-architecture"` |
| `author` | ✅ Yes | Author name | `"Biswanath Giri"` |

---

## 📐 Markdown Syntax Quick Reference

### Headings
```markdown
# H1 - Main Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

### Links
```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")
```

### Images
```markdown
![Alt text](/path/to/image.jpg)
![Alt text](/path/to/image.jpg "Image title")
```

### Code Blocks
````markdown
```python
def hello():
    print("Hello, World!")
```

```typescript
const greeting: string = "Hello, TypeScript!";
```

```bash
npm install
npm run build
```
````

### Lists
```markdown
Unordered:
- Item 1
- Item 2
  - Nested item
  - Another nested item

Ordered:
1. First
2. Second
3. Third
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Horizontal Rule
```markdown
---
```

---

## 🎨 Supported Code Languages

Syntax highlighting is available for:

- `python` - Python
- `typescript` / `ts` - TypeScript
- `javascript` / `js` - JavaScript
- `bash` / `shell` - Shell scripts
- `yaml` / `yml` - YAML
- `json` - JSON
- `html` - HTML
- `css` - CSS
- `sql` - SQL
- `go` - Go
- `rust` - Rust
- `java` - Java
- `cpp` / `c++` - C++
- `c` - C
- `ruby` - Ruby
- `php` - PHP
- `swift` - Swift
- `kotlin` - Kotlin
- `markdown` / `md` - Markdown

---

## 📅 Date Format

Use ISO 8601 format for dates:

```markdown
createdAt: "2026-02-14T12:00:00Z"
updatedAt: "2026-02-14T15:30:00Z"
```

### Quick Date Generator

```bash
# Current date in ISO 8601
date -u +"%Y-%m-%dT%H:%M:%SZ"

# Output: 2026-02-14T12:00:00Z
```

---

## 🏷️ Tag Best Practices

### Good Tags
- ✅ Specific: `"Agentic AI"`, `"Cloud Architecture"`
- ✅ Consistent: Use same capitalization
- ✅ Relevant: 3-5 tags per article
- ✅ Searchable: Common industry terms

### Avoid
- ❌ Too generic: `"Technology"`, `"Programming"`
- ❌ Too many: More than 7 tags
- ❌ Inconsistent: `"AI"` vs `"ai"` vs `"Ai"`

### Suggested Tags
```
AI, Agentic AI, Cloud, GCP, AWS, Azure
Architecture, Microservices, Serverless
Next.js, React, TypeScript, Python
DevOps, CI/CD, Docker, Kubernetes
MCP, RAG, LLM, Gemini
```

---

## 🖼️ Adding Images

### Option 1: Local Images
```bash
# Add image to media folder
cp ~/Downloads/my-image.jpg content/media/

# Reference in Markdown
![Description](/media/my-image.jpg)
```

### Option 2: External URLs
```markdown
![Description](https://example.com/image.jpg)
```

### Option 3: Cover Images
```markdown
---
coverImage: "/media/article-cover.jpg"
---
```

---

## ✅ Pre-Publish Checklist

Before pushing your article:

- [ ] All frontmatter fields filled
- [ ] Title is compelling and descriptive
- [ ] Excerpt is 1-2 sentences
- [ ] Tags are relevant (3-5 tags)
- [ ] Dates are in ISO 8601 format
- [ ] Slug is URL-friendly (lowercase, hyphens)
- [ ] Code blocks have language specified
- [ ] Images have alt text
- [ ] Links are working
- [ ] Content is proofread
- [ ] Markdown syntax is valid

---

## 🚀 Deployment Timeline

After pushing to GitHub:

```
0:00 - Push to main branch
0:05 - GitHub Actions triggered
0:10 - Dependencies installed
0:15 - Build started
0:20 - Markdown processed
0:25 - Static pages generated
0:30 - Firebase deployment started
0:45 - Deployment complete
0:50 - CDN cache updated
1:00 - Article live on website ✅
```

**Total time**: ~1 minute from push to live

---

## 🔍 Verify Your Article

After deployment:

1. **Visit your article**:
   ```
   https://aitech-465715.web.app/publication/articles/your-slug
   ```

2. **Check article list**:
   ```
   https://aitech-465715.web.app/publication/articles
   ```

3. **Verify tags**:
   ```
   https://aitech-465715.web.app/publication/tags
   ```

---

## 🛠️ Local Testing

Before pushing, test locally:

```bash
# Build the site
npm run build

# Check for errors in terminal

# Preview production build
npm start

# Visit http://localhost:3000/publication/articles/your-slug
```

---

## 📝 Example: Complete Article

```markdown
---
title: "Building Scalable AI Agents with MCP"
excerpt: "A practical guide to implementing the Model Context Protocol for production-grade agentic systems."
coverImage: "/media/mcp-agents.jpg"
tags: ["AI", "MCP", "Agents", "Architecture"]
createdAt: "2026-02-14T12:00:00Z"
updatedAt: "2026-02-14T12:00:00Z"
slug: "building-scalable-ai-agents-mcp"
author: "Biswanath Giri"
---

# Building Scalable AI Agents with MCP

The **Model Context Protocol (MCP)** is revolutionizing how we build AI agents. In this article, we'll explore practical patterns for production systems.

## Why MCP?

Traditional approaches have limitations:
- ❌ No standardization
- ❌ Complex integrations
- ❌ Limited tool support

MCP solves these with:
- ✅ Standard protocol
- ✅ Easy integrations
- ✅ Rich tool ecosystem

## Implementation

Here's a basic MCP server:

\`\`\`typescript
import { MCPServer } from '@modelcontextprotocol/sdk';

const server = new MCPServer({
  name: "my-agent",
  version: "1.0.0"
});

server.addTool({
  name: "search",
  description: "Search the knowledge base",
  handler: async (query: string) => {
    return await searchKnowledgeBase(query);
  }
});

server.listen(3000);
\`\`\`

## Best Practices

1. **Design for composability**
2. **Implement proper error handling**
3. **Monitor agent performance**
4. **Version your tools**

## Conclusion

MCP enables building production-grade AI agents at scale. Start experimenting today!

**Resources**:
- [MCP Documentation](https://modelcontextprotocol.io)
- [GitHub Repository](https://github.com/example)
```

---

## 🎉 You're Ready!

Start writing amazing articles and share your knowledge with the world!

**Remember**: Write → Commit → Push → Live in 1 minute! 🚀
