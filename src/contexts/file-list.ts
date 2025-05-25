import { createContext } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type fileData = {
  id: number;
  filename: string;
  isFolder: boolean;
  size: number;
};

// Type of the File System Context
interface FileListDataContextType {
  fileListData: fileData[];
  setFileListData: React.Dispatch<React.SetStateAction<fileData[]>>;
}

// Create a context with a meaningful default value
const FileListContext = createContext<FileListDataContextType>({
  fileListData: [],
  setFileListData: () => {},
});

export { FileListContext };
