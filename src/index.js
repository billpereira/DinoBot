require('dotenv').config() 
var express = require('express')
var request = require('request')
var app = express()
app.use(express.json())
app.get('/auth', (req, res) =>{
  res.sendFile(__dirname + '/add_to_slack.html')
})
app.get('/auth/redirect', (req, res) =>{
  console.log(req.query)
  var options = {
      uri: 'https://slack.com/api/oauth.access?code='
          +req.query.code+
          '&client_id='+process.env.CLIENT_ID+
          '&client_secret='+process.env.CLIENT_SECRET+
          '&redirect_uri='+process.env.REDIRECT_URI,
      method: 'GET' 
  }
  request(options, (error, response, body) => {
    console.log(body)
      var JSONresponse = JSON.parse(body)
      if (!JSONresponse.ok){
          console.log(JSONresponse)
          res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      }else{
          console.log(JSONresponse)
          res.send("Success!")
      }
  })
})
app.listen(5000)