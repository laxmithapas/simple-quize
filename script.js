document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const quizScreen = document.getElementById('quiz-screen');
  const startScreen = document.getElementById('start-screen');
  const resultScreen = document.getElementById('result-screen');
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const scoreElement = document.getElementById('score');

  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "Who is the inventor of 'WWW'?",
      answers: ["James Gosling", "Tim B Lee", "Guido van Rossum", "Sam Smith"],
      correctAnswer: "Tim B Lee"
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: ["Earth", "Jupiter", "Mars", "Saturn"],
      correctAnswer: "Jupiter"
    },
    {
      question: "What is the boiling point of water?",
      answers: ["90°C", "100°C", "110°C", "120°C"],
      correctAnswer: "100°C"
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Au", "Ag", "Pb", "Pt"],
      correctAnswer: "Au"
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the capital of Japan?",
      answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo"
    },
    {
      question: "What is the smallest prime number?",
      answers: ["0", "1", "2", "3"],
      correctAnswer: "2"
    }
  ];

  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  restartBtn.addEventListener('click', restartQuiz);

  function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn');
      if (answer === question.correctAnswer) {
        button.dataset.correct = true;
      }
      button.addEventListener('click', selectAnswer);
      answersElement.appendChild(button);
    });
  }

  function resetState() {
    nextBtn.classList.add('hidden');
    while (answersElement.firstChild) {
      answersElement.removeChild(answersElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
      score++;
    }
    Array.from(answersElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct === 'true');
    });
    if (questions.length > currentQuestionIndex + 1) {
      nextBtn.classList.remove('hidden');
    } else {
      showResult();
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
  }

  function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = ''; // Clear the score display
    setNextQuestion();
  }
});