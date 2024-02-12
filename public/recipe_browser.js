// lets the user switch between Celsius and Farenheit
function tempToggleFunction(key_pressed) {
	if (key_pressed.key === 'Enter') {
		// console.log("entered: " + searchField.value)
    	var searchField = document.getElementById('search-recipes');
		console.log(searchField.value)
    }
}

// Search field
var searchField = document.getElementById('search-recipes');
// searchField.addEventListener('click', tempToggleFunction);
searchField.addEventListener('keydown', tempToggleFunction);