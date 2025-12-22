import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import WebsiteForm from "./_components/WebsiteForm"

function AddWebsite() {
  return (
    <div className="mt-10">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-gray-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mt-8 max-w-xl">
        <h2 className="font-bold text-2xl">Add New Website</h2>
        <p className="text-gray-500 mt-2">
          Add your website domain to start tracking analytics
        </p>

        <div className="mt-6">
          <WebsiteForm />
        </div>
      </div>
    </div>
  )
}

export default AddWebsite
