import React, { useState } from "react";

function Card({ img_url, title, type }) {
 const [data, setData] = useState("Sarzameen");

 return (
  <>
   <div className="w-44 h-full flex flex-col justify-between gap-2 p-2 rounded-lg hover:bg-neutral-800/35 transition-all duration-300">
    <div className={`hover:drop-shadow-md overflow-hidden 
        ${type==='artist'? 'rounded-full':'rounded-md '}`}>
     <img src={img_url} alt="" className="aspect-square object-cover" />
    </div>
    <h3 className="truncate text-sm text-neutral-400 font-semibold">{title}</h3>
   </div>
  </>
 );
}

export default Card;
