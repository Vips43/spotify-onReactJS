import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getShow } from "../../store/EndPoints";
import EpisodesLi from "./EpisodesLi";

function Shows() {
 const mainRef = useRef(null);
 const [isSticky, setIsSticky] = useState(false);
 const [shows, setShows] = useState(null);
 const [episodes, setEpisodes] = useState([]);
 const { id } = useParams(); // 👈 artist id from URL

 useEffect(() => {
  const getData = async () => {
   if (!id) return;
   const show = await getShow(id);
   setShows(show);
   const episode = show.episodes.items.filter((i) => i !== null);
   setEpisodes(episode);
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

 const handleScroll = () => {
  if (!mainRef.current) return;
  setIsSticky(mainRef.current.scrollTop > 150);
 };

 return (
  <main
   className="h-[calc(100vh-64px)] max-w-3xl overflow-auto scrollbar-hide bg-black text-white rounded-t-lg"
   ref={mainRef}
   onScroll={handleScroll}
  >
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
      <h4 className="flex items-center gap-1 text-sm ">
       {" "}
       {shows.type}/Poadcast
      </h4>
      <h2 className="text-4xl font-bold line-clamp-3">{shows.name}</h2>
      <p className="text-neutral-400 font-semibold">
       <span>{shows.publisher} </span>
       <span> •</span>
       <span> {shows.total_episodes} Episodes</span>
      </p>
     </div>
    </div>
   </div>
   <div className="text-2xl font-semibold py-3 sticky top-0 bg-black flex gap-5 items-center">
    <h4
     className={`transition-all duration-300 ease-out
        ${
         isSticky
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
        }
      `}
    >
     {shows.name}
    </h4>
   </div>

   {/* TRACKS */}
   <div className="my-5">
    <p className="flex items-center justify-center gap-10 text-lg font-semibold underline py-5 bg-black sticky top-0">
     <span>Description</span>
     <span>Transcript</span>
    </p>
    <div
     dangerouslySetInnerHTML={{
      __html: shows.html_description,
     }}
    ></div>
   </div>

   <EpisodesLi episodes={episodes} shows={shows} isSticky={isSticky} />

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
