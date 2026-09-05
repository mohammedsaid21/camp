export function uploadWithProgress(
  url: string,
  file: Blob,
  contentType: string,
  onProgress: (ratio: number, loaded: number, total: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      onProgress(event.loaded / event.total, event.loaded, event.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error("فشل رفع الملف إلى التخزين."));
    };
    xhr.onerror = () => reject(new Error("فشل رفع الملف إلى التخزين."));
    xhr.send(file);
  });
}
