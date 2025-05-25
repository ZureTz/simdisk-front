import type { fileData } from "@/contexts/file-list";
import { toast } from "sonner";

// Get file list handler
const useGetFileList = async (path: string[]): Promise<fileData[]> => {
  // GET /api/files?path=${path.join(",")}
  const pathname =
    "/api/files?" +
    new URLSearchParams({
      path: path.join(),
    }).toString();
  console.log("Requesting:", pathname);

  // Sleep 1s
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(pathname, {
      method: "GET",
    });
    const json = await response.json();
    console.log("Response:", json);

    // If code is not 200, show error
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // If code is 200, return the file list
    toast.success("File list fetched successfully");
    return json.files as fileData[];
  } catch (error) {
    // If error, show error message
    toast.error(`Error fetching file list: ${error}`);
    console.error("Error fetching file list:", error);
    throw new Error(`Error fetching file list: ${error}`);
  }
};

export { useGetFileList as handleGetFileList };
