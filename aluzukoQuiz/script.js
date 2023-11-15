import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  //   copy your firebase config informations
  apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
authDomain: "online-store-b90ca.firebaseapp.com",
databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
projectId: "online-store-b90ca",
storageBucket: "online-store-b90ca.appspot.com",
messagingSenderId: "160581372978",
appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
measurementId: "G-PH4QNCPP2J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let optionCounter = 2;
let quizName = '';
let questionDictionary = {}; // Dictionary to store questions

const saveQuizNameButton = document.getElementById('saveQuizNameButton');
const addOptionButton = document.getElementById('addOptionButton');
const addQuestionButton = document.getElementById('addQuestionButton');
const submitAnswersButton = document.getElementById('submitAnswersButton');

saveQuizNameButton.addEventListener('click', saveQuizName);
addOptionButton.addEventListener('click', addOption);
addQuestionButton.addEventListener('click', addQuestion);
submitAnswersButton.addEventListener('click', submitAnswers);

function saveQuizName() {
  const quizNameInput = document.getElementById('quizNameInput');

  // Check if the quizNameInput element exists
  if (quizNameInput) {
    quizName = quizNameInput.value.trim();

    if (quizName !== '') {
      quizNameInput.disabled = true;
      quizNameInput.placeholder = quizName;
    } else {
      alert('Please enter a quiz name.');
    }
  } else {
    console.error('quizNameInput not found.');
  }
}

function addOption() {
  const optionsContainer = document.getElementById('optionsContainer');
  const optionInput = document.createElement('div');
  optionInput.classList.add('option-input');
  optionInput.innerHTML = `<input type="text" name="option" placeholder="Option ${optionCounter}">`;
  optionInput.innerHTML += `<input type="${getCurrentQuestionType() === 'multiAnswer' ? 'checkbox' : 'radio'}" name="options" disabled>`;
  optionsContainer.appendChild(optionInput);
  optionCounter++;
}

function addQuestion() {
  const questionType = getCurrentQuestionType();
  const questionText = document.getElementById('questionText').value.trim();
  const options = Array.from(document.getElementsByName('option')).map(optionInput => optionInput.value.trim());

  const newQuestion = {
    type: questionType,
    text: questionText,
    options: options,
    image: "https://i.stack.imgur.com/c7qNV.png",
  };

  // Save the question details to the dictionary
  questionDictionary[questionText] = newQuestion;

  // Display the added question below the form
  displayQuestion(newQuestion);

  // Optional: Clear the form after adding a question
  document.getElementById('quizForm').reset();

  // Reset option counter and remove additional option input fields
  optionCounter = 2;
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = `<label>Options:</label>
        <div class="option-input">
          <input type="text" name="option" placeholder="Option 1">
          <input type="${getCurrentQuestionType() === 'multiAnswer' ? 'checkbox' : 'radio'}" name="options" disabled>`;
}

function displayQuestion(question) {
  console.log(question);
  const questionList = document.getElementById('questionList');
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  // Display the question text
  questionDiv.innerHTML = `<strong>${question.text}</strong><br>`;

  // Display the image if available
  if (question.image) {
    questionDiv.innerHTML += `<img class="question-image" src="${question.image}" alt="Question Image"><br>`;
  }

  // Display options for multiple-choice questions
  if (question.type === 'multipleChoice' || question.type === 'multiAnswer') {
    questionDiv.innerHTML += '<div class="options-container">';
    for (const option of question.options) {
      questionDiv.innerHTML += `<div class="option-input"><input type="${question.type === 'multiAnswer' ? 'checkbox' : 'radio'}" name="options" data-question="${question.text}" data-option="${option}"> ${option}</div>`;
    }
    questionDiv.innerHTML += '</div>';
  }

  questionList.appendChild(questionDiv);
}

function getCurrentQuestionType() {
  return document.getElementById('questionType').value;
}

// ... (previous code)

// Create a reference to the Firebase database
const database = firebase.database();

function storeQuizInDatabase(quizName, questionDictionary, answers) {
  // Create a unique key for the quiz in the "quizzes" node
  const quizKey = database.ref().child('quizzes').push().key;

  // Create an object to represent the quiz data
  const quizData = {
    quizName: quizName,
    questions: questionDictionary,
    answers: answers
  };

  // Use the unique key to store the quiz data in the "quizzes" node
  const updates = {};
  updates['/quizzes/' + quizKey] = quizData;

  // Update the database
  return database.ref().update(updates);
}

function submitAnswers() {
  if (quizName === '') {
    alert('Please enter a quiz name.');
    return;
  }

  const selectedOptions = document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
  const answers = [];

  selectedOptions.forEach(option => {
    const questionText = option.dataset.question;
    const optionText = option.dataset.option;
    answers.push({ question: questionText, option: optionText });
  });

  // Store the quiz details in the database
  storeQuizInDatabase(quizName, questionDictionary, answers)
    .then(() => {
      console.log('Quiz successfully stored in the database.');
    })
    .catch(error => {
      console.error('Error storing quiz in the database:', error);
    });
}
