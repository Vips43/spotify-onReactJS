import { FaPlus } from "react-icons/fa6";
import { RiMusic2Line } from "react-icons/ri";



function LeftAside() {
  return (
    <>
    <aside className='bg-black w-24 h-[calc(100vh-64px)]'>
        <div className='p-2'>
            <div className='p-4 pb-2 flex flex-col items-center gap-3'>
                <div className='play-mask'></div>
                <div className="navIcon w-9! h-9! text-lg! hover:bg-neutral-600/50 bg-neutral-600/45 text-zinc-500"><FaPlus /></div>
                <div className="navIcon text-white rounded-sm! bg-neutral-500/35 mt-2"><RiMusic2Line /></div>
            </div>
        </div>
    </aside>
    </>
  )
}

export default LeftAside