const questions = [
    {
        question: "Which is largest animal in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "how long does an elephant pregnancy last?",
        answers: [
            { text: "12 months", correct: false },
            { text: "18 months", correct: false },
            { text: "22 months", correct: true },
            { text: "9 months", correct: false },
        ]
    },
    {
        question: "At most, how many pounds of meat can a tiger consume at one time?",
        answers: [
            { text: "250", correct: false },
            { text: "13", correct: false },
            { text: "88", correct: true },
            { text: "1000", correct: false },
        ]
    },
    {
        question: "What’s the estimated tiger population in the wild?",
        answers: [
            { text: "3,900", correct: true },
            { text: "10,000", correct: false },
            { text: "20,000", correct: false },
            { text: "1000", correct: false },
        ]
    },
    {
        question: "Polar bears sport a white coat of fur that helps them blend into the snow and ice. But what color are their tongues?",
        answers: [
            { text: "Green", correct: false },
            { text: "Blue", correct: true },
            { text: "Brown", correct: false },
            { text: "Red", correct: false },
        ]
    },
    {
        question: "How fast can polar bears swim?",
        answers: [
            { text: "They don't swim", correct: false },
            { text: "12 mph", correct: false },
            { text: "20 mph", correct: false },
            { text: "6 mph", correct: true },
        ]
    },
    {
        question: "Sloths often sleep while:",
        answers: [
            { text: "Climbing", correct: false },
            { text: "Hanging upside down", correct: true },
            { text: "pooping", correct: false },
            { text: "Running", correct: false },
        ]
    },
    {
        question: "What is a male zebra called?",
        answers: [
            { text: "Buck", correct: false },
            { text: "zebra", correct: false },
            { text: "Stallion", correct: true },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "How many hours a day do lions spend sleeping or resting?",
        answers: [
            { text: "10-15 hours", correct: false },
            { text: "1-3 hours", correct: false},
            { text: "12-16 hours", correct: false },
            { text: "16-20 hours", correct: true },
        ]
    },
    {
        question: "What are the knobs on the top of giraffes' heads called?",
        answers: [
            { text: "ossicones", correct: true },
            { text: "Antlers", correct: false },
            { text: "antler", correct: false },
            { text: "Spikes", correct: false },
        ]
    },
    
];
const introSection = document.querySelector(".intro");
const quizSection = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;

function startQuiz() {
    introSection.style.display = "none"; // Hide intro section
    quizSection.style.display = "block"; // Show quiz section

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quizStarted = true;
    showQuestion();
}

function handleStartButtonClick() {
    startButton.style.display = "none"; // Hide the start button
    startQuiz();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Clear previous answer buttons
    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    //  hide the next button based on the quiz state
    toggleNextButton(false);
}


function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



function selectAnswer(e) {
    if (!quizStarted) return; // Do not allow selecting answers before starting the quiz

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Show the next button only when an answer is selected
    toggleNextButton(true);
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButtonClick); // Remove the previous event listener
    nextButton.addEventListener("click", startQuiz); 
}




function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
        toggleNextButton(false);
    }
}


function toggleNextButton(show) {
    if (show) {
        nextButton.style.display = "block";
    } else {
        nextButton.style.display = "none";
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startButton.addEventListener("click", handleStartButtonClick);
