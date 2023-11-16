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
const newQuizButton = document.getElementById('newQuizButton');
const quizList = document.getElementById('quizList');

// Event listener for adding a new quiz
newQuizButton.addEventListener('click', () => {
  // Redirect to the new quiz page or perform any other action
  window.location.href = 'lecturer.html';
  alert('Redirect to the new quiz page or perform any other action.');
});

// Fetch and display the list of quizzes
const quizzesRef = firebase.database().ref('quizzes');
quizzesRef.on('value', (snapshot) => {
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

// Function to process quiz details and get correct answers
function processQuizDetails(dic2) {
  const result = [];
  var results;
  // Iterate over each question in dic2
  for (const questionKey in dic2.questions) {
    if (dic2.questions.hasOwnProperty(questionKey)) {
      const questionData = dic2.questions[questionKey];
      console.log("my data : " ,questionData);
      if(questionData.type!=="longQuestion"){
        results=getCorrectAnswers(dic2.answers, questionData.text);
      }
      // Create an object in the format of dic1
      const processedQuestion = {
        type: questionData.type,
        text: questionData.text,
        options: questionData.options.slice(), // Copy the options array
        image: questionData.image,
        correctAnswers: results || [],
        mark: questionData.mark
      };

      // Add the object to the result array
      result.push(processedQuestion);
    }
  }

  return result;
}

// Function to get correct answers for a specific question
function getCorrectAnswers(answers, questionText) {
  return answers
    .filter((answer) => answer.question === questionText)
    .map((answer) => answer.option);
}

const questionList = document.getElementById('questionList');
function displayQuestion(question) {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  // Display the question text
  questionDiv.innerHTML = `<strong>${question.text}</strong>( ${question.mark} marks)<br>`;

  // Display the image if available
  if (question.image) {
    questionDiv.innerHTML += `<img class="question-image" src="${question.image}" alt="Question Image"><br>`;
  }

  // Display options for multiple-choice questions
  if (question.type === 'multipleChoice' || question.type === 'multiAnswer') {
    questionDiv.innerHTML += '<div class="options-container">';
    for (const option of question.options) {
      const isChecked = question.correctAnswers.includes(option); // Check if the option is correct

      // Create the option input with checked and disabled attributes if it's correct
      questionDiv.innerHTML += `<div class="option-input">
        <input type="${question.type === 'multiAnswer' ? 'checkbox' : 'radio'}" 
               name="options" 
               data-question="${question.text}" 
               data-option="${option}" 
               ${isChecked ? 'checked' : ''} 
               disabled>
        ${option}
      </div>`;
    }
    questionDiv.innerHTML += '</div>';
  }

  questionList.appendChild(questionDiv);
}

function getCurrentQuestionType() {
  return document.getElementById('questionType').value;
}

// Function to show quiz details in a popup
function showQuizDetails(quizDetails) {
  questionList.innerHTML = '';
  const processedQuestions = processQuizDetails(quizDetails);
  console.log("question : ",processedQuestions);
  for (const question of processedQuestions) {
    displayQuestion(question);
    console.log('Question Details:');
    console.log('Type:', question.type);
    console.log('Mark:', question.mark);
    console.log('Text:', question.text);
    console.log('Options:', question.options);
    console.log('Image:', question.image);
    console.log('Correct Answers:', question.correctAnswers);
    console.log('------------------------');
  }
}

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    document.body.removeChild(popup);
  }
}




const generateFeedbackButton = document.getElementById('generateFeedback');

// Event listener for the generateFeedback button
generateFeedbackButton.addEventListener('click', () => {
  // Fetch and display quiz names in a popup
  fetchAndDisplayQuizNames();
});

// Function to fetch and display quiz names in a popup
function fetchAndDisplayQuizNames() {
  const quizNamesPopup = document.createElement('div');
  quizNamesPopup.classList.add('popup');
  quizNamesPopup.innerHTML = '<h2>Quiz Names</h2>';

  // Fetch quiz names
  const quizzesRef = database.ref('quizzes');
  quizzesRef.once('value', (snapshot) => {
    const quizzes = snapshot.val();
    console.log(quizzes);
    if (quizzes) {
      const quizNames = Object.keys(quizzes);

      // Display each quiz name as a clickable item
      quizNames.forEach((quizName) => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.textContent = quizzes[quizName].quizName;
        quizItem.addEventListener('click', () => fetchAndDisplayFeedback(getName(quizName)));
        quizNamesPopup.appendChild(quizItem);
      });

      document.body.appendChild(quizNamesPopup);
    }
  });
}

// Function to fetch and display feedback for a specific quiz
// Function to fetch and display feedback for a specific quiz
function fetchAndDisplayFeedback(quizName1) {
  // Fetch feedback for the selected quiz
  const studentsRef = database.ref(`students/quizzes`);
  studentsRef.once('value', (snapshot) => {
    const quizzesTaken = snapshot.val();
    var text;
    var i=10;
    // Create a new jsPDF instance
   const pdf = new jsPDF();
      pdf.text("Student Number       Mark   ",10,i);
    // Iterate through each student
    for (const studentNumber in quizzesTaken) {
      if (quizzesTaken.hasOwnProperty(studentNumber)) {
        const studentQuizzes = quizzesTaken[studentNumber];

        // Iterate through each quiz for the current student
        for (const quizKey in studentQuizzes) {
          if (studentQuizzes.hasOwnProperty(quizKey)) {
            const quizDetails = studentQuizzes[quizKey];
            const quizName = quizDetails.quizName;
            const finalMark = quizDetails.finalMark;
            if(quizName === quizName1){
              i=i+10;
              text=+studentNumber+  "                    "+finalMark;
            }
            // Attach a listener to the current quiz
            const currentQuizRef = database.ref(`students/quizzes/${studentNumber}/${quizKey}`);
            currentQuizRef.on('value', (quizSnapshot) => {
              // Do something with the quiz data
              if (quizName === quizName1) {
                console.log(`Student: ${studentNumber}, Quiz: ${quizName}, Mark:${finalMark}`);
                //console.log('Quiz Data:', quizSnapshot.val());

                // Append the data to the PDF
              
              }
            });
          }
        }
      }
    }
  // console.log(text);
   pdf.text(text,10,20);
    // Save the PDF and allow the user to download it
    pdf.save(quizName1+'.pdf');
  });
}


function getName(quizId)
{ var name;
  const studentsRef = database.ref(`quizzes/`+quizId);
  studentsRef.once('value', (snapshot) => {
    const quizzesTaken = snapshot.val();
    name =quizzesTaken.quizName;
  });
   return name;

}