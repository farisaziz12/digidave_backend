    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let noteContent = ""
        const noteTextarea = document.querySelector("#note-textarea")
      

        const instructions = document.querySelector('#recording-instructions')

        recognition.onstart = function() { 
            instructions.textContent = 'Voice recognition activated. Try speaking into the microphone.'
          }
          
          recognition.onspeechend = function() {
            instructions.textContent = 'You were quiet for a while so voice recognition turned itself off.'
          }
          
          recognition.onerror = function(event) {
            if(event.error == 'no-speech') {
              instructions.textContent = 'No speech was detected. Try again.'  
            };
          }
          recognition.onresult = function(event) {
            let current = event.resultIndex;
          
            // Get a transcript of what was said.
            let transcript = event.results[current][0].transcript;
            
            response(transcript)
    
          }

          function response(transcript){
            noteContent += transcript;
            noteTextarea.value = noteContent;

            //send to yoda api here
            let org_text = noteTextarea.value
            // yodaTranslate(org_text)

            //send to backend for response here
            fetch(`http://localhost:3000/queries`, {
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              "body": 
               JSON.stringify({
                    request: org_text,
                    user_id: 1
                })
            }).then(resp => resp.json()).then(resp => yodaTranslate(resp))

          }

    const startBtn = document.querySelector("#start-record-btn")
    startBtn.addEventListener('click', () => {
        noteTextarea.value = ""
        recognition.start()
    })

   

    function yodaTranslate(message){
      let splitText = message.response.split(" ")

      let urlReadyText = splitText.join("%20")
      console.log(urlReadyText)

      fetch(`https://yodish.p.rapidapi.com/yoda.json?text=${urlReadyText}`, {
        method: "POST", 
        headers: {
          "x-rapidapi-host": "yodish.p.rapidapi.com",
          "x-rapidapi-key": "36d86838d4mshba08a92dbba7104p1ae352jsnf92cd7cb9983",
          "content-type": "application/x-www-form-urlencoded"
        },
        "body": {}
      }).then(resp => resp.json()).then(resp => speakResp(resp.contents.translated))
    }

    function speakResp(message) {
      console.log(message)
        let speech = new SpeechSynthesisUtterance();

        // Set the text and voice attributes.
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
  
        window.speechSynthesis.speak(speech);
      }
    }

      catch(e) {
        console.error(e);
        $('.no-browser-support').show();
        $('.app').hide();
      }
    
    
