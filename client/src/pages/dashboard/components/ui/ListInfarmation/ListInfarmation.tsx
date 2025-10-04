import { NamedMarketDataLists } from "@/pages/dashboard/types";
import IconFlag from "../IconFlag/IconFlag";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

interface Props {
 listsData: NamedMarketDataLists;
 panelIndex: number;
}

const ListInfarmation = ({listsData, panelIndex}: Props) => {
    const [text, setText] = useState<boolean>(false);
    const allListWithCoin = Object.keys(listsData).filter(list => listsData[list].item.length > 0);

    const createdList = allListWithCoin.filter(list => 
        list !== 'Красный' && 
        list !== 'Синий' && 
        list !== 'Розовый' && 
        list !== 'Зеленый'
    );

    const markeredList = allListWithCoin.filter(list => 
        list === 'Красный' ||
        list === 'Синий' ||
        list === 'Розовый' || 
        list === 'Зеленый'
    );

    const createdListData = createdList.map(list => ({
        listName: list,
        count: listsData[list]?.item?.length || 0,
        text: JSON.stringify(listsData[list].item.map(symbol => symbol.symbol))
    }));

    const markeredListData = markeredList.map(list => ({
        listName: list,
        count: listsData[list]?.item?.length || 0,
        color: listsData[list].color,
        text: JSON.stringify(listsData[list].item.map(symbol => symbol.symbol))
    }));

    function copyText(text: string) {
      navigator.clipboard.writeText(text)
        .then(() => {
            setText(true)
            setTimeout(() => setText(false), 1500);
        })
        .catch(err => console.error("Ошибка:", err));
    }

    return (
        <div className="">
            <div className="p-5 border-b-1 border-gray-400">
                <h3 className="text-2xl">Списки котировок</h3>
            </div>
            <div className="">
                <div className="flex justify-between px-5 pt-1">
                    <div className="">
                        <h4>ОТМЕЧЕНЫЕ СПИСКИ</h4>
                    </div>
                    <div className="">
                        <h4>ИНСТРУМЕНТЫ</h4>
                    </div>
                </div>
                {markeredListData.map(row => {
                  return  <div className="flex justify-between px-5 py-2">
                                <div className="flex items-center">
                                    <IconFlag marker={row.color}/>
                                    {row.listName}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                    data-tooltip-id={`tooltip-list ${panelIndex}`}
                                    data-tooltip-content={text ? "Список скопирован" : "Копировать список"} 
                                    onClick={() => copyText(row.text)}
                                    className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M6.5 2C5.67157 2 5 2.67157 5 3.5V11.5C5 12.3284 5.67157 13 6.5 13H14.5C15.3284 13 16 12.3284 16 11.5V3.5C16 2.67157 15.3284 2 14.5 2H6.5ZM6 3.5C6 3.22386 6.22386 3 6.5 3H14.5C14.7761 3 15 3.22386 15 3.5V11.5C15 11.7761 14.7761 12 14.5 12H6.5C6.22386 12 6 11.7761 6 11.5V3.5ZM3 6.5C3 6.22386 3.22386 6 3.5 6H4V5H3.5C2.67157 5 2 5.67157 2 6.5V14.5C2 15.3284 2.67157 16 3.5 16H11.5C12.3284 16 13 15.3284 13 14.5V14H12V14.5C12 14.7761 11.7761 15 11.5 15H3.5C3.22386 15 3 14.7761 3 14.5V6.5Z"></path></svg>
                                    </span>
                                    <span>
                                        {row.count}
                                    </span>
                                </div>
                            </div>
                })}
                <div className="flex justify-between px-5 pt-1">
                    <div className="">
                        <h4>СОЗДАННЫЕ СПИСКИ</h4>
                    </div>
                    <div className="">
                        <h4>ИНСТРУМЕНТЫ</h4>
                    </div>
                </div>
                {createdListData.map(row => {
                    return  <div className="flex justify-between px-5 py-2">
                                <div className="">
                                    {row.listName}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span 
                                    data-tooltip-id={`tooltip-list ${panelIndex}`}
                                    data-tooltip-content={text ? "Список скопирован" : "Копировать список"} 
                                    onClick={() => copyText(row.text)}
                                    className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M6.5 2C5.67157 2 5 2.67157 5 3.5V11.5C5 12.3284 5.67157 13 6.5 13H14.5C15.3284 13 16 12.3284 16 11.5V3.5C16 2.67157 15.3284 2 14.5 2H6.5ZM6 3.5C6 3.22386 6.22386 3 6.5 3H14.5C14.7761 3 15 3.22386 15 3.5V11.5C15 11.7761 14.7761 12 14.5 12H6.5C6.22386 12 6 11.7761 6 11.5V3.5ZM3 6.5C3 6.22386 3.22386 6 3.5 6H4V5H3.5C2.67157 5 2 5.67157 2 6.5V14.5C2 15.3284 2.67157 16 3.5 16H11.5C12.3284 16 13 15.3284 13 14.5V14H12V14.5C12 14.7761 11.7761 15 11.5 15H3.5C3.22386 15 3 14.7761 3 14.5V6.5Z"></path></svg>
                                    </span>
                                    <span>
                                        {row.count}
                                    </span>
                                </div>
                            </div>
                    })}
            </div>
            <Tooltip
                id={`tooltip-list ${panelIndex}`}
                variant="light"
                place='bottom-end'
                className='z-1000'
                style={{ fontSize: '18px' }}
            />
        </div>
    )
}

export default ListInfarmation;
