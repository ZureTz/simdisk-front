import { useState } from "react";

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

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

let counter: number = 1; // Counter to keep track of the number of folders
const FilePath = () => {
  const [path, setPath] = useState<string[]>([]);
  // Initial path "root"
  path[0] = "root";

  // Handle path down logic
  const handlePathDown = () => {
    const newPath = [...path];
    newPath.push(`New Folder ${counter++}`);
    setPath(newPath);
  };

  // Handle path up logic
  const handlePathUp = () => {
    // Check if there is a path to go down
    if (path.length === 1) {
      return;
    }
    // Otherwise, remove the last element from the path
    counter--;
    const newPath = [...path];
    newPath.pop();
    setPath(newPath);
  };

  const breadCrumbItems = path.map((file, index, path) => {
    // Maximum size of the file path that can trigger the menu
    const maxItemsThatTriggersMenu = 6;

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
    if (index === path.length - 1) {
      return fileItem;
    }

    // If path size + 1 <= maxItemsDirectlyDisplayed, show the full path
    if (path.length <= maxItemsThatTriggersMenu) {
      return fileItemWithSeparator;
    }

    // For cases where path size > maxItemsDirectlyDisplayed, show the first 1 element , ... , and the last maxItemsDirectlyDisplayed - 2 elements
    if (index === 0) {
      return fileItemWithSeparator;
    }

    // 2 through length - maxItemsDirectlyDisplayed + 1
    // Ignore the elements in between
    if (index > 1 && index < path.length - maxItemsThatTriggersMenu + 2) {
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
                .slice(1, path.length - maxItemsThatTriggersMenu + 2)
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
      <div className="flex flex-row items-center justify-between w-full">
        <Breadcrumb
          className="bg-gray-200 p-4 rounded-lg shadow-md w-9/12 "
          aria-label="Breadcrumb"
        >
          <BreadcrumbList>{breadCrumbItems}</BreadcrumbList>
        </Breadcrumb>

        {/* Button to go up and down the path */}
        <div className="flex flex-row items-center justify-center">
          <Button onClick={handlePathUp}>GO UP</Button>
          {/* A separator vertical line between the buttons */}
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Button onClick={handlePathDown}>GO DOWN</Button>
        </div>
      </div>
    </>
  );
};

export { FilePath };
