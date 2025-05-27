import { faFolder, faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faCopy,
  faCloudArrowDown,
  // faDeleteLeft,
  faFileHalfDashed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

import type { fileData } from "@/contexts/file-list";
// import { handleDeleteFile } from "@/handlers/delete-file";
import { handleDownloadFile } from "@/handlers/download-file";

export const columns: ColumnDef<fileData>[] = [
  {
    accessorKey: "isFolder",
    header: "Type",
    cell: ({ row }) =>
      // If file name is "No files found", return
      row.getValue("filename") === "No files found" ? (
        <FontAwesomeIcon size="xl" icon={faFileHalfDashed} />
      ) : // If is folder, return folder icon, otherwise return file icon
      row.getValue("isFolder") ? (
        <FontAwesomeIcon size="xl" icon={faFolder} />
      ) : (
        <FontAwesomeIcon size="xl" icon={faFile} />
      ),
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      // If is folder, return "---"
      // Using mono-spaced font for better alignment
      if (row.getValue("isFolder")) {
        return <span className="font-mono">----</span>;
      }
      // If is "No files found", return "----"
      if (row.getValue("filename") === "No files found") {
        return <span className="font-mono">----</span>;
      }

      const size: string = row.getValue("size");
      // Convert size from string to number
      const sizeInBytes = parseFloat(size);

      // If size is less than 1024 bytes, return size in bytes
      if (sizeInBytes < 1024) {
        return <span className="font-mono">{`${sizeInBytes} B`}</span>; // Return size in bytes
      }
      // If size is less than 1024 KB, return size in KB
      if (sizeInBytes < 1024 * 1024) {
        return (
          <span className="font-mono">{`${(sizeInBytes / 1024).toFixed(
            2
          )} KB`}</span> // Convert bytes to KB
        );
      }
      // If size is less than 1024 MB, return size in MB
      if (sizeInBytes < 1024 * 1024 * 1024) {
        return (
          <span className="font-mono">{`${(sizeInBytes / 1024 / 1024).toFixed(
            2
          )} MB`}</span> // Convert bytes to MB
        );
      }
      // If size is larger than 1 GB, return size in GB
      return (
        <span className="font-mono">{`${(
          sizeInBytes /
          1024 /
          1024 /
          1024
        ).toFixed(2)} GB`}</span> // Convert bytes to GB
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const file = row.original;

      const onCopyFileNameClicked = () => {
        try {
          navigator.clipboard.writeText(file.filename.toString());
          toast.success("Filename copied to clipboard");
        } catch (error) {
          console.error("Failed to copy filename:", error);
          toast.error("Failed to copy filename");
        }
      };

      const onDownloadFileClicked = async () => {
        await handleDownloadFile(file.relativePath.split("/"), file.filename);
      };

      // const onDeleteFileClicked = async () => {
      //   await handleDeleteFile(file.relativePath.split("/"), file.filename);
      // };

      const ConditionalShowDownload = ({ isFolder }: { isFolder: boolean }) => {
        if (isFolder) {
          // Don't show download option for folders
          return <></>;
        }
        // Otherwise, show download option
        return (
          <>
            <DropdownMenuItem onClick={onDownloadFileClicked}>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCloudArrowDown} />
                Download
              </span>
            </DropdownMenuItem>
          </>
        );
      };

      const ConditionalShowDelete = ({ filename }: { filename: string }) => {
        if (filename === "No files found") {
          // Don't show delete option for "No files found"
          return <></>;
        }

        // Otherwise, show delete option
        return (
          // <>
          //   <DropdownMenuItem onClick={onDeleteFileClicked}>
          //     <span className="flex items-center gap-2">
          //       <FontAwesomeIcon icon={faDeleteLeft} />
          //       {/* With red color for warning */}
          //       <span className="text-red-500">Delete</span>
          //     </span>
          //   </DropdownMenuItem>
          // </>
          <></>
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {/* Bold */}
              <span className="font-semibold">Actions</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onCopyFileNameClicked}>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCopy} />
                Copy name
              </span>
            </DropdownMenuItem>
            <ConditionalShowDownload isFolder={file.isFolder} />
            <ConditionalShowDelete filename={file.filename} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
