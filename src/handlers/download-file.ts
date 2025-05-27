import { toast } from "sonner";

// GET /api/download?path=${file.relativePath.join()}?fileName=${file.filename}
const handleDownloadFile = async (path: string[], fileName: string) => {
  const fullFileName = path.join();

  const pathname =
    "/api/download?" +
    new URLSearchParams({
      path: fullFileName,
      fileName: fileName,
    });

  try {
    const response = await fetch(pathname);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);

    toast.success("File downloaded successfully");
  } catch (error) {
    toast.error("Failed to download file");
    console.error("Failed to download file:", error);
  }
};

export { handleDownloadFile };
