import "swiper/css";
import CardSlider from "../CardSlider";
import NewReleases from "../NewReleases";
import { today } from "../../store/EndPoints";
import Songs from "../Songs";


function MainSlider() {
    const todays = today();

 return (
  <>
   <main className="my-5">
    <div className="grid gap-3">
        <NewReleases/>
        <CardSlider cardName={'Top motivated'} title={'animes'} type={'show'} limit={20}/>
        <CardSlider cardName={`${todays} special`} title={`${todays} special`} type={'show'} limit={20}/>
        <CardSlider cardName={'Rajsthani artist'} title={'best hariyanvi'} type={'artist'} limit={20}/>
        <Songs todays={todays} query={`${todays} special`} type={'track'} limit={3}/>

    </div>
   </main>
  </>
 );
}
// /src/assets/Aa-Gale-Lag-Jaa-Female-Version-Sarzameen-500-500.jpg
export default MainSlider;
