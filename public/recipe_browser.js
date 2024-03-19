// lets the user search recipes
function searchFieldFunction(key_pressed) {
	if (key_pressed.key === 'Enter') {
    	var searchField = document.getElementById('search-recipes');
		console.log(searchField.value)

		if (searchField.value) {
			var reqUrl = "/?recipe_name=" + searchField.value
            fetch(reqUrl, {
              method: "GET",
              query: JSON.stringify({
                recipe_name: searchField.value
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              if (res.status === 200) {
                // console.log(res)

                // credit for showing how to open window in same tab
                // 		https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab
                window.open(res.url, "_self")
              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
		}
		else {
			var reqUrl = "/"
            fetch(reqUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              if (res.status === 200) {
                window.open("/", "_self")
              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
		}
    }
}

// Search field
var searchField = document.getElementById('search-recipes');
searchField.addEventListener('keydown', searchFieldFunction);


// lets the user create a new recipe by opening up the recipe creation modal
function showNewRecipe() {
	console.log("Add recipe button pressed!")

	var modal = document.getElementById('add-recipe-modal')
	var modalBackdrop = document.getElementById('modal-backdrop')

	modal.classList.remove('hidden')
	modalBackdrop.classList.remove('hidden')
}

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
		var reqUrl = "/addRecipe"
		fetch(reqUrl, {
			method: "POST",
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
        // clear values so they don't stick when window refreshes
        document.getElementById('recipe-name-input').value = ""
        document.getElementById('recipe-category-input').value = ""
        document.getElementById('recipe-ingredients-input').value = ""
        document.getElementById('recipe-steps-input').value = ""
        document.getElementById('recipe-total-time-input').value = ""
        document.getElementById('recipe-notes-input').value = ""

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
var showRecipeButton = document.getElementById('add-recipe');
showRecipeButton.addEventListener('click', showNewRecipe);

// Hides new recipe modal
var cancelRecipeButton = document.getElementById('modal-cancel');
cancelRecipeButton.addEventListener('click', cancelRecipeModal);

var hideRecipeButton = document.getElementById('modal-close');
hideRecipeButton.addEventListener('click', cancelRecipeModal);

// create new recipe
var addRecipeButton = document.getElementById('modal-accept');
addRecipeButton.addEventListener('click', createNewRecipe);

// lets the user sort by the recipes' ratings
function sortByRating() {
    // var reqUrl = "/?recipe_name=" + searchField.value
    var reqUrl = "/?sort_by_rating=" + true
    fetch(reqUrl, {
      method: "GET",
      query: JSON.stringify({
        sort_by_rating: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      if (res.status === 200) {
        // console.log(res)

        // credit for showing how to open window in same tab
        //    https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab
        window.open(res.url, "_self")
      } else {
        alert("An error occurred communicating with the server: " + res.status)
      }
    }).catch(function (err) {
      alert("An error occurred communicating with the server: " + err)
    })
}



// sort by rating
var ratingSortButton = document.getElementById('sort-by-rating');
ratingSortButton.addEventListener('click', sortByRating);


// // lets the user delete recipes
// function deleteRecipe() {
//   // maybe_id = $(this).siblings(`div[id=${my_id}]`)
//   console.log("hi")
// }

// // delete recipe
// var deleteButton = document.getElementById('recipe-delete');
// deleteButton.addEventListener('click', deleteRecipe);

// credit to ChatGPT for helping me find out how to add event listeners 
//    to each delete button and grab their respective hrefs
document.addEventListener('DOMContentLoaded', function() {
    // Get all delete buttons
    const deleteButtons = document.querySelectorAll('.recipe-delete')

    // Adds click event listeners to every delete button
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Find the closest .recipe element
            const recipeElement = button.closest('.recipe')
            
            // Find the .recipe-title element within the recipe
            const recipeTitleElement = recipeElement.querySelector('.recipe-title')
            
            // Get the href attribute value of the .recipe-title element
            const recipeTitleHref = recipeTitleElement.getAttribute('href')
            
            // Output the href value to the console
            console.log(recipeTitleHref)

            // [0] = 'recipe'
            // [1] = recipe id
            var recipeHrefArray = recipeTitleHref.split("/")
            var recipeID = recipeHrefArray[1]

            console.log(recipeID)

            // '/recipe/:id/delete'
            var reqUrl = "/recipe/" + recipeID + "/delete"
            fetch(reqUrl, {
              method: "DELETE",
              // body: JSON.stringify({
              //   rating: new_rating
              // }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              console.log(res)
              // alert("reload!")
              if (res.status === 200) {
                location.reload()
              } else {
                alert("An error occurred communicating with the server: " + res.status)
              }
            }).catch(async function (err) {
              alert("An error occurred communicating with the server: " + err)
            })
        })
    })
})
