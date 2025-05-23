import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

const Uploader = () => {
  const handleUploadFiles = async () => {
    // GET localhost:8080/test
    try {
      const response = await fetch("http://localhost:8080/test");
      const data = await response.json();
      console.log(data);
      toast.success("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    }
  };

  return (
    <>
      {/* Label and button for uploading files */}
      {/* Label is above the fileUpload, the Button is right to Input with little gap */}
      <div className="flex flex-col items-baseline mb-4 mt-4">
        <Label className="mb-4" htmlFor="fileUpload">
          Upload Files
        </Label>
        <div className="flex justify-center items-center mb-4">
          <Input id="fileUpload" type="file" />
          <Button className="ml-2" onClick={handleUploadFiles}>
            Upload Files
          </Button>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export { Uploader };
