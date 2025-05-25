import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { FilePathContext } from "@/contexts/file-path";
import { FileListContext } from "@/contexts/file-list";
import { handleGetFileList } from "@/handlers/get-file-list";

const FilePath = () => {
  const { path, setPath } = useContext(FilePathContext);
  const { setFileListData } = useContext(FileListContext);

  // Initial path "root"
  path[0] = "";

  // Handle path up logic
  const onPathUpButtonClicked = () => {
    // Check if there is a path to go down
    if (path.length === 1) {
      return;
    }
    // Otherwise, remove the last element from the path

    const newPath = [...path];
    newPath.pop();
    setPath(newPath);
  };

  // Handle home icon click
  const onHomeIconClicked = () => {
    // Reset the path to the initial state
    setPath([""]);
  };

  // Handle refresh button click
  const onRefreshButtonClicked = async () => {
    // Refresh the file list by re-fetching the data
    const fileListData =await handleGetFileList(path);
    setFileListData(fileListData);
  };

  const breadCrumbItems = path.map((file, index, path) => {
    // Maximum size of the file path that can trigger the menu
    const maxItemsThatTriggerDropdownMenu = 7;

    const fileItem = (
      <BreadcrumbItem>
        <BreadcrumbPage>
          <div className="flex h-9 items-center justify-center">{file}</div>
        </BreadcrumbPage>
      </BreadcrumbItem>
    );

    const separator = <BreadcrumbSeparator></BreadcrumbSeparator>;

    const fileItemWithSeparator = (
      <>
        {fileItem}
        {separator}
      </>
    );

    // If it's the last element in the path, don't show the separator
    if (index === path.length - 1 && path.length != 1) {
      return fileItem;
    }

    // If path size + 1 <= maxItemsThatTriggerDropdownMenu, show the full path
    if (path.length <= maxItemsThatTriggerDropdownMenu) {
      return fileItemWithSeparator;
    }

    // For cases where path size > maxItemsThatTriggerDropdownMenu, show the first 1 element , ... , and the last maxItemsThatTriggerDropdownMenu - 2 elements
    if (index === 0) {
      return fileItemWithSeparator;
    }

    // 2 through length - maxItemsThatTriggerDropdownMenu + 1
    // Ignore the elements in between
    if (
      index > 1 &&
      index < path.length - maxItemsThatTriggerDropdownMenu + 1
    ) {
      return null;
    }

    if (index === 1) {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {/*  1 through length - 7 */}
              {path
                .slice(1, path.length - maxItemsThatTriggerDropdownMenu + 1)
                .map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <BreadcrumbPage>
                      <div className="flex h-9 items-center justify-center">
                        {item}
                      </div>
                    </BreadcrumbPage>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {separator}
        </>
      );
    }

    // Last 6 elements
    return fileItemWithSeparator;
  });

  return (
    <>
      <div className="flex flex-row items-center justify-around w-full">
        {/* Home Icon */}
        {/* Breadcrumb navigation */}
        <FontAwesomeIcon
          icon={faHouse}
          className="mr-2 custom-icon-button"
          size="lg"
          onClick={onHomeIconClicked}
        />
        <FontAwesomeIcon
          icon={faRotateRight}
          className="mr-2 custom-icon-button"
          size="lg"
          onClick={onRefreshButtonClicked}
        />
        <Breadcrumb
          className="bg-gray-200 p-4 rounded-lg shadow-md w-9/12 "
          aria-label="Breadcrumb"
        >
          <BreadcrumbList>{breadCrumbItems}</BreadcrumbList>
        </Breadcrumb>

        {/* Button to go up and down the path */}
        <div className="flex flex-row items-center justify-center">
          <Button onClick={onPathUpButtonClicked}>GO UP</Button>
        </div>
      </div>
    </>
  );
};

export { FilePath };
