import { IoSearchOutline } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { FaSpotify, FaBell, FaRegUser } from "react-icons/fa";
import { PiBrowsersFill, PiUsersThreeFill } from "react-icons/pi";
import { useMyStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const input = useMyStore((state) => state.input);
  const setInput = useMyStore((state) => state.setInput);
  const inputChange = useMyStore((state) => state.inputChange);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!input.trim()) return;

    inputChange(input);           // 🔥 API HIT HERE
    navigate(`/search/${input}`); // optional routing
  };

  return (
    <nav className="bg-black px-3 py-2">
      <div className="flex items-center gap-3">

        <div className="mx-3 text-4xl text-white">
          <FaSpotify />
        </div>

        <div className="navIcon bg-zinc-500/30 text-white">
          <GoHomeFill />
        </div>

        {/* Search */}
        <div className="flex-1 flex items-center bg-zinc-500/30 rounded-full px-2">
          
          {/* 🔍 Search button */}
          <div
            className="navIcon text-zinc-500 cursor-pointer"
            onClick={handleSearchClick}
          >
            <IoSearchOutline />
          </div>

          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to play?"
            className="bg-transparent text-white w-full px-2 outline-none"
          />

          <span className="mx-2 text-zinc-500">|</span>
          <PiBrowsersFill className="text-zinc-500" />
        </div>

        <PiUsersThreeFill className="navIcon text-zinc-500" />
        <FaBell className="navIcon text-zinc-500" />
        <FaRegUser className="navIcon text-zinc-500" />
      </div>
    </nav>
  );
}

export default Navbar;
