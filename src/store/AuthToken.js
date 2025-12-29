let cachedToken = localStorage.getItem("spotify_token") || null;
let tokenExpiry = Number(localStorage.getItem("spotify_token_expiry")) || 0;

const clientId = `ae099a85abfd490f942ad96cecc1e3fe`;
const clientSecret = `08929370795044bb9726eccb1421c08c`;

export async function getToken() {
  const now = Date.now()

  if (cachedToken && now < tokenExpiry) return cachedToken;

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
        "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;
  console.log(data)
  localStorage.setItem("spotify_token", cachedToken);
  localStorage.setItem("spotify_token_expiry", tokenExpiry);

  return cachedToken;
}
