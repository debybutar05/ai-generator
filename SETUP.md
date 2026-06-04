# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API
```bash
# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

Get your free API key here: https://platform.openai.com/account/api-keys

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test the Application

1. Paste or upload a meeting transcript
2. Click "Generate PRD & Requirements"
3. Wait for processing (1-2 minutes)
4. View and download results

## Common Issues

### "OpenAI API key not configured"
- Make sure `.env.local` file exists
- Verify `OPENAI_API_KEY` is set correctly
- Check that the key has GPT-4 access

### "Request failed with status 401"
- Your API key is invalid or expired
- Generate a new key from OpenAI dashboard

### "Rate limit exceeded"
- You've hit OpenAI API rate limits
- Wait a few minutes before trying again
- Consider upgrading your OpenAI account

## Project Structure

```
ai-prd-ui-generator/
├── pages/
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # HTML document
│   ├── index.tsx             # Main page
│   └── api/
│       └── generate.ts       # API endpoint for AI processing
├── components/
│   ├── TranscriptUpload.tsx  # File upload component
│   ├── ResultsDisplay.tsx    # Results viewer
│   └── LoadingSpinner.tsx    # Loading indicator
├── styles/
│   └── globals.css           # Global styles
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
└── README.md                 # Documentation
```

## API Endpoints

### POST /api/generate
Send meeting transcript and receive all four document types.

**Request:**
```json
{
  "transcript": "Meeting transcript here..."
}
```

**Response:**
```json
{
  "prd": "Product Requirements Document...",
  "userStories": "User Stories...",
  "functionalRequirements": "Functional Requirements...",
  "uiWireframes": "UI/UX Design Specifications..."
}
```

## Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-your-key-here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

## Deployment Checklist

- [ ] Add `OPENAI_API_KEY` to production environment
- [ ] Verify API key has sufficient credits
- [ ] Test on production URL
- [ ] Monitor error logs
- [ ] Set up error tracking (optional)

## Support

- Documentation: See [README.md](README.md)
- Issues: Check GitHub Issues
- Questions: Create GitHub Discussion

---

**Happy generating! 🚀**
