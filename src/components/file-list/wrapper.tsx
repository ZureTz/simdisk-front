import { useContext, useEffect } from "react";
import { Toaster } from "sonner";

import { columns } from "@/components/file-list/columns";
import { DataTable } from "@/components/file-list/file-table";
import { FileListContext } from "@/contexts/file-list";
import { handleGetFileList } from "@/handlers/get-file-list";
import { FilePathContext } from "@/contexts/file-path";

export default function FileListWrapper() {
  const { fileListData, setFileListData } = useContext(FileListContext);
  const { path } = useContext(FilePathContext);

  useEffect(() => {
    // This is where you can fetch data when the component mounts.
    async function fetchData() {
      const data = await handleGetFileList(path);
      setFileListData(data);
    }
    fetchData();
  }, [path, setFileListData]);

  return (
    <>
      <div className="container mx-auto custom-scrollbar">
        <DataTable columns={columns} data={fileListData} />
        <Toaster />
      </div>
    </>
  );
}
