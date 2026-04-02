import JSZip from "jszip";

export async function downloadProject(files) {
  try {
    const zip = new JSZip();

    Object.entries(files).forEach(([path, file]) => {
      if (!file?.code) return;

      const clean = path.startsWith("/") ? path.slice(1) : path;
      zip.file(clean, file.code);
    });

    const blob = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "webforge-project.zip";
    a.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
}