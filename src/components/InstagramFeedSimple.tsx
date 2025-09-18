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

const InstagramFeedSimple: React.FC = () => {
  const [feedData, setFeedData] = useState<InstagramFeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInstagramFeed = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/instagram.json');
        if (!response.ok) {
          throw new Error('Failed to load Instagram feed');
        }
        
        const data: InstagramFeedData = await response.json();
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
    if (post.local_image && post.local_image.trim() !== '') {
      return `/${post.local_image}`;
    }
    // For base64 data URLs, use them directly
    if (post.image_url && post.image_url.startsWith('data:')) {
      return post.image_url;
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

  if (loading) {
    return React.createElement('div', {
      className: 'flex items-center justify-center p-12'
    }, [
      React.createElement('div', {
        key: 'spinner',
        className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-brand-tomato'
      }),
      React.createElement('span', {
        key: 'text',
        className: 'ml-3 text-brand-black/70'
      }, 'Loading Instagram feed...')
    ]);
  }

  if (error || !feedData) {
    return React.createElement('div', {
      className: 'bg-gray-100 rounded-lg p-8 text-center'
    }, [
      React.createElement(InstagramIcon, {
        key: 'icon',
        className: 'h-12 w-12 text-gray-400 mx-auto mb-4'
      }),
      React.createElement('h3', {
        key: 'title',
        className: 'text-lg font-semibold text-gray-700 mb-2'
      }, 'Instagram Feed Unavailable'),
      React.createElement('p', {
        key: 'message',
        className: 'text-gray-500 mb-4'
      }, 'Unable to load the latest posts. Please visit our Instagram directly.'),
      React.createElement('a', {
        key: 'link',
        href: 'https://www.instagram.com/dough_beats/',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'inline-flex items-center gap-2 bg-brand-tomato hover:bg-brand-tomato/90 text-white px-6 py-3 rounded-full font-semibold transition-colors'
      }, [
        React.createElement(InstagramIcon, { key: 'icon', className: 'h-5 w-5' }),
        'Visit @dough_beats',
        React.createElement(ExternalLink, { key: 'external', className: 'h-4 w-4' })
      ])
    ]);
  }

  if (!feedData.posts || feedData.posts.length === 0) {
    return React.createElement('div', {
      className: 'bg-gray-100 rounded-lg p-8 text-center'
    }, [
      React.createElement(InstagramIcon, {
        key: 'icon',
        className: 'h-12 w-12 text-gray-400 mx-auto mb-4'
      }),
      React.createElement('h3', {
        key: 'title',
        className: 'text-lg font-semibold text-gray-700 mb-2'
      }, 'No Posts Available'),
      React.createElement('p', {
        key: 'message',
        className: 'text-gray-500'
      }, 'Check back soon for the latest updates!')
    ]);
  }

  return React.createElement('section', {
    className: 'py-16 bg-white'
  }, [
    React.createElement('div', {
      key: 'container',
      className: 'container mx-auto px-4'
    }, [
      // Header
      React.createElement('div', {
        key: 'header',
        className: 'text-center mb-12'
      }, [
        React.createElement('div', {
          key: 'title-wrapper',
          className: 'flex items-center justify-center gap-3 mb-4'
        }, [
          React.createElement(InstagramIcon, {
            key: 'icon',
            className: 'h-8 w-8 text-brand-tomato'
          }),
          React.createElement('h2', {
            key: 'title',
            className: 'text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight'
          }, 'Latest from Instagram')
        ]),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-brand-black/70 max-w-2xl mx-auto'
        }, `Follow our journey and see our latest panuozzo creations @${feedData.username}`)
      ]),
      
      // Grid
      React.createElement('div', {
        key: 'grid',
        className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'
      }, feedData.posts.slice(0, 9).map((post) => 
        React.createElement('a', {
          key: post.id,
          href: post.permalink,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105'
        }, [
          React.createElement('img', {
            key: 'image',
            src: getImageUrl(post),
            alt: post.caption ? post.caption.substring(0, 100) + '...' : 'Instagram post',
            className: 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500',
            loading: 'lazy'
          }),
          React.createElement('div', {
            key: 'overlay',
            className: 'absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'
          }, [
            React.createElement('div', {
              key: 'icon-wrapper',
              className: 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            }, [
              React.createElement('div', {
                key: 'icon-bg',
                className: 'bg-white/90 rounded-full p-3 shadow-lg'
              }, [
                React.createElement(ExternalLink, {
                  key: 'icon',
                  className: 'h-5 w-5 text-brand-tomato'
                })
              ])
            ])
          ])
        ])
      )),
      
      // View More Link
      React.createElement('div', {
        key: 'view-more',
        className: 'text-center mt-12'
      }, [
        React.createElement('a', {
          key: 'link',
          href: `https://www.instagram.com/${feedData.username}/`,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'inline-flex items-center gap-2 bg-brand-tomato hover:bg-brand-tomato/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors'
        }, [
          React.createElement(InstagramIcon, { key: 'icon', className: 'h-6 w-6' }),
          'View More on Instagram',
          React.createElement(ExternalLink, { key: 'external', className: 'h-5 w-5' })
        ])
      ])
    ])
  ]);
};

export default InstagramFeedSimple;
