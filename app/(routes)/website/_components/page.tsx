import Script from "next/script"

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-4">Tracking Test Page</h1>
      <p className="mb-8 text-sm text-gray-500">
        This page includes the tracking script. Open the Network tab to verify <code>analytics.js</code> loads.
      </p>
      
      <Script
        src="http://localhost:3000/analytics.js"
        data-website-id="211b25cc-7f3b-42ee-b13e-1c5ad215679e"
        data-domain="srbgkjela cNJkv"
      />
    </div>
  )
}