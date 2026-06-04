import { useState } from 'react'

interface TranscriptUploadProps {
  onSubmit: (transcript: string) => void
  disabled: boolean
}

export default function TranscriptUpload({ onSubmit, disabled }: TranscriptUploadProps) {
  const [transcript, setTranscript] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    // Read file as text
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setTranscript(content)
    }
    reader.readAsText(file)
  }

  const handleSubmit = () => {
    onSubmit(transcript)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Transcript</h2>

      {/* Textarea */}
      <div className="mb-6">
        <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
          Meeting Transcript
        </label>
        <textarea
          id="transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={disabled}
          placeholder="Paste your meeting transcript here or upload a file..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or Upload a File (TXT, PDF, DOCX)
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-500">
                {fileName ? `Loaded: ${fileName}` : 'Click to upload or drag and drop'}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={disabled}
              accept=".txt,.pdf,.docx"
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || !transcript.trim()}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {disabled ? 'Processing...' : 'Generate PRD & Requirements'}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        💡 Tip: For best results, provide a transcript with clear discussion of product features, user needs, and goals.
      </p>
    </div>
  )
}
