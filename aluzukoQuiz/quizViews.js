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
  
  // Global list to store all quiz questions
  const allQuestions = [];
  var totalMark=0;
  var globalMark=0;
  var nameOfquiz;
  // Get the quiz ID from local storage
  const quizId = localStorage.getItem('quizId');
  // Get the value from local storage
const studentNumber = localStorage.getItem('myKey');
  // Check if quizId is present
  if (quizId) {
    // Reference to the specific quiz in the database
    const quizRef = database.ref(`quizzes/${quizId}`);
  
    // Fetch and display the quiz details
    quizRef.once('value', (snapshot) => {
      const quizDetails = snapshot.val();
      totalMark=getMarks(quizDetails.questions);
      // Display quiz details in the header
      displayQuizDetails(quizDetails);
  
      // Display and store quiz questions
      displayAndStoreQuizQuestions(quizDetails.questions,quizDetails.answers);
    });
  } else {
    alert('Quiz ID not found in local storage. Please go back and select a quiz.');
  }
  
  // Function to display quiz details in the header
  function displayQuizDetails(quizDetails) {
    const header = document.querySelector('.header');
    nameOfquiz=quizDetails.quizName;
    header.innerHTML += `
      <h2>${quizDetails.quizName}</h2>
      <p><strong>Course Name:</strong> ${"Data Structure and algorithms"}</p>
      <p><strong>Course Code:</strong> ${"COMS1018A"}</p>
      <p><strong>Lecturer Name:</strong> ${"Dr Richard Klein"}</p>
      <p><strong>Date:</strong> ${getCurrentDate()}</p>
      <p><strong>Duration:</strong> ${"1 hour"}</p>
      <p><strong>Total:</strong> ${totalMark} marks</p>
    `;
  }
  function getMarks(question){
    console.log("my details : ",question);
    var summ=Number(0);
    for (const outerKey in question) {
        if (question.hasOwnProperty(outerKey)) {
         // console.log(`Outer Key: ${outerKey}`);
      
          const innerObject = question[outerKey];
      
          // Iterate over the inner object
          for (const innerKey in innerObject) {
            if (innerObject.hasOwnProperty(innerKey)) {
              const innerValue = innerObject[innerKey];
              console.log(`  Inner Key: ${innerKey}, Inner Value: ${innerValue}`);
              if(innerKey==="mark"){
                summ+=Number(innerValue);
              }
            }
          }
        }
      }
      return summ
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
          mark: questionData.mark,
          options: questionData.options || [],
          correctAnswers: questionData.answers || [], // Add correctAnswers property
          image: questionData.image || '',
        };
  
        // Display the question
        displayQuestion(question, quizQuestionsContainer);
      }
    }
  }
  function extractOptions(list) {
    return list.map(item => item.option);
  }
  // Function to display and store quiz questions
  function displayAndStoreQuizQuestions(questions,answers) {
    const quizQuestionsContainer = document.querySelector('.quiz-questions');
    quizQuestionsContainer.innerHTML = '';
    let optionsList = extractOptions(answers);
    console.log("question now : ",optionsList);
    for (const questionKey in questions) {
      if (questions.hasOwnProperty(questionKey)) {
        const questionData = questions[questionKey];
        const question = {
          type: questionData.type,
          text: questionData.text,
          mark: questionData.mark,
          correctAnswers:optionsList || [],
          options: questionData.options || [],
          image: questionData.image || '',
        };
  
        // Store the question in the global list
        allQuestions.push(question);
  
        // Display the question
        displayQuestion(question, quizQuestionsContainer);
      }
    }
  
    // Print the global list of questions
    console.log('All Questions:', allQuestions);
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
    questionDiv.innerHTML = `<strong>${i++}. ${question.text}</strong>(${question.mark} marks)<br>`;
  
    // Display the image if available
    if (question.image) {
      questionDiv.innerHTML += `<img class="question-image" src="${question.image}" alt="Question Image"><br>`;
    }
  
    // Check if the question type is 'longQuestion'
    if (question.type === 'longQuestion') {
      // Display a text area for the student to write an answer
      questionDiv.innerHTML += '<div class="long-question-container">';
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
  
  // Event listener for the submitQuiz button
  document.getElementById('submitQuiz').addEventListener('click', () => {
    submitQuiz();
   // gradeQuiz(); // Call the gradeQuiz function after submitting the quiz
    alert(globalMark);
  });
  
 // Function to submit the quiz and disable input elements
function submitQuiz() {
    const quizQuestionsContainer = document.querySelector('.quiz-questions');

    quizQuestionsContainer.childNodes.forEach((questionDiv, index) => {
        const inputElements = questionDiv.querySelectorAll('input, textarea');
        inputElements.forEach(input => {
            input.disabled = true;
        });
    });

    // Collect student responses
    const studentResponses = allQuestions.map((question, index) => {
        const questionDiv = document.querySelector(`.quiz-questions div:nth-child(${index + 1})`);
        let response = null;

        if (question.type === 'longQuestion') {
            response = questionDiv.querySelector('textarea').value.trim();
        } else if (question.type === 'multipleChoice' || question.type === 'multiAnswer') {
            const selectedOptions = questionDiv.querySelectorAll('input:checked');
            response = Array.from(selectedOptions).map(option => option.value);
        }

        return response;
    });
    gradeQuiz(); // Call the gradeQuiz function after submitting the quiz
    // Get the student number from local storage
    const studentNumber ="2456615"; //localStorage.getItem('myKey');
    //globalMark=totalMarks;
    // Insert quiz details into the student database
    insertQuizDetailsToDatabase(allQuestions, studentResponses, studentNumber);
}

  var num=0;
  
  // Function to grade the quiz and display marks
  function gradeQuiz() {
    let totalMarks = 0;
  
    allQuestions.forEach((question, index) => {
        console.log("check : ",question.type," : ",index);
      const questionDiv = document.querySelector(`.quiz-questions div:nth-child(${index + 1})`);
  
      let isCorrect = false;
      const responseType = question.type;
       //alert("responseType : ",responseType);
      if (question.type === 'longQuestion') {
        const studentResponse = questionDiv.querySelector('textarea').value.trim();
        isCorrect = checkLongAnswer(question.correctAnswers, studentResponse);
      } if(question.type === 'multipleChoice') {
        const selectedOption = questionDiv.querySelector('input:checked');
        const studentResponse = selectedOption ? selectedOption.value : null;
        isCorrect = checkMultipleChoiceAnswer(question.correctAnswers, studentResponse);
      }if(question.type === 'multiAnswer'){
       // alert("here");
        const selectedOptions = questionDiv.querySelectorAll('input:checked');
        const studentResponses = Array.from(selectedOptions).map(option => option.value);
  
        question.mark,isCorrect = checkMultipleAnswer(question.correctAnswers, studentResponses,question,questionDiv);
        //alert(question.mark);
      }
      if(question.type === 'multiAnswer'){
        question.mark=num;
      }
      totalMarks += Number(isCorrect) ? Number(question.mark) : 0;
  
      // Display check mark or X next to the selected option
      displayResultIcon1(questionDiv, isCorrect);
    });
  
    // Display total marks
     globalMark=totalMarks;
     alert(globalMark);
    alert(`Your total marks: ${totalMarks}`);
  }
  
  // Function to check long answer
  function checkLongAnswer(correctAnswers, studentResponse) {
    // You need to implement your own logic for checking long answer responses
    // For example, you can compare studentResponse with correctAnswers
    // Return true if correct, false otherwise
    return true; // Placeholder, replace with your implementation
  }
  
  // Function to check multiple-choice answer
  function checkMultipleChoiceAnswer(correctAnswers, studentResponse) {
    console.log(correctAnswers," : ",studentResponse);
    // Check if the selected option is among the correct answers
    return correctAnswers.includes(studentResponse);
  }

 // Function to check multiple-answer questions
function checkMultipleAnswer(correctAnswers, studentResponses, question, questionDiv) {
    let questionMark = Number(question.mark);
    //alert(questionMark);
  
    studentResponses.forEach((chosenOption) => {
      const isCorrect = correctAnswers.includes(chosenOption);
  
      if (!isCorrect) {
        // Subtract a fixed amount for each wrong answer
        questionMark =Number(questionMark)- Number(question.mark) / Number(correctAnswers.length);
      }
      //alert(questionMark);
    });
    //alert(questionMark);
    num=questionMark;
    // Display check mark or X based on the marking criteria
    displayResultIcon(questionDiv, questionMark, correctAnswers.length);
    return questionMark > 0; // Return true if questionMark is greater than 0, false otherwise
  }
  
  // Function to display check mark or X next to the selected option
function displayResultIcon1(questionDiv, isCorrect) {
    const resultIcon = document.createElement('span');
    resultIcon.classList.add('result-icon');
    resultIcon.textContent = isCorrect ? '✔' : '✘';
  
    questionDiv.appendChild(resultIcon);
  }
  // Function to display check mark or X based on marking criteria
function displayResultIcon(questionDiv, questionMark, correctAnswersCount) {
    const resultIcon = document.createElement('span');
    resultIcon.classList.add('result-icon');
  
    if (questionMark === correctAnswersCount.mark) {
      // All chosen options are correct
      resultIcon.textContent = '✔';
      resultIcon.style.color = 'black';
    } else if (questionMark > 0) {
      // Some chosen options are correct
      resultIcon.textContent = '✔';
      resultIcon.style.color = 'orange';
    } else {
      // No correct options chosen
      resultIcon.textContent = '✘';
      resultIcon.style.color = 'red';
    }
  
    questionDiv.appendChild(resultIcon);
  }
  function insertQuizDetailsToDatabase(allQuestions, studentResponses, studentNumber) {
    const studentQuizRef = database.ref(`students/quizzes/${studentNumber}`);
    const quizDetails = {
        questions: allQuestions,
        responses: studentResponses,
        finalMark:globalMark,
        quizName:nameOfquiz,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    studentQuizRef.push(quizDetails)
        .then(() => {
            console.log('Quiz details inserted into the student database successfully.');
        })
        .catch((error) => {
            console.error('Error inserting quiz details into the student database:', error);
        });
}
