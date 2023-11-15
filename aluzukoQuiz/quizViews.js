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
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Get the quiz ID from local storage
  const quizId = localStorage.getItem('quizId');
  
  // Check if quizId is present
  if (quizId) {
    // Reference to the specific quiz in the database
    const quizRef = database.ref(`quizzes/${quizId}`);
  
    // Fetch and display the quiz details
    quizRef.once('value', (snapshot) => {
      const quizDetails = snapshot.val();
  
      // Display quiz details in the header
      displayQuizDetails(quizDetails);
  
      // Display quiz questions
      displayQuizQuestions(quizDetails.questions);
    });
  } else {
    alert('Quiz ID not found in local storage. Please go back and select a quiz.');
  }
  
  // Function to display quiz details in the header
  function displayQuizDetails(quizDetails) {
    const header = document.querySelector('.header');
    header.innerHTML += `
      <h2>${quizDetails.quizName}</h2>
      <p><strong>Course Name:</strong> ${"Data Structures and Algos"}</p>
      <p><strong>Course Code:</strong> ${"COMS1018A"}</p>
      <p><strong>Lecturer Name:</strong> ${"Dr Richard Klein"}</p>
      <p><strong>Date:</strong> ${getCurrentDate()}</p>
      <p><strong>Duration:</strong> ${"3 hours"} </p>
    `;
  }
  
  // Function to display quiz questions
  function displayQuizQuestions(questions) {
    const quizQuestionsContainer = document.querySelector('.quiz-questions');
    quizQuestionsContainer.innerHTML = '';
  
    for (const questionKey in questions) {
      if (questions.hasOwnProperty(questionKey)) {
        const questionData = questions[questionKey];
        const question = {
          type: questionData.type,
          text: questionData.text,
          options: questionData.options || [],
          image: questionData.image || '',
        };
  
        // Display the question
        displayQuestion(question, quizQuestionsContainer);
      }
    }
  }
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }
  var i = 1;

  // Function to display a question
  function displayQuestion(question, container) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
  
    // Display the question text
    questionDiv.innerHTML = `<strong>${i++}. ${question.text}</strong><br>`;
  
    // Display the image if available
    if (question.image) {
      questionDiv.innerHTML += `<img class="question-image" src="${question.image}" alt="Question Image"><br>`;
    }
  
    // Check if the question type is 'longQuestion'
    if (question.type === 'longQuestion') {
      // Display a text area for the student to write an answer
      questionDiv.innerHTML += '<div class="long-answer-container">';
      questionDiv.innerHTML += '<textarea rows="4" cols="50" placeholder="Write your answer here..."></textarea>';
      questionDiv.innerHTML += '</div>';
    } else {
      // Display options for multiple-choice questions
      if (question.type === 'multipleChoice' || question.type === 'multiAnswer') {
        questionDiv.innerHTML += '<div class="options-container">';
        for (const option of question.options) {
          questionDiv.innerHTML += `
            <div class="option-input">
              <input type="${question.type === 'multiAnswer' ? 'checkbox' : 'radio'}" name="options" value="${option}">
              ${option}
            </div>`;
        }
        questionDiv.innerHTML += '</div>';
      }
    }
  
    container.appendChild(questionDiv);
  }
  
  