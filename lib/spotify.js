import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

const RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations?limit=6&seed_artists=4aW7Oc19mMo4LTbdomZKgo,0Nlzia3Zqp5ykzfWesDqQ2&seed_genres=rock,rap&seed_tracks=5tqZJUHEuqdN12RZVq2l9p";

export const getRecommendationsList = async () => {
  const { access_token } = await getAccessToken();
  return fetch(RECOMMENDATIONS_ENDPOINT, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${access_token}`
    }
  });
};

const NEW_RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases?limit=6";

export const getNewReleasesList = async () => {
  const { access_token } = await getAccessToken();
  return fetch(NEW_RELEASES_ENDPOINT, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${access_token}`
    }
  });
}

const SONG_ID_ENDPOINT = "https://api.spotify.com/v1/tracks";

export const getSongById = async (id) => {
  const { access_token } = await getAccessToken();

  return fetch(SONG_ID_ENDPOINT + "/" + id, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${access_token}`
    }
  });
}

export const searchSong = async (query) => {
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getSongsByIds = async (query) => {
  const { access_token } = await getAccessToken();
  return fetch(SONG_ID_ENDPOINT + "?ids=" + query, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${access_token}`
    }
  });
}
