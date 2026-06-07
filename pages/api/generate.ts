import type { NextApiRequest, NextApiResponse } from 'next'
import { HfInference } from '@huggingface/inference'

// Enable mock mode for testing without billing issues
const MOCK_MODE = process.env.MOCK_MODE === 'true' || !process.env.HUGGINGFACE_API_KEY

const hf = !MOCK_MODE ? new HfInference(process.env.HUGGINGFACE_API_KEY) : null

// Mistral 7B Instruct model on Hugging Face
const MODEL_ID = 'mistralai/Mistral-7B-Instruct-v0.2'

// Log configuration on startup
console.log('=== API Configuration ===')
console.log('MOCK_MODE:', MOCK_MODE)
console.log('HUGGINGFACE_API_KEY exists:', !!process.env.HUGGINGFACE_API_KEY)
console.log('HUGGINGFACE_API_KEY length:', process.env.HUGGINGFACE_API_KEY?.length || 0)
console.log('Using real API:', !MOCK_MODE)
console.log('=========================')

interface GenerateResponse {
  prd?: string
  userStories?: string
  functionalRequirements?: string
  uiWireframes?: string
  error?: string
  _debug?: {
    mockMode: boolean
    hasApiKey: boolean
  }
}

const generatePrompts = {
  prd: (transcript: string) => `
Based on the following meeting transcript, generate a comprehensive Product Requirements Document (PRD).

The PRD should include:
1. Executive Summary
2. Problem Statement
3. Target Audience
4. Key Features & Functionality
5. Success Metrics
6. Constraints and Assumptions
7. Timeline & Milestones

Transcript:
${transcript}

Please provide a well-structured PRD that can be used by the product and engineering teams.
  `,

  userStories: (transcript: string) => `
Based on the following meeting transcript, generate detailed user stories.

Each user story should follow the format:
"As a [user type], I want to [action], so that [benefit]"

Include:
1. Multiple user stories (at least 5-8)
2. Acceptance criteria for each story
3. Story points estimate if possible
4. Priority level (High/Medium/Low)

Transcript:
${transcript}

Please provide well-structured user stories that can be used in agile development.
  `,

  functionalRequirements: (transcript: string) => `
Based on the following meeting transcript, generate functional requirements.

The requirements should include:
1. System Overview
2. Functional Requirements (FR-1, FR-2, etc.)
3. Non-Functional Requirements (Performance, Security, Scalability)
4. Data Requirements
5. Integration Requirements
6. User Interface Requirements

Transcript:
${transcript}

Please provide detailed functional requirements that can guide development.
  `,

  uiWireframes: (transcript: string) => `
Based on the following meeting transcript, generate a detailed UI/UX design specification and wireframe descriptions.

Include:
1. User Journey Map (described)
2. Key Screens/Pages to Create
3. For each screen:
   - Screen name and purpose
   - Components/Elements (buttons, forms, lists, etc.)
   - User interactions and flows
   - Layout description (grid structure)
4. Design System Guidelines:
   - Color scheme
   - Typography
   - Component library needs
5. Responsive Design Considerations

Transcript:
${transcript}

Please provide comprehensive UI/UX design specifications that can be used to create wireframes and prototypes.
  `,
}

