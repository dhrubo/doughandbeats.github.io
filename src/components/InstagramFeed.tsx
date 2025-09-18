import React, { useEffect, useState } from 'react';
import { ExternalLink, Instagram as InstagramIcon } from 'lucide-react';

interface InstagramPost {
  id: string;
  image_url: string;
  thumbnail_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  likes: number;
  local_image?: string;
}

interface InstagramFeedData {
  username: string;
  updated_at: string;
  posts: InstagramPost[];
  total_posts: number;
  error?: string;
}

const InstagramFeed = () => {
  const [feedData, setFeedData] = useState<InstagramFeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInstagramFeed = async () => {
      try {
        setLoading(true);
        
        // Try to load from public/instagram.json first (for GitHub Pages)
        let response = await fetch('/instagram.json');
        
        if (!response.ok) {
          // Fallback: try to load from the existing data structure
          response = await fetch('/src/data/instagram-feed.json');
        }
        
        if (!response.ok) {
          throw new Error('Failed to load Instagram feed');
        }
        
        const data: InstagramFeedData = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setFeedData(data);
      } catch (err) {
        console.error('Error loading Instagram feed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadInstagramFeed();
  }, []);

  const getImageUrl = (post: InstagramPost) => {
    // For local images, use the path directly
    if (post.local_image) {
      return `/${post.local_image}`;
    }
    // For external Instagram images, use them directly
    if (post.thumbnail_url && post.thumbnail_url.startsWith('http')) {
      return post.thumbnail_url;
    }
    if (post.image_url && post.image_url.startsWith('http')) {
      return post.image_url;
    }
    // For local paths without the local_image flag, add leading slash
    if (post.image_url && !post.image_url.startsWith('/')) {
      return `/${post.image_url}`;
    }
    return post.image_url || post.thumbnail_url || '/images/placeholder.jpg';
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-tomato"></div>
        <span className="ml-3 text-brand-black/70">Loading Instagram feed...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <InstagramIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Instagram Feed Unavailable
        </h3>
        <p className="text-gray-500 mb-4">
          Unable to load the latest posts. Please visit our Instagram directly.
        </p>
        <a
          href="https://www.instagram.com/dough_beats/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-tomato hover:bg-brand-tomato/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          <InstagramIcon className="h-5 w-5" />
          Visit @dough_beats
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  if (!feedData || feedData.posts.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <InstagramIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Posts Available
        </h3>
        <p className="text-gray-500">
          Check back soon for the latest updates!
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <InstagramIcon className="h-8 w-8 text-brand-tomato" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight">
              Latest from Instagram
            </h2>
          </div>
          <p className="text-brand-black/70 max-w-2xl mx-auto">
            Follow our journey and see our latest panuozzo creations @{feedData.username}
          </p>
          {feedData.updated_at && (
            <p className="text-sm text-brand-black/50 mt-2">
              Last updated: {formatTimestamp(feedData.updated_at)}
            </p>
          )}
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {feedData.posts.slice(0, 9).map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={getImageUrl(post)}
                alt={post.caption ? post.caption.substring(0, 100) + '...' : 'Instagram post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE0NC43NzIgMTAwIDEwMCAxNDQuNzcyIDEwMCAyMDBTMTQ0Ljc3MiAzMDAgMjAwIDMwMFMyOTAgMjU1LjIyOCAyOTAgMjAwUzI1NS4yMjggMTAwIDIwMCAxMDBaTTIwMCAyNDBDMTc3LjkwOSAyNDAgMTYwIDE3My4wOTEgMTYwIDIwMFMxNzcuOTA5IDE2MCAyMDAgMTYwUzI0MCAyMjIuMDkxIDI0MCAyMDBTMjIyLjA5MSAyNDAgMjAwIDI0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <ExternalLink className="h-5 w-5 text-brand-tomato" />
                  </div>
                </div>
              </div>
              
              {/* Caption Preview (on hover) */}
              {post.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm line-clamp-2">
                    {post.caption.substring(0, 80)}...
                  </p>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href={`https://www.instagram.com/${feedData.username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-tomato hover:bg-brand-tomato/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
          >
            <InstagramIcon className="h-6 w-6" />
            View More on Instagram
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
