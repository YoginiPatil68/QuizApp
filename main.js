const questions = [
    {
        question: " Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "scripting", correct: false },
            { text: "script", correct: true },
            { text: "js", correct: false },
            { text: "javascript", correct: false }
        ]

    },
    {
        question: " How do you create a function in JavaScript?",
        answers: [
            { text: "function myFunction()", correct: true },
            { text: "function:myFunction()", correct: false },
            { text: "function =myFunction()", correct: false },
            { text: "function==myFuncton()", correct: false }
        ]

    },
    {
        question: " How to write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5 then", correct: false },
            { text: "if(i==5)", correct: true },
            { text: "if i = 5", correct: false },
            { text: "if i == 5 then", correct: false }
        ]

    },
    {
        question: " How does a FOR loop start?",
        answers: [
            { text: "for(i=0;i<=5;i++)", correct: true },
            { text: "for(i=0;i<=5)", correct: false },
            { text: "for(i<=5;i++)", correct: false },
            { text: "for i=1 to 5", correct: false }
        ]

    },
    {
        question: " Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onClick", correct: true },
            { text: "onChange", correct: false },
            { text: "onMouseOver", correct: false },
            { text: "onMouseClick", correct: false }
        ]

    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();