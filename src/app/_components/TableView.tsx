"use client";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  Headers,
} from "@tanstack/react-table";
import { trpc } from "@trpcProviders/client";
import { SelectRequestRescue } from "@/db/schema";
const columnHelper = createColumnHelper<SelectRequestRescue>();

const columns = [
  columnHelper.accessor((row) => row.additionalInfo, {
    header: "additionalInfo",
    cell: (info) => <span>{info.getValue()}</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row)=>row.latitude, {
    header: "latitude",
    cell: (info) => <span>{info.getValue()}</span>,
    footer: (latitude) => latitude.column.id,
  }),
  columnHelper.accessor((row)=>row.longitude, {
    header: "longitude",
    cell: (info) => <span>{info.getValue()}</span>,
    footer: (longitude) => longitude.column.id,
  }),
  columnHelper.accessor((row)=>row.status, {
    header: "status",
    cell: (info) => <span>{info.getValue()}</span>,
    footer: (status) => status.column.id,
  }),
  columnHelper.accessor((row)=>row.timeStamp, {
    header: "timeStamp",
    cell: (info) => <span>{info.getValue().getTime()}</span>,
    footer: (timeStamp) => timeStamp.column.id,
  }),
  columnHelper.accessor((row)=>row.userId, {
    header: "userId",
    cell: (info) => <span>{info.getValue()}</span>,
    footer: (userId) => userId.column.id,
  }),
];
export default function TableView() {
  const data = trpc.getAllRescues.useQuery().data;
  const table = useReactTable({
    data: data ??[] ,
    columns:columns ??[],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>TableView</div>
      <table className="table">
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
