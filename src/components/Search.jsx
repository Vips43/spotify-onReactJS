import { RiArrowDownWideFill } from "react-icons/ri";
import { useMyStore } from "../store/store";
import { formatTimeStamp } from "../store/EndPoints";
import { useState } from "react";

function Search() {
 const [toggle, setToggle] = useState(false);
 const searched = useMyStore((state) => state.searched);
 const loading = useMyStore((state) => state.loading);

 if (loading) {
  return <p className="text-white p-4">Loading...</p>;
 }

 return (
  <main className="w-full h-full overflow-auto scrollbar-hide">
   {/* Albums */}
   <div className="w-full">
    <h3 className="my-4 text-2xl font-bold text-white">Albums</h3>
    <ul className="flex gap-1 overflow-x-auto w-full scrollbar-hide">
     {searched.map((item, i) => (
      <li
       key={i}
       className="shrink-0 p-2 rounded-lg hover:*:text-white hover:bg-neutral-700 w-44"
      >
       <img
        src={item.album?.images?.[1]?.url || item.album?.images?.[0]?.url}
        className="rounded-md mb-2"
        alt=""
       />
       <h3 className="text-white text-base truncate">{item.album?.name}</h3>
       <p className="text-sm text-neutral-600 truncate">
        {item.album?.artists?.[0]?.name}
       </p>
      </li>
     ))}
    </ul>
   </div>

   {/* Tracks */}
   <div className="text-white my-5">
    <h3 className="my-4 text-2xl font-bold text-white">Songs</h3>
    <ul
     className={`px-2 max-h-52 overflow-hidden ${
      toggle ? "max-h-full" : ""
     } transition-all duration-400`}
    >
     {searched.map((item, i) => (
      <li key={i} className="px-3 h-14">
       <div className="flex items-center gap-3">
        <span>{i + 1}</span>
        <div className="flex-1 truncate">
         <h3 className="font-semibold truncate">{item.name}</h3>
         <p className="text-neutral-600 text-sm truncate">
          {item.artists?.[0]?.name}
         </p>
        </div>
        <span className="ml-auto">{formatTimeStamp(item.duration_ms)}</span>
       </div>
      </li>
     ))}
    </ul>
    <p
     className="text-white flex items-center justify-center gap-2 select-none"
     onClick={() => setToggle(!toggle)}
    >
     Show {toggle ? "Less" : "More"}
     <RiArrowDownWideFill
      className={`text-xl ${toggle ? "rotate-180" : ""} transition-all`}
     />
    </p>
   </div>
  </main>
 );
}

export default Search;
