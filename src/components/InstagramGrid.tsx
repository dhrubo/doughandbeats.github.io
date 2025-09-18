/// <reference types="react" />
import * as React from 'react';

const InstagramGrid = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/instagram.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Instagram feed error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Loading Instagram Feed...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
            Latest from Instagram
          </h2>
          <p className="text-brand-black/70 max-w-2xl mx-auto">
            Follow our journey and see our latest panuozzo creations @dough_beats
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {posts.slice(0, 9).map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={post.image_url}
                alt={post.caption ? post.caption.substring(0, 100) + '...' : 'Instagram post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.innerHTML = '📷';
                }}
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <svg className="h-5 w-5 text-brand-tomato" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/dough_beats/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-tomato hover:bg-brand-tomato/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View More on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramGrid;
