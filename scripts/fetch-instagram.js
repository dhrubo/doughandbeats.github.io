import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

const fetchInstagramFeed = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn('INSTAGRAM_ACCESS_TOKEN not found. Skipping Instagram feed fetch.');
    // Create an empty file to prevent build errors
    const emptyData = JSON.stringify({ posts: [] });
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'instagram-feed.json'), emptyData);
    return;
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram feed: ${response.statusText}`);
    }
    const { data } = await response.json();

    const feed = {
      posts: data.map(post => ({
        id: post.id,
        caption: post.caption || '',
        media_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
      })),
    };

    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'instagram-feed.json'), JSON.stringify(feed, null, 2));
    console.log('Successfully fetched and saved Instagram feed.');

  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    // Create an empty file to prevent build errors
    const emptyData = JSON.stringify({ posts: [] });
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'instagram-feed.json'), emptyData);
  }
};

fetchInstagramFeed();
