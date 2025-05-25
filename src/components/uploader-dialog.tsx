import { useContext } from "react";
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
import { Label } from "@/components/ui/label";

import { FileListContext } from "@/contexts/file-list";
import { FilePathContext } from "@/contexts/file-path";
import { handleUploadFile } from "@/handlers/upload-file";
import { handleGetFileList } from "@/handlers/get-file-list";

const UploaderDialog = () => {
  const { path } = useContext(FilePathContext);
  const { setFileListData } = useContext(FileListContext);

  const onUploadButtonClicked = async () => {
    try {
      await handleUploadFile(path);
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
          <Button>Upload Files</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Use the form below to upload files to the server. You can select
              multiple files at once.
            </DialogDescription>
          </DialogHeader>
          {/* Label and button for uploading files */}
          {/* Label is above the fileUpload, the Button is right to Input with little gap */}
          <div className="flex flex-col items-baseline mb-4 mt-4">
            <Label className="mb-2" htmlFor="fileUpload">
              File selection
            </Label>
            <div className="flex justify-center items-center mb-4">
              <Input id="fileUpload" type="file" multiple />
              <DialogClose asChild>
                <Button
                  className="ml-10"
                  onClick={onUploadButtonClicked}
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

export { UploaderDialog };
