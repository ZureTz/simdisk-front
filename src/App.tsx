import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { Header } from "@/components/header";
import { FilePath } from "@/components/filepath";
import { FilePathContext } from "@/contexts/file-path";
import { UploaderDialog } from "@/components/uploader-dialog";
import { FileList } from "@/components/file-list";

function App() {
  const [path, setPath] = useState<string[]>([]);

  return (
    <>
      <div className="bg-gray-600 h-dvh overflow-auto">
        <Header />
        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-full p-4">
          {/* With correct margin , white background, round edge, */}
          <div className="flex flex-col items-center justify-start w-2/3 h-10/12 bg-white rounded-lg shadow-lg p-4">
            {/* File path with breadcrumb and buttons */}
            <Separator className="my-4" />

            {/* A full width file path (1 row) */}
            {/* <FilePath /> */}
            <div className="flex flex-row justify-start w-full bg-white rounded-lg shadow-lg p-4">
              <FilePathContext.Provider value={{ path, setPath }}>
                <FilePath />
              </FilePathContext.Provider>
            </div>

            <Separator className="my-4" />

            {/* File list with scrollable area */}
            {/* <FileList /> */}

            {/* Drawer for uploader */}
            <UploaderDialog />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
