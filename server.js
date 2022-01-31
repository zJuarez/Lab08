// Dependencies
// =============================================================
var express = require('express');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Tables (DATA)
// =============================================================
let tables = [], waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/reserve', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/reserve.html'));
});

app.get('/tables', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/tables.html'));
});

// Displays all tables
app.get('/api/tables', function(req, res) {
  return res.json(tables);
});

// Displays a single table, or returns false
app.get('/api/tables/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)

  for (var i = 0; i < tables.length; i++) {
    if (id == tables[i].id) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

app.get('/api/waitlist', function(req, res) {
  return res.json(waitlist);
});

app.get('/api/waitlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)

  for (var i = 0; i < waitlist.length; i++) {
    if (id == waitlist[i].id) {
      return res.json(waitlist[i]);
    }
  }

  return res.json(false);
});

// Create New Reserve - takes in JSON input
app.post('/api/table', function(req, res) {
  const newTable = req.body;

  console.log(newTable);

  if (tables.length < 5) {
    tables.push(newTable);
    res.json(true);
  } else {
    waitlist.push(newTable);
    res.json(false);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});