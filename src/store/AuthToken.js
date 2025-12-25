const client_ID = `ae099a85abfd490f942ad96cecc1e3fe`;
const client_Secret = `08929370795044bb9726eccb1421c08c`;

const tokens = JSON.parse(localStorage.getItem("tokens")) || []
export async function getToken() {
    const now = new Date()
    if (tokens.length > 0) {
        console.log('token fetched from arra');
        return tokens;
    } else {

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${client_ID}:${client_Secret}`)}`,
                },
                body: "grant_type=client_credentials",
            });
            if (!response.ok) console.log(response.status);

            const data = await response.json();
            let token = data.access_token
            tokens.push(token)

            console.log('token fetched from api');
            localStorage.setItem('tokens', JSON.stringify(tokens))
            return data.access_token;
        } catch (err) {
            console.log('there is an error: ', err);
        }
    }
}