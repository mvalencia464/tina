// src/contentLoader.js
import matter from 'gray-matter';

// In a real Vite app, we'd need to use dynamic imports or a build process
// For now, we'll simulate loading the content files
// In production, you'd typically have a build step that processes these files

const contentFiles = {
  'hello-world': `---
title: Hello, World!
date: 2025-09-19T10:00:00.000Z
author: TinaCMS Team
tags:
  - Getting Started
  - TinaCMS
featured: false
---

## Hello World!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam. Quisque vulputate nibh sodales eros pretium tincidunt. Aenean porttitor efficitur convallis. Nulla sagittis finibus convallis. Phasellus in fermentum quam, eu egestas tortor. Maecenas ac mollis leo. Integer maximus eu nisl vel sagittis.

Suspendisse facilisis, mi ac scelerisque interdum, ligula ex imperdiet felis, a posuere eros justo nec sem. Nullam laoreet accumsan metus, sit amet tincidunt orci egestas nec. Pellentesque ut aliquet ante, at tristique nunc. Donec non massa nibh. Ut posuere lacus non aliquam laoreet. Fusce pharetra ligula a felis porttitor, at mollis ipsum maximus. Donec quam tortor, vehicula a magna sit amet, tincidunt dictum enim. In hac habitasse platea dictumst. Mauris sit amet ornare ligula, blandit consequat risus. Duis malesuada pellentesque lectus, non feugiat turpis eleifend a. Nullam tempus ante et diam pretium, ac faucibus ligula interdum.`,

  'tinamcp-power': `---
title: The Power of TinaMCP for Simple Content Management in Local Businesses
date: 2025-09-19T16:00:00.000Z
author: Content Manager
tags:
  - TinaMCP
  - Local Business
  - Content Management
featured: true
---

# The Power of TinaMCP for Simple Content Management in Local Businesses

Local businesses face a unique challenge: they need professional, maintainable websites but often lack the technical resources of larger companies. TinaMCP (TinaCMS Model Context Protocol) offers an elegant solution that bridges this gap.

## The Local Business Content Challenge

Most local businesses struggle with content management because:

- **Technical Complexity**: Traditional CMSs require ongoing technical maintenance
- **Cost Constraints**: Enterprise solutions are too expensive for small operations
- **Time Limitations**: Business owners need to focus on operations, not wrestling with technology
- **Flexibility Needs**: Content requirements change as businesses evolve

## How TinaMCP Addresses These Issues

### Git-Based Simplicity
TinaMCP leverages TinaCMS's Git-based approach, meaning your content lives in simple files that can be version-controlled and backed up easily. No database complexity or server maintenance headaches.

### Programmatic Access
Through the Model Context Protocol, business processes can be automated:
- Bulk content updates
- Automated report generation
- Integration with business systems
- Scheduled content publishing

### Developer-Friendly, Business-Ready
While TinaMCP provides powerful developer tools, the underlying content remains accessible as simple Markdown files that anyone can read and edit.

## Practical Applications for Local Businesses

### Restaurant Chains
- Update menus across multiple locations simultaneously
- Manage seasonal promotions programmatically
- Integrate with POS systems for real-time pricing

### Service Businesses
- Automate service area updates
- Generate location-specific landing pages
- Sync staff directories across multiple sites

### Retail Operations
- Bulk product catalog updates
- Inventory-driven content changes
- Automated sale notifications

## Getting Started: A Realistic Approach

The beauty of TinaMCP lies in its progressive adoption:

1. **Start Simple**: Begin with basic content in Markdown files
2. **Add Structure**: Implement TinaCMS schemas as needs grow
3. **Automate Gradually**: Use TinaMCP tools for repetitive tasks
4. **Scale Naturally**: Expand automation as business requirements evolve

## The Economic Case

For local businesses, TinaMCP offers:
- **Lower Total Cost**: No expensive CMS licensing or hosting requirements
- **Reduced Maintenance**: Git-based content is inherently stable
- **Future-Proof Investment**: Standard formats ensure long-term accessibility
- **Scalable Growth**: Start small, expand capabilities as needed

## Real-World Implementation

A typical local business implementation might involve:
- Simple file-based content structure
- Automated backup to GitHub
- MCP-driven bulk updates for common changes
- Integration with existing business workflows

## Conclusion

TinaMCP represents a paradigm shift for local business content management. By combining the simplicity of file-based content with the power of programmatic access, it offers a sustainable path forward for businesses that need professional web presence without enterprise complexity.

The future of local business content management isn't about choosing between simple and powerful – it's about having both when you need them.

---

*This post demonstrates TinaMCP in action – it was created using the very tools it describes, showcasing the practical power of programmatic content management.*`
};

export function loadPosts() {
  const posts = [];
  
  for (const [filename, content] of Object.entries(contentFiles)) {
    const parsed = matter(content);
    
    posts.push({
      id: filename,
      title: parsed.data.title,
      date: parsed.data.date,
      author: parsed.data.author,
      tags: parsed.data.tags || [],
      featured: parsed.data.featured || false,
      content: parsed.content
    });
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function loadPost(id) {
  const content = contentFiles[id];
  if (!content) return null;
  
  const parsed = matter(content);
  return {
    id,
    title: parsed.data.title,
    date: parsed.data.date,
    author: parsed.data.author,
    tags: parsed.data.tags || [],
    featured: parsed.data.featured || false,
    content: parsed.content
  };
}
