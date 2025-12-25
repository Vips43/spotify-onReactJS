import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { LuShuffle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { getAlbum } from "../../store/EndPoints";
import { useParams } from "react-router-dom";

function ArtistInfoTrack() {
 const [ch, setCh] = useState(true);
 const { id } = useParams(); // 👈 artist id from URL

 const [album, setAlbum] = useState(null);

 useEffect(() => {
  if (!id) return;
  const load = async () => {
   const albumData = await getAlbum(id);
   setAlbum(albumData);
  };
    // load();
 }, [id]);

 if (!album) return null;

 return (
  <main className="h-[calc(100vh-64px)] w-full overflow-auto scrollbar-hide bg-black text-white">
   {/* HEADER */}
   <div
    className="h-70 flex items-end lg:bg-top!"
    style={{
     backgroundImage: `url(${album.images?.[0]?.url || ""})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
   >
    <div className="p-5 bg-black/50 w-full">
     <h4 className="flex items-center gap-1 text-lg">
      <MdVerified className="fill-blue-500" />
      Verified {album.type}
     </h4>
     <h2 className="text-4xl font-bold">{album.name}</h2>
     <p className="text-sm">{album.release_date.slice(0,4)}</p>
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
    <img src={album.images?.[0]?.url || ""} className="h-12 w-10 rounded-md" />
    <LuShuffle className="text-2xl" />
    <div className="px-3 py-1 border rounded-full text-sm">Follow</div>
    <BsThreeDots className="text-2xl" />
   </div>

   {/* TRACKS */}
   <h3 className="text-2xl font-bold px-8 mt-4">Popular tracks</h3>

   <ul className="px-8 space-y-2 max-w-lg">
    {/* {tracks.map((t, i) => (
     <li
      key={t.id}
      className="flex items-center gap-4 p-2 rounded-md hover:bg-neutral-700/50"
     >
      <span>{i + 1}</span>
      <img src={t.img} className="h-12 w-12 rounded-md" />
      <div className="truncate">
       <p className="font-medium truncate">{t.name}</p>
       <p className="text-sm text-gray-400">{t.artists}</p>
      </div>
      <span className="ml-auto text-sm text-gray-400">{t.duration}</span>
     </li>
    ))} */}
   </ul>
  </main>
 );
}

export default ArtistInfoTrack;
