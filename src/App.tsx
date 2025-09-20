// src/App.tsx
import React, { useState, useEffect } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { client } from '../.tina/__generated__/client';
import './App.css';

// Define our simplified post interface for the UI
interface PostData {
  id: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  content: any; // TinaCMS rich-text content
}

// Custom component to render markdown content with HTML support
const ContentRenderer = ({ content }: { content: any }) => {
  // If content is a string (markdown), parse and render with HTML support
  if (typeof content === 'string') {
    // Split content by lines and process each line
    const lines = content.split('\n');
    const processedLines: (string | JSX.Element)[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line contains iframe
      if (line.includes('<iframe')) {
        // Find the complete iframe tag (might span multiple lines)
        let iframeHtml = line;
        let j = i + 1;

        // Continue reading lines until we find the closing tag
        while (j < lines.length && !iframeHtml.includes('</iframe>')) {
          iframeHtml += '\n' + lines[j];
          j++;
        }

        // Render the iframe directly
        processedLines.push(
          <div
            key={`iframe-${i}`}
            dangerouslySetInnerHTML={{ __html: iframeHtml }}
            style={{ margin: '2rem 0' }}
          />
        );

        // Skip the lines we've already processed
        i = j - 1;
      } else {
        // Regular markdown line
        processedLines.push(line);
      }
    }

    // Join non-iframe lines back into markdown and render with ReactMarkdown
    const markdownContent = processedLines
      .filter(line => typeof line === 'string')
      .join('\n');

    const iframeElements = processedLines.filter(line => typeof line !== 'string');

    return (
      <div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            iframe: (props: any) => <iframe {...props} style={{ maxWidth: '100%' }} />
          }}
        >
          {markdownContent}
        </ReactMarkdown>
        {iframeElements}
      </div>
    );
  }

  // For TinaCMS rich-text content, use TinaMarkdown
  return (
    <TinaMarkdown
      content={content}
      components={{
        iframe: SecureIframe
      }}
    />
  );
};

// Allowed domains for iframe embeds (security allowlist)
const ALLOWED_DOMAINS = [
  'youtube.com',
  'youtu.be',
  'www.youtube.com',
  'api.leadconnectorhq.com',
  'maps.google.com',
  'www.google.com',
  'google.com',
  'vimeo.com',
  'player.vimeo.com',
  'calendly.com',
  'typeform.com'
];

// Secure iframe component with domain validation
interface IframeProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
}

const SecureIframe: React.FC<IframeProps> = ({
  src,
  title = "Embedded content",
  width = 560,
  height = 315
}) => {
  try {
    const url = new URL(src);
    const isAllowed = ALLOWED_DOMAINS.some(domain =>
      url.hostname === domain || url.hostname.endsWith('.' + domain)
    );

    if (!isAllowed) {
      return (
        <div style={{
          padding: '20px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>🚫 Embed not allowed from domain: {url.hostname}</p>
          <p>Allowed domains: {ALLOWED_DOMAINS.join(', ')}</p>
        </div>
      );
    }

    return (
      <div style={{ margin: '20px 0' }}>
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            maxWidth: '100%',
            border: 'none',
            borderRadius: '8px'
          }}
        />
      </div>
    );
  } catch (error) {
    return (
      <div style={{
        padding: '20px',
        border: '2px dashed #ff6b6b',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#d63031'
      }}>
        <p>❌ Invalid URL: {src}</p>
        <p>Please provide a valid embed URL</p>
      </div>
    );
  }
};

function App(): React.JSX.Element {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load posts from TinaCMS
    const loadPosts = async (): Promise<void> => {
      try {
        const postsResponse = await client.queries.postConnection();
        const postsData: PostData[] = postsResponse.data.postConnection.edges?.map(edge => ({
          id: edge?.node?._sys.filename || '',
          title: edge?.node?.title || '',
          date: edge?.node?.date || '',
          author: edge?.node?.author || '',
          tags: edge?.node?.tags?.filter((tag): tag is string => tag !== null) || [],
          featured: edge?.node?.featured || false,
          content: edge?.node?.body
        })).filter((post): post is PostData => post.id !== '') || [];

        setPosts(postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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
            {posts.map((post: PostData) => (
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
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="tags">
                    {selectedPost.tags.map((tag: string) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </header>
              <div className="post-content">
                {selectedPost.content ? (
                  <ContentRenderer content={selectedPost.content} />
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
                  <strong>{posts.filter((p: PostData) => p.featured).length}</strong>
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