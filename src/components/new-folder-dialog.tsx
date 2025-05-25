import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FileListContext } from "@/contexts/file-list";
import { FilePathContext } from "@/contexts/file-path";
import { handleGetFileList } from "@/handlers/get-file-list";
import { handleCreateNewFolder } from "@/handlers/create-new-folder";

const CreateNewFolderDialog = () => {
  const { path } = useContext(FilePathContext);
  const { setFileListData } = useContext(FileListContext);

  const onCreateNewFolderButtonClicked = async () => {
    try {
      await handleCreateNewFolder(path);
      // Reload the file list after upload
      const newFileList = await handleGetFileList(path);
      setFileListData(newFileList);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <FontAwesomeIcon icon={faFolderPlus} size="2xl" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              Please enter the name of the new folder.
            </DialogDescription>
          </DialogHeader>
          {/* Label and button for uploading files */}
          {/* Label is above the fileUpload, the Button is right to Input with little gap */}
          <div className="flex flex-col  mb-4 mt-4">
            <div className="flex justify-center items-center mb-4">
              <Input id="createNewFolder" placeholder="New Folder Name" />
              {/* Button to confirm the creation of the new folder */}
              <DialogClose asChild>
                <Button
                  className="ml-10"
                  onClick={onCreateNewFolderButtonClicked}
                  type="submit"
                >
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export { CreateNewFolderDialog };
