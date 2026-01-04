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
   <h4 className="text-2xl font-semibold m-3">Episodes</h4>

   <ul className="space-y-2 w-full">
    {!episodes ? (
     <p>No tracks to show</p>
    ) : (
     episodes.map((t, i) => (
      <li
       key={t.id}
       className="flex flex-col md:flex-row gap-4 p-2 rounded-md hover:bg-neutral-700/50 border-b border-neutral-600 " >
       {/* LEFT SIDE (image + title/meta on mobile, image only on md+) */}
       <div className="flex gap-3 shrink-0">
        {/* IMAGE */}
        <div className="w-16 h-16 md:w-30 md:h-30 shrink-0">
         <img
          src={t.images[1].url}
          alt=""
          className="w-full h-full object-cover shrink-0 rounded-md"
         />
        </div>

        {/* TITLE + META (mobile only inline) */}
        <div className="md:hidden leading-5">
         <p className="font-medium line-clamp-2">{t.name}</p>
         <p className="text-sm text-gray-400 flex items-center gap-2">
          <GoVideo />
          <span>Video</span>
          <span>•</span>
          <span>{shows.publisher}</span>
         </p>
        </div>
       </div>

       {/* RIGHT SIDE (all content for md+, description block on mobile) */}
       <div className="flex flex-col justify-between flex-1">
        {/* TITLE + META (md+ only) */}
        <div className="hidden md:block space-y-1">
         <p className="font-medium line-clamp-2">{t.name}</p>
         <p className="text-sm text-gray-400 flex items-center gap-2">
          <GoVideo />
          <span>Video</span>
          <span>•</span>
          <span>{shows.publisher}</span>
         </p>
        </div>

        {/* DESCRIPTION (block below on mobile & desktop) */}
        <div className="text-neutral-400 text-sm mt-2">
         <p className="line-clamp-2 md:line-clamp-3">{t.description}</p>

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

        {/* ACTIONS */}
        <div className="flex justify-between items-center text-2xl mt-3 ">
         <LuCirclePlus className="hover:text-white text-neutral-400 " />

         <Button 
          isPlaying={playingId === t.id}
          onClick={() => handlePlay(t.id, t.audio_preview_url)}
          url={t}
          clr="white"
         />
        </div>
       </div>
      </li>
     ))
    )}
   </ul>
  </>
 );
}

export default EpisodesLi;
