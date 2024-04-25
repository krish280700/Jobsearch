import "../Sass/abstracts/_sidepanel.scss"
import Button from "./Base/button"

const Sidepanel = ({panelHeader, panelState, panelBody, panelButton, handlePanelState, panelAction}) => {
    return  panelState ? 
            <>
                <div className='w-4/12 fixed h-full top-0 right-0 z-50'>
                    <div className="relative w-full max-w-2xl h-full max-h-full">
                        {/* Modal content */}
                        <div className="relative h-full sidepanel shadow ">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b shadow rounded-t dark:border-gray-700">
                                <h3 className="text-xl font-semibold">
                                    {panelHeader}
                                </h3>
                                <button type="button" onClick={() => handlePanelState(!panelState)} className="text-gray-400 bg-transparent hover:bg-slate-200 hover:text-gray-600 rounded text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="sidepanelBody p-4">
                                <div className="bg-white shadow h-full p-4">
                                    {panelBody}
                                </div>
                            </div>
                            <div className='relative bottom-0'>
                                {/* Panel footer  */}
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    {panelButton && <Button className="btn-primary" name={panelButton} onClick={panelAction}/>}
                                    <Button className="btn-secondary ml-2" name="Cancel" onClick={() => handlePanelState(!panelState)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            : ''
}

export default Sidepanel