import Card from "./oth/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNewRelease } from "../store/EndPoints";

function NewReleases() {
 const navigate = useNavigate();
 const [datas, setDatas] = useState(null);

 useEffect(() => {
  const getData = async () => {
   const data = await getNewRelease();
   setDatas(data);
  };
  getData();
 }, []);

 if (!datas) {
  return <p className="text-center mt-10 text-white">Loading...</p>;
 }

 return (
  <>
   <div className="px-8">
    <p className="text-xs text-neutral-500">Made for</p>
    <h1 className="font-bold text-xl flex justify-between">
     Me <span className="text-base">Show all</span>
    </h1>
   </div>

   <div className="overflow-auto select-none">
    <Swiper slidesPerView="auto" spaceBetween={5}>
     {datas.albums.items.map((data) => (
      <SwiperSlide
       key={data.id}
       className="w-44! rounded-lg"
       onClick={() => navigate(`/albumTrack/${data.id}`)}
      >
       <Card
        img_url={data.images?.[0]?.url}
        title={data.name}
       />
      </SwiperSlide>
     ))}
    </Swiper>
   </div>
  </>
 );
}

export default NewReleases;
