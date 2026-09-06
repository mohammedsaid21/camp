import { useState } from "react";
import { cn } from "@/lib/utils";

type VideoThumbProps = {
  src: string;
  placeholder: string | null;
  title: string;
};

export function VideoThumb({ src, placeholder, title }: VideoThumbProps) {
  const [frameReady, setFrameReady] = useState(false);

  if (placeholder) {
    return <img src={placeholder} alt={title} className="h-full w-full object-cover" />;
  }

  return (
    <div className="absolute inset-0 bg-ivory">
      {!frameReady && <div className="h-full w-full bg-ivory" />}
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className={cn("h-full w-full object-cover", !frameReady && "opacity-0")}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          const duration = Number.isFinite(video.duration) ? video.duration : 1;
          video.currentTime = Math.min(0.4, Math.max(0.08, duration * 0.06));
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
