interface Props {
    isActive: boolean;
    onCLick: () => void;
}

const DashboardSettingsPanel = ({ onCLick, isActive}: Props) => {

    return (
        <div className="pl-1">
            <div className="bg-gray-950 h-full w-[50px] pt-1">
                <div className="text-gray-400 flex flex-col justify-center items-center ">
                    <button className={` rounded-xs cursor-pointer w-11 ${isActive ? "bg-gray-600": ""}`}  onClick={onCLick} aria-label="Котировки, информация и новости" aria-pressed="true" type="button" 
                    data-name="base" data-tooltip="Котировки, информация и новости"><span role="img" className="" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44"><path fill="currentColor" d="M28 16H16v1h12v-1ZM28 20H16v1h12v-1ZM16 24h12v1H16v-1Z"></path><path fill="currentColor" fillRule="evenodd" d="m22 30-10 4V12a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v22l-10-4Zm-9 2.52V12h18v20.52l-9-3.6-9 3.6Z"></path></svg></span></button>
                </div>
            </div>
        </div>
    )
}

export default DashboardSettingsPanel;

