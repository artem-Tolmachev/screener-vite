import { Skeleton } from "@/components/ui/skeleton"
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col pl-5 pt-10 space-x-4 h-[100%] w-[100%] bg-gray-900">
        <div className="flex">
            <Skeleton className="h-12 w-12 rounded-full mr-5 bg-gray-500"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-500" />
                <Skeleton className="h-4 w-[200px] bg-gray-500" />
            </div>
        </div>
        <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
        <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
        <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
        <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
                <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
        <div className="flex mt-10">
            <Skeleton className="h-6 w-6 rounded-full mr-5 bg-gray-500"/>
            <Skeleton className="h-4 w-[50%] bg-gray-500"/>
        </div>
    </div>
  )
}