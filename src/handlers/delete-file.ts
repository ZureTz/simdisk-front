import { toast } from "sonner";

// DELETE /api/delete?path=${path.join(",")}, with body { "fileName": "example.txt" }
const handleDeleteFile = async (path: string[], fileName: string) => {
  const pathname =
    "/api/delete?" +
    new URLSearchParams({
      path: path.join(","),
    }).toString();

  try {
    const formData = new FormData();
    formData.append("fileName", fileName);

    // Log the request path and file name
    console.log("Requesting:", pathname, "with fileName:", fileName);

    const response = await fetch(pathname, {
      method: "DELETE",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    toast.success("File deleted successfully");
  } catch (error) {
    toast.error("Error deleting file: " + error);
    console.error("Error deleting file:", error);
  }
};

export { handleDeleteFile };
