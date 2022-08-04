
/*Adapted from:
 https://www.studytonight.com/post/javascript-speech-recognition-example-speech-to-text
 https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 */
function runSpeechRecognition() {
	// get output div reference
	var output = document.getElementById("copyForm");
	// get action element reference
	var action = document.getElementById("copyForm");
	var recordButton = document.getElementById("record");

	//Activate Chrome Support
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
	const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

	var recognition = new SpeechRecognition();
	const speechRecognitionList = new SpeechGrammarList();

	recognition.interimResults = true;

	//These are the words thaat will activate some function- These don't do anything
	//const keywords = 
		//['VH','v'];
	
	//const grammar = `#JSGF V1.0; grammar keywords; public <keywords> = ${keywords.join(' | ')};`
	//speechRecognitionList.addFromString(grammar, 1);
	//recognition.grammars = speechRecognitionList;
	recognition.maxAlternatives = 1;

	preTalk = output.innerHTML

	// This runs when the speech recognition service starts
	recognition.onstart = function() {
		action.innerHTML = "<small>listening, please speak...</small>";
		recordButton.style.backgroundColor = "#b4202a";
	};
	
	recognition.onspeechend = function() {
		recognition.stop();
		recordButton.style.backgroundColor = "green";
	}
  
	// This runs when the speech recognition service returns result
	recognition.onresult = function(event) {
		var transcript = event.results[0][0].transcript;
		var confidence = event.results[0][0].confidence;
		output.innerHTML = preTalk + " " + transcript;
		output.classList.remove("hide");
		
		if(transcript.includes("VH"))
		{
			if(transcript.includes("copy"))
			{
				copyButton();
				alert("Text Copied")
			}
			else if(transcript.includes("paste"))
			{
				pasteButton();
				alert("Text Pasted")
			}
			else if(transcript.includes("clear"))
			{
				clearText();
				alert("Text Cleared")
			}
			else if(transcript.includes("read") || transcript.includes("speak"))
			{
				speakText();
				alert("Reading Text")
			}
		}
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

function pasteButton(){

	copydata = document.getElementById("copyForm");
	navigator.clipboard.readText().then(
		(clipText) => copydata.innerHTML = copydata.innerHTML+" "+clipText);
}

function speakText() {

	var text = new SpeechSynthesisUtterance();
	text.text = document.getElementById("copyForm").innerHTML;
	window.speechSynthesis.speak(text);

}

function clearText()
{
	copydata = document.getElementById("copyForm");
	copydata.innerHTML = "";
}