import React, { useEffect, useState } from "react";
import { artistAlbum, getArtist } from "../../store/EndPoints";
import { MdVerified } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { LuShuffle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

function ArtistAlbum() {
 const [artistsAlbum, setArtistsAlbum] = useState([]);
 const [artist, setArtist] = useState([]);
 const navigate = useNavigate();
 const { id } = useParams();

 useEffect(() => {
  async function getData() {
   const album = await artistAlbum(id);
   const artistData = await getArtist(id);
   setArtistsAlbum(album);
   setArtist(artistData);
  }
  getData();
 }, []);
 return (
  <>
   <main className="h-[calc(100vh-4rem)] bg-black rounded-t-lg">
    <div className="h-full overflow-auto relative scrollbar-hide rounded-t-lg">
     <div style={{ background: `url(${artist.images?.[0]?.url})` }}>
      <div className="h-72 flex items-end font-black text-4xl">
      </div>
      <div className="sticky top-0 z-10 bg-black/20 w-full flex items-center gap-5 p-5 text-white">
       <div className="p-5 text-gray-200">
        <h4 className="text-sm font-normal flex items-center gap-1 ">
         <MdVerified className="fill-blue-500" /> Verified Artist
        </h4>
        <h4>{artist.name}</h4>
        <h4 className="text-lg font-normal">
         {artist.followers?.total} ,Followers
        </h4>
       </div>
      </div>
     </div>
     <div className="h-full">
      <h3 className="text-2xl font-bold ">Popular</h3>
      <ul className="flex flex-wrap justify-center items-center">
       {!artistsAlbum.items
        ? ""
        : artistsAlbum.items.map((a, i) => (
           <li
            key={i}
            data-id={a.id}
            className="shrink-0 w-48 rounded-md hover:bg-neutral-800/90"
            onClick={() => navigate(`/albumTrack/${a.id}`)}
           >
            <div className="m-2 space-y-1">
             <div>
              <img
               src={a.images?.[0]?.url}
               alt=""
               className="aspect-square rounded-md drop-shadow-lg"
              />
             </div>
             <div className="text-neutral-300">
              <h4 className="line-clamp-1">{a.name}</h4>
              <p className="space-x-0.5 text-sm text-neutral-500">
               <span>{a.release_date.slice(0, 4)}</span>
               <span>•</span>
               <span>{a.type}</span>
              </p>
             </div>
            </div>
           </li>
          ))}
      </ul>
     </div>
    </div>
   </main>
  </>
 );
}

export default ArtistAlbum;
