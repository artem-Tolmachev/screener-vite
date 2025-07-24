export default function filterOrders (orders){
  
  if(!Array.isArray(orders.data?.b) || !Array.isArray(orders.data?.a)) return
  const bids = orders.data?.b?.filter(([price, qty]) => Number(price) * Number(qty) >= 130000);
  const asks = orders.data?.a?.filter(([price, qty]) => Number(price) * Number(qty) >= 130000);
  
  if(bids.length === 0 || asks.length === 0) return null;
  
  return {
    ...orders,
    data: {
      ...orders.data,
      b: bids,
      a: asks
    }
  };
}