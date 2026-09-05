import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const CORE_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm";

let ffmpeg: FFmpeg | null = null;
let loading: Promise<FFmpeg> | null = null;

async function getFfmpeg() {
  if (ffmpeg?.loaded) return ffmpeg;
  if (loading) return loading;
  loading = (async () => {
    const instance = new FFmpeg();
    await instance.load({
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpeg = instance;
    return instance;
  })();
  try {
    return await loading;
  } finally {
    loading = null;
  }
}

const COMPRESS_ARGS = [
  "-vf",
  "scale=-2:720",
  "-c:v",
  "libx264",
  "-crf",
  "30",
  "-preset",
  "veryfast",
  "-movflags",
  "+faststart",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
];

export async function compressVaultVideo(file: File, onProgress: (ratio: number) => void) {
  onProgress(0.02);
  const runtime = await getFfmpeg();
  onProgress(0.08);

  const inputName = "input.bin";
  const outputName = "output.mp4";
  await runtime.writeFile(inputName, await fetchFile(file));

  const onProg = ({ progress }: { progress: number }) => {
    onProgress(Math.min(0.08 + Math.max(progress, 0) * 0.9, 0.98));
  };
  runtime.on("progress", onProg);

  try {
    let code = await runtime.exec(["-i", inputName, ...COMPRESS_ARGS, outputName]);
    if (code !== 0) {
      code = await runtime.exec([
        "-i",
        inputName,
        "-vf",
        "scale=-2:720",
        "-c:v",
        "libx264",
        "-crf",
        "30",
        "-preset",
        "veryfast",
        "-movflags",
        "+faststart",
        "-an",
        outputName,
      ]);
    }
    if (code !== 0) throw new Error("فشل ضغط الفيديو.");

    const output = await runtime.readFile(outputName);
    const bytes = output instanceof Uint8Array ? new Uint8Array(output) : new Uint8Array();
    if (bytes.byteLength === 0) throw new Error("فشل ضغط الفيديو.");
    onProgress(1);
    return new File([bytes], `${file.name.replace(/\.[^.]+$/, "")}.mp4`, { type: "video/mp4" });
  } finally {
    runtime.off("progress", onProg);
    await runtime.deleteFile(inputName).catch(() => undefined);
    await runtime.deleteFile(outputName).catch(() => undefined);
  }
}
