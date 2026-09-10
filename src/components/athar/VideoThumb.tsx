import { useState } from "react";
import { cn } from "@/lib/utils";

type VideoThumbProps = {
  src: string;
  placeholder: string | null;
  title: string;
};

function thumbTime(duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0.4;
  return Math.min(Math.max(duration * 0.18, 0.35), Math.max(duration - 0.2, 0.08));
}

export function VideoThumb({ src, placeholder, title }: VideoThumbProps) {
  const [frameReady, setFrameReady] = useState(false);

  if (placeholder) {
    return <img src={placeholder} alt={title} className="h-full w-full object-cover" />;
  }

  return (
    <div className="absolute inset-0 bg-ivory">
      {!frameReady && <div className="h-full w-full animate-pulse bg-ivory" />}
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className={cn("h-full w-full object-cover", !frameReady && "opacity-0")}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          video.currentTime = thumbTime(video.duration);
        }}
        onSeeked={() => setFrameReady(true)}
        onLoadedData={(event) => {
          if (event.currentTarget.videoWidth > 0 && event.currentTarget.currentTime > 0) {
            setFrameReady(true);
          }
        }}
      />
    </div>
  );
}
