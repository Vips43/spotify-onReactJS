import React, { useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";

function Button({ isPlaying, onClick, clr }) {
 return (
  <>
   <button
    className={`p-2 bg-${clr} text-black rounded-full`}
    onClick={onClick}
   >
    {isPlaying ? <IoIosPause /> : <IoIosPlay />}
   </button>
  </>
 );
}

export default Button;
