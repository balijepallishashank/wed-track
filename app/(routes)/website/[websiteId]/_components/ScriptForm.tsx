"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  const scriptCode = `
<script 
  src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js"
  data-website-id="${websiteId}"
  data-domain="${domain}"
  defer>
</script>
`.trim()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptCode)
    toast.success("Script copied to clipboard")
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-2">
          Add Tracking Script
        </h2>

        <p className="text-sm text-muted-foreground mb-4">
          Copy and paste this script inside the <code>&lt;head&gt;</code> tag of
          your website.
        </p>

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
          >
            <Copy size={16} />
          </Button>
        </div>

        {/* ACTION BUTTON */}
        <Link href="/dashboard">
          <Button className="w-full mt-6">
            Go to Dashboard
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default ScriptForm
