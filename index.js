// This was written with the Nintendo 3DS browser as a target, so forgive the awful code.

// Randomness utils
function getRandomFloat(max, min) {
    min = min || 0;
    return Math.random() * (max - min) + min;
};
function getRandomInt(max, min) { return Math.floor(getRandomFloat(max, min)) };
function getRandomFromArray(arr) { return arr[getRandomInt(0, arr.length)] };

// Constant values
var ALLOWED_ELEMENTS = ["p", "a", "i", "strong", "button", "textarea", "marquee"]; // TODO: <input /> elements
var INTENSITY = getRandomFloat(4, 2) // TODO: User input for intensity?

// Actual logic
function createElements(words) {
    for (var i = 0; i < 50 * INTENSITY; i++) {
        var elem = document.createElement(getRandomFromArray(ALLOWED_ELEMENTS));
        elem.textContent = getRandomFromArray(words);
        elem.href = "javascript:document.location.reload();";

        elem.style.position = "fixed";
        elem.style.left = getRandomFloat(window.innerWidth) + "px";
        elem.style.top = getRandomFloat(window.innerHeight) + "px";
        elem.style.height = getRandomFloat(30 * INTENSITY) + "px";
        elem.style.transform = "rotate($1deg) scale($2,$3)"
            .replace("$1", getRandomFloat(180))
            .replace("$2", getRandomFloat(3 * INTENSITY))
            .replace("$3", getRandomFloat(3 * INTENSITY));
    
        document.body.appendChild(elem);
    }
}

// This fucking sucks
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", "https://cdn.jsdelivr.net/npm/an-array-of-english-words", true);
req.onload = function() { createElements(JSON.parse(req.responseText)) };
req.send();
