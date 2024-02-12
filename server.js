/*
	Server that the CS 469 Recipe Website will run on
*/
var http = require('http')
    fs = require('fs');

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var recipe_browser = '';
    recipe_page = '';
    err404 = '';
    styleCSS = '';
    recipe_browser_JS = '';
    recipe_page_JS = '';

const { connectToDb } = require('./lib/mongo')
const mongoose = require('mongoose')

var app = express();
var port = process.env.PORT || 3000;

// Caches all possible files in program when launched
// var htmlRead = fs.readFile('./public/recipe_browser.html', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     recipe_browser = data;
//     console.log("== recipe_browser.html request received")
// })

// var htmlRead = fs.readFile('./public/recipe_page.html', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     recipe_page = data;
//     console.log("== recipe_page.html request received")
// })

// var htmlRead = fs.readFile('./public/404.html', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     err404 = data;
//     console.log("== 404.html request received")
// })

// var htmlRead = fs.readFile('./public/style.css', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     styleCSS = data;
//     console.log("== style.css request received")
// })

// var htmlRead = fs.readFile('./public/recipe_browser.js', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     recipe_browser_JS = data;
//     console.log("== recipe_browser.js request received")
// })

// var htmlRead = fs.readFile('./public/recipe_page.js', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     recipe_page_JS = data;
//     console.log("== recipe_page.js request received")
// })

// var server = http.createServer(function (req, res) {
//   // Goes through all possible url types and writes the appropriate file
//   if (req.url === "/recipe_page.html") {
//     res.statusCode = 200;
    
//     res.setHeader('Content-Type', 'text/html');
//     res.write(recipe_page);
//     res.end();
//   }
//   else if (req.url === "/recipe_browser.html" || req.url === "/") {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.write(recipe_browser);
//     res.end();
//   }
//   else if (req.url === "/style.css") {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/css');
//     res.write(styleCSS);
//     res.end();
//   }
//   else if (req.url === "/recipe_browser.js") {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/javascript');
//     res.write(recipe_browser_JS);
//     res.end();
//   }
//   else if (req.url === "/recipe_page.js") {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/javascript');
//     res.write(recipe_page_JS);
//     res.end();
//   }
//   else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/html');
//     res.write(err404);
//     res.end();
//   }
// })


app.use(express.static("public"))

app.get("/", function (req, res, next) {
    console.log("  -- browser!")
    res.status(200).sendFile(__dirname + "/public/recipe_browser.html")
    // res.send("Hello world!");
})

app.get('/recipe/:id', function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- recipe:" + recipe_id)
    res.status(200).sendFile(__dirname + "/public/recipe_page.html")
    // res.send("Hello world!");
})

app.get("*", function (req, res, next) {
    // console.log("  -- 404!")
    res.status(404).sendFile(__dirname + "/public/404.html")
})


connectToDb(async function () {
    app.listen(3000, function () {
      console.log("== Server is listening on port 3000")
    })
})
