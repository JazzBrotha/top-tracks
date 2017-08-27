require('dotenv').config()
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const request = require('request')

module.exports = {
  getAccess: function () {
    request.post({
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')) },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    }, function (error, response, body) {
      if (error) return (`error: ${response.statusCode}`)
      console.log(body)
      return body.access_token
    })
  }
}
