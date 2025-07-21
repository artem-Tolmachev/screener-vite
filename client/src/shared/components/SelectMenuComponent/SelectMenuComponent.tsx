// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { DialogComponent } from "../Dialog/DialogComponent"
// import { useAppSelector } from "@/app/store/store";
// import { useState } from "react";

// export function SelectMenuComponent() {
// const [listNameSelect, setListnameSelect] = useState('')
// const AllListsName = useAppSelector(store => store.coins.storeList);
// const [open, setOpen] = useState(false)
//   return (
//     <>
//     <DialogComponent setListnameSelect={setListnameSelect} open={open} setOpen={setOpen}/>
//     <Select value={listNameSelect} onValueChange={setListnameSelect}>
//       <SelectTrigger  className="w-[280px] cursor-pointer text-lg text-blue-200  hover:text-blue-200">
//         <SelectValue  placeholder="Select a timezone"/>
//       </SelectTrigger>
//       <SelectContent className="w-100 bg-gray-800 ">
//         <SelectGroup >
//           <SelectLabel >North America</SelectLabel> 
//           {Object.keys(AllListsName).map((list)=>(
//                       <SelectItem key={list} className="text-lg text-blue-200  hover:text-blue-200 cursor-pointer" value={list}>{list}</SelectItem>
//           ))}
//           <SelectItem 
//           onClick={(e) => {
//                 e.preventDefault()
//                 setOpen(true)
//             }}
//           className="text-lg text-blue-200  hover:text-blue-200 cursor-pointer" value={'list'}>➕ Создать новый список</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//     </>
//   )
// }
