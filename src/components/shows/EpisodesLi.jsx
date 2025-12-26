import Button from "./Button";
import { GoVideo } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { formatTimeStampText } from "../../store/EndPoints";

function EpisodesLi({ episodes, shows, isSticky }) {
 const [playingId, setPlayingId] = useState(null);
 const audioRef = useRef(new Audio());

 const handlePlay = (id, url) => {
  if (playingId === id) {
   audioRef.current.pause();
   setPlayingId(null);
   return;
  }
  audioRef.current.pause();
  audioRef.current.src = url;
  audioRef.current.play();

  setPlayingId(id);
 };
 

 return (
  <>
   <div className="text-2xl font-semibold py-3 sticky top-0 bg-black flex gap-5 items-center">
    <h4>Episodes</h4>
    <h4 className={`transition-all duration-300 ease-out
        ${ isSticky ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
        }
      `}
    >
     {shows.name}
    </h4>
   </div>
   <ul className="space-y-2 max-w-xl">
    {!episodes ? (
     <p>No tracks to show</p>
    ) : (
     episodes.map((t, i) => (
      <li
       key={t.id}
       className="flex flex-col gap-4 p-2 rounded-md hover:bg-neutral-700/50 border-b border-neutral-600"
      >
       <div className="flex items-center gap-2">
        <span>{i + 1}</span>
        <div className="flex gap-2">
         <div className="w-16 shrink-0">
          <img src={t.images[2].url} alt="" className="object-contain" />
         </div>
         <div className="leading-5 grid content-between">
          <p className="font-medium line-clamp-2">{t.name}</p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
           <GoVideo /> <span>Video</span>
           <span>•</span>
           <span>{shows.publisher}</span>
          </p>
         </div>
        </div>
       </div>
       <div className="text-neutral-400 text-sm">
        <p className="line-clamp-2">{t.description}</p>
        <p className="text-white space-x-2 font-mono mt-1">
         <span>
          {new Date(t.release_date).toLocaleString("en-us", {
           weekday: "long",
          })}
         </span>
         <span>•</span>
         <span>{formatTimeStampText(t.duration_ms)}</span>
        </p>
       </div>
       <div className="flex justify-between w-full text-2xl items-center">
        <LuCirclePlus className="hover:text-white text-neutral-400" />
        <Button
         isPlaying={playingId === t.id}
         onClick={() => handlePlay(t.id, t.audio_preview_url)}
         url={t}
         clr={"white"}
        />
       </div>
      </li>
     ))
    )}
   </ul>
  </>
 );
}

export default EpisodesLi;
