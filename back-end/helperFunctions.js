const axios = require("axios") 

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const getToken = async (client_id, client_secret, code, redirect_uri) => {
    const result = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        data: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
        }),
    });

    const data = result.data
    return data;
}

const getTokenWithRefresh = async (client_id, client_secret, refresh_token) => {
    const result = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        data: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
    });

    const data = result.data
    return data;
}

const useAccessToken = async (url, access_token) => {
    const result = await axios({
        url: url,
        headers: {
            'Authorization' : 'Bearer ' + access_token 
        }
    });

    const data = result.data
    if(result.status!==200){
      return "error";
    }
    return data;
}

module.exports = {generateRandomString, getToken, getTokenWithRefresh, useAccessToken}
