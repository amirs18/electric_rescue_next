'use client';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  Headers,
} from '@tanstack/react-table';
import { trpc } from '@trpcProviders/client';
import { SelectRequestRescue, status } from '@/db/schema';
import { getAllRequestsWithUserData } from '@/db/functions';
import { redirect } from 'next/dist/server/api-utils';
import z from 'zod';

const selectOptions = {
  pending: 'pending',
  recived: 'recived',
  onRoute: 'on route',
  done: 'done',
  cantBeDone: 'can`t be done',
} as const;

const statusColor = {
  pending: 'select select-warning w-auto min-h-8 max-h-8 max-w-xs',
  recived: 'select select-warning w-auto min-h-8 max-h-8 max-w-xs',
  'on route': 'select select-info w-auto min-h-8 max-h-8 max-w-xs',
  'can`t be done': 'select select-error w-auto min-h-8 max-h-8 max-w-xs',
  done: 'select select-primary w-auto min-h-8 max-h-8 max-w-xs',
} as const;

export default function TableView() {
  const getAllRescues = trpc.getAllRescues.useQuery({ limit: 50, offset: 0 });

  const setStatus = trpc.setStatus.useMutation({
    onSuccess(data, variables, context) {
      getAllRescues.refetch();
    },
  });

  const columnHelper =
    createColumnHelper<
      Awaited<ReturnType<typeof getAllRequestsWithUserData>>[0]
    >();
  const columns = [
    columnHelper.accessor(row => row.id, {
      header: 'id',
      cell: info => <span>{info.getValue()}</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.phoneNumber, {
      header: 'phoneNumber',
      cell: info => <span>{info.getValue()}</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.updatedAt, {
      header: 'updatedAt',
      cell: info => <span>{info.getValue().getTime()}</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.additionalInfo, {
      header: 'additionalInfo',
      cell: info => <span>{info.getValue()}</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.latitude + ',' + row.longitude, {
      header: 'cord',
      cell: info => (
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://google.com/search?q=${info.getValue()}`}
          >
            {info.getValue()}
          </a>
        </span>
      ),
      footer: latitude => latitude.column.id,
    }),
    columnHelper.accessor(row => row.status, {
      header: 'status',
      cell: info => (
        <select
          onChange={e => {
            setStatus.mutate({
              id: info.row.original.id,
              status: z.custom<status>().parse(e.target.value),
            });
          }}
          className={statusColor[info.getValue()]}
        >
          <option disabled selected>
            {info.getValue()}
          </option>
          {Object.values(selectOptions).map(value => (
            <option key={info.row.id + value}>{value}</option>
          ))}
        </select>
      ),
      footer: status => status.column.id,
    }),
    columnHelper.accessor(row => row.timeStamp, {
      header: 'timeStamp',
      cell: info => <span>{info.getValue().getTime()}</span>,
      footer: timeStamp => timeStamp.column.id,
    }),
    columnHelper.accessor(row => row.name, {
      header: 'name',
      cell: info => <span>{info.getValue()}</span>,
      footer: name => name.column.id,
    }),
  ];
  const table = useReactTable({
    data: getAllRescues.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>TableView</div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
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
