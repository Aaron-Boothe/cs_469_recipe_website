// formula for F to C: (X - 32) * 5/9
// match = matched substring, p1 = 1st substring in match (which should be the temperature digits) 
function convertToCelsius(match, p1) {
    // converts the result to a string (possibly rounding)
    var celsius = ((parseInt(p1) - 32) * 5/9).toFixed(0);
    return celsius + " degrees Celsius";
}

// formula for C to F: (X * 9/5) + 32)
function convertToFahrenheit(match, p1) {
    var fahrenheit = ((parseInt(p1) * 9/5) + 32).toFixed(0);
    return fahrenheit + " degrees Fahrenheit";
}

// formula for ml to cups: X / 236.6
function convertToImperial(match, p1, p2) {
    // console.log("----match1: " + match)
    // console.log("   -p1: " + p1)
    var imperial_ized = (eval(p1) / 236.6).toFixed(3);
    return imperial_ized + " cups";
}

// formula for cups to ml: X * 236.6
//              tbsp to ml: X * 14.787
//              tsp to ml: X * 4.929
// p1 = digits
// p2 = measurement (cup(s)/tbsp/tsp)
function convertToMetric(match, p1, p2) {
    // console.log("----match: " + match)
    // console.log("   -p1: " + p1)
    // console.log("   -p2: " + p2)
    // check if cup, tbsp, or tsp
    // if cup

    if (p2.toLowerCase().includes("cup")) {
        console.log("   -cups: " + p2)
        var metric_ized = (eval(p1) * 236.6).toFixed(3);
    }
    else if (p2.toLowerCase().includes("tbsp") || p2.toLowerCase().includes("tablespoon")) {
        console.log("   -tbsp: " + p2)
        var metric_ized = (eval(p1) * 14.787).toFixed(3);
    }
    else if (p2.toLowerCase().includes("tsp") || p2.toLowerCase().includes("teaspoon")) {
        console.log("   -tsp: " + p2)
        var metric_ized = (eval(p1) * 4.929).toFixed(3);
    }

    
    return metric_ized + " ml";
}

// lets the user switch between Celsius and Farenheit
function tempToggleFunction() {
    // console.log("clicked")

    // // cycle through each container
    // var infoContainerArray = document.getElementsByClassName('recipe-info-container')

    var tempVal = document.getElementById('recipe-section-cooking').textContent
    // console.log(tempVal)

    // credit to ChatGPT for help in creating this regex expression
    // \b checks for word boundary before degrees/°, used to mark probable temeperature digits
    // (\d+) grabs entire temperature digit combination (1/140/etc) (useful for conversion later)
    // \s sees if theres whitespace between the temperature digit(s) and degrees/°
    // (?:degrees?|°|deg) matches with degree(s)/deg/°
    // (?:fahrenheit|f) matches with case-insensitive fahrenheit, Farenheit (sic), or f
    //  below works
    var regexFahrenheit = /\b(\d+)\s*(?:degrees?|°|deg)\s*(?:fahrenheit|Farenheit|f)\b/gi;
    var regexCelsius = /\b(\d+)\s*(?:degrees?|°|deg)\s*(?:Celsius|c)\b/gi;

    // executes if Fahrenheit used
    if (regexFahrenheit.test(tempVal)) {
        console.log("Temperature used is Fahrenheit");

        var tempValConverted = tempVal.replaceAll(regexFahrenheit, convertToCelsius);

        document.getElementById('recipe-section-cooking').textContent = tempValConverted
    // executes if Celsius used
    } else {
        console.log("Temperature used is Celsius");

        var tempValConverted = tempVal.replaceAll(regexCelsius, convertToFahrenheit);
        document.getElementById('recipe-section-cooking').textContent = tempValConverted
    }

    event.stopPropagation();
}



// lets the user switch between Metric and Imperial
function measurementToggleFunction() {
    console.log("clicked")

    // // cycle through each container
    // var infoContainerArray = document.getElementsByClassName('recipe-info-container')

    var tempVal = document.getElementById('recipe-info-ingredients').textContent
    // console.log(tempVal)

    // credit to ChatGPT for help in creating this regex expression
    // \b checks for word boundary before degrees/°, used to mark probable temeperature digits
    // (\d+) grabs entire temperature digit combination (1/140/etc) (useful for conversion later)
    // \s sees if theres whitespace between the temperature digit(s) and degrees/°
    // (?:degrees?|°|deg) matches with degree(s)/deg/°
    // (?:fahrenheit|f) matches with case-insensitive fahrenheit, Farenheit (sic), or f
    //  below works
    // var regexImperial = /\b(\d+)\s*(?:cups?|tbsp|tsp)\b/gi;
    // credit for chatgpt for help making this regex string
    var regexImperial = /\b(\d+(?:|\.\d+|\s*\d*\/\d+))\s*((?:cups?|tbsp|Tablespoons?|teaspoons?|tsp))\b/gi;
    var regexMetric = /\b(\d+(?:|\.\d+|\s*\d*\/\d+))\s*((?:ml|milliliters?|liters))\b/gi;
    // var regexMetric = /\b(\d+)\s*(?:ml)\b/gi;



    // executes if Imperial used
    if (regexImperial.test(tempVal)) {
        console.log("Measurement used is Imperial");

        var tempValConverted = tempVal.replaceAll(regexImperial, convertToMetric);

        document.getElementById('recipe-info-ingredients').textContent = tempValConverted
    // executes if Metric used
    } else {
        console.log("Measurement used is Metric");

        var tempValConverted = tempVal.replaceAll(regexMetric, convertToImperial);
        document.getElementById('recipe-info-ingredients').textContent = tempValConverted
    }

    event.stopPropagation();
}


// Temperature toggle
var tempButton = document.getElementById('temperature_button');
tempButton.addEventListener('click', tempToggleFunction);



// Measurement toggle
var measurementButton = document.getElementById('measurement_button');
measurementButton.addEventListener('click', measurementToggleFunction);


// grabs recipe ID from URL
function getRecipeIdFromURL() {
  var path = window.location.pathname
  var pathParts = path.split('/')
  if (pathParts[1] === "recipe") {
    return pathParts[2]
  } else {
    return null
  }
}

// lets the user add comments
function commentFieldFunction(key_pressed) {
    if (key_pressed.key === 'Enter') {
        var new_Comment = document.getElementById('insert_recipe_comments').value.trim()

        // checks if a new comment has actually been entered into the text field
        if (!new_Comment) {
            alert("You must fill in the comment input field!")
        }
        else {
            console.log(" -comment added: " + new_Comment)
            var reqUrl = "/recipe/" + getRecipeIdFromURL() + "/addComment"
            fetch(reqUrl, {
              method: "PATCH",
              body: JSON.stringify({
                comment: new_Comment
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              if (res.status === 200) {
                document.getElementById('insert_recipe_comments').value = ""
                location.reload();
              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
        }        
    }
}

// Comment field
var addCommentsField = document.getElementById('insert_recipe_comments');
addCommentsField.addEventListener('keydown', commentFieldFunction);

// Opens OpenAI textfield
function showOpenAI() {
    console.log("-beep boop!")
    var openOpenAIBox = document.getElementById('insert_recipe_comments');
    // openOpenAIBox.value = "beep!"
    // noSleep.enable();
    var modal = document.getElementById('openai-modal')
    var modalBackdrop = document.getElementById('openai-modal-backdrop')

    modal.classList.remove('hidden')
    modalBackdrop.classList.remove('hidden')
}

// OpenAI button
var openOpenAIBox = document.getElementById('openai-open');
openOpenAIBox.addEventListener('click', showOpenAI);

// lets user cancel and close the openai chat modal
function openAICancelRecipeModal() {
    var modal = document.getElementById('openai-modal')
    var modalBackdrop = document.getElementById('openai-modal-backdrop')

    modal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}

var hideRecipeButton = document.getElementById('openai-modal-close');
hideRecipeButton.addEventListener('click', openAICancelRecipeModal);


// lets the user talk to chatgpt
async function talkToOpenAI(key_pressed) {
    if (key_pressed.key === 'Enter') {
        var new_query = document.getElementById('openai-input').value.trim()

        // checks if a new comment has actually been entered into the text field
        if (!new_query) {
            alert("You must fill in the OpenAI chat input field!")
        }
        else {
            console.log(" -user query: " + new_query)
            var reqUrl = "/get-chat-reply"
            fetch(reqUrl, {
              method: "POST",
              body: JSON.stringify({
                query: new_query
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(async function (res) {
              if (res.status === 200) {
                const data = await res.json();
                console.log(data.reply);

                var chatBox = document.getElementById('modal-dialog-box')

                const aiResponseP = document.createElement('p');
                aiResponseP.textContent = data.reply;

                chatBox.appendChild(aiResponseP);

                chatBox.scrollTop = chatBox.scrollHeight;

              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
        }        
    }
}

var openAIInputField = document.getElementById('openai-input');
openAIInputField.addEventListener('keydown', talkToOpenAI);


// The wake lock sentinel.
let wakeLock = null;

// code from
//      https://developer.mozilla.org/en-US/docs/Web/API/WakeLock/request
// Function that attempts to request a screen wake lock.
async function configureWakelock() {
    try {
    wakeLock = await navigator.wakeLock.request();
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock released:', wakeLock.released);
    });
    console.log('Screen Wake Lock released:', wakeLock.released);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// Wakelock button
var enableWakelock = document.getElementById('wakelock-enable');
enableWakelock.addEventListener('click', configureWakelock);


async function updateRecipeRating(key_pressed) {
    if (key_pressed.key === 'Enter') {
        var new_rating = document.getElementById('input_recipe_rating').value.trim()
        new_rating = parseInt(new_rating)

        // var new_rating = document.getElementById('openai-input').value.trim()

        // checks if a rating has actually been entered into the text field
        if (!new_rating) {
            alert("You must fill in the rating input field!")
        }
        else {
            console.log(" -rating updated: " + new_rating)
            var reqUrl = "/recipe/" + getRecipeIdFromURL() + "/addRating"
            fetch(reqUrl, {
              method: "PATCH",
              body: JSON.stringify({
                rating: new_rating
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              if (res.status === 200) {
                document.getElementById('input_recipe_rating').value = ""
                location.reload();
              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
        }     
    }
}

// rating button
var enableWakelock = document.getElementById('input_recipe_rating');
enableWakelock.addEventListener('keydown', updateRecipeRating);

async function editRecipe() {
    // console.log("-url: " + window.location.href)
    // [0] = http:
    // [1] = (empty)
    // [2] = localhost:3000
    // [3] = recipe
    // [4] = recipe id
    // urlArray = window.location.href.split("/")
    // console.log("-editing recipe: " + urlArray[4])

    // gather previous recipe data
    var reqUrl = "/recipe/" + getRecipeIdFromURL() + "/getInfo"
    fetch(reqUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    // })
    // // refreshes page
    // location.reload();
    }).then(async function (res) {
      if (res.status === 200) {
        const data = await res.json();
        console.log("data:")
        console.log(data)
        console.log(data.recipeInfo._id)

        // show new recipe modal
        var modal = document.getElementById('add-recipe-modal')
        var modalBackdrop = document.getElementById('modal-backdrop')

        modal.classList.remove('hidden')
        modalBackdrop.classList.remove('hidden')

        // inplant recipe info into modal
        document.getElementById('recipe-name-input').value = data.recipeInfo.name
        document.getElementById('recipe-category-input').value = data.recipeInfo.category
        document.getElementById('recipe-ingredients-input').value = data.recipeInfo.ingredients
        document.getElementById('recipe-steps-input').value = data.recipeInfo.steps
        document.getElementById('recipe-total-time-input').value = data.recipeInfo.total_time
        // since notes are optional
        if (data.recipeInfo.notes) {
            document.getElementById('recipe-notes-input').value = data.recipeInfo.notes
        }
        

      } else {
        alert("An error occurred communicating with the server: " + res.status)
      }
    }).catch(function (err) {
      alert("An error occurred communicating with the server: " + err)
    })

    


} 

// edit recipe button
var editRecipeButton = document.getElementById('edit-recipe-button');
editRecipeButton.addEventListener('click', editRecipe);


// lets user cancel and close the new recipe modal
function cancelRecipeModal() {
    var modal = document.getElementById('add-recipe-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    modal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}

// // lets the user add comments
// function addRecipe(key_pressed) {
//     if (key_pressed.key === 'Enter') {
//         var new_Comment = document.getElementById('insert_recipe_comments').value.trim()

//         // checks if a new comment has actually been entered into the text field
//         if (!new_Comment) {
//             alert("You must fill in the input field!")
//         }
//         else {
//             console.log(" -comment added: " + new_Comment)
//             var reqUrl = "/recipe/" + getRecipeIdFromURL() + "/addComment"
//             fetch(reqUrl, {
//               method: "PATCH",
//               body: JSON.stringify({
//                 comment: new_Comment
//               }),
//               headers: {
//                 "Content-Type": "application/json"
//               }
//             // })
//             // // refreshes page
//             // location.reload();
//             }).then(function (res) {
//               if (res.status === 200) {
//                 // var photoCardTemplate = Handlebars.templates.photoCard
//                 // var newPhotoCardHTML = photoCardTemplate({
//                 //   url: photoURL,
//                 //   caption: caption
//                 // })
//                 // var photoCardContainer = document.querySelector('.photo-card-container')
//                 // photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCardHTML)

//                 location.reload();
//               } else {
//                 alert("An error occurred communicating with the server: " + res.status)
//               }
//             }).catch(function (err) {
//               alert("An error occurred communicating with the server: " + err)
//             })
//         }        
//     }
// }

// lets user create new recipe
function createNewRecipe() {
    var nameVal = document.getElementById('recipe-name-input').value.trim();
    var categoryVal = document.getElementById('recipe-category-input').value.trim();
    var ingredientsVal = document.getElementById('recipe-ingredients-input').value.trim();
    var stepsVal = document.getElementById('recipe-steps-input').value.trim();
    var total_timeVal = document.getElementById('recipe-total-time-input').value.trim();
    var notesVal = document.getElementById('recipe-notes-input').value.trim();

    if (!nameVal || !categoryVal || !ingredientsVal || !stepsVal || !total_timeVal) {
            alert("You must fill in the required input fields!")
    }
    else {
        console.log("  -nameVal:" + nameVal)
        console.log("  -categoryVal:" + categoryVal)
        console.log("  -ingredientsVal:" + ingredientsVal)
        console.log("  -stepsVal:" + stepsVal)
        console.log("  -total_timeVal:" + total_timeVal)
        console.log("  -notesVal:" + notesVal)
        var reqUrl = "/recipe/" + getRecipeIdFromURL() + "/edit"
        fetch(reqUrl, {
            method: "PATCH",
            body: JSON.stringify({
                name: nameVal,
                category: categoryVal,
                ingredients: ingredientsVal,
                steps: stepsVal,
                total_time: total_timeVal,
                notes: notesVal
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.status === 200) {
                location.reload();
            } else {
                alert("An error occurred communicating with the server: " + res.status)
            }
        }).catch(function (err) {
            alert("An error occurred communicating with the server: " + err)
        })
    }
}

// Shows new recipe modal
// var showRecipeButton = document.getElementById('edit-recipe-button');
// showRecipeButton.addEventListener('click', showNewRecipe);

// Hides new recipe modal
var cancelRecipeButton = document.getElementById('modal-cancel');
cancelRecipeButton.addEventListener('click', cancelRecipeModal);

var hideRecipeButton = document.getElementById('modal-close');
hideRecipeButton.addEventListener('click', cancelRecipeModal);

// create new recipe
var addRecipeButton = document.getElementById('modal-accept');
addRecipeButton.addEventListener('click', createNewRecipe);