import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).toString();
}

export function ShareBar({
  title,
  path,
  className,
}: {
  title: string;
  path: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const items = [
    {
      label: "واتساب",
      href: `https://wa.me/?text=${text}%20${encoded}`,
    },
    {
      label: "تيليغرام",
      href: `https://t.me/share/url?url=${encoded}&text=${text}`,
    },
    {
      label: "فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1 type-caption text-muted-foreground">
        <Share2 className="size-3.5" aria-hidden="true" />
        مشاركة
      </span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center rounded-full border border-border px-3 type-caption font-medium hover:bg-ivory"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={() => void copyLink()}
        className="inline-flex min-h-9 items-center gap-1 rounded-full border border-border px-3 type-caption font-medium hover:bg-ivory"
      >
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        {copied ? "تم النسخ" : "نسخ الرابط"}
      </button>
    </div>
  );
}
