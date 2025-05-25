import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { Header } from "@/components/header";
import { FilePath } from "@/components/filepath";
import { FilePathContext } from "@/contexts/file-path";
import { UploaderDialog } from "@/components/uploader-dialog";
import FileListWrapper from "./components/file-list/wrapper";
import { FileListContext, type fileData } from "./contexts/file-list";
import { CreateNewFolderDialog } from "./components/new-folder-dialog";

function App() {
  const [path, setPath] = useState<string[]>([]);
  const [fileListData, setFileListData] = useState<fileData[]>([]);

  return (
    <>
      <div className="bg-gray-600 h-dvh overflow-auto">
        <Header />
        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-full p-4">
          {/* With correct margin , white background, round edge, */}
          <div className="custom-container flex flex-col items-center justify-start h-10/12 bg-white rounded-lg shadow-lg p-4">
            {/* File path with breadcrumb and buttons */}
            {/* A full width file path (1 row) */}
            <FilePathContext.Provider value={{ path, setPath }}>
              <FileListContext.Provider
                value={{ fileListData, setFileListData }}
              >
                <div className="flex flex-row justify-start w-full bg-white rounded-lg shadow-lg p-4">
                  <FilePath />
                </div>

                <Separator className="my-4" />

                {/* File list with scrollable area */}

                <div className="w-full h-full overflow-y-auto">
                  {/* File Data context provider */}
                  <FileListWrapper />
                </div>

                <Separator className="my-4" />

                {/* Dialog for uploader */}
                <div className="flex justify-end w-full gap-3">
                  <CreateNewFolderDialog />
                  <UploaderDialog />
                </div>
              </FileListContext.Provider>
            </FilePathContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
