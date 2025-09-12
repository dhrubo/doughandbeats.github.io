import { Button } from "@/components/ui/button";
import { Instagram as InstagramIcon, ExternalLink } from "lucide-react";
import feed from '@/data/instagram-feed.json';
import { useState } from 'react';

const Instagram = () => {
  const [visibleCount, setVisibleCount] = useState(16);
  const allPosts = feed.posts;
  const posts = allPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < allPosts.length;
  const loadMore = () => setVisibleCount(c => Math.min(c + 16, allPosts.length));

  return (
    <div className="bg-brand-cream pt-20">
      {/* Page Header */}
      <header className="py-16 md:py-24 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <InstagramIcon className="h-12 w-12 text-brand-tomato" />
            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">
              Instagram
            </h1>
          </div>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">
            See our latest creations, behind-the-scenes moments, and event highlights on Instagram.
          </p>
          <Button 
            size="lg"
            className="mt-8 bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-xl rounded-full px-10 py-7"
            asChild
          >
            <a 
              href="https://www.instagram.com/dough_beats/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Follow @dough_beats
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </header>

      {/* LightWidget Embedded Feed */}
      <section className="pt-16 md:pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-tomato tracking-tight mb-4">
              Live Instagram Feed
            </h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto">
              This embedded feed is powered by LightWidget. Scroll for more, or browse our curated highlights below.
            </p>
          </div>
          {/* LightWidget WIDGET */}
          <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white p-2 md:p-4">
            <script src="https://cdn.lightwidget.com/widgets/lightwidget.js" defer></script>
            <iframe 
              src="//lightwidget.com/widgets/6244b622a6095a5db4c66e73e0fb1e5d.html" 
              scrolling="no" 
              allowTransparency
              className="lightwidget-widget w-full" 
              style={{ border: 0, overflow: 'hidden' }}
              title="Instagram embedded feed"
            />
          </div>
        </div>
      </section>

      {/* Instagram Gallery (local JSON based) */}
      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={post.media_url} 
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                   <InstagramIcon className="h-10 w-10 text-white" />
                </div>
              </a>
            ))}
          </div>
          {canLoadMore && (
            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={loadMore}
                className="bg-brand-tomato hover:bg-brand-tomato/90 text-white font-semibold rounded-full px-8 py-6"
              >
                Load More Photos
              </Button>
            </div>
          )}
        </div>
      </main>

       {/* CTA Section */}
       <section className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Want to see more?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">
            Head over to our Instagram for the full gallery and daily updates.
          </p>
          <Button 
            size="lg"
            className="bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-xl rounded-full px-10 py-7"
            asChild
          >
            <a 
              href="https://www.instagram.com/dough_beats/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Our Instagram
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Instagram;