// Include Server Dependencies
const express     = require('express'), 
      bodyParser  = require('body-parser'), 
      logger      = require('morgan'),
      mongoose    = require('mongoose'),
      axios       = require('axios'), 
      PORT        = process.env.PORT || 3000, 
      app         = express(),
      Article     = require('./models/Article'),
      Promise     = require('bluebird');

mongoose.Promise  = Promise;

// Run Morgan for http request logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration 
mongoose.connect("mongodb://herokumongodb://heroku_1vf1bl0l:najkff4083iqifa929bdotqi2u@ds129641.mlab.com:29641/heroku_1vf1bl0l");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get('/', function(req, res) {
  res.render('/index.html');
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered

// Show all saved articles
app.get('/api/saved', function(req, res) {
  let article = new Article(req.query);
  article.getArticles(req, res);
});

// Save an article
app.post('/api/saved', function(req, res) {
  let article = new Article(req.query);
  article.saveArticle(req, res);
});

// Delete a saved article
app.delete('/api/saved', function(req, res) {
  let article = new Article(req.query);
  article.deleteArticle(req, res);
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("server.js listening to your mom on PORT: " + PORT);
});
