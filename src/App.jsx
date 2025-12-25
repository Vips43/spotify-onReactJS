import { useEffect } from "react";
import LeftAside from "./components/root/LeftAside";
import Main from "./components/main compo/Main";
import Navbar from "./components/root/Navbar";
import RightAside from "./components/root/RightAside";
import { Route, Routes } from "react-router-dom";
import AlbumTrack from "./components/album compo/AlbumTrack";
import ArtistAlbum from "./components/album compo/ArtistAlbum";
import ShowsDetails from "./components/shows/ShowsDetails";

function App() {
 return (
  <>
  <main className="w-screen h-screen">
   <Navbar />
   <div className="flex h-[calc(100vh-64px)]">
    <LeftAside />
    <div className="flex-1 max-w-4xl bg-black">
      <Routes>
      <Route path="/" element={<ShowsDetails />} />
      <Route path="/album/:id" element={<ArtistAlbum />} />
      <Route path="/shows/:id" element={<ShowsDetails />} />
      <Route path="/albumTrack/:id" element={<AlbumTrack />} />
     </Routes>
    </div>
    <div className="ml-auto hidden sm:block">
     <RightAside />
    </div>
   </div>
  </main>
  </>
 );
}

export default App;
