import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { IDashboardHeaderItems } from "@/pages/dashboard/types";
import React from "react";

interface Props {
  paginatedRows: React.ReactNode[]
  columns: IDashboardHeaderItems[];
}

export function TableOrderBook({paginatedRows, columns}: Props) {
  const firstItemHeader = columns.find(item => item.key === 'symbol' && item.visible !== 0 );
  const lastItemHeader = columns.find(item => item.key === 'price' && item.visible !== 0 );
  const middleItems = columns.filter(
    item => item.key !== 'symbol' && item.key !== 'price' && item.visible !== 0 
  );

  return (
    <Table className="w-full bg-gray-950 rounded-[8px] h-full">
     {/* <TableCaption className="text-gray-400">Список крупных лимитных ордеров</TableCaption> */}
     <TableHeader className="">
      <TableRow className="text-blue-900">
        {firstItemHeader && (
          <TableHead className="w-[100px] text-gray-200">
            {firstItemHeader.name}
          </TableHead>
        )}
        {middleItems.map((col) => (
          <TableHead key={col.key} className="text-gray-100">
            {col.name}
          </TableHead>
        ))}

        {lastItemHeader && (
          <TableHead className="text-right text-gray-300">
            {lastItemHeader.name}
          </TableHead>
        )}
      </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto text-gray-400 ">
            {paginatedRows}
          </TableBody>
      </Table>
  )
}
