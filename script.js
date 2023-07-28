// awesome sauce

// variables
let timeRemaining = 64; // default time in seconds
let timerReady = true; // debounce for start button
let interval; // id for setInterval
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.5; // 40% volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
function timerCount() {
    if ((timeRemaining == 26 || timeRemaining == 36) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <=60) {
        if (!(timerReady)) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        timerCount();
        interval = setInterval(timerCount, 1000); // Run timerCount() every second
    }
}

function timerStop() {
    if (!(timerReady)) {
        timerReady = true;
        clearInterval(interval); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearInterval(interval);
    timeRemaining = 64;
    if (timeRemaining <= 60){
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 60){
        timerText.innerHTML = "60 seconds";
    }
}

function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Switch Sounds"
        } else {
            countdownSwitch.innerHTML = "Enable Switch Sounds"
        }
    }
}

function showScore() {
    timerContainer.style.display = "none";
    scoreContainer.style.display = "flex";
}

//Score calculator

function calculateScores(inputRef) {
    if (inputRef) { // ensure values only within the declared min and max are inputted
        const minVal = inputRef.getAttribute("min");
        const maxVal = inputRef.getAttribute("max");
        const defVal = inputRef.getAttribute("placeholder");
        if (inputRef.value > maxVal || inputRef.value < minVal) {
            inputRef.value = defVal;
        }
    }
	let score = 0;
	let scoreInvalid = false;
	const waterTower = document.getElementById("waterTower").value;
	const waterPipe = document.getElementById("waterPipe").value;
	const windTurbine = document.getElementById("windTurbine").value;
	const foodDrop = document.getElementById("foodDrop").value;
	const foodMove = document.getElementById("foodMove").value;
    const bridge = document.getElementById("bridge").value;
    const houseMove = document.getElementById("houseMove").value;
    const houseBuild = document.getElementById("houseBuild").value;
	const scoreKey = [10,5,10,10,10,10,5,5];

	let matchData = [waterTower, waterPipe, windTurbine, foodDrop, foodMove, bridge, houseMove, houseBuild];
	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});

	for(let i = 0; i < 8; i++) {
		score += matchData[i] * scoreKey[i];
	}
		document.getElementById("finalScore").style.color = "black";
		document.getElementById("finalScore").innerHTML = "Score: " + score.toString();

}

function clearFields() {
	document.getElementById("waterTower").value = "";
	document.getElementById("waterPipe").value = "";
	document.getElementById("windTurbine").value = "";
	document.getElementById("foodDrop").value = "";
	document.getElementById("foodMove").value = "";
    document.getElementById("bridge").value = "";
    document.getElementById("houseMove").value = ""; 
    document.getElementById("houseBuild").value = "";
	calculateScores();
}

function showTimer() {
    scoreContainer.style.display = "none";
    timerContainer.style.display = "flex";
}

// button events
window.addEventListener("DOMContentLoaded", function() {
    // timer variables
    const timerContainer = document.getElementById("timerContainer");
    const scoreContainer = this.document.getElementById("scoreContainer");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");
    // score variables
	const waterTower = document.getElementById("waterTower");
	const waterPipe = document.getElementById("waterPipe");
	const windTurbine = document.getElementById("windTurbine");
	const foodDrop = document.getElementById("foodDrop");
	const foodMove = document.getElementById("foodMove");
	const bridge = document.getElementById("bridge");
	const houseMove = document.getElementById("houseMove");
    const houseBuild = document.getElementById("houseBuild");

    const clearBtn = document.getElementById("clearBtn");
    const timerSwitch = document.getElementById("timerSwitch");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart)
        stopBtn.addEventListener("click", timerStop)
        resetBtn.addEventListener("click", timerReset)
        countdownSwitch.addEventListener("click", switchCountdown)
        scoreSwitch.addEventListener("click", showScore)
        // score events
        //input buttons
        waterTower.addEventListener("keyup", () => {calculateScores(waterTower)})
        waterTower.addEventListener("change", () => {calculateScores(waterTower)})
        //
        waterPipe.addEventListener("keyup", () => {calculateScores(waterPipe)})
        waterPipe.addEventListener("change", () => {calculateScores(waterPipe)})
        //
        windTurbine.addEventListener("keyup", () => {calculateScores(windTurbine)})
        windTurbine.addEventListener("change", () => {calculateScores(windTurbine)})
        //
        foodDrop.addEventListener("keyup", () => {calculateScores(foodDrop)})
        foodDrop.addEventListener("change", () => {calculateScores(foodDrop)})
        //
        foodMove.addEventListener("keyup", () => {calculateScores(foodMove)})
        foodMove.addEventListener("change", () => {calculateScores(foodMove)})
        //
        bridge.addEventListener("keyup",() => {calculateScores(bridge)})
        bridge.addEventListener("change", () => {calculateScores(bridge)})
        //
        houseMove.addEventListener("keyup", () => {calculateScores(houseMove)})
        houseMove.addEventListener("change", () => {calculateScores(houseMove)})
        //
        houseBuild.addEventListener("keyup", () => {calculateScores(houseBuild)})
        houseBuild.addEventListener("change", () => {calculateScores(houseBuild)})

        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});
