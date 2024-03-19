/*
	Server that the CS 469 Recipe Website will run on
*/
require('dotenv').config()

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
const { getDbReference } = require('./lib/mongo')
const mongoose = require('mongoose')

// sets up openai key
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});





var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.static("public"))

app.get("/", async function (req, res, next) {
    console.log("  -- browser!")
    console.log("  -- browser.query!", req.query)

    // connect to db
    const db = getDbReference()
    var recipes = db.collection('recipes');

    if (req.query) {
        if (req.query.recipe_name && req.query.recipe_category) {
            var recipeCursor = recipes.find({ name: req.query.recipe_name, category: req.query.recipe_category })
        }
        else if (req.query.recipe_name) {
            // var recipeCursor = recipes.find({ name: new RegExp(/${req.query.recipe_name}/i) })
            // credit on how to do a partial field find()
            //      https://dev.to/sagnikbanerjeesb/partial-text-search-on-mongo-46j3
            var recipeCursor = recipes.find({ name: {$regex: req.query.recipe_name, $options: "i"} })
            console.log("  -- browser.query!", req.query)
        }
        else if (req.query.recipe_category) {
            var recipeCursor = recipes.find({ category: req.query.recipe_category })
        }
        else if (req.query.sort_by_rating) {
            var recipeCursor = recipes.aggregate([
                 { $sort : { rating : -1, category: -1 } }
            ])
        }
        else {
            var recipeCursor = recipes.find({});
        }
    }
    else {
        var recipeCursor = recipes.find({});
    }

    // grab all recipe entries
    recipeData = await recipeCursor.toArray()
    console.log(recipeData)

    res.status(200).render('recipe_browser_template', {
        recipes: recipeData
    })
})

app.post('/addRecipe', async function (req, res, next) {
    // var recipe_id = req.params.id;

    // console.log("  -- adding comment for recipe:" + recipe_id)
    console.log(req.body.comment)

    // connect to db
    // var recipe_Object = new mongoose.Types.ObjectId(recipe_id);

    const db = getDbReference()
    var recipes = db.collection('recipes');

    if (req.body.notes) {
        var recipeCursor = recipes.insertOne(
            {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                total_time: req.body.total_time,
                notes: [req.body.notes],
                rating: 0
            }
          // { $push: { comments: req.body.comment } }
        );
    }
    else {
        var recipeCursor = recipes.insertOne(
            {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                total_time: req.body.total_time,
                rating: 0
            }
          // { $push: { comments: req.body.comment } }
        );
    }    
    res.status(200).send("Recipe added!")
})

app.get("/recipe_browser", async function (req, res, next) {
    console.log("  -- deprecated browser!")

    res.status(200).sendFile(__dirname + "/public/recipe_browser.html")
})

app.get('/recipe/:id', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- recipe:" + recipe_id)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);
    console.log("  -- recipe_Object:" + recipe_Object)

    const db = getDbReference()
    var recipes = db.collection('recipes');
    var recipeCursor = recipes.find({
      "_id": recipe_Object
    });

    // grab all recipe entries
    recipeData = await recipeCursor.toArray()
    console.log(recipeData[0])

    // res.status(200).render('recipe_page_template')

    res.status(200).render('recipe_page_template', recipeData[0])
})

app.get('/recipe/:id/getInfo', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- getting recipe info:" + recipe_id)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);
    console.log("  -- recipe_Object:" + recipe_Object)

    const db = getDbReference()
    var recipes = db.collection('recipes');
    var recipeCursor = recipes.find({
      "_id": recipe_Object
    });

    // grab all recipe entries
    recipeData = await recipeCursor.toArray()
    console.log(recipeData[0])

    // res.status(200).render('recipe_page_template')
    res.json({recipeInfo: recipeData[0]})
    // res.status(200).send("Recipe Sent!")
    // res.status(200).render('recipe_page_template', recipeData[0])
})

app.patch('/recipe/:id/addComment', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- adding comment for recipe:" + recipe_id)
    console.log(req.body.comment)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);

    const db = getDbReference()
    var recipes = db.collection('recipes');

    var recipeCursor = recipes.updateOne(
      {"_id": recipe_Object},
      { $push: { comments: req.body.comment } }
    );

    res.status(200).send("Comment added!")
})

app.patch('/recipe/:id/addRating', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- updating rating for recipe:" + recipe_id)
    console.log(req.body.rating)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);

    const db = getDbReference()
    var recipes = db.collection('recipes');

    var recipeCursor = recipes.updateOne(
      {"_id": recipe_Object},
      { $set: { rating: req.body.rating } }
    );

    res.status(200).send("Rating updated!")
})

app.patch('/recipe/:id/edit', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- updating ____ for recipe:" + recipe_id)
    // console.log(req.body.rating)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);

    const db = getDbReference()
    var recipes = db.collection('recipes');

    // var recipeCursor = recipes.updateOne(
    //   {"_id": recipe_Object},
    //   { $set: { rating: req.body.rating } }
    // );

    if (req.body.notes) {
        var recipeCursor = recipes.updateOne(
            {"_id": recipe_Object},
            { $set: {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                total_time: req.body.total_time,
                notes: [req.body.notes]
                }
            }
          // { $push: { comments: req.body.comment } }
        );
    }
    else {
        var recipeCursor = recipes.updateOne(
            {"_id": recipe_Object},
            { $set: {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                total_time: req.body.total_time,
                notes: null
                }
            }
          // { $push: { comments: req.body.comment } }
        );
    }    

    res.status(200).send("Recipe edited successfully")
})

app.delete('/recipe/:id/delete', async function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- deleting recipe recipe:" + recipe_id)

    // connect to db
    var recipe_Object = new mongoose.Types.ObjectId(recipe_id);

    const db = getDbReference()
    var recipes = db.collection('recipes');

    try {
       var recipeCursor = await recipes.deleteOne(
          {"_id": recipe_Object}
        );
    } catch (e) {
       console.log(e);
    }

    res.status(200).send("Recipe deleted successfully")
})

app.get('/old_recipe/:id', function (req, res, next) {
    var recipe_id = req.params.id;

    console.log("  -- deprecated recipe page!")
    res.status(200).sendFile(__dirname + "/public/recipe_page.html")
})

app.post('/get-chat-reply', async function(req, res, next) {
    const user_query = req.body.query;
    try{
        const chatCompletion = await openai.chat.completions.create({ 
            model: "gpt-3.5-turbo", 
            messages: [
                    {role: "system", 
                        content: "You are a helpful chef for users and you should help answer the culinary-related questions that users have. Keep responses to 200 words or less."}, 
                    {role: "user", content: user_query}
                ], 
          }); 

          const output_text = chatCompletion.choices[0].message.content; 
          console.log(output_text);
          res.json({reply: output_text})
    } catch (error) {
        console.log(error.message); 
        res.json({reply: 'An error occurred while getting a reply from the API.'});
    }
})

app.get("*", function (req, res, next) {
    res.status(200).render('404_template')
})

connectToDb(async function () {
    app.listen(3000, function () {
      console.log("== Server is listening on port 3000")
    })
})
