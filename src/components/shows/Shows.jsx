import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { LuShuffle, LuCirclePlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
 formatTimeStamp,
 formatTimeStampText,
 getShow,
} from "../../store/EndPoints";
import { GoVideo } from "react-icons/go";

function Shows() {
 const [shows, setShows] = useState(null);
 const [episodes, setEpisodes] = useState([]);
 const [ch, setCh] = useState(true);
 const { id } = useParams(); // 👈 artist id from URL

 useEffect(() => {
  const getData = async () => {
    if(!id) return
   const show = await getShow(id);
   setShows(show);
   const episode = show.episodes.items.filter((i) => i !== null);
   setEpisodes(episode);
   console.log(shows);
  };
  getData();
 }, []);

 if (!shows) {
  return (
   <main className="h-[calc(100vh-64px)] w-full overflow-auto scrollbar-hide bg-black text-white">
    Loading show ....
   </main>
  );
 }

 return (
  <main className="h-[calc(100vh-64px)] w-full overflow-auto scrollbar-hide bg-black text-white rounded-t-lg">
   {/* HEADER */}
   <div
    className="h-70 flex items-end lg:bg-top!"
    style={{
     backgroundImage: `url(${
      shows.images?.[0]?.url || shows.images?.[1]?.url
     })`,
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
   >
    <div className="p-5 bg-black/50 w-full flex gap-3">
     <div className="h-20 w-20 shrink-0">
      <img
       src={shows.images?.[2]?.url || shows.images?.[1]?.url}
       alt=""
       className="h-full"
      />
     </div>
     <div>
      <h4 className="flex items-center gap-1 text-sm "> {shows.type}/Poadcast</h4>
      <h2 className="text-4xl font-bold line-clamp-3">{shows.name}</h2>
      <p className="text-neutral-400 font-semibold">
       <span>{shows.publisher} </span><span> •</span>
       <span> {shows.total_episodes} Episodes</span>
      </p>
     </div>
    </div>
   </div>

   {/* STICKY BAR */}
   <div className="sticky top-0 z-20 bg-black flex items-center gap-5 p-5">
    <button
     onClick={() => setCh(!ch)}
     className="bg-green-600 p-2 rounded-full text-3xl text-black"
    >
     {ch ? <IoIosPlay /> : <IoIosPause />}
    </button>
    <img src={shows.images?.[0]?.url} className="h-12 w-10 rounded-md" />
    <LuShuffle className="text-2xl" />
    <div className="px-3 py-1 border rounded-full text-sm">Follow</div>
    <BsThreeDots className="text-2xl" />
   </div>

   {/* TRACKS */}
   <div>
    <p className="flex items-center justify-center gap-10 text-lg font-semibold underline">
     <span>Description</span>
     <span>Transcript</span>
    </p>
    <div
     dangerouslySetInnerHTML={{
      __html: shows.html_description,
     }}
    ></div>
   </div>

   <ul className="space-y-2 max-w-xl">
    {!episodes
     ? "<p>No tracks to show</p>"
     : episodes.map((t, i) => (
        <li
         key={t.id}
         className="flex flex-col items-center gap-4 p-2 rounded-md hover:bg-neutral-700/50 border-b border-neutral-600"
        >
         <div className="flex items-center gap-2">
          <span>{i + 1}</span>
          <div className="flex gap-2">
           <div className="w-16 shrink-0">
            <img src={t.images[2].url} alt="" className="object-contain" />
           </div>
           <div className="mr-5 leading-5">
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
          <p className="text-white space-x-2 font-mono">
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
          <div data-audio={t.audio_preview_url} className="p-2 bg-white text-black rounded-full">
            <IoIosPlay/>
          </div>
         </div>
        </li>
       ))}
   </ul>
   <div className="my-10 text-base ml-10 text-gray-400">
    <p>{shows.release_date}</p>
    {shows?.copyrights?.map((copy, i) => (
     <p key={i} className="text-xs">
      {copy.text}
     </p>
    ))}
   </div>
  </main>
 );
}

export default Shows;
