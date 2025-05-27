import type { fileData } from "@/contexts/file-list";

// Get file list handler
const handleGetFileList = async (path: string[]): Promise<fileData[]> => {
  // GET /api/files?path=${path.join(",")}
  const pathname =
    "/api/files?" +
    new URLSearchParams({
      path: path.join(),
    }).toString();

  try {
    const response = await fetch(pathname, {
      method: "GET",
    });

    // If code is not 200, show error
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // If code is 200, return the file list
    const json = await response.json();
    return json.files as fileData[];
  } catch (error) {
    // If error, show error message
    console.error("Error fetching file list:", error);
    throw new Error(`Error fetching file list: ${error}`);
  }
};

export { handleGetFileList };
