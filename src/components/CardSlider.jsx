import Card from "./oth/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch } from "../store/EndPoints";

function CardSlider({ cardName, title, type, limit }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const resKey = `${type}s`; // show → shows, artist → artists

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const searched = await getSearch(title, type, limit);
        const items = searched?.[resKey]?.items || [];
        setData(items);
      } catch (error) {
        console.error("Error fetching:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [title, type, limit]);

  return (
    <>
      <div className="px-8">
        <p className="text-xs text-neutral-500">Most</p>
        <h1 className="font-bold text-xl flex justify-between">
          {cardName} <span className="text-base">Show all</span>
        </h1>
      </div>

      <div className="overflow-auto select-none">
        <Swiper slidesPerView="auto" spaceBetween={5}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((d) => (
              <SwiperSlide
                key={d.id}
                className="w-44! rounded-lg"
                onClick={() => navigate(`/${type}/${d.id}`)}
              >
                <Card
                  img_url={d.images?.[0]?.url}
                  title={d.name}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </>
  );
}

export default CardSlider;
