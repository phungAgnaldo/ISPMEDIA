"use client";
import { Share } from "lucide-react";
import { useRouter } from "next/navigation";
interface Params {
  link: string;
}
export function CopyToClipboard({ link }: Params) {
  const router = useRouter();

  function handleCopyToClipboard() {
    const textToCopy = link; // Replace with the text you want to copy

    // Check if the "copy" command is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use the newer Clipboard API if supported
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard:", textToCopy);
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    } else {
      // Clipboard API not supported
      console.error("Copy to clipboard not supported");
    }
  }

  return (
    <button
      className="flex items-center hover:text-red-700"
      onClick={handleCopyToClipboard}
    >
      <Share width={16} height={16} className="mx-2" />
      Share
    </button>
  );
}
