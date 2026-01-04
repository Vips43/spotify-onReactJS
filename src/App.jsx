import Shows from "./components/shows/Shows";
import Navbar from "./components/root/Navbar";
import Main from "./components/main compo/Main";
import { Route, Routes } from "react-router-dom";
import LeftAside from "./components/root/LeftAside";
import ArtistAlbum from "./components/album compo/ArtistAlbum";
import AlbumTrack from "./components/album compo/AlbumTrack";
import Search from "./components/Search";

function App() {
 return (
  <>
  <main className="w-full h-screen bg-black select-none">
   <Navbar />
   <div className="flex h-[calc(100vh-64px)] w-[calc(100vw-6rem)]">
    <LeftAside />
    <div className="flex-1 bg-black relative max-w-full mr-5 md:mr-28 lg:mr-64">
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search/:query" element={<Search />} />
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