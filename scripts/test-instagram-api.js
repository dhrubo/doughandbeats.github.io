#!/usr/bin/env node

/**
 * Instagram API Test Script
 * Tests your Instagram API credentials and provides debugging info
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

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;

console.log('🔍 Instagram API Credential Test');
console.log('================================');

// Test 1: Check if credentials exist
console.log('\n1️⃣ Checking credentials...');
if (!ACCESS_TOKEN || ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
  console.log('❌ INSTAGRAM_ACCESS_TOKEN not found or not set');
  process.exit(1);
}
if (!USER_ID || USER_ID === 'YOUR_USER_ID_HERE') {
  console.log('❌ INSTAGRAM_USER_ID not found or not set');
  process.exit(1);
}

console.log('✅ Access token found (length:', ACCESS_TOKEN.length, 'characters)');
console.log('✅ User ID found:', USER_ID);

// Test 2: Validate token format
console.log('\n2️⃣ Validating token format...');
if (ACCESS_TOKEN.length < 50) {
  console.log('⚠️ Access token seems too short. Instagram tokens are usually 200+ characters');
}
if (!/^\d+$/.test(USER_ID)) {
  console.log('⚠️ User ID should be numeric only. Current:', USER_ID);
}

// Test 3: Test API connection
console.log('\n3️⃣ Testing API connection...');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { 
      headers: {
        'User-Agent': 'DoughAndBeats/1.0'
      }
    }, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: response.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: response.statusCode, data: data });
        }
      });
    });

    request.on('error', (error) => reject(error));
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test basic token validation
const tokenTestUrl = `https://graph.instagram.com/me?access_token=${ACCESS_TOKEN}`;
console.log('Testing token with: /me endpoint');

try {
  const result = await makeRequest(tokenTestUrl);
  
  if (result.status === 200) {
    console.log('✅ Token is valid!');
    console.log('📊 Account info:', {
      id: result.data.id,
      username: result.data.username || 'N/A'
    });
  } else {
    console.log('❌ Token validation failed');
    console.log('Status:', result.status);
    console.log('Response:', result.data);
    
    if (result.data.error) {
      console.log('\n🔍 Error details:');
      console.log('- Code:', result.data.error.code);
      console.log('- Message:', result.data.error.message);
      console.log('- Type:', result.data.error.type);
      
      if (result.data.error.code === 190) {
        console.log('\n💡 This is likely an invalid or expired token.');
        console.log('   You need to regenerate your access token.');
      }
    }
  }
} catch (error) {
  console.log('❌ Network error:', error.message);
}

// Test media endpoint
console.log('\n4️⃣ Testing media endpoint...');
const mediaUrl = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${ACCESS_TOKEN}&limit=1`;

try {
  const result = await makeRequest(mediaUrl);
  
  if (result.status === 200 && result.data.data) {
    console.log('✅ Media endpoint works!');
    console.log('📊 Found', result.data.data.length, 'posts');
    if (result.data.data.length > 0) {
      const post = result.data.data[0];
      console.log('📸 Sample post:', {
        id: post.id,
        type: post.media_type,
        caption: post.caption ? post.caption.substring(0, 50) + '...' : 'No caption'
      });
    }
  } else {
    console.log('❌ Media endpoint failed');
    console.log('Status:', result.status);
    console.log('Response:', result.data);
  }
} catch (error) {
  console.log('❌ Network error:', error.message);
}

console.log('\n🎯 Summary:');
console.log('- If all tests pass, your Instagram API is ready!');
console.log('- If there are errors, check the messages above for solutions');
console.log('- Make sure your Instagram account is connected to your Facebook app');
console.log('- Ensure your access token has the required permissions: instagram_graph_user_profile, instagram_graph_user_media');
