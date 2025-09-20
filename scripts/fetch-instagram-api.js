#!/usr/bin/env node

/**
 * Instagram Feed Scraper using Instagram Basic Display API
 * 
 * This script uses Instagram's official API to fetch posts.
 * Requires proper authentication tokens.
 * 
 * Setup:
 * 1. Create a Facebook App at https://developers.facebook.com/
 * 2. Add Instagram Basic Display product
 * 3. Get your access token
 * 4. Set environment variables or update the config below
 * 
 * Usage: node scripts/fetch-instagram-api.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
      process.env[key.trim()] = value.trim();
    }
  });
}

// Configuration - Update these with your Instagram API credentials
const CONFIG = {
  // Get this from Facebook Developers > Your App > Instagram Basic Display
  ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN_HERE',
  
  // Instagram User ID (your Instagram account ID)
  USER_ID: process.env.INSTAGRAM_USER_ID || 'YOUR_USER_ID_HERE',
  
  // Output settings
  OUTPUT_DIR: path.join(__dirname, '..', 'public'),
  IMAGES_DIR: path.join(__dirname, '..', 'public', 'instagram'),
  OUTPUT_FILE: path.join(__dirname, '..', 'public', 'instagram.json'),
  MAX_POSTS: 9
};

// Ensure output directories exist
if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
  fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(CONFIG.IMAGES_DIR)) {
  fs.mkdirSync(CONFIG.IMAGES_DIR, { recursive: true });
}

/**
 * Make HTTPS request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { 
      headers: {
        'User-Agent': 'DoughAndBeats/1.0'
      }
    }, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.setTimeout(15000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Download an image and save it locally
 */
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(CONFIG.IMAGES_DIR, filename);
    const file = fs.createWriteStream(filePath);

    const request = https.get(url, { 
      headers: {
        'User-Agent': 'DoughAndBeats/1.0'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filePath);
        });
      } else {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(new Error(`Failed to download image: HTTP ${response.statusCode}`));
      }
    });

    request.on('error', (error) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(error);
    });

    file.on('error', (error) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(error);
    });
  });
}

/**
 * Fetch Instagram media using Basic Display API
 */
async function fetchInstagramMedia() {
  if (CONFIG.ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE' || CONFIG.USER_ID === 'YOUR_USER_ID_HERE') {
    throw new Error('Please configure your Instagram API credentials in the script or environment variables');
  }

  const mediaUrl = `https://graph.instagram.com/${CONFIG.USER_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${CONFIG.ACCESS_TOKEN}&limit=${CONFIG.MAX_POSTS}`;
  
  console.log('📡 Fetching media from Instagram API...');
  const response = await makeRequest(mediaUrl);
  
  if (response.error) {
    throw new Error(`Instagram API Error: ${response.error.message}`);
  }
  
  return response.data || [];
}

/**
 * Process Instagram media data
 */
function processMediaData(mediaList) {
  return mediaList
    .filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
    .slice(0, CONFIG.MAX_POSTS)
    .map(item => ({
      id: item.id,
      image_url: item.media_url,
      thumbnail_url: item.thumbnail_url || item.media_url,
      permalink: item.permalink,
      caption: item.caption || '',
      timestamp: item.timestamp,
      likes: 0, // Basic Display API doesn't provide likes
      media_type: item.media_type
    }));
}



/**
 * Main function
 */
async function fetchInstagramFeed() {
  try {
    // Check if API is configured
    if (CONFIG.ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE' || CONFIG.USER_ID === 'YOUR_USER_ID_HERE') {
      console.log('⚠️ Instagram API not configured, creating an empty feed...');
      const emptyData = {
        username: 'dough_beats',
        updated_at: new Date().toISOString(),
        posts: [],
        total_posts: 0,
        error: "Instagram API not configured",
        api_configured: false
      };
      fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(emptyData, null, 2));
      console.log(`✅ Empty Instagram feed file saved to ${CONFIG.OUTPUT_FILE}`);
      return emptyData;
    }

    // Fetch real Instagram data
    console.log('🔍 Fetching Instagram posts via API...');
    const mediaList = await fetchInstagramMedia();
    
    if (!mediaList || mediaList.length === 0) {
      console.log('⚠️ No media found, creating an empty feed...');
      const emptyData = {
        username: 'dough_beats',
        updated_at: new Date().toISOString(),
        posts: [],
        total_posts: 0,
        error: "No media found",
        api_configured: true
      };
      fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(emptyData, null, 2));
      console.log(`✅ Empty Instagram feed file saved to ${CONFIG.OUTPUT_FILE}`);
      return emptyData;
    }

    console.log(`✅ Found ${mediaList.length} posts`);
    
    // Process the media data
    const processedPosts = processMediaData(mediaList);
    
    // Optionally download images locally
    console.log('📸 Downloading images...');
    const postsWithLocalImages = [];
    
    for (let i = 0; i < processedPosts.length; i++) {
      const post = processedPosts[i];
      const filename = `${post.id}.jpg`;
      
      try {
        await downloadImage(post.image_url, filename);
        postsWithLocalImages.push({
          ...post,
          local_image: `instagram/${filename}`
        });
        console.log(`  ✅ Downloaded ${filename}`);
      } catch (error) {
        console.log(`  ⚠️ Failed to download ${filename}: ${error.message}`);
        postsWithLocalImages.push(post);
      }
    }
    
    // Create final data structure
    const instagramData = {
      username: 'dough_beats',
      updated_at: new Date().toISOString(),
      posts: postsWithLocalImages,
      total_posts: postsWithLocalImages.length,
      api_configured: true,
      source: 'Instagram Basic Display API'
    };
    
    // Save to JSON
    fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(instagramData, null, 2));
    
    console.log(`✅ Instagram feed saved to ${CONFIG.OUTPUT_FILE}`);
    console.log(`📊 Total posts: ${instagramData.total_posts}`);
    
    return instagramData;
    
  } catch (error) {
    console.error('❌ Error fetching Instagram feed:', error.message);
    console.log('📝 Creating an empty feed file...');
    
    const emptyData = {
      username: 'dough_beats',
      updated_at: new Date().toISOString(),
      posts: [],
      total_posts: 0,
      error: error.message,
      api_configured: CONFIG.ACCESS_TOKEN !== 'YOUR_ACCESS_TOKEN_HERE' && CONFIG.USER_ID !== 'YOUR_USER_ID_HERE'
    };
    
    fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(emptyData, null, 2));
    
    console.log(`✅ Empty Instagram feed file saved to ${CONFIG.OUTPUT_FILE}`);
    return emptyData;
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchInstagramFeed()
    .then((data) => {
      console.log('🎉 Instagram feed update completed!');
      
      if (!data.api_configured) {
        console.log('\n📋 To use real Instagram data:');
        console.log('1. Go to https://developers.facebook.com/');
        console.log('2. Create a Facebook App');
        console.log('3. Add Instagram Basic Display product');
        console.log('4. Get your Access Token and User ID');
        console.log('5. Set environment variables:');
        console.log('   export INSTAGRAM_ACCESS_TOKEN="your_token_here"');
        console.log('   export INSTAGRAM_USER_ID="your_user_id_here"');
        console.log('6. Or update the CONFIG object in this script');
      }
      
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error.message);
      process.exit(1);
    });
}

export { fetchInstagramFeed };
