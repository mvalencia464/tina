// src/App.jsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample posts data - in production this would come from TinaCloud
  const samplePosts = [
    {
      id: 'hello-world',
      title: 'Hello, World!',
      date: '2025-09-19T10:00:00.000Z',
      author: 'TinaCMS Team',
      tags: ['Getting Started', 'TinaCMS'],
      featured: false,
      content: `## Hello World!

Your first TinaCMS post content goes here.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam. Quisque vulputate nibh sodales eros pretium tincidunt. Aenean porttitor efficitur convallis.`
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
- **Flexibility Needs**: Content requirements change as businesses evolve`
    },
    {
      id: 'stoke-leads-announcement',
      title: 'Stoke Leads Unveils Revolutionary Content Management Platform: Where Simplicity Meets AI-Powered Innovation',
      date: '2025-09-19T18:00:00.000Z',
      author: 'Stoke Leads Team',
      tags: ['Stoke Leads', 'Content Management', 'AI Integration', 'MCP', 'Innovation'],
      featured: true,
      content: `# Stoke Leads Unveils Revolutionary Content Management Platform: Where Simplicity Meets AI-Powered Innovation

Today marks a pivotal moment in the evolution of content management systems. **Stoke Leads** is proud to announce the launch of our groundbreaking platform that fundamentally reimagines how businesses create, manage, and scale their digital content.

## Beyond Traditional CMS: A New Paradigm

While the market has been saturated with complex, bloated content management systems that require extensive technical expertise, Stoke Leads has taken a radically different approach. Our platform combines the elegance of simplicity with the power of cutting-edge AI integration, delivering something the industry has never seen before.

### What Makes Stoke Leads Different?

**🎯 Unparalleled User Experience**
Our interface is so intuitive that your team will be productive from day one. No lengthy training sessions, no complex workflows – just pure, efficient content creation.

**🚀 Superior Performance**
Built from the ground up with modern architecture, our platform outperforms traditional high-level sites in both speed and reliability. Your content loads faster, your users stay engaged longer.

**🔄 Effortless Updates**
Gone are the days of wrestling with complicated update processes. Our streamlined system makes content updates as simple as editing a document.

**🤖 AI-Powered Through MCP Integration**
Here's where we truly differentiate ourselves: **Model Context Protocol (MCP) integration**. This isn't just another AI feature – it's a fundamental shift in how content management systems can interact with artificial intelligence.

## See It in Action

<iframe width="560" height="315" src="https://www.youtube.com/embed/5zxZ69tyuwc?si=cMy5RcW3htNb_rkG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

*Watch our platform in action and see why businesses are making the switch to Stoke Leads.*

## Ready to Transform Your Content Strategy?

The future of content management is here, and it's more accessible than ever. Whether you're a small business looking to streamline operations or an enterprise seeking to scale content production, Stoke Leads provides the tools and intelligence you need to succeed.

**Ready to see what's possible?** Contact Stoke Leads today and discover why forward-thinking businesses are choosing our platform over traditional alternatives.

---

*Stoke Leads: Where content management meets artificial intelligence. Where complexity becomes simplicity. Where your vision becomes reality.*`
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