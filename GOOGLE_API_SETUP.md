# Google Places API Setup Guide for SheShield

## Quick Start Guide

### Step 1: Get Your Google Places API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or select existing)
   - Click "Select a project" dropdown at the top
   - Click "NEW PROJECT"
   - Name: `SheShield-Women-Safety`
   - Click **CREATE**

3. **Enable Google Places API**
   - In the left menu, go to: **APIs & Services** → **Library**
   - Search for: `Places API (New)`
   - Click on it
   - Click **ENABLE** button
   
4. **Create API Credentials**
   - Go to: **APIs & Services** → **Credentials**
   - Click **CREATE CREDENTIALS** → **API Key**
   - A popup will show your API key
   - **COPY THIS KEY** (you'll need it in the next step)

5. **Restrict Your API Key** (IMPORTANT for security)
   - Click on the API key you just created (under "API Keys" section)
   - Under **Application restrictions**:
     - Select "HTTP referrers (websites)"
     - Click **ADD AN ITEM**
     - Add: `http://localhost:*/*` (for development)
     - Add: `http://127.0.0.1:*/*` (alternate localhost)
     - Later add your production domain: `https://yourdomain.com/*`
   - Under **API restrictions**:
     - Select "Restrict key"
     - Check ✅ **Places API (New)**
   - Click **SAVE**

6. **Set Up Billing** (Required but has FREE tier)
   - Google Cloud requires billing info even for free tier
   - Go to: **Billing** in the left menu
   - Click **LINK A BILLING ACCOUNT**
   - Add your credit/debit card
   - **Don't worry**: Google gives **$200 FREE credit per month**
   - Typical usage: ~10-50 requests/day = **FREE under $5/month**

---

### Step 2: Add API Key to Your Project

1. **Open your project folder**:
   ```
   C:\Users\Lenovo\Desktop\pregnancy-safety\pregnancy-safety
   ```

2. **Find the `.env` file** (already created in the project root)

3. **Edit `.env` file**:
   - Open it in Notepad or VS Code
   - Replace the line with your actual API key:
   ```
   VITE_GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   - **Save the file**

4. **IMPORTANT**: **DO NOT SHARE** this file or commit it to GitHub!
   - Already added to `.gitignore` for your safety

---

### Step 3: Restart Your Dev Server

Since you added environment variables, you need to restart:

1. **Stop the current server** (if running):
   - Press `Ctrl + C` in the terminal

2. **Start it again**:
   - Use the batch file: Double-click `start-dev.bat`
   - OR in PowerShell:
     ```powershell
     $env:Path = "C:\Program Files\nodejs;$env:Path"; & "C:\Program Files\nodejs\npm.cmd" run dev
     ```

3. **Open in browser**:
   - Go to: http://localhost:5174

---

### Step 4: Test It!

1. **Allow Location Access**:
   - When browser asks, click "Allow" for location permission

2. **Check the Safety Locations Section**:
   - You should see real nearby hospitals, police stations, women help centers
   - They will be sorted by distance from your location

3. **Try Filters**:
   - Click "Police", "Hospitals", "Women Centers" to filter
   - Click "Refresh" to reload locations

---

## Pricing & Free Tier

### Google Places API Costs:
- **Nearby Search**: $0.032 per request
- **Place Photos**: $0.007 per photo request

### Free Tier:
- **$200 credit per month** (FREE)
- This equals: **~6,250 location searches/month**
- Typical usage: 3-10 searches per user = **500-2000 users FREE**

### Example Monthly Cost:
- 100 users × 5 searches each = 500 searches
- 500 × $0.032 = **$16/month**
- With $200 credit = **$0 paid!**

---

## Troubleshooting

### "API Key Not Configured"
- **Solution**: Add your API key to `.env` file and restart dev server

### "API request denied"
- **Checklist**:
  - ✅ Is billing enabled on Google Cloud?
  - ✅ Is "Places API (New)" enabled?
  - ✅ Did you restart the dev server after adding the key?
  - ✅ Is the API key restriction correct (HTTP referrers)?

### "No locations found"
- **Possible reasons**:
  - Location permission not granted
  - No results in your area (try different filter)
  - API quota exceeded (unlikely with free tier)

### "Location not available"
- **Solution**: 
  - Enable location in browser settings
  - Refresh the page
  - Allow when browser prompts

---

## Security Best Practices

1. ✅ **Never commit `.env` file** - Already in `.gitignore`
2. ✅ **Always use API key restrictions** - Limit to your domains
3. ✅ **Monitor API usage** - Check Google Cloud Console regularly
4. ✅ **Set up billing alerts** - Get notified if costs exceed $10

---

## Next Steps (Optional Enhancements)

1. **Add Place Details**:
   - Show phone numbers, opening hours
   - Requires additional API call

2. **Add Reviews**:
   - Display Google reviews for locations
   - Build trust with real user feedback

3. **Cache Results**:
   - Store recent searches in localStorage
   - Reduce API calls

4. **Backend Proxy**:
   - Move API key to backend for better security
   - Create your own API endpoint

---

## Support

If you encounter issues:

1. **Check Google Cloud Console** for error messages
2. **Check browser console** (F12) for JavaScript errors
3. **Verify `.env` file** has correct format
4. **Test with a simple location** like Delhi, Mumbai

---

## Summary Checklist

- [ ] Created Google Cloud Project
- [ ] Enabled Places API (New)
- [ ] Created & restricted API key
- [ ] Set up billing (for free tier)
- [ ] Added API key to `.env` file
- [ ] Restarted dev server
- [ ] Tested location permission
- [ ] Verified real locations are showing

---

**You're all set! 🎉**

Your app now shows **real nearby safety locations** based on the user's actual location!
