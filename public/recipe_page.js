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
function convertToImperial(match, p1) {
    var cups = (parseInt(p1) / 236.6).toFixed(0);
    return cups + " cups";
}

// formula for cups to ml: X * 236.6
//              tbsp to ml: X * 14.787
//              tsp to ml: X * 4.929
function convertToMetric(match, p1, p2) {
    // check if cup, tbsp, or tsp
    // if cup
    var imperial = (parseInt(p1) * 236.6).toFixed(0);
    return imperial + " ml";
}

// lets the user switch between Celsius and Farenheit
function tempToggleFunction() {
    console.log("clicked")

    // // cycle through each container
    // var infoContainerArray = document.getElementsByClassName('recipe-info-container')

    var tempVal = document.getElementById('recipe-section-cooking').textContent
    console.log(tempVal)

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

// Temperature toggle
var tempButton = document.getElementById('temperature_button');
tempButton.addEventListener('click', tempToggleFunction);
