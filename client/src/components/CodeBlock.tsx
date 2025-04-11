import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const CodeBlock = ({
  code,
  language,
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split code into lines for line numbering
  const codeLines = code.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-lg overflow-hidden my-4", className)}
    >
      <div className="bg-gray-800 text-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          {filename && <span className="ml-2 text-sm">{filename}</span>}
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-400 mr-2">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div
        className="bg-gray-900 p-4 overflow-x-auto font-mono text-sm font-normal"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <pre className="text-gray-200">
          {showLineNumbers ? (
            <code className="grid" style={{ gridTemplateColumns: "auto 1fr" }}>
              {codeLines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-4 text-right select-none">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
