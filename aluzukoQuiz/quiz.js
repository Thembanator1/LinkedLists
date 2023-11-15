// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// DOM elements
const newQuizButton = document.getElementById('newQuizButton');
const quizList = document.getElementById('quizList');

// Event listener for adding a new quiz
newQuizButton.addEventListener('click', () => {
  // Redirect to the new quiz page or perform any other action
  window.location.href = 'lecturer.html';
  alert('Redirect to the new quiz page or perform any other action.');
});

// ...

// Fetch and display the list of quizzes
const quizzesRef = ref(database, 'quizzes');
onValue(quizzesRef, (snapshot) => {
  const quizzes = snapshot.val();
  quizList.innerHTML = '';

  if (quizzes) {
    // Display each quiz name as a clickable item
    Object.keys(quizzes).forEach((quizKey) => {
      const quizItem = document.createElement('div');
      quizItem.classList.add('quiz-item');
      quizItem.textContent = quizzes[quizKey].quizName;
      quizItem.addEventListener('click', () => showQuizDetails(quizzes[quizKey]));
      quizList.appendChild(quizItem);
    });
  }
});

// Function to show quiz details in a popup
function showQuizDetails(quizDetails) {
    console.log('Quiz Details:', quizDetails); // Add this line for debugging
  
    // Create and display a full-screen popup with quiz details
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    const questions = quizDetails.questions || {};
    const questionKeys = Object.keys(questions);
  
   // console.log('Questions:', questionKeys); // Add this line for debugging
  
    // Generate HTML for displaying questions
    const questionsHTML = questionKeys.map((questionKey, index) => {
      const questionNumber = index + 1;
      const question = questions[questionKey];
      const correctAnswers = question.options.filter(opt => opt.correct).map(opt => opt.text).join(', ');
  
      return `
        <div class="question">
          <strong>Question ${questionNumber}:</strong><br>
          ${question.text}<br>
          Correct answers: ${correctAnswers}
        </div>
      `;
    }).join('');
  
    //console.log('Questions HTML:', questionsHTML); // Add this line for debugging
  
    popup.innerHTML = `
      <div class="popup-content">
        <h2>${quizDetails.quizName}</h2>
        <div class="questions-container">
          ${questionsHTML}
        </div>
        <button onclick="closePopup()">Close</button>
      </div>
    `;
  
    document.body.appendChild(popup);
  }
  

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    document.body.removeChild(popup);
  }
}
