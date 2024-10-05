export default function Delete({ }) {
    return (
        <div className={`absolute top-0 right-0  w-full h-full flex justify-center items-center `}>
            <div className=" bg-white w-60 flex flex-col rounded-xl overflow-hidden ">
                <div className='cursor-default font-bold p-2 bg-gray-300 text-black'>Delete Task?</div>
                <div className='cursor-default text-gray-500 border border-gray-500 border-x-white p-2'>This can't be undone</div>
                <div className=" btns flex gap-4 justify-end p-2">
                    <button onClick={() => { setShowDeleteWindow(false) }} className='border p-1 border-black rounded-lg active:bg-slate-200 text-black'>Cancel</button>
                    <button onClick={() => { handlerDelete() }} className='border p-1 border-black rounded-lg bg-red-600 text-white active:bg-red-700'>Delete</button>
                </div>
            </div>
        </div>
    )
}