import { toast } from "sonner";

const handleCreateNewFolder = async (path: string[]) => {
  // Get the folder name from the input field
  const folderNameInput = document.getElementById(
    "createNewFolder"
  ) as HTMLInputElement;

  // If no folder name is provided, show error
  if (!folderNameInput || !folderNameInput.value.trim()) {
    toast.error("Please enter a folder name");
    return;
  }

  // Log the folder name
  const folderName = folderNameInput.value.trim();
  console.log("Folder name:", folderName);

  // Put the folder name into FormData
  const formData = new FormData();
  formData.append("folderName", folderName);

  // POST /api/createFolder?path=${path.join(",")}
  const pathname =
    "/api/createFolder?" +
    new URLSearchParams({
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
    toast.success("New folder created successfully");
  } catch (error) {
    console.error("Error create new folder:", error);
    toast.error("Error create new folder: " + error);
  }
};

export { handleCreateNewFolder };
