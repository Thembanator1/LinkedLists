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
  const database = firebase.database();
  
  // DOM elements
  const quizListContainer = document.getElementById('quizListContainer');
  
  // Fetch and display the list of available quizzes
  const quizzesRef = firebase.database().ref('quizzes');
  quizzesRef.on('value', (snapshot) => {
    const quizzes = snapshot.val();
  
    if (quizzes) {
      // Display each quiz name as a clickable item
      Object.keys(quizzes).forEach((quizKey) => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.textContent = quizzes[quizKey].quizName;
  
        // Add a click event listener to show a confirmation prompt
        quizItem.addEventListener('click', () => {
          const isSure = confirm(`Are you sure you want to start the quiz "${quizzes[quizKey].quizName}"?`);
  
          if (isSure) {
            // Store the quiz ID in localStorage
            localStorage.setItem('quizId', quizKey);
  
            // Redirect to the quiz page or perform any other action
            window.location.href = `quizView.html?id=${quizKey}`;
           // alert(`Quiz ID "${quizKey}" stored in localStorage.`);
          }
        });
  
        quizListContainer.appendChild(quizItem);
      });
    }
  });
  
  // Function to fetch quizzes for a specific student
function fetchStudentQuizzes(studentNumber) {
    const studentQuizzesRef = database.ref(`students/quizzes/${studentNumber}`);
  
    studentQuizzesRef.once('value')
      .then(snapshot => {
        const quizzes = snapshot.val();
  
        if (quizzes) {
          displayQuizzes1(quizzes);
        } else {
          alert('No quizzes found for the student.');
        }
      })
      .catch(error => {
        console.error('Error fetching student quizzes:', error);
      });
  }
  
  // Function to display quizzes on the student dashboard
  function displayQuizzes(quizzes) {
    const quizListContainer = document.getElementById('quizListContainer1');
    quizListContainer.innerHTML = '<h2>Your Quizzes</h2>';
  
    for (const quizId in quizzes) {
      if (quizzes.hasOwnProperty(quizId)) {
        const quizDetails = quizzes[quizId];
        const quizName = quizDetails.quizName;
        const finalMark = quizDetails.finalMark;
  
        // Create a card for each quiz
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
          <h3>${quizName}</h3>
          <p>Final Mark: ${finalMark}</p>
        `;
  
        quizListContainer.appendChild(quizCard);
      }
    }
  }
  
  // ... (previous code)

// Function to display quizzes on the student dashboard
function  displayQuizzes1(quizzes) {
    const quizListContainer = document.getElementById('quizListContainer1');
    quizListContainer.innerHTML = '<h2>Your Quizzes</h2>';
  
    for (const quizId in quizzes) {
      if (quizzes.hasOwnProperty(quizId)) {
        const quizDetails = quizzes[quizId];
        const quizName = quizDetails.quizName;
        const finalMark = quizDetails.finalMark;
  
        // Create a card for each quiz
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
          <h3>${quizName}</h3>
          <p>Final Mark: ${finalMark}</p>
        `;
  
        // Add a click event listener to open the quiz questions in a popup
        quizCard.addEventListener('click', () => {
          openQuizPopup(quizDetails);
        });
  
        quizListContainer.appendChild(quizCard);
      }
    }
  }
  
  // Function to open quiz questions in a popup
  function openQuizPopup(quizDetails) {
    const popup = document.createElement('div');
    popup.classList.add('quiz-popup');
  
    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  
    // Quiz details
    const quizName = document.createElement('h2');
    quizName.innerText = quizDetails.quizName;
  
    const finalMark = document.createElement('p');
    finalMark.innerText = `Final Mark: ${quizDetails.finalMark}`;
  
    // Display quiz questions (customize this part according to your data structure)
    const questionsContainer = document.createElement('div');
    questionsContainer.classList.add('questions-container');
  
    for (const question of quizDetails.questions) {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question-item');
      questionDiv.innerHTML = `
        <strong>${question.text}</strong><br>
        Type: ${question.type}<br>
        Mark: ${question.mark}<br>
        Correct Answers: ${question.correctAnswers.join(', ')}<br>
        // Add more details as needed
      `;
      questionsContainer.appendChild(questionDiv);
    }
  
    // Append elements to the popup
    popup.appendChild(closeButton);
    popup.appendChild(quizName);
    popup.appendChild(finalMark);
    popup.appendChild(questionsContainer);
  
    // Append the popup to the body
    document.body.appendChild(popup);
  }
  
  // ... (remaining code)
  
 
  // Fetch quizzes for student number 2456615
  const studentNumber = "2456615";
  fetchStudentQuizzes(studentNumber);