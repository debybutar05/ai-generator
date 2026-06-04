# AI PRD & UI Generator

Convert meeting transcripts into comprehensive Product Requirements Documents (PRDs), User Stories, Functional Requirements, and UI/UX Design specifications using AI-powered analysis.

## 🚀 Live Demo

**Application URL**: [https://ai-prd-ui-generator.vercel.app](https://ai-prd-ui-generator.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Assumptions](#assumptions)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

## ✨ Features

- **📄 PRD Generation**: Automatically creates comprehensive Product Requirements Documents
- **👥 User Stories**: Generates detailed user stories with acceptance criteria
- **⚙️ Functional Requirements**: Produces structured functional and non-functional requirements
- **🎨 UI/UX Design Specs**: Creates detailed UI/UX design specifications and wireframe descriptions
- **📁 File Upload**: Support for various transcript formats (TXT, PDF, DOCX)
- **📥 Download Results**: Export generated documents as text files
- **📋 Copy to Clipboard**: Quick copy functionality for all outputs
- **🎯 Real-time Processing**: Fast generation with visual loading indicators

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js/React)                 │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ TranscriptUpload │  │ ResultsDisplay   │                │
│  └────────┬─────────┘  └────────▲─────────┘                │
│           │                     │                           │
│           └─────────┬───────────┘                           │
│                     │ HTTP POST                             │
└─────────────────────┼──────────────────────────────────────┘
                      │
┌─────────────────────┼──────────────────────────────────────┐
│          Backend (Next.js API Routes)                       │
│                     │                                       │
│           ┌─────────▼──────────┐                            │
│           │  /api/generate     │                            │
│           │  (Main Processor)  │                            │
│           └─────────┬──────────┘                            │
│                     │                                       │
└─────────────────────┼──────────────────────────────────────┘
                      │
┌─────────────────────┼──────────────────────────────────────┐
│          External Services                                  │
│           ┌─────────▼──────────┐                            │
│           │  Hugging Face API  │                            │
│           │  (Mistral 7B)      │                            │
│           └────────────────────┘                            │
└──────────────────────────────────────────────────────────────┘
```

### Component Breakdown

1. **Frontend Components**:
   - `TranscriptUpload`: Handles user input via textarea or file upload
   - `ResultsDisplay`: Shows generated outputs with tabbed interface
   - `LoadingSpinner`: Provides visual feedback during processing

2. **Backend API Route**:
   - `pages/api/generate.ts`: Orchestrates AI calls to Hugging Face Mistral 7B

3. **External Dependencies**:
   - Hugging Face Mistral 7B Instruct: Powers document generation

## 💻 Technology Stack

### Frontend
- **Next.js 14**: React framework with file-based routing
- **React 18**: UI component library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

### Backend
- **Next.js API Routes**: Serverless functions
- **Hugging Face Inference API**: AI-powered text generation with Mistral 7B Instruct

### Deployment
- **Vercel**: Optimal platform for Next.js applications
  - Automatic deployments from GitHub
  - Edge network for global performance
  - Serverless functions for API routes
  - Free tier available

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript Compiler**: Type checking

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Hugging Face API token (free at https://huggingface.co/settings/tokens)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-prd-ui-generator.git
   cd ai-prd-ui-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure environment variables**
   ```bash
   # Edit .env.local and add your Hugging Face API token
   HUGGINGFACE_API_KEY=hf_...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## ⚙️ Environment Configuration

### Required Environment Variables

```bash
# Hugging Face Configuration (REQUIRED)
HUGGINGFACE_API_KEY=hf_your-token-here

# Application Configuration (OPTIONAL)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Hugging Face API Setup

1. **Create Hugging Face Account**
   - Visit https://huggingface.co/
   - Sign up or log in

2. **Generate API Token**
   - Go to https://huggingface.co/settings/tokens
   - Click "New token"
   - Select "Read" permission
   - Copy the token (starts with `hf_`)

3. **Add to Environment**
   - Add `HUGGINGFACE_API_KEY=hf_...` to `.env.local`

4. **Verify Configuration**
   - Application will show error if token is invalid
   - Check browser console for detailed error messages

### Model Configuration

The application uses **Mistral 7B Instruct v0.2** for all generations:
- Model: `mistralai/Mistral-7B-Instruct-v0.2`
- Temperature: 0.7 (balanced creativity)
- Max tokens: 1000-1500 per request
- Provider: Hugging Face Inference API

To use a different model, edit `pages/api/generate.ts`:

```typescript
// Change this line in the API handler
const MODEL_ID = 'mistralai/Mistral-7B-Instruct-v0.2'  // Change to other models
```

Popular alternatives:
- `meta-llama/Llama-2-7b-chat-hf`
- `HuggingFaceH4/zephyr-7b-beta`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`

📖 **See [HUGGINGFACE_SETUP.md](./HUGGINGFACE_SETUP.md) for detailed setup guide.**

## 📖 Usage

### Basic Workflow

1. **Input Transcript**
   - Paste meeting transcript in textarea, or
   - Upload text file using drag-and-drop or file picker

2. **Generate Documents**
   - Click "Generate PRD & Requirements" button
   - Wait for processing (1-2 minutes)

3. **View Results**
   - Switch between tabs to view different outputs:
     - PRD: Complete product requirements document
     - User Stories: Formatted user stories with acceptance criteria
     - Functional Requirements: Technical specifications
     - UI/UX Design: Wireframe descriptions and design specs

4. **Export or Copy**
   - Download as text file
   - Copy entire output to clipboard
   - Edit and refine as needed

### Tips for Best Results

- **Clear Structure**: Use speaker names and timestamps if possible
- **Complete Information**: Include product goals, user needs, and feature discussions
- **Context**: Mention constraints, budget, timeline
- **Action Items**: Include decisions and next steps discussed

## 🔌 API Documentation

### Endpoint: POST /api/generate

**Request**:
```typescript
POST /api/generate
Content-Type: application/json

{
  "transcript": "string (required)"
}
```

**Response (Success - 200)**:
```typescript
{
  "prd": "string",
  "userStories": "string",
  "functionalRequirements": "string",
  "uiWireframes": "string"
}
```

**Response (Error - 400/500)**:
```typescript
{
  "error": "string (error message)"
}
```

**Example Usage**:
```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    transcript: 'Meeting transcript here...'
  })
})

const data = await response.json()
console.log(data.prd)
```

## 📝 Assumptions

1. **API Availability**: Hugging Face Inference API must be accessible and operational
2. **API Token Validity**: Valid Hugging Face API token with read access
3. **Transcript Quality**: Input transcripts contain meaningful content about products/features
4. **Output Quality**: AI-generated content requires human review and refinement
5. **Language**: Transcripts are in English language
6. **Internet Connection**: Required for AI processing
7. **Latency**: Generation takes 2-4 minutes per request (may vary based on model load)
8. **Token Limits**: Transcripts shouldn't exceed model's context window (~8k tokens for Mistral 7B)

## ⚠️ Known Limitations

1. **Output Length**: Generated documents are limited to 1000-1500 tokens per section
2. **Long Transcripts**: Very long transcripts (>4,000 words) may not be fully processed
3. **Non-English Content**: Best results with English language transcripts
4. **Specialized Domains**: May require domain-specific vocabulary for niche products
5. **AI Accuracy**: AI is not 100% accurate; always review outputs before use
6. **Cost**: Free tier available with rate limits (~1000 requests/day); Pro tier available for higher usage
7. **Model Loading**: Cold starts may take 10-20 seconds as model loads
8. **Browser Support**: Requires modern browser with ES6+ support
9. **Rate Limits**: Free tier has daily request limits; upgrade to Pro for higher limits

## 🔮 Future Improvements

### Short Term
- [ ] Support for multiple file formats (PDF parsing, DOCX support)
- [ ] Batch processing for multiple transcripts
- [ ] Custom prompt templates for different industry verticals
- [ ] Dark mode UI theme
- [ ] Multilingual support (Spanish, French, German, etc.)

### Medium Term
- [ ] Image generation for wireframes using DALL-E
- [ ] Integration with design tools (Figma API)
- [ ] User authentication and project management
- [ ] Save/load previous generations
- [ ] Team collaboration features
- [ ] Email export functionality
- [ ] Version comparison tool

### Long Term
- [ ] Mobile app (React Native)
- [ ] Voice transcript upload and transcription
- [ ] Real-time collaborative editing
- [ ] Integration with project management tools (Jira, Asana)
- [ ] Advanced analytics on generated outputs
- [ ] Custom AI model training
- [ ] Support for other LLMs (Claude, Llama, etc.)

## 🚀 Deployment to Vercel

### Step-by-Step Guide

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com/new
   - Import GitHub repository
   - Select `ai-prd-ui-generator` repository

3. **Configure Environment**
   - Set `HUGGINGFACE_API_KEY` in Vercel environment variables
   - Set `NEXT_PUBLIC_APP_URL` to your Vercel domain

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your live URL

### Alternative Deployment Options

- **Netlify**: `npm run build` + netlify.toml
- **Firebase Hosting**: `firebase deploy` (requires Firebase setup)
- **Railway**: Connect GitHub repo and auto-deploy
- **Render**: Connect GitHub with auto-deploy

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 📞 Support

- **Issues**: Check GitHub Issues for known problems
- **Documentation**: Full docs in README and inline code comments
- **Questions**: Create GitHub Discussion

## 🎯 Project Status

- ✅ MVP Complete
- 🔄 In Production
- 📈 Actively Maintained

---

**Built with ❤️ using Next.js, React, and Hugging Face Mistral 7B**
