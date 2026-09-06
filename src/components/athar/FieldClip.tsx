import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { VideoThumb } from "./VideoThumb";

type FieldClipProps = {
  src: string;
  poster: string;
  title: string;
  className?: string;
};

export function FieldClip({ src, poster, title, className }: FieldClipProps) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frameVisible, setFrameVisible] = useState(false);

  if (failed || !playing) {
    return (
      <button
        type="button"
        onClick={() => {
          if (!failed) {
            setFrameVisible(false);
            setPlaying(true);
          }
        }}
        className={cn("relative block aspect-[9/16] w-full overflow-hidden bg-ivory", className)}
        aria-label={failed ? title : `تشغيل فيديو ${title}`}
      >
        <img src={poster} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/20" />
        <span className="absolute inset-0 flex items-center justify-center">
          {!failed && (
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Play className="ms-0.5 h-6 w-6 fill-current" aria-hidden="true" />
            </span>
          )}
        </span>
        <span className="absolute bottom-3 start-3 rounded-full border border-white/25 bg-background/92 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
          {failed ? "التوثيق بالصورة" : "مشاهدة الفيديو"}
        </span>
      </button>
    );
  }

  return (
    <div className={cn("relative aspect-[9/16] overflow-hidden bg-ivory", className)}>
      {!frameVisible && (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <video
        className="field-clip-video relative z-[1] h-full w-full object-contain"
        controls
        playsInline
        autoPlay
        preload="auto"
        poster={poster}
        onPlaying={() => setFrameVisible(true)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
