import { useContext } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FilePathContext } from "@/contexts/file-path";

interface FileTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: FileTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { path, setPath } = useContext(FilePathContext);

  const onTableRowFileNameClicked = (row: Row<TData>) => {
    const isFolder = row.getValue("isFolder");
    if (!isFolder) {
      // If the clicked row is not a folder, do nothing
      return;
    }

    // If it is "No files found", do nothing
    if (row.getValue("filename") === "No files found") {
      return;
    }

    // If it is a folder, update the path
    const filename: string = row.getValue("filename");
    const newPath = [...path, filename];
    setPath(newPath);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  // If the cell is a folder, add onClick handler on the file name cell
                  if (
                    cell.row.getValue("isFolder") &&
                    cell.getValue() === cell.row.getValue("filename")
                  ) {
                    return (
                      <TableCell
                        key={cell.id}
                        onClick={() => onTableRowFileNameClicked(row)}
                        className="cursor-pointer"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
