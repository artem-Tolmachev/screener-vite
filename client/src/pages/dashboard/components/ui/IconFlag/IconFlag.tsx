interface Props {
    marker?: string
}

const IconFlag = ({marker}:Props) => {
    let icon = marker ?? 'oklch(0.56 0.02 261.8)'
    return (
        <svg 
            className='icon-flag'
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 14 12" 
            width="14" 
            height="12" 
            focusable="false" 
            fill={icon}
            preserveAspectRatio="none">
            <path  fill={icon}  d="M14 12l-4-6 4-6H0v12z">
            </path>
        </svg>
    )
};

export default IconFlag;