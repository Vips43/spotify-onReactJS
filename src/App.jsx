import Shows from "./components/shows/Shows";
import Navbar from "./components/root/Navbar";
import Main from "./components/main compo/Main";
import { Route, Routes } from "react-router-dom";
import LeftAside from "./components/root/LeftAside";
import RightAside from "./components/root/RightAside";
import ArtistAlbum from "./components/album compo/ArtistAlbum";
import AlbumTrack from "./components/album compo/AlbumTrack";

function App() {
 return (
  <>
  <main className="w-screen h-screen bg-black">
   <Navbar />
   <div className="flex h-[calc(100vh-64px)]">
    <LeftAside />
    <div className="flex-1 bg-black relative mr-10 md:mr-28">
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/show/:id" element={<Shows />} />
      <Route path="/artist/:id" element={<ArtistAlbum />} />
      <Route path="/albumTrack/:id" element={<AlbumTrack />} />
     </Routes>
    </div>
   </div>
  </main>
  </>
 );
}

export default App;