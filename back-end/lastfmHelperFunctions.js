const axios = require('axios');

const md5 = require('md5');

// get api method signature
const getSignature = (token) =>{
    const string = Buffer.from(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}${process.env.LASTFM_API_SECRET}`, 'utf-8').toString();
    const signature = md5(string)
    return signature;
}

// get authenticated web service session from last fm
const getSession = async (tok,sig) => {
    try {
      const result = await axios.get('http://ws.audioscrobbler.com/2.0/?method=auth.getSession', {
        params: {
            api_key: process.env.LASTFM_API_KEY,
            api_sig: sig,
            token: tok,
            format: 'json'
          },
      });
      if (result.status !== 200) {
        return 'error';
      }
      const { data } = result;
      return data;
    } catch (err) {
    //   console.error(err);
      return 'error';
    }
};

module.exports = {getSession,getSignature}