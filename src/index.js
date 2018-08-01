const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const port = Number(process.env.PORT || 3000);

//Attach the middleware
app.use( bodyParser.json() );

const ExampleNetwork = require('./ExampleNetwork');
app.post('/api/sell', function(req, res) {
  var data = req.body.data;
  var exampleNetwork = new ExampleNetwork('admin');

  exampleNetwork.init()
    .then(function(data) {
      return exampleNetwork.sell(data)
    }).then(function (data) {
      res.status(200).json(data)
    }).catch(function(err) {
      res.status(500).json({error: err.toString()})
    })
})

app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});