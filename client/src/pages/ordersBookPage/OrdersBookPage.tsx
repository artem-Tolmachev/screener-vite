import styles from './styles.module.css';
import { useGetOrdersbookQuery } from "@/pages/dashboard/coinData/services/getApiCoins";

const OrdersBookPage = () => {

    const { data, error, isLoading } = useGetOrdersbookQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    const orders = data ? Object.keys(data) : [];

    function formatDate(time: number){
        const diffMs = Date.now() - time;
        const diffMinutes = diffMs / (1000 * 60);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = (diffMinutes % 60).toFixed(0);
        const formatted = `${hours}h ${minutes}m`;

        return formatted;
    }

    return (
        <>
            {orders.map(symbol => (
                <div key={symbol}>
                    {data && data[symbol].bids.map((bid, idx) => (
                        <div className={styles.row} key={idx}>
                            <div >{symbol}</div>
                            <div className={styles.bid}>Покупка</div>
                            <div>Цена: {Number(bid[0]).toFixed(4)}</div>
                            <div>Кол-во:  {Number(bid[1]).toLocaleString()}</div>
                            <div className={styles.bidSum}>{(Number(bid[0])* Number(bid[1])).toLocaleString(undefined, {maximumFractionDigits:2})}</div>
                             <div>{formatDate(data[symbol].time)}</div>
                        </div>
                    ))}
                    {data && data[symbol].asks.map((ask, idx) => (
                        <div className={styles.row} key={idx}>
                            <div >{symbol}</div>
                            <div className={styles.ask}>Продажа</div>
                            <div>Цена: {Number(ask[0]).toFixed(4)}</div>
                            <div>Кол-во:  {Number(ask[1]).toLocaleString()}</div>
                            <div className={styles.askSum}>{(Number(ask[0])* Number(ask[1])).toLocaleString(undefined, {maximumFractionDigits:2})}</div>
                            <div>{formatDate(data[symbol].time)}</div>
                        </div>
                    ))}
                </div> 
            ))}
        </>
    )
};

export default OrdersBookPage