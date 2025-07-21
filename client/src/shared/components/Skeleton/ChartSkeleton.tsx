import { Skeleton } from "@/components/ui/skeleton"
export default function ChartSkeleton() {
  return (
    <div className="flex pr-10 pt-10 space-x-4 h-[100%] w-[100%] bg-gray-900">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-500" />
        <Skeleton className="h-4 w-[200px] bg-gray-500" />
      </div>
    </div>
  )
}