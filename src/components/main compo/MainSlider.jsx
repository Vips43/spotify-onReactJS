import "swiper/css";
import CardSlider from "../CardSlider";
import NewReleases from "../NewReleases";


function MainSlider() {

 return (
  <>
   <main className="my-5">
    <div className="grid gap-3">
        <NewReleases/>
        <CardSlider cardName={'Top Shows'} title={'top'} type={'show'} limit={20}/>
        <CardSlider cardName={'friday special'} title={'friday special'} type={'show'} limit={20}/>
    </div>
   </main>
  </>
 );
}
// /src/assets/Aa-Gale-Lag-Jaa-Female-Version-Sarzameen-500-500.jpg
export default MainSlider;
