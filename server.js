
const path = require('path')
const express = require('express')
const request = require('request')
// const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
// const redirect_uri = 'http://localhost:8888/callback'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(cookieParser())

app.get('/access-spotify', function (req, res) {
  request.post({
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')) },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }, function (error, response, body) {
    if (error) res.send(`error: ${response.statusCode}`)
    res.send(body.access_token)
  })
})

app.post('/get-albums', function (req, res) {
  const artist = req.body.artist
  const token = req.body.token
  request.get({
    url: `https://api.spotify.com/v1/search?q=artist:${artist}&type=album`,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  }, function (error, response, body) {
    if (error) res.send(`error: ${response.statusCode}`)
    res.json(body)
  })
})

app.post('/get-trackids', function (req, res) {
  const albumId = req.body.albumId
  const token = req.body.token
  request.get({
    url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  }, function (error, response, body) {
    if (error) res.send(`error: ${response.statusCode}`)
    res.json(body)
  })
})

app.post('/get-tracks', function (req, res) {
  const trackIds = req.body.tracksIds
  const token = req.body.token
  request.get({
    url: `https://api.spotify.com/v1/tracks/?ids=${trackIds}`,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  }, function (error, response, body) {
    if (error) res.send(`error: ${response.statusCode}`)
    res.json(body)
  })
})

console.log('Listening on 8888')
app.listen(8888)
