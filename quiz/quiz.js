const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        question: "Which planet is closest to the sun?",
        choices: ["Venus", "Mars", "Mercury", "Jupiter"],
        correctAnswer: "Mercury"
      },
      {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
      },
      {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "Japan", "South Korea", "Vietnam"],
        correctAnswer: "Japan"
      },
      {
        question: "Which bird can fly backward?",
        choices: ["Eagle", "Pigeon", "Hummingbird", "Ostrich"],
        correctAnswer: "Hummingbird"
      },
      {
        question: "What is the tallest mammal?",
        choices: ["Elephant", "Giraffe", "Hippopotamus", "Rhinoceros"],
        correctAnswer: "Giraffe"
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        question: "What is the largest organ in the human body?",
        choices: ["Brain", "Heart", "Liver", "Skin"],
        correctAnswer: "Skin"
      },
      {
        question: "What is the currency of Japan?",
        choices: ["Yuan", "Yen", "Euro", "Dollar"],
        correctAnswer: "Yen"
      },
      // Add more questions...
      {
        question: "What is the smallest prime number?",
        choices: ["1", "2", "3", "5"],
        correctAnswer: "2"
      },
      {
        question: "What is the national animal of Australia?",
        choices: ["Kangaroo", "Koala", "Emu", "Platypus"],
        correctAnswer: "Kangaroo"
      },
      {
        question: "Which is the largest continent by land area?",
        choices: ["Europe", "North America", "Asia", "Africa"],
        correctAnswer: "Asia"
      },
      {
        question: "What is the chemical symbol for gold?",
        choices: ["Go", "Au", "Gl", "Gd"],
        correctAnswer: "Au"
      },
      {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        question: "What is the powerhouse of the cell?",
        choices: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        correctAnswer: "Mitochondria"
      },
      {
        question: "What is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
      },
      {
        question: "What is the unit of electric current?",
        choices: ["Ohm", "Ampere", "Volt", "Watt"],
        correctAnswer: "Ampere"
      },
      {
        question: "Who discovered gravity?",
        choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: "Isaac Newton"
      },
      {
        question: "What is the chemical symbol for water?",
        choices: ["Wa", "We", "Wi", "H2O"],
        correctAnswer: "H2O"
      },
      {
        question: "Which is the largest planet in our solar system?",
        choices: ["Saturn", "Jupiter", "Mars", "Venus"],
        correctAnswer: "Jupiter"
      },
      {
        question: "Who invented the telephone?",
        choices: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Albert Einstein"],
        correctAnswer: "Alexander Graham Bell"
      },
      {
        question: "What is the capital of Italy?",
        choices: ["Rome", "Milan", "Venice", "Florence"],
        correctAnswer: "Rome"
      },
      {
        question: "How many bones are there in the adult human body?",
        choices: ["206", "215", "220", "195"],
        correctAnswer: "206"
      },
      {
        question: "What is the smallest continent?",
        choices: ["North America", "Asia", "Australia", "Europe"],
        correctAnswer: "Australia"
      },
      {
        question: "What is the hottest planet in our solar system?",
        choices: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: "Venus"
      },
      {
        question: "Which is the longest river in the world?",
        choices: ["Mississippi River", "Amazon River", "Nile River", "Yangtze River"],
        correctAnswer: "Nile River"
      },
      {
        question: "What is the unit of force?",
        choices: ["Newton", "Watt", "Joule", "Kilogram"],
        correctAnswer: "Newton"
      },
      {
        question: "What is the national flower of India?",
        choices: ["Rose", "Sunflower", "Lotus", "Lily"],
        correctAnswer: "Lotus"
      }
    // Add more questions in the same format
  ];
  
  let currentQuestion = 0;
  let score1 = 0;
  
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const submitButton = document.getElementById('submitAnswer');
  const feedbackElement = document.getElementById('feedback');
  const nextButton = document.getElementById('nextQuestion');
  
  function displayQuestion() {
    const current = questions[currentQuestion];
    const questionNumber = currentQuestion + 1; // Add 1 to start question numbering from 1
    questionElement.innerHTML = `<p>Question ${questionNumber}</p><p>${current.question}</p>`;
    
    choicesElement.innerHTML = '';
    current.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.textContent = choice;
      button.addEventListener('click', () => checkAnswer(choice, button));
      choicesElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedAnswer, clickedButton) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
  
    const buttons = document.querySelectorAll('#choices button');
    buttons.forEach(button => (button.disabled = true));
  
    buttons.forEach(button => {
      if (button.textContent === selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
          button.classList.add('correct');
        } else {
          button.classList.add('incorrect');
        }
      }
    });
  
    if (selectedAnswer === correctAnswer) {
      feedbackElement.textContent = "Correct!";
      feedbackElement.classList.remove('incorrect');
      feedbackElement.classList.add('correct');
      score1++;
    } else {
      feedbackElement.textContent = "Wrong! The correct answer is: " + correctAnswer;
      feedbackElement.classList.remove('correct');
      feedbackElement.classList.add('incorrect');
    }
  
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
  }


  
  function displayNextQuestion() {
    currentQuestion++;
    feedbackElement.textContent = '';
    
    if (currentQuestion < questions.length) {
      displayQuestion();
      submitButton.style.display = 'block';
      nextButton.style.display = 'none';
    } else {
      endGame();
    }
  }
  
  function endGame() {
    questionElement.textContent = `Quiz Complete! Your Score: ${score1} out of ${questions.length}`;
    choicesElement.innerHTML = '';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
  }
  
  submitButton.addEventListener('click', () => {
    const selected = document.querySelector('button:focus');
    if (selected) {
      checkAnswer(selected.textContent);
    }
  });
  

  nextButton.addEventListener('click', displayNextQuestion);
  
  displayQuestion();


  // Function to increment the player's score
function updateScore() {
  let points = 3; // Points earned after 1 minute

  // Check if a score already exists in localStorage
  if (localStorage.getItem('playerScore')) {
    // Retrieve the existing score and add the new points
    points += parseInt(localStorage.getItem('playerScore'));
  }

  // Store the updated score in localStorage
  localStorage.setItem('playerScore', points);

  // Display the updated score (optional)
  // document.getElementById('scoreDisplay').textContent = `Your Score: ${points}`;
}

// Call the updateScore function every minute (60,000 milliseconds)
setInterval(updateScore, 60000); // 60000 ms = 1 minute

  