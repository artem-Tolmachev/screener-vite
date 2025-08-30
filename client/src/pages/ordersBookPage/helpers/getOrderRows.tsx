import { TableCell, TableRow} from "@/components/ui/table";
import { CurrentPrice, OrdersBookResponse } from "../types";
import { formatDate } from "./formatData";
import { IDashboardHeaderItems } from "@/pages/dashboard/types";

interface Props{
  orders: string[];
  data: OrdersBookResponse | undefined;
  updatedPrice: CurrentPrice[];
  columns: IDashboardHeaderItems[];
  radioBtn: string;
}

export function getOrderRows({updatedPrice, orders, data, columns, radioBtn}: Props){
    const allRows: React.ReactNode[] = [];
    const firstColumn = columns.find(item => item.key === 'symbol' && item.visible !== 0 );
    const lastColumn = columns.find(item => item.key === 'price' && item.visible !== 0 );
    const middleColums = columns.filter(
      item => item.key !== 'symbol' && item.key !== 'price' && item.visible !== 0 
    );
    orders.forEach((symbol) => {
        const item = updatedPrice?.find((ticker) => ticker.symbol === symbol);
        const bids = data?.[symbol]?.bids ?? [];
        const asks = data?.[symbol]?.asks ?? [];

        const ordersData = data ?? {};
           bids.forEach((bid, idx) => {
             if (radioBtn === 'sales') return;
              allRows.push(<TableRow className="text-blue-900" key={`${symbol}-bid-${idx}`}>
               {firstColumn && <TableCell className="font-medium text-gray-400">{symbol}</TableCell>}
                {middleColums.find(col => col.key === 'distance')?.visible === 1 && <TableCell className=" text-gray-400">
                  {item?.bid1Price
                    ? Math.abs((Number(bid[0]) - Number(item.bid1Price)) / Number(item.bid1Price) * 100).toFixed(0)
                    : '...'}
                </TableCell>}

                {middleColums.find(col => col.key === 'duration')?.visible === 1 && <TableCell className=" text-gray-400">{formatDate(ordersData[symbol].time)}</TableCell>}

                { (middleColums.find(col => col.key === 'type')?.visible === 1) && <TableCell className="text-green-600">Покупка</TableCell>}

                {middleColums.find(col => col.key === 'volume')?.visible === 1 && <TableCell className=" text-gray-400">{Number(bid[1]).toLocaleString()}</TableCell>}

                {middleColums.find(col => col.key === 'volume$')?.visible === 1 && <TableCell className=" text-gray-400"> 
                  {(Number(bid[0]) * Number(bid[1])).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </TableCell>}

                {lastColumn && <TableCell className="text-right  text-gray-400">{item?.bid1Price ?? '...'}</TableCell>}
              </TableRow>)
            })

            asks.forEach((ask, idx) => {
              if (radioBtn === 'purchases') return;
              allRows.push(<TableRow className="text-blue-900" key={`${symbol}-ask-${idx}`}>
                {firstColumn &&  <TableCell className="font-medium text-gray-400">{symbol}</TableCell>}
                {middleColums.find(col => col.key === 'distance')?.visible === 1 && <TableCell className="text-gray-400">
                  {item?.ask1Price
                    ? Math.abs((Number(ask[0]) - Number(item.ask1Price)) / Number(item.ask1Price) * 100).toFixed(0)
                    : '...'}
                </TableCell>}
                {middleColums.find(col => col.key === 'duration')?.visible === 1 && <TableCell className="text-gray-400">{formatDate(ordersData[symbol].time)}</TableCell>}

                {middleColums.find(col => col.key === 'type')?.visible === 1 && <TableCell className="text-red-600">Продажа</TableCell>}

                {middleColums.find(col => col.key === 'volume')?.visible === 1 && <TableCell className="text-gray-400">{Number(ask[1]).toLocaleString()}</TableCell>}

                {middleColums.find(col => col.key === 'volume$')?.visible === 1 && <TableCell className="text-gray-400">
                  {(Number(ask[0]) * Number(ask[1])).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </TableCell>}

                {lastColumn && <TableCell className="text-right text-gray-400">{item?.ask1Price ?? '...'}</TableCell>}
              </TableRow>)
            })
    })
    return allRows;
}