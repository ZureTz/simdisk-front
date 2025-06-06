import { toast } from "sonner";

// DELETE /api/delete?path=${path.join(",")}, with body { "fileName": "example.txt" }
const handleDeleteFile = async (path: string[], fileName: string) => {
  // const pathname =
  //   "/api/delete?" +
  //   new URLSearchParams({
  //     path: path.join(","),
  //   }).toString();

  // try {
  //   const formData = new FormData();
  //   formData.append("fileName", fileName);

  //   const response = await fetch(pathname, {
  //     method: "DELETE",
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to delete file");
  //   }

  //   toast.success("File deleted successfully");
  // } catch (error) {
  //   toast.error("Error deleting file: " + error);
  //   console.error("Error deleting file:", error);
  // }

  // Better not delete file in a remote sharing service
  toast.error("File deletion is not supported in remote environment");
  console.warn("Not supported operation", path, fileName);
};

export { handleDeleteFile };
