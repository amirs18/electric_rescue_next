"use client";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Metadata } from "next";
import { trpc } from "@trpcProviders/client";
import { SelectRequestRescue } from "@/db/schema";
import { info } from "console";
const columnHelper = createColumnHelper<SelectRequestRescue>();

const columns = [
  columnHelper.accessor("additionalInfo", {
    header: "test",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("latitude", {
    header: "test",
    footer: (latitude) => latitude.column.id,
  }),
  columnHelper.accessor("longitude", {
    header: "test",
    footer: (longitude) => longitude.column.id,
  }),
  columnHelper.accessor("status", {
    header: "test",
    footer: (status) => status.column.id,
  }),
  columnHelper.accessor('timeStamp', {
    cell: info=>info.getValue(),
    header: "test",
    footer: (timeStamp) => timeStamp.column.id,
  }),
  columnHelper.accessor("userId", {
    header: "test",
    footer: (userId) => userId.column.id,
  }),
];
export default function TableView() {
  const data = trpc.getAllRescues.useQuery().data!;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>TableView</div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
}
