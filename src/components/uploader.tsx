import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleUploadFile } from "@/handlers/upload-file";

const Uploader = () => {
  return (
    <>
      {/* Label and button for uploading files */}
      {/* Label is above the fileUpload, the Button is right to Input with little gap */}
      <div className="flex flex-col items-baseline mb-4 mt-4">
        <Label className="mb-2" htmlFor="fileUpload">
          File selection
        </Label>
        <div className="flex justify-center items-center mb-4">
          <Input id="fileUpload" type="file" multiple />
          <Button className="ml-10" onClick={handleUploadFile}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export { Uploader };
