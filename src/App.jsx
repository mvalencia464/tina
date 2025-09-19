// src/App.jsx
import { useState, useEffect } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../.tina/__generated__/client';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load posts from TinaCMS
    const loadPosts = async () => {
      try {
        const postsResponse = await client.queries.postConnection();
        const postsData = postsResponse.data.postConnection.edges.map(edge => ({
          id: edge.node._sys.filename,
          title: edge.node.title,
          date: edge.node.date,
          author: edge.node.author,
          tags: edge.node.tags || [],
          featured: edge.node.featured || false,
          content: edge.node.body
        }));

        setPosts(postsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
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
                {selectedPost.content ? (
                  <TinaMarkdown content={selectedPost.content} />
                ) : (
                  <p>No content available</p>
                )}
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