import Card from "./oth/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch } from "../store/EndPoints";

let spotify = JSON.parse(localStorage.getItem("spotify")) || { shows: [] };

function CardSlider({ cardName, title, type, limit }) {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 const resKey = type === "show" ? "shows" : `${type}`;

 useEffect(() => {
  //   if (spotify.shows !== '' || spotify.shows !== null) {
  //    console.log("shows loaded from local");
  //    setData(spotify.shows);
  //    return;
  //   }
  const getData = async () => {
   try {
    const searched = await getSearch(title, type, limit);
    const shows = searched[resKey].items; // store into single variable
    spotify.shows = shows; //push into local object
    localStorage.setItem("spotify", JSON.stringify(spotify)); //save local
    setData(shows);
    console.log("shows fetched", resKey, shows);
   } catch (error) {
    console.error("there is an error: ", error);
   } finally {
    setLoading(false);
   }
  };
  getData();
 }, []);

 console.log(data);
 return (
  <>
   <div className="px-8">
    <p className="text-xs text-neutral-500">Most </p>
    <h1 className="font-bold text-xl flex justify-between">
     {cardName} <span className="text-base">Show all</span>
    </h1>
   </div>
   {/* card container */}

   <div className="overflow-auto select-none">
    <Swiper slidesPerView="auto" spaceBetween={5} className="mySwiper">
     {loading ? (
      <p>Loading...</p>
     ) : (
      data.map((artist) => (
       <SwiperSlide
        key={artist.id}
        className="w-44! rounded-lg"
        data-id={artist.id}
        onClick={() =>
         resKey == "artist" || resKey == "album"
          ? navigate(`/album/${artist.id}`)
          : navigate(`/shows/${artist.id}`)
        }
       >
        <Card img_url={artist.images[0].url} title={artist.name} />
       </SwiperSlide>
      ))
     )}
    </Swiper>
   </div>
  </>
 );
}

export default CardSlider;
