
/*Adapted from:
 https://www.studytonight.com/post/javascript-speech-recognition-example-speech-to-text
 https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 */
function runSpeechRecognition() {
	// get output div reference
	var output = document.getElementById("copyForm");
	// get action element reference
	var action = document.getElementById("copyForm");
	// new speech recognition object
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	var recognition = new SpeechRecognition();

	// This runs when the speech recognition service starts
	recognition.onstart = function() {
		action.innerHTML = "<small>listening, please speak...</small>";
	};
	
	recognition.onspeechend = function() {
		action.innerHTML = "<small>stopped listening, hope you are done...</small>";
		recognition.stop();
	}
  
	// This runs when the speech recognition service returns result
	recognition.onresult = function(event) {
		var transcript = event.results[0][0].transcript;
		var confidence = event.results[0][0].confidence;
		output.innerHTML = transcript;
		output.classList.remove("hide");
	};
  
	 // start recognition
	 recognition.start();
}

function copyButton() {
	copydata = document.getElementById("copyForm");
	copyButton = document.getElementById("copyButtonTag");

	copyButton.innerHTML = "Copied!"

	navigator.clipboard.writeText(copydata.innerHTML);
}