const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Spotify API Credentials
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback'; // Redirection après connexion

// Step 1: Redirect to Spotify Login
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-read-playback-state';
  const authURL = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  })}`;
  res.redirect(authURL);
});

// Step 2: Callback to get Access Token
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  const tokenResponse = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID, 
      client_secret: CLIENT_SECRET,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const { access_token, refresh_token } = tokenResponse.data;
  res.redirect(`/success?access_token=${access_token}`);
});

// Test route
app.get('/success', (req, res) => {
  const accessToken = req.query.access_token;
  res.send(`Access Token: ${accessToken}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
