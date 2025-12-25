import { useState } from "react";

function MainNavBtn() {
 const [active, setActive] = useState();

 const btnHandle = (value) => {
    setActive(value)
 };

 const btnClass = (value) =>
     `px-3 py-1 rounded-full text-[.75rem] transition-all
     ${
      active === value
       ? "bg-white text-black"
       : "bg-gray-400/40 text-white hover:bg-white hover:text-black"
     }`;

 return (
  <>
   <div className="bg-[#2e0808] px-8 py-5 rounded-t-lg sticky top-0">
    <div className="flex items-center gap-2">
     <button className={btnClass("All")} onClick={() => btnHandle('All')}>
      All
     </button>
     <button className={btnClass("Music")} onClick={() => btnHandle('Music')}>
      Music
     </button>
     <button className={btnClass("Podcast")} onClick={() => btnHandle('Podcast')}>
      Podcast
     </button>
     <button className={btnClass("Shows")} onClick={() => btnHandle('Shows')}>
      Shows
     </button>
    </div>
   </div>
  </>
 );
}

export default MainNavBtn;
