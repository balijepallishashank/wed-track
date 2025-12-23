"use client"

import React from "react"
import { Card,CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// syntax highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = {
  websiteId: string
  domain: string
}

function ScriptForm({ websiteId, domain }: Props) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use env var, or fallback to window origin (browser), or default to localhost
  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const hostUrl =
    process.env.NEXT_PUBLIC_HOST_URL?.replace(/\/$/, "") || origin || "http://localhost:3000"

  const scriptCode = `
<script 
  src="${hostUrl}/analytics.js"
  data-website-id="${websiteId}"
  data-domain="${domain}"
  defer>
</script>
`.trim()

  const handleCopy = async () => {
    if (!mounted) return

    try {
      await navigator.clipboard.writeText(scriptCode)
      toast.success("Script copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy script")
    }
  }

  return (
    <Card className="mt-6 w-full max-w-2xl mx-auto">
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">
            Add Tracking Script
          </h2>
          <p className="text-sm text-muted-foreground">
            Copy and paste this script inside the <code>&lt;head&gt;</code> tag of
            your website.
          </p>
        </div>

        {/* SCRIPT CODE BOX */}
        <div className="relative">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              borderRadius: "8px",
              padding: "16px",
              fontSize: "13px",
            }}
          >
            {scriptCode}
          </SyntaxHighlighter>

          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="absolute top-2 right-2"
            aria-label="Copy script to clipboard"
          >
            <Copy size={16} />
          </Button>
        </div>

        {/* ACTION BUTTON */}
        <Link href="/dashboard">
          <Button className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default ScriptForm
