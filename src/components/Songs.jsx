import React, { useEffect, useState } from "react";
import { formatTimeStamp, getSearch } from "../store/EndPoints";

function Songs({ todays, query, type, limit }) {
 const MAX_LIMIT = 10;
 const safelimit = Math.min(limit, MAX_LIMIT);

 const [tracks, setTracks] = useState([]);
 const [offset, setOffset] = useState(0);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (!query) return;

  const getData = async () => {
   setLoading(true);

   const data = await getSearch(query, type, safelimit, limit);
   console.log(data);

   setTracks(data.tracks.items);
   setOffset(limit);
   setLoading(false);
  };
  getData();
 }, [query, type, limit]);

 const showMore = async () => {
  if (tracks.length >= MAX_LIMIT) return;

  setLoading(true);

  const remaining = MAX_LIMIT - tracks.length;
  const fetchLimit = Math.min(safelimit, remaining);

  const data = await getSearch(query, type, fetchLimit, offset);
  setTracks((prev) => [...prev, ...(data?.tracks?.items || [])]);

  setOffset((prev) => prev + fetchLimit);
  setLoading(false);
 };
 return (
  <main className="mb-5">
   {tracks.length > 0 ? (
    ""
   ) : (
    <div className="text-center text-neutral-500 my-10">
     No tracks found for "{query}"
    </div>
   )}
   <div className="text-2xl font-bold px-5 my-3">
    <span className="text-sm text-neutral-500">Special picks for today</span>
    <h3>{todays} Special</h3>
   </div>
   <div>
    <ul className="w-full px-5">
     {tracks.map((track, i) => (
      <li key={track.id} className="h-16 p-2 hover:bg-neutral-700/45">
       <div className="flex gap-5 items-center h-full">
        <span>{i + 1}</span>
        <div className="w-full text-base">
         <h4 className="line-clamp-1 text-base">{track.name}</h4>
         <p className="text-neutral-500 text-sm">
          {track.artists.map((artist) => artist.name).join(", ")}
         </p>
        </div>
        <span className="ml-auto text-neutral-500 line-clamp-1">
         {formatTimeStamp(track.duration_ms)}
        </span>
       </div>
      </li>
     ))}
    </ul>
    {tracks.length < MAX_LIMIT && (
     <p
      className="text-center underline capitalize cursor-pointer"
      onClick={showMore}
     >
      {loading ? "Loading..." : "Show more"}
     </p>
    )}
   </div>
  </main>
 );
}

export default Songs;
