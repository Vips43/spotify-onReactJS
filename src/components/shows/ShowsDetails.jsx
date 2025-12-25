import React from "react";
import img from "../../assets/img.jpg";

function ShowsDetails() {
 return (
  <>
   <main className="border text-white rounded-t-lg overflow-hidden">
    <div
     style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
     }}
     className="h-96 flex items-end"
    >
     <div className="p-5 m-8">
        <h5>shows</h5>
        <h2 className="text-3xl font-bold">Sarzameen</h2>
        <h5>Followers</h5>
     </div>
    </div>
   </main>
  </>
 );
}

export default ShowsDetails;
