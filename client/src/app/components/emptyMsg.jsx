const EmptyMsg = ({icon, msg}) => {
    return <>
            <div className="flex flex-col justify-center items-center md:mt-48">
                {icon ? icon : ''}
                <p className="text-xl font-bold ">{msg}</p>
            </div>
        </>
}

export default EmptyMsg