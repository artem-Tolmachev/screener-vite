export default function updateHeatMap(orderBooks, updates){
    updates.forEach(([price, volume]) => {
        if(Number(volume) === 0){
            orderBooks.delete(price)
        }else{
            orderBooks.set(price, Number(volume))
        }
    })
}