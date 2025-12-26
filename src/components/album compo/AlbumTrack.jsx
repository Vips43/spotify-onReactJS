import React, { useEffect, useMemo, useState } from "react";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { LuShuffle, LuClock } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { formatTimeStamp, getAlbum, randomGradeints } from "../../store/EndPoints";
import { useParams } from "react-router-dom";

function ShowsDetails() {
 const [data, setData] = useState(null);
 const [ch, setCh] = useState(true);
 const { id } = useParams();
 
 useEffect(() => {
  getAlbum(id).then(setData)
 }, [id]);
 const randomCol = useMemo(() => randomGradeints(), []);
 if (!data) return;
 const artistName =
  data.artists?.map((a) => a.name).join(", ") || "Unknown artist";


 return (
  <>
   <main className="text-white h-[calc(100vh-4rem)] ">
    <div className={`flex flex-col h-full`}>
     <div className={`${randomCol} rounded-t-lg`}>
      <div className="p-5 mt-20 flex gap-3">
       <div className="w-32 h-32">
        <img
         src={data.images?.[1]?.url || data.images?.[0]?.url}
         alt=""
         className="aspect-square rounded-lg"
        />
       </div>
       <div className="flex flex-col justify-between">
        <h5>{data.album_type}</h5>
        <h2 className="text-4xl font-bold">{data.name}</h2>
        <p className="text-sm text-neutral-400">{artistName}</p>
        <h5>{data.label}</h5>
        <p className="text-neutral-400">
         <span>{data.total_tracks} songs , </span>
         <span>Relased on: {data.release_date}</span>
        </p>
       </div>
      </div>
      <div className="sticky top-0 z-20 flex items-center gap-5 p-5 bg-black/5">
       <button
        onClick={() => setCh(!ch)}
        className="bg-green-600 p-2 rounded-full text-3xl text-black"
       >
        {ch ? <IoIosPlay /> : <IoIosPause />}
       </button>
       <img
        src={data.images?.[1]?.url || data.images?.[0]?.url}
        className="h-12 w-10 rounded-md"
       />
       <LuShuffle className="text-2xl" />
       <div className="px-3 py-1 border rounded-full text-sm">Follow</div>
       <BsThreeDots className="text-2xl" />
      </div>
     </div>

     <div className="border-b border-neutral-700">
      <div className=" mx-10 flex gap-8 items-center justify-between text-neutral-400 p-2">
       <span>#</span>
       <span className="mr-auto">Title</span>
       <LuClock />
      </div>
     </div>
     <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
      <ul className="mx-10 py-3">
       {data.tracks.items.map((t, i) => (
        <li key={t.id} className="hover:bg-neutral-700/40 px-2 rounded-md">
         <div className="flex gap-3 p-1 items-center">
          <span className="w-5">{i + 1}</span>
          <p className="flex flex-col">
           <span className="font-semibold">{t.name}</span>
           <span className="text-neutral-400 text-sm">
            {t.artists.map((a) => a.name).join(", ")}
           </span>
          </p>
          <span className="ml-auto">{formatTimeStamp(t.duration_ms)}</span>
         </div>
        </li>
       ))}
      </ul>
      <div className="my-10 text-base ml-10 bg-black text-gray-400">
       <p>{data.release_date}</p>
       {data?.copyrights?.map((copy, i) => (
        <p key={i} className="text-xs">
         {copy.text}
        </p>
       ))}
      </div>
     </div>
    </div>
   </main>
  </>
 );
}

export default ShowsDetails;
