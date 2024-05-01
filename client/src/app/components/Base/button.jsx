

export default function Button({type, name, icon, className, onClick, disabled}){
    return <button className={`flex items-center py-2 px-4 rounded text-white ${className}`} disabled={disabled} onClick={onClick}>{name} {icon}</button>
}

