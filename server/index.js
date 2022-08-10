const express = require("express")
const cors = require("cors");
const db = require("./db.js");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

app.get('/searches', (req, res) => {
  db.Search.find().sort({'_id' : -1}).limit(5).then((data) => {
    res.end(JSON.stringify(data));
  })
})

app.post('/searches', (req, res) => {
  var newDbSearch = new db.Search({search: req.body.search});
  newDbSearch.save();
  console.log(req.body.search, 'saved')
  res.status(201);
  res.end();
})

app.listen(port);
console.log(`Listening on port ${port}`);