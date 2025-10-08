import { useAppDispatch } from "@/app/store/store";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/pages/dashboard/coinData/slices/UserSlice";
import { LoginResponse } from "@/pages/dashboard/types";

interface Props {
  data: LoginResponse;
}

export function SheetAccount({data}: Props) {
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-lime-700 hover:text-lime-500 cursor-pointer ml-3 rounded-full border-1 p-1">
          <svg
            width="30"
            height="30"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zM12 2a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="text-gray-500 bg-gray-800">
        <SheetHeader className="mb-2.5 mt-5.5 flex flex-row p-5 bg-gray-900 rounded-[10px]">
          <div className="mr-2.5 border-2 text-lime-700 border-lime-700 w-20 h-20 rounded-full">
              <svg
                className="w-full h-full"
                width="30"
                height="30"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
              <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zM12 2a4 4 0 110 8 4 4 0 010-8z" />
            </svg>
          </div>
          {data?.success &&  (
            <ul>
              <li className="truncate max-w-[200px]"
              ><span className="text-white">UID</span>: {data.token}</li>
              <li><span className="text-white">ID</span>: {data.user?.id}</li>
              <li><span className="text-white">Email:</span> {data.user?.email}</li>
            </ul>)
          }
        </SheetHeader>
        <SheetFooter>
          <div className="flex items-center justify-center gap-2">
            <SheetClose asChild>
              <Button className="text-white cursor-pointer" variant="outline">Закрыть</Button>
            </SheetClose>
            <button
            className="w-10 h-10 rounded-[50%] bg-lime-700 cursor-pointer flex items-center justify-center"
            onClick={() => dispatch(logout())}
            >
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.29 13.29a1 1 0 0 0 0 1.42l3 3a1.002 1.002 0 0 0 1.42 0l3-3a1.004 1.004 0 1 0-1.42-1.42L13 14.59V3a1 1 0 0 0-2 0v11.59l-1.29-1.3a1 1 0 0 0-1.42 0ZM18 9h-2a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3Z" fill="#fff"></path></svg>
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
