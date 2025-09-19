// src/App.jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate reading posts from your TinaCMS project
  // In a real app, you'd fetch this from an API or build process
  const samplePosts = [
    {
      id: 'sample-post',
      title: 'Sample Blog Post',
      date: '2025-09-19',
      author: 'Test Author',
      content: `# Sample Blog Post

This is a sample blog post for testing TinaMCP.

## Features

- Markdown support
- Frontmatter parsing  
- React rendering

This content would normally come from your TinaCMS files.`
    },
    {
      id: 'tinamcp-power',
      title: 'The Power of TinaMCP for Simple Content Management in Local Businesses',
      date: '2025-09-19T16:00:00.000Z',
      author: 'Content Manager',
      tags: ['TinaMCP', 'Local Business', 'Content Management'],
      featured: true,
      content: `# The Power of TinaMCP for Simple Content Management in Local Businesses

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
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading TinaCMS content...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>TinaCMS Content Preview</h1>
        <p>Powered by TinaMCP</p>
      </header>

      <div className="content">
        <aside className="sidebar">
          <h2>Posts</h2>
          <ul className="post-list">
            {posts.map(post => (
              <li key={post.id} className={selectedPost?.id === post.id ? 'active' : ''}>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="post-button"
                >
                  <h3>{post.title}</h3>
                  <p className="post-meta">
                    {new Date(post.date).toLocaleDateString()} • {post.author}
                  </p>
                  {post.featured && <span className="featured">⭐ Featured</span>}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          {selectedPost ? (
            <article className="post">
              <header className="post-header">
                <h1>{selectedPost.title}</h1>
                <div className="post-meta">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                  {selectedPost.featured && <span className="featured">⭐ Featured</span>}
                </div>
                {selectedPost.tags && (
                  <div className="tags">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </header>
              <div className="post-content">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </article>
          ) : (
            <div className="welcome">
              <h2>Welcome to Your TinaCMS Content</h2>
              <p>Select a post from the sidebar to view it.</p>
              <div className="stats">
                <div className="stat">
                  <strong>{posts.length}</strong>
                  <span>Posts</span>
                </div>
                <div className="stat">
                  <strong>{posts.filter(p => p.featured).length}</strong>
                  <span>Featured</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;