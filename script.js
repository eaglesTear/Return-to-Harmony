// Initialise var to keep track of what mode is enabled: day or night
let dayMode = true;

// Define the middle of the user's screen
let midScreenLocation = Math.floor(window.innerWidth / 2);
// Determine the end-point of the user's browser
let endScreenLocation = window.innerWidth;

// Access the html text that displays to user what mode page is in
let modeText = document.getElementById("mode-text");

// Tap into quote containers 
let cloud = document.querySelector(".cloud");
let star = document.querySelector(".shooting-star");

// Access the credits html div element 
let credits = document.querySelector(".credits");

// Store a link as a string to insert into music credits
let musicLink = "OpenGameArt";
let openGameArtLink = musicLink.link("https://opengameart.org/");
// Store a link as a string to add to bg image credits
let bgImageLink = "Pixabay";
let pixabayLink = bgImageLink.link("https://pixabay.com/");

// Credits run once only - set variable to track this
let dayCreditsHaveRun = false;
let nightCreditsHaveRun = false;

// Define day music object / track (theme loops)
let synthwave = new Audio('media/sound/Synthwave.mp3');
synthwave.loop = true;
// Define night music object / track (theme loops)
let settlement = new Audio('media/sound/Settlement of the Frontier.mp3');
settlement.loop = true;

// Start the initial program with the day theme / music (theme loops)
synthwave.play();
// Day music credits slide in / out after a set time (runs only once)
dayMusicCredits();

// Track whether the animation paused (disabled)
let animationIsPaused = false;
// Freeze or unfreeze quote on the page
function toggleFreezeQuote() {

    if (animationIsPaused === false) {
        cloud.style.animation = "none";
        star.style.animation = "none";
        // Animation is now disabled:
        animationIsPaused = true;
    } else {
        cloud.style.animation = "scroll 30s infinite both";
        star.style.animation = "whizz 30s infinite both";
        alert("Quote machine is now running.");
        // Animation is now enabled:
        animationIsPaused = false;
    }

}

// Add CSS class to music credits html div: allows it to slide in for set duration
function creditsSlideIn() {
    credits.classList.add("credits-slide-in");
    creditsTimeOut();
}

// Credits slide back out of UI after 5s (set to 7s due to 2s CSS transition)
function creditsTimeOut() {
    setTimeout(() => {
        credits.classList.remove("credits-slide-in");
    }, 7000);
}

// Check whether day & night music credits have ran once. If so, don't run again
function dayMusicCredits() {

    if (dayCreditsHaveRun !== true) {
        creditsSlideIn();
        dayCreditsHaveRun = true;
    }

}

function nightMusicCredits() {

    if (nightCreditsHaveRun !== true) {
        creditsSlideIn();

        // Change the credits to show artists for night music & bg image
        credits.innerHTML = `Background courtesy of JOhaza on ${pixabayLink} <br> Music track: <i>The Settlement of the Frontier</i> <br> by Tad <br> Courtesy of ${openGameArtLink}`;
        nightCreditsHaveRun = true;
    }

}

// Monitor where the cloud is located within the user's browser window
function trackCloud() {

    // Grab the cloud using its id
    let cloudInMotion = document.getElementById("cloud-motion");

    /* Half the width of the cloud element ('cloudWidthHalved' ensures bounding rect treats LEFT edge of cloud as endpoint when deciding if off screen) 
    let cloudWidthHalved = cloudInMotion.getBoundingClientRect().width / 2; */

    // Grab x coordinate of cloud and round it down
    let getXOfCloud = cloudInMotion.getBoundingClientRect().x;
    // Round the position of the x axis down to integer pixels
    let roundXOfCloud = Math.floor(getXOfCloud);

    // When cloud surpasses edge of the screen, generate random quote
    if (roundXOfCloud > endScreenLocation) {
        generateLaoQuote();
    }
    /* When cloud reaches 'mid-screen', run quote animation
    if (roundXOfCloud >= midScreenLocation - cloudWidthHalved) {
        animateCloudQuoteBg(); */
}

// Works as trackCloud function - see notes above
function trackStar() {

    let starInMotion = document.getElementById("star-motion");
    let getXOfStar = starInMotion.getBoundingClientRect().x;
    let roundXOfStar = Math.floor(getXOfStar);

    if (roundXOfStar > endScreenLocation) {
        generateRumiQuote();
    }

}

// Generate random quotes from Lao Tsu each time containing element leaves the screen
function generateLaoQuote() {

    // Grab h1 quote element
    let getCloudQuoteElement = document.getElementById("cloud-quote");
    // Define random number between 1-21 (21 quotes in Lao Tsu array)
    let randomNumber = Math.floor(Math.random() * 21);
    // Select a random quote from array using random number
    let randomQuote = LAO_TSU[randomNumber];
    // Insert the quote into the cloud
    getCloudQuoteElement.textContent = randomQuote;

}

// Generate random quotes from Rumi - as above function
function generateRumiQuote() {

    let getStarQuoteElement = document.getElementById("star-quote");
    let randomNumber = Math.floor(Math.random() * 28);
    let randomQuote = RUMI[randomNumber];
    getStarQuoteElement.textContent = randomQuote;

}

// Change theme to night, showing a shooting star with Rumi quotes to user
function nightMode() {

    // Function runs night theme bg, music and credits 
    nightMusicCredits();

    // Access extra element... 
    let sun = document.querySelector('.sun');

    // Add / remove cloud, star & sun elements according to day or night mode

    star.classList.toggle("add-star");

    const REMOVE_ELEMENT_ARR = [sun, cloud];

    for (let i = 0; i < REMOVE_ELEMENT_ARR.length; i++) {
        REMOVE_ELEMENT_ARR[i].classList.toggle("remove-element");
    }

    // Change the background to the theme of night
    document.body.classList.toggle("night-mode");

    // Iterate through headings in night mode and apply margin
    const NIGHT_HEADER_ARR = [
        document.querySelector(".main-heading"),
        document.querySelector(".slogan"),
        modeText
    ];

    for (let i = 0; i < NIGHT_HEADER_ARR.length; i++) {
        NIGHT_HEADER_ARR[i].classList.toggle("header-margin-night");
    }

    // Set music & text corresponding to mode selected
    toggleModeUI();

}

// Functions play day or night track according to user selected theme 
function playDayMusic() {

    synthwave.play();
    settlement.pause();
    // Day mode active
    dayMode = true;

}

function playNightMusic() {

    settlement.play();
    synthwave.pause();
    // Night mode active
    dayMode = false;

}

// Controls the UI & music of the page depending on day or night mode
function toggleModeUI() {

    // Day mode active: Show night mode option, play day music 
    if (!dayMode) {
        modeText.textContent = "Relax & enjoy quotes from Taoist writer, Lao Tsu";
        playDayMusic();
        // Night mode active: Show day mode option, play night music 
    } else {
        modeText.textContent = "Relax & enjoy quotes from Persian writer, Rumi";
        playNightMusic();
    }

    // Toggle day or night UI button icons, corresponding to mode
    document.querySelector(".day").classList.toggle("add-day-icon");
    document.querySelector(".night").classList.toggle("remove-night-icon");

}

// Setting animation time lower for debugging means interval must be increased!!!
// Constantly run element functions to enable position to be tracked 
let runTrackCloud = setInterval(trackCloud, 0);
let runTrackStar = setInterval(trackStar, 0);