import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

import { Uploader } from "@/components/uploader";

const UploaderDialog = () => {
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
          <Uploader />
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export { UploaderDialog };
