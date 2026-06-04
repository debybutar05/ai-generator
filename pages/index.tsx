import { useState } from 'react'
import Head from 'next/head'
import TranscriptUpload from '../components/TranscriptUpload'
import ResultsDisplay from '../components/ResultsDisplay'
import LoadingSpinner from '../components/LoadingSpinner'

interface GeneratedOutput {
  prd: string
  userStories: string
  functionalRequirements: string
  uiWireframes: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<GeneratedOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTranscriptSubmit = async (transcript: string) => {
    if (!transcript.trim()) {
      setError('Please provide a transcript')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate content')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>AI PRD & UI Generator</title>
        <meta name="description" content="Convert meeting transcripts into PRDs and UI designs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                AI PRD & UI Generator
              </h1>
              <p className="text-xl text-gray-600">
                Convert your meeting transcripts into Product Requirements Documents,
                User Stories, Functional Requirements, and UI/UX Wireframes
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <TranscriptUpload onSubmit={handleTranscriptSubmit} disabled={isLoading} />
              </div>

              {/* Results Section */}
              <div>
                {isLoading && <LoadingSpinner />}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800 font-semibold">Error</p>
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
                {results && <ResultsDisplay results={results} />}
                {!isLoading && !results && !error && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500">
                      Results will appear here after processing
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
