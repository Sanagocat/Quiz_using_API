//API URL
//1. https://opentdb.com/
//2. understand and make API URL
// ex. make API URL 1 : comic, 5 problem, normal
// ex. make API URL 2 : game, 1 problem, easy

//JSON parsing
//3. get response and make json format - json formatter
//4. get "quiz" and "answer" from json format using fetch and await
//5. make getQuiz() and call on loading Page
//6. Show Quiz and Answer 
//7. Try catch 

//make quiz interaction
//8. make function : "Send", "GiveUp"
//9. link button to Function
//10. Send function : compare user input and check correct or not
//11. GiveUp function : show answer and refresh quiz page

//homework
//design - css
//score
const answerAfterWrong = document.getElementById("Answer")
const sendButton = document.getElementById("send");
const giveUpButton = document.getElementById("giveUp");
const userAnswer = document.getElementById("myAnswer");

let question = ""; //make global variable
let answer = ""; //make global variable

sendButton.addEventListener("click", checkAnswer);
giveUpButton.addEventListener("click", giveup);

const normalApiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple&difficulty=easy';
const sportApiUrl = "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple";

getQuiz();

function refreshAnswer() {
  answerAfterWrong.textContent = "Answer:";
}

async function getQuiz() {
  const quiz = document.getElementById('problem');
  const result = document.getElementById('result');
  userAnswer.value = "";

  const response = await fetch(normalApiUrl); //text
  const data = await response.json(); //javascript object

  if (data.response_code == 0) { //data["response_code"]
    question = decodeEntities(data.results[0].question);
    answer = decodeEntities(data.results[0].correct_answer);
    console.log(question);
    console.log(answer);

    quiz.textContent = question;
    result.textContent = '---';
  }
  else {
    console.log("Cannot get quiz and answer, Retry...");
    getQuiz();
  }
}

function checkAnswer() {
  console.log("Call checkAnswer");
  if (userAnswer.value.toLowerCase() == answer.toLowerCase()) {
    result.textContent = "correct!";
    console.log("to Next Question");
    getQuiz();
  }
  else {
    result.textContent = "wrong!";
  }
}

function giveup() {
  console.log("Call giveup");

  //homework!!
  console.log("1. show answer to user");
  result.textContent = "Answer is [" + answer +"]";
  console.log("2. to Next Question");
  getQuiz();
}

// HTML 엔터티 디코딩 함수
function decodeEntities(encodedString) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}