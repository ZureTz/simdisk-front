import { toast } from "sonner";

const handleUploadFile = async (path: string[]) => {
  const selectedFiles: FileList | null = (
    document.getElementById("fileUpload") as HTMLInputElement
  ).files;

  // If no file is selected, show error
  if (!selectedFiles || selectedFiles.length === 0) {
    toast.error("Please select a file to upload");
    return;
  }

  // Log the selected file
  // console.log("Selected files:", selectedFiles);

  // Append the file to FormData
  const formData = new FormData();
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    // Append the file to FormData with the key "files"
    formData.append("file" + i, file);
  }

  // POST /api/upload?fileCount=${selectedFiles.length}?path=${path.join(",")}
  const pathname =
    "/api/upload?" +
    new URLSearchParams({
      fileCount: selectedFiles.length.toString(),
      path: path.join(),
    }).toString();

  try {
    const response = await fetch(pathname, {
      method: "POST",
      body: formData,
    });

    // If code is not 200, show error
    if (!response.ok) {
      throw response.status.toString();
    }

    // If code is 200, show success

    toast.success("Files uploaded successfully");
    
  } catch (error) {
    console.error("Error uploading files:", error);
    toast.error("Error uploading files: " + error);
  }
};

export { handleUploadFile };
