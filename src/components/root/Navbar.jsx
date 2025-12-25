import { IoSearchOutline } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { FaSpotify, FaBell, FaRegUser } from "react-icons/fa";
import { PiBrowsersFill, PiUsersThreeFill } from "react-icons/pi";
import { useMyStore } from "../../store/store";

function Navbar() {
 const input = useMyStore((state) => state.input);
 const setInput = useMyStore((state) => state.setInput);

 return (
  <nav className="bg-black px-3 py-2">
   <div className="flex items-center gap-3">
    {/* Logo */}
    <div className="mx-3 text-4xl text-white">
     <FaSpotify />
    </div>

    {/* Home */}
    <div className="navIcon bg-zinc-500/30 text-white">
     <GoHomeFill />
    </div>

    {/* Search */}
    <div className="flex-1 flex items-center bg-zinc-500/30 rounded-full px-2 transition-all duration-300 hover:bg-zinc-500/40">
     <div className="navIcon text-zinc-500" onClick={()=> console.log(input)}>
      <IoSearchOutline />
     </div>

     <input
      type="search"
      placeholder="What do you want to play?"
      className="bg-transparent text-white w-full px-2 outline-none placeholder-zinc-400"
      onChange={(e) => setInput(e.target.value)}
     />

     <span className="mx-2 text-zinc-500">|</span>

     <div className="navIcon text-zinc-500">
      <PiBrowsersFill />
     </div>
    </div>

    {/* Right icons */}
    <div className="navIcon text-zinc-500">
     <PiUsersThreeFill />
    </div>
    <div className="navIcon text-zinc-500">
     <FaBell />
    </div>
    <div className="navIcon text-zinc-500">
     <FaRegUser />
    </div>
   </div>
  </nav>
 );
}

export default Navbar;
