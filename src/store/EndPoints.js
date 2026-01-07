import { getToken } from "./AuthToken";

const saveData = (data) => {
  localStorage.setItem("spotify", JSON.stringify(spotify))
  console.log(`saved data '${data}' to localStorage`);
}
export function randomGradeints() {
  const colors = ['gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5'];
  const randomCol = colors[Math.floor(Math.random() * colors.length)];
  console.log(randomCol)
  return randomCol
}

export function formatTimeStamp(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const fHour = String(hours).padStart(2, "0");
  const fMin = String(minutes).padStart(2, "0");
  const fSec = String(seconds).padStart(2, "0");
  if (hours > 0) {
    return `${fHour}:${fMin}:${fSec}`;
  }

  return `${fMin}:${fSec}`;
}


const date = new Date(5667520);

export function formatTimeStampText(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 59) {
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    return `${hours}hr.${remMinutes}min.`;
  }

  return `${minutes}min.${seconds}sec`;
}

export function today(){
  const now = new Date();
  const day=[ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()];
  return day;
}
today()
let spotify = JSON.parse(localStorage.getItem("spotify")) || {
  searchArtist: [], artistAlbum: [], artist: [], shows: [], artistTrack: [], getArtistTrack: [], showsObj: [], albumData: [], newRelease: [], showEpisode: [], getShow: []
}

// localStorage.removeItem('shows')

/* ==============================
   SEARCH
================================ */

export async function getSearch(query = 'tranding indian', t = "track", limit = 20,offset=0) {
  try {
    const token = await getToken();
    const type = t
    const uri = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query)}&type=${type}&limit=${limit}&offset=${offset}`;
    const res = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status}`);
    }
    const data = await res.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error("getSearch error:", err);
    return null;
  }
}

/* ==============================
   SEARCHED ARTISTS
================================ */

export async function getSearchedArtist(query, type = "artist", limit = 20) {
  const data = await getSearch(query, type, limit);
  if (!data || !data.artists) return [];
  spotify.searchArtist = data.artists.items
    .filter((a) => a.images && a.images.length > 0)
    .map((a) => ({
      id: a.id,
      name: a.name,
      img: a.images[0].url,
      genres: a.genres,
      followers: a.followers.total,
    }));
  saveData('getSearchedArtist')
  return spotify.searchArtist;
}

/* ==============================
   ARTIST ALBUMS //1mYsTxnqsietFxj1OgoGbG
================================ */

export async function artistAlbum(artistId) {
  if (!artistId) return;
  // if (spotify.artistAlbum.length > 0) {
  //   console.log("artistAlbum loaded from localstorage");
  //   return spotify.artistAlbum;
  // }
  try {
    const token = await getToken();
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=20`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status}`);
    }
    const data = await res.json();
    spotify.artistAlbum = data
    saveData('artistAlbum')
    return data
  } catch (err) {
    console.error("artistAlbum error:", err);
    return [];
  }
}


/* ==============================
    GET ARTIST 
================================ */
export async function getArtist(id) {
  if (!id) return;
  // if (spotify.artist.length > 0) {
  //   console.log('loaded from localstorage getartist');
  //   return spotify.artist;
  // }
  try {
    const token = await getToken();
    const url = `https://api.spotify.com/v1/artists/${id}`
    const option = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await fetch(url, option);
    const data = await res.json();
    spotify.artist = data
    saveData('getArtist')
    return data
  } catch (err) {
    console.error("there is an error in getArtist:", err);
  }
}

/* ==============================
    GET album 
================================ */
export async function getAlbum(albumID) {
  // if (spotify.albumData.length > 0) return spotify.albumData;
  const token = await getToken();
  const url = `https://api.spotify.com/v1/albums/${albumID}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res}`);
  }
  const data = await res.json();
  spotify.albumData = data
  saveData("getAlbum")
  return data;
}

/* ==============================
   ARTIST TOP TRACKS
================================ */
export async function getNewRelease() {
  const token = await getToken();
  const url = `https://api.spotify.com/v1/browse/new-releases`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res}`);
  }
  const data = await res.json();
  spotify.newRelease = data;
  saveData('getNewRelease');
  return data;
}
/* ==============================
            SHOWS 
================================ */
export async function getShow(id) {
  const token = await getToken();
  const url = `https://api.spotify.com/v1/shows/${id}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res}`);
  }
  const data = await res.json();
  spotify.getShow = data;
  saveData('getShowEpi');
  console.log(data)
  return data;
}

