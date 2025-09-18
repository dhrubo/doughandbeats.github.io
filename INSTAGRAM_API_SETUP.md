# Instagram API Setup Guide

## 🔑 Getting Real Instagram Posts with the API

To fetch actual Instagram posts instead of placeholder images, you need to set up Instagram's official API.

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Choose "Consumer" or "Business" type
4. Fill in your app details

### Step 2: Add Instagram Basic Display

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display > Basic Display

### Step 3: Configure OAuth Settings

1. Add OAuth Redirect URI: `https://localhost:8080/auth` (or your domain)
2. Add Instagram Testers (your Instagram account)

### Step 4: Get Your Credentials

You need two things:
- **Access Token**: Get this by following the Instagram authentication flow
- **User ID**: Your Instagram account's numeric ID

#### Quick way to get credentials:

1. **App ID & Secret**: Found in App Dashboard > Settings > Basic
2. **Access Token**: Use the "Generate Token" button in Basic Display settings
3. **User ID**: Will be provided during token generation

### Step 5: Configure the Script

Option A - Environment Variables (Recommended):
```bash
export INSTAGRAM_ACCESS_TOKEN="your_long_token_here"
export INSTAGRAM_USER_ID="your_numeric_user_id"
```

Option B - Update the script directly:
Edit `scripts/fetch-instagram-api.js` and update the CONFIG object.

### Step 6: Run the Script

```bash
# Using the new API script
node scripts/fetch-instagram-api.js

# Or update package.json to use the new script
npm run fetch-instagram
```

## 🔧 Alternative Solutions

### 1. Third-Party Services
- **Zapier**: Create automated workflows
- **IFTTT**: Connect Instagram to your website
- **InstagramAPI services**: Various paid services

### 2. Manual Updates
- Periodically update the `public/instagram.json` file manually
- Use the current colorful placeholders with real captions

### 3. Instagram Embed Widgets
- Use Instagram's official embed widgets
- No API needed, but less customization

## 📝 Token Management

Instagram tokens expire! You'll need to:
1. Refresh tokens every 60 days
2. Handle token refresh in your script
3. Monitor for API errors

## 🚀 Current Status

Right now, your site uses beautiful colorful placeholders with:
- ✅ Fresh timestamps (not 2022!)
- ✅ Realistic food-related captions
- ✅ Proper branding
- ✅ Working links to your Instagram

The placeholders look professional until you set up the real API!
