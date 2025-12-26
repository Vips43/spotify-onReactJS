import { useEffect } from "react";
import LeftAside from "./components/root/LeftAside";
import Main from "./components/main compo/Main";
import Navbar from "./components/root/Navbar";
import RightAside from "./components/root/RightAside";
import { Route, Routes } from "react-router-dom";
import ArtistAlbum from "./components/album compo/ArtistAlbum";
import AlbumTrack from "./components/album compo/AlbumTrack";
import Shows from "./components/shows/Shows";

function App() {
 return (
  <>
  <main className="w-screen h-screen">
   <Navbar />
   <div className="flex h-[calc(100vh-64px)]">
    <LeftAside />
    <div className="flex-1 max-w-4xl bg-black relative">
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/shows/:id" element={<Shows />} />
      <Route path="/artist/:id" element={<ArtistAlbum />} />
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
