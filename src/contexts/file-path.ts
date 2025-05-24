import { createContext } from "react";

// Type of the File System Context
interface FilePathContextType {
  path: string[];
  setPath: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create a context with a meaningful default value
const FilePathContext = createContext<FilePathContextType>({
  path: [],
  setPath: () => {},
});

export { FilePathContext};
