import { createContext } from "react";

// Example of file list data
//  const files = [
//     {
//       filename: "example.txt",
//       size: 2048, // Size in bytes
//       isFolder: false,
//     },
//     {
//       filename: "documents",
//       size: 0, // Folders typically have size 0
//       isFolder: true,
//     },
//     {
//       filename: "image.png",
//       size: 512000, // Size in bytes
//       isFolder: false,
//     },
//     {
//       filename: "videos",
//       size: 0, // Folders typically have size 0
//       isFolder: true,
//     },
//     {
//       filename: "audio.mp3",
//       size: 3072000, // Size in bytes
//       isFolder: false,
//     },
//     {
//       filename: "archive.zip",
//       size: 10485760, // Size in bytes
//       isFolder: false,
//     },
//     {
//       filename: "scripts",
//       size: 0, // Folders typically have size 0
//       isFolder: true,
//     },
//     // 添加更多模拟数据
//     {
//       filename: "photos",
//       size: 0,
//       isFolder: true,
//     },
//     {
//       filename: ".hidden_folder",
//       size: 0,
//       isFolder: true,
//     },
//     {
//       filename: "project.pdf",
//       size: 5242880, // 5MB
//       isFolder: false,
//     },
//     {
//       filename: "data.csv",
//       size: 1024000, // 1MB
//       isFolder: false,
//     },
//     {
//       filename: "1-report.docx",
//       size: 3145728, // 3MB
//       isFolder: false,
//     },
//     {
//       filename: "2-presentation.pptx",
//       size: 8388608, // 8MB
//       isFolder: false,
//     },
//     {
//       filename: "backup",
//       size: 0,
//       isFolder: true,
//     },
//     {
//       filename: "config.json",
//       size: 1024, // 1KB
//       isFolder: false,
//     },
//     {
//       filename: "notes.md",
//       size: 4096, // 4KB
//       isFolder: false,
//     },
//     {
//       filename: "大数据分析.xlsx",
//       size: 2097152, // 2MB
//       isFolder: false,
//     },
//     {
//       filename: "中文文件夹",
//       size: 0,
//       isFolder: true,
//     },
//     {
//       filename: "video-2023.mp4",
//       size: 104857600, // 100MB
//       isFolder: false,
//     },
//   ];

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
