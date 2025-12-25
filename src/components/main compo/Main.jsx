import MainNavBtn from "./MainNavBtn";
import MainTopStrips from "./MainTopStrips";
import MainSlider from "./MainSlider";

function Main() {

 return (
  <>
   <main className="w-full bg-black h-[calc(100vh-64px)] text-white overflow-auto scrollbar-hide rounded-t-lg">
    <div className="rounded-t-lg maroon-gradient-dark w-full h-full">
     <div className="">
      <div className="sticky top-0 bg-[#2e0808] z-10">
       <MainNavBtn />
      </div>
      <div className="z-0">
       {/* <MainTopStrips />
       <MainSlider /> */}
      </div>
     </div>
    </div>
   </main>
  </>
 );
}

export default Main;