// Mock data for testing without OpenAI API
const getMockData = (transcript: string) => ({
  prd: `PRODUCT REQUIREMENTS DOCUMENT (DEMO MODE)

Executive Summary
Based on the meeting transcript provided, this document outlines the key requirements for the proposed product/feature.

Problem Statement
The discussion identified key pain points that the proposed solution addresses:
- Lack of efficient workflow management
- Need for better team collaboration
- Requirement for real-time insights and analytics

Target Audience
- Primary: Mid-market companies (50-500 employees)
- Secondary: Enterprise organizations
- Tertiary: Startups and small teams

Key Features & Functionality
1. Core Dashboard - Central hub for all activities and metrics
2. Real-time Collaboration - Enable teams to work together seamlessly
3. Analytics & Reporting - Comprehensive insights and data visualization
4. Integration Capabilities - Connect with existing tools and systems
5. Mobile Responsiveness - Access from any device

Success Metrics
- User adoption rate > 70% in first month
- Average session duration: 5-10 minutes daily
- Customer satisfaction score > 4.5/5
- Support ticket volume < 2 per 100 users monthly

Constraints and Assumptions
- MVP development timeline: 3 months
- Team size: 5-8 developers
- Budget allocation: $100K-150K
- Assumption: Users have basic technical knowledge

Timeline & Milestones
- Month 1: Architecture & Core Setup
- Month 2: Feature Development & Integration
- Month 3: Testing, Refinement & Launch

Note: This is a demo/mock output. For production use, connect a valid OpenAI API key.`,

  userStories: `USER STORIES (DEMO MODE)

User Story 1: Dashboard Overview
As a manager, I want to see a comprehensive dashboard showing team productivity metrics, so that I can understand overall team performance at a glance.
Acceptance Criteria:
- Dashboard displays 5+ key metrics
- Metrics update in real-time
- Data visualization is clear and intuitive
Priority: High | Story Points: 8

User Story 2: Task Management
As a team member, I want to create and assign tasks to colleagues, so that work can be organized and tracked efficiently.
Acceptance Criteria:
- Task creation form is simple and intuitive
- Tasks can be assigned to multiple people
- Status tracking is visible
Priority: High | Story Points: 13

User Story 3: Team Collaboration
As a project manager, I want team members to collaborate on projects in real-time, so that communication is streamlined.
Acceptance Criteria:
- Real-time updates are visible to all team members
- Comments and mentions are supported
- Version history is maintained
Priority: Medium | Story Points: 21

User Story 4: Reporting & Analytics
As an executive, I want automated weekly reports on project progress, so that I can track high-level project status.
Acceptance Criteria:
- Reports are generated automatically every Monday
- Reports include key metrics and trends
- Reports are exportable to PDF
Priority: Medium | Story Points: 13

User Story 5: Mobile Access
As a field worker, I want to access the platform from my mobile device, so that I can stay updated while working remotely.
Acceptance Criteria:
- Mobile interface is responsive and usable
- All core features are available on mobile
- Loading time is acceptable (<3 seconds)
Priority: Low | Story Points: 13

Note: This is a demo/mock output. For production use, connect a valid OpenAI API key.`,

  functionalRequirements: `FUNCTIONAL REQUIREMENTS (DEMO MODE)

System Overview
The system is a web-based project and team management platform designed for organizations of all sizes to collaborate efficiently and track productivity.

Functional Requirements

FR-1: User Authentication
- System shall support email/password login
- System shall support SSO integration (future)
- System shall maintain secure session management
- System shall enforce password requirements

FR-2: Dashboard & Analytics
- System shall display real-time dashboard metrics
- System shall provide customizable dashboard widgets
- System shall support data export to CSV/PDF
- System shall maintain activity logs

FR-3: Task Management
- System shall allow task creation with title, description, due date
- System shall support task assignment to multiple users
- System shall provide task status tracking
- System shall allow task prioritization
- System shall support task comments and attachments

FR-4: Team Collaboration
- System shall support real-time notifications
- System shall allow team member mentions
- System shall maintain project timelines
- System shall support file sharing

FR-5: Reporting
- System shall generate automated weekly reports
- System shall provide custom report creation
- System shall support report scheduling
- System shall enable report sharing

Non-Functional Requirements

NFR-1: Performance
- Dashboard load time: < 2 seconds
- API response time: < 500ms
- Concurrent users supported: 10,000+

NFR-2: Security
- All data shall be encrypted in transit (HTTPS)
- All data shall be encrypted at rest
- PCI DSS compliance for payment data
- Regular security audits

NFR-3: Availability
- System uptime: 99.9%
- Backup frequency: Daily
- Disaster recovery: < 1 hour RTO

Data Requirements
- User data including profiles, preferences, permissions
- Project and task data with historical tracking
- Activity logs for audit purposes
- File storage with version control

Integration Requirements
- Integration with Slack for notifications
- Integration with Google Calendar for scheduling
- Integration with Jira for issue tracking
- REST API for third-party integrations

UI Requirements
- Responsive design (mobile, tablet, desktop)
- Accessibility compliance (WCAG 2.1 AA)
- Dark mode support
- Multiple language support

Note: This is a demo/mock output. For production use, connect a valid OpenAI API key.`,

  uiWireframes: `UI/UX DESIGN SPECIFICATIONS (DEMO MODE)

User Journey Map
1. Landing → 2. Sign Up/Login → 3. Onboarding → 4. Dashboard → 5. Project Selection → 6. Task Management → 7. Collaboration → 8. Reporting

Key Screens/Pages

Screen 1: Dashboard
Purpose: Provide overview of all activities and metrics
Components:
- Header with navigation and user profile
- Sidebar with menu items
- Main content area with 4 key metric cards
- Activity feed on the right
- Top tasks widget
Layout: Grid-based, 12 columns, responsive

User Interactions:
- Click metric cards to drill down into details
- Filter activities by date range
- Customize dashboard layout via drag-and-drop

Screen 2: Projects & Tasks
Purpose: Manage projects and their associated tasks
Components:
- Project list/selector
- Task board (Kanban-style)
- Task cards with drag-and-drop
- Add task button and form
- Filter and search options
- Team member avatars

User Interactions:
- Drag tasks between columns
- Click task card to view details
- Right-click for context menu
- Click + button to create new task

Screen 3: Team Collaboration
Purpose: Enable real-time team communication
Components:
- Team member list
- Chat/comments section
- @mention support
- File upload area
- Notification center
- Real-time typing indicators

User Interactions:
- Type messages and send
- Upload files via drag-and-drop
- Mention team members with @
- Click notifications to navigate

Screen 4: Reports & Analytics
Purpose: Visualize data and generate reports
Components:
- Date range selector
- Metric cards (KPIs)
- Charts and graphs
- Export buttons (PDF, CSV)
- Report templates
- Custom report builder

User Interactions:
- Select date range to filter data
- Click chart sections to zoom in
- Export report using buttons
- Schedule report emails

Design System Guidelines

Color Scheme:
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)
- Background: #F9FAFB (Light Gray)
- Text: #1F2937 (Dark Gray)

Typography:
- Headings: Inter, Bold, 24px-32px
- Body Text: Inter, Regular, 14px-16px
- Captions: Inter, Regular, 12px

Component Library:
- Buttons (Primary, Secondary, Tertiary)
- Input fields (Text, Email, Password)
- Cards (Elevated, Outlined)
- Modals and Dialogs
- Dropdowns and Selects
- Toast notifications
- Badges and Tags
- Progress bars and spinners

Responsive Design Considerations
- Mobile (320px-480px): Single column, stacked navigation
- Tablet (481px-1024px): Two columns, side drawer navigation
- Desktop (1025px+): Multi-column layouts, full navigation

Accessibility:
- Color contrast ratio > 4.5:1 for text
- Keyboard navigation for all interactive elements
- Screen reader support
- ARIA labels for complex components
- Focus indicators visible on all inputs

Note: This is a demo/mock output. For production use, connect a valid OpenAI API key.`,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { transcript } = req.body

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Invalid transcript provided' })
  }

  try {
    // Use mock data if API key is not configured or in mock mode
    if (MOCK_MODE) {
      console.log('⚠️ Running in MOCK MODE - Using sample data for demonstration')
      console.log('⚠️ Reason: MOCK_MODE=' + process.env.MOCK_MODE + ', Has API Key: ' + !!process.env.HUGGINGFACE_API_KEY)
      const mockData = getMockData(transcript)
      
      return res.status(200).json({
        prd: '⚠️ DEMO MODE - Set HUGGINGFACE_API_KEY in environment variables for real AI generation\n\n' + mockData.prd,
        userStories: '⚠️ DEMO MODE - Set HUGGINGFACE_API_KEY in environment variables for real AI generation\n\n' + mockData.userStories,
        functionalRequirements: '⚠️ DEMO MODE - Set HUGGINGFACE_API_KEY in environment variables for real AI generation\n\n' + mockData.functionalRequirements,
        uiWireframes: '⚠️ DEMO MODE - Set HUGGINGFACE_API_KEY in environment variables for real AI generation\n\n' + mockData.uiWireframes,
        _debug: {
          mockMode: MOCK_MODE,
          hasApiKey: !!process.env.HUGGINGFACE_API_KEY
        }
      })
    }

    // Generate all four outputs in parallel using Hugging Face Mistral 7B
    const [prdResponse, userStoriesResponse, functionalRequirementsResponse, uiWireframesResponse] = await Promise.all([
      hf!.textGeneration({
        model: MODEL_ID,
        inputs: generatePrompts.prd(transcript),
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
      hf!.textGeneration({
        model: MODEL_ID,
        inputs: generatePrompts.userStories(transcript),
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
      hf!.textGeneration({
        model: MODEL_ID,
        inputs: generatePrompts.functionalRequirements(transcript),
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
      hf!.textGeneration({
        model: MODEL_ID,
        inputs: generatePrompts.uiWireframes(transcript),
        parameters: {
          max_new_tokens: 1500,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
    ])

    return res.status(200).json({
      prd: prdResponse.generated_text || '',
      userStories: userStoriesResponse.generated_text || '',
      functionalRequirements: functionalRequirementsResponse.generated_text || '',
      uiWireframes: uiWireframesResponse.generated_text || '',
    })
  } catch (error) {
    console.error('Error generating content:', error)
    
    // Check if it's a network error
    if (error instanceof Error && error.message.includes('fetch failed')) {
      console.error('⚠️ Network error - Cannot connect to Hugging Face API')
      console.error('⚠️ Falling back to MOCK MODE')
      
      // Fallback to mock data if network error
      const mockData = getMockData(transcript)
      return res.status(200).json({
        prd: mockData.prd + '\n\n⚠️ Note: Using demo data due to network connectivity issues with Hugging Face API.',
        userStories: mockData.userStories + '\n\n⚠️ Note: Using demo data due to network connectivity issues with Hugging Face API.',
        functionalRequirements: mockData.functionalRequirements + '\n\n⚠️ Note: Using demo data due to network connectivity issues with Hugging Face API.',
        uiWireframes: mockData.uiWireframes + '\n\n⚠️ Note: Using demo data due to network connectivity issues with Hugging Face API.',
      })
    }
    
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate content',
    })
  }
}
