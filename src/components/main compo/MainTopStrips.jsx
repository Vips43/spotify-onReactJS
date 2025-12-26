import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../../store/EndPoints";

function MainTopStrips() {
 const navigate = useNavigate();
 const [artist, setArtist] = useState([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  const getData = async () => {
   try {
    const data = await getSearch("popular artist", "artist", 4);
    if (data?.artists?.items) setArtist(data.artists.items);
   } catch (err) {
    console.error("there is error:", err);
   } finally {
    setLoading(false);
   }
  };
  getData();
 }, []);

 return (
  <>
   <div className="mx-8">
    <ul className="grid grid-cols-2 xl:grid-cols-4 gap-2">
     { loading? <p className="text-center text-2xl">Loading...</p> : artist.map((s) => (
      <li
       key={s.id}
       className="bg-gray-500/35 max-w-3xs rounded-sm overflow-hidden z-50 "
      >
       <div
        className="flex h-14 items-center gap-2 rounded-sm"
        onClick={() => navigate(`/artist/${s.id}`)}
        // onClick={()=> console.log(s.id)}
       >
        <img src={s.images[0].url} alt="" className="h-14 w-14" />
        <h3 className="text-sm font-semibold truncate">{s.name}</h3>
       </div>
      </li>
     ))}
    </ul>
   </div>
  </>
 );
}

export default MainTopStrips;
