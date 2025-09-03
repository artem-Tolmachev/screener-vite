import { Skeleton } from "@/components/ui/skeleton"
export default function OrdersBookPageSkeleton() {
  return (
    <div className="flex pr-10 pt-[75px] pl-[12px] space-x-4 h-[85%%] w-[100%] bg-blue-950">
        <div className="flex flex-col space-y-5 bg-gray-900 p-6 rounded-[5px] h-[400px] w-full">
            <div className="flex justify-between
">
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
                <Skeleton className="h-4 w-[150px] rounded-2xl bg-gray-500" />
            </div>
            <div className="flex space-x-5 justify-between">
            {Array.from({length: 6}, (_, i) => {
                return <div key={`row1-${i}`}  className="w-[150px] flex justify-end">
                    <Skeleton className="h-4 w-[70px] rounded-2xl bg-gray-500"/>
                </div>
                })}
            </div>
            <div className="flex space-x-5 justify-between">
            {Array.from({length: 6}, (_, i) => {
                return <div key={`row2-${i}`}  className="w-[150px] flex justify-end">
                    <Skeleton className="h-4 w-[70px] rounded-2xl bg-gray-500"/>
                </div>
                })}
            </div>
            <div className="flex space-x-5 justify-between">
            {Array.from({length: 6}, (_, i) => {
                return <div key={`row3-${i}`}  className="w-[150px] flex justify-end">
                    <Skeleton className="h-4 w-[70px] rounded-2xl bg-gray-500"/>
                </div>
                })}
            </div>
            <div className="flex space-x-5 justify-between">
            {Array.from({length: 6}, (_, i) => {
                return <div key={`row4-${i}`}  className="w-[150px] flex justify-end">
                    <Skeleton className="h-4 w-[70px] rounded-2xl bg-gray-500"/>
                </div>
                })}
            </div>
        </div>
    </div>
  )
}