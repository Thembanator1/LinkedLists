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
  