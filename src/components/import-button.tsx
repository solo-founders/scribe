"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImportButtonProps {
  variant?: "default" | "outline";
}

export function ImportButton({ variant = "default" }: ImportButtonProps) {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{
    imported: string[];
    errors: string[];
  } | null>(null);

  const handleImport = async () => {
    setImporting(true);
    setResult(null);

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceDir: "/Users/aridutilh/Desktop/solo-podcast" }),
      });
      const data = await res.json();
      setResult(data);

      // Reload after successful import
      if (data.imported?.length > 0) {
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch {
      setResult({ imported: [], errors: ["Failed to import"] });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <Button variant={variant} onClick={handleImport} disabled={importing}>
        <Upload className="w-4 h-4 mr-2" />
        {importing ? "Importing..." : "Import Past Episodes"}
      </Button>
      {result && (
        <div className="mt-2 text-sm">
          {result.imported.length > 0 && (
            <p className="text-green-600">
              Imported {result.imported.length} episode(s)
            </p>
          )}
          {result.errors.length > 0 && (
            <p className="text-red-600">
              {result.errors.length} error(s): {result.errors[0]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
