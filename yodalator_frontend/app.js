// const getVoices = async ()=>{
//   const synth = window.speechSynthesis;
//   return synth.getVoices();
// }
// let voices = await getVoices()
try {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  let messageContent = "";
  const userMessage = document.querySelector("#user");
  const userDiv = document.querySelector("#userDiv")
  const chat = document.querySelector("#digichat");

  const instructions = document.querySelector("#recording-instructions");

  recognition.onstart = function() {
    instructions.textContent =
      "Voice recognition activated. Try speaking into the microphone.";
    userMessage.remove();
    let loadingCircle = null
    if (loadingCircle === null) {
      userDiv.classList = "div text-align"
      loadingCircle = document.createElement("button")
      loadingCircle.classList = "button"
      loadingCircle.id = "loadingCircle"
      userDiv.append(loadingCircle);
    }
  };

  recognition.onspeechend = function() {
    instructions.textContent =
      "You were quiet for a while so voice recognition turned itself off.";
  };

  recognition.onerror = function(event) {
    if (event.error == "no-speech") {
      instructions.textContent = "No speech was detected. Try again.";
    }
  };
  recognition.onresult = function(event) {
    let current = event.resultIndex;

    // Get a transcript of what was said.
    let transcript = event.results[current][0].transcript;

    response(transcript);
  };

  function response(transcript) {
    messageContent = transcript;

    const typingIndicator = document.querySelector("#loadingCircle");
    typingIndicator.remove();
    const div = document.createElement("div");

    const h7 = document.createElement("h7");
    div.id = "user";
    div.classList = "bubble bubble-alt";
    h7.textContent = messageContent;
    div.append(h7);
    chat.append(div);

    //digiDave response text indicator

    const digidiv = document.createElement("div");
    digidiv.id = "digi-typing-indicator";
    userDiv.classList = "div text-align"
    const loadingCircle = document.createElement("button")
    loadingCircle.classList = "button text-align"
    loadingCircle.id = "DigiloadingCircle"
    chat.append(loadingCircle);
    chat.append(digidiv)

    //send to backend for response here
    let org_text = h7.textContent;
    timeoutToBackendSend(org_text);
    // not being sent to yoda api for the moment
  }
  function timeoutToBackendSend(org_text) {
    setTimeout(function backendSend() {
      fetch(`http://localhost:3000/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: org_text,
          user_id: 1
        })
      })
        .then(resp => resp.json())
        .then(resp => respCheck(resp));
    }, 2000);
  }

  const startBtn = document.querySelector("#start-record-btn");
  startBtn.addEventListener("click", () => {
    userMessage.textContent = "";
    recognition.start();
  });

  // function yodaTranslate(message) {
  //   let splitText = message.response.split(" ");

  //   let urlReadyText = splitText.join("%20");
  //   console.log(urlReadyText);

  //   fetch(`https://yodish.p.rapidapi.com/yoda.json?text=${urlReadyText}`, {
  //     method: "POST",
  //     headers: {
  //       "x-rapidapi-host": "yodish.p.rapidapi.com",
  //       "x-rapidapi-key": "36d86838d4mshba08a92dbba7104p1ae352jsnf92cd7cb9983",
  //       "content-type": "application/x-www-form-urlencoded"
  //     },
  //     body: {}
  //   })
  //     .then(resp => resp.json())
  //     .then(resp => respCheck(resp.contents.translated));
  // }

  function respCheck(message) {
    const digiTypingIndicator = document.querySelector("#digi-typing-indicator")
    if (message.response === "weather-fetch") {
      fetch(
        "http://api.weatherstack.com/current?access_key=2177c35a94493c2c4653396c54d910f3&query=London"
      )
        .then(resp => resp.json())
        .then(resp => {
          message.response = `It is ${resp.current.temperature} degrees celcius in ${resp.location.name} right now`;
          digiTypingIndicator.remove()
          speakResp(message);
        });
    } else if (message.response === "chuck-norris-fact") {
      fetch(
        "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "36d86838d4mshba08a92dbba7104p1ae352jsnf92cd7cb9983",
            accept: "application/json"
          }
        }
      )
        .then(resp => resp.json())
        .then(resp => {
          message.response = resp.value;
          digiTypingIndicator.remove()
          speakResp(message);
        });
    } else if (message.response === "joke-fetch") {
      fetch("https://official-joke-api.appspot.com/jokes/programming/random").then(resp => resp.json()).then(resp => {
        console.log(resp)
        message.response = resp[0].setup
        console.log(message.response)
        speakResp(message)
        digiTypingIndicator.remove()
        speakJokeDelivery(resp)
      });
      function speakJokeDelivery(resp) {
        setTimeout(function(){
          message.response = resp[0].punchline
          speakResp(message)
          ; }, 4500)
      }
    } else {
      digiTypingIndicator.remove()
      speakResp(message);
    }
  }

  speakResp = async message => {
    console.log(message);
    //create and write message in response bubble

    const digidiv = document.querySelector("#DigiloadingCircle")
    if (digidiv !== null) {
      digidiv.remove()
    }
    const div = document.createElement("div");
    const h7 = document.createElement("h7");
    div.id = "digi";
    div.classList = "green bubble";
    h7.textContent = message.response;
    div.append(h7);
    chat.append(div);

    let speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.

    // console.log(voices)

    speech.text = message.response;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    // speech.voice="Google UK English Male";

    window.speechSynthesis.speak(speech);
  };
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
  $(".app").hide();
}
