# Deployment Guide

Complete guide for deploying the AI PRD & UI Generator to production.

## Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [Firebase Hosting](#firebase-hosting)
4. [Railway](#railway)
5. [Render](#render)
6. [Post-Deployment](#post-deployment)

## Vercel (Recommended)

Vercel is the official hosting platform for Next.js and provides seamless integration.

### Prerequisites
- GitHub account with your repository
- Vercel account (free at https://vercel.com)
- OpenAI API key

### Step-by-Step Deployment

1. **Create Vercel Account**
   - Go to https://vercel.com/signup
   - Sign up with GitHub account
   - Authorize Vercel to access your repositories

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - If not visible, click "Adjust GitHub App Permissions" to enable access

3. **Configure Build Settings**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - In "Environment Variables" section, add:
     - Key: `OPENAI_API_KEY`
     - Value: Your OpenAI API key
     - Select production environment
   - Add `NEXT_PUBLIC_APP_URL` if needed

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app is now live!

6. **Get Your URL**
   - Visit your project dashboard
   - Copy the deployment URL
   - Share with reviewers

### Continuous Deployment

- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Easy rollbacks if needed

### Custom Domain (Optional)

1. Click "Settings" → "Domains"
2. Add custom domain
3. Follow DNS configuration instructions

---

## Netlify

Alternative hosting platform with free tier and good Next.js support.

### Prerequisites
- GitHub account
- Netlify account (free at https://app.netlify.com)
- OpenAI API key

### Step-by-Step Deployment

1. **Create Netlify Account**
   - Go to https://app.netlify.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Runtime: Node.js 18.x

4. **Set Environment Variables**
   - Go to "Site settings" → "Build & deploy" → "Environment"
   - Add `OPENAI_API_KEY`

5. **Deploy**
   - Click "Deploy site"
   - Wait for build completion

### After Deployment

- Get your Netlify URL
- Configure custom domain in Site settings
- Set up branch preview deployments

---

## Firebase Hosting

Google's hosting platform with good performance and free tier.

### Prerequisites
- Google account
- Firebase project
- Firebase CLI installed: `npm install -g firebase-tools`

### Step-by-Step Deployment

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Create project"
   - Follow setup wizard

2. **Initialize Firebase Locally**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure Firebase**
   - Public directory: `.next`
   - Single page app: No
   - Rewrite rules for Next.js: Yes (auto-configured)

4. **Add Environment Variables**
   - Create `.env.production.local`
   - Add `OPENAI_API_KEY=your-key-here`

5. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

6. **Get Your URL**
   - Firebase Console shows your hosting URL
   - Share with reviewers

---

## Railway

Modern deployment platform with straightforward interface.

### Prerequisites
- Railway account (free at https://railway.app)
- GitHub repository

### Step-by-Step Deployment

1. **Connect GitHub**
   - Go to https://railway.app/dashboard
   - Click "New project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

2. **Configure Environment**
   - Click "Add" in Variables section
   - Add `OPENAI_API_KEY`
   - Railway auto-detects Node.js application

3. **Deploy**
   - Railway auto-deploys on push
   - Watch deployment logs
   - Get generated URL

### View Deployment

- Railway generates a public URL automatically
- Share URL with reviewers

---

## Render

Simple platform with good documentation.

### Prerequisites
- Render account (free at https://render.com)
- GitHub repository

### Step-by-Step Deployment

1. **Create Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configure**
   - Environment: Node
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Plan: Free

3. **Set Environment Variables**
   - Add `OPENAI_API_KEY`
   - Add `NODE_ENV=production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your URL from dashboard

---

## Post-Deployment

### Verification Checklist

- [ ] Application loads successfully
- [ ] File upload works
- [ ] Text input works
- [ ] Generation completes without errors
- [ ] Results display correctly
- [ ] Download functionality works
- [ ] Copy to clipboard works
- [ ] No console errors

### Monitoring

1. **Error Tracking (Optional)**
   - Set up Sentry: https://sentry.io/
   - Add to error handling in API routes

2. **Performance Monitoring**
   - Vercel Analytics (built-in)
   - Check response times
   - Monitor error rates

3. **API Usage**
   - Monitor OpenAI API usage dashboard
   - Track costs
   - Set spending limits if needed

### Troubleshooting

**Build Fails**
- Check build logs for errors
- Verify all dependencies are in package.json
- Ensure Node version compatibility (18+)

**Application Errors**
- Check environment variables are set
- Verify OpenAI API key is valid
- Check API rate limits
- Review error logs

**Slow Performance**
- Check OpenAI API response times
- Optimize prompt engineering
- Consider caching strategies

---

## Deployment Summary

| Platform | Setup Time | Cost | Notes |
|----------|-----------|------|-------|
| Vercel | 5 min | Free | Recommended, best for Next.js |
| Netlify | 5 min | Free | Good alternative |
| Firebase | 10 min | Free | Google ecosystem |
| Railway | 5 min | Free | Simple and modern |
| Render | 5 min | Free | Straightforward |

---

## Getting Your Public URL

After successful deployment, you'll have a public URL like:

- Vercel: `https://ai-prd-ui-generator.vercel.app`
- Netlify: `https://ai-prd-ui-generator.netlify.app`
- Firebase: `https://your-project.web.app`
- Railway: `https://your-app-xyz123.railway.app`
- Render: `https://ai-prd-ui-generator.onrender.com`

Share this URL in your submission as the **Deployed Application URL**.

---

## Next Steps

1. ✅ Deploy application to production
2. ✅ Verify all functionality works
3. ✅ Get your public URL
4. ✅ Push GitHub repository to public
5. ✅ Get your GitHub repository URL
6. ✅ Submit both URLs for evaluation

---

**Deployment complete! 🎉**
