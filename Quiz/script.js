const questions = [
    {
        question: "What is the output of the following Python code? \n\nprint(10 / 3)",
        answers: [
            { text: "3.333333", correct: true },
            { text: "3.0", correct: false },
            { text: "3", correct: false },
            { text: "10/3", correct: false },
        ]
    },
    {
        question: "What is the correct syntax for a single-line comment in C++?",
        answers: [
            { text: "//", correct: true },
            { text: "/* */", correct: false },
            { text: "#", correct: false },
            { text: "--", correct: false },
        ]
    },
    {
        question: "What is the result of 2 + 3 in Python?",
        answers: [
            { text: "5", correct: true },
            { text: "6", correct: false },
            { text: "4", correct: false },
            { text: "2 + 3", correct: false },
        ]
    },
    {
        question: "What is the file extension of a C++ program?",
        answers: [
            { text: ".cpp", correct: true },
            { text: ".c", correct: false },
            { text: ".py", correct: false },
            { text: ".exe", correct: false },
        ]
    }
];

const queEle = document.getElementById('que');
const ansbtns = document.getElementById('ans');
const nextbtn = document.getElementById('next');
const scoreEle = document.getElementById('score');
const timerEle = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, score, timer;

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    scoreEle.innerText = 'Score: 0';
    nextbtn.innerText = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = shuffledQuestions[currentQuestionIndex];
    queEle.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        ansbtns.appendChild(button);
    });
    timer = 10;
    timerEle.innerText = `Time Left: ${timer}s`;
    startTimer();
}

function resetState() {
    while (ansbtns.firstChild) {
        ansbtns.removeChild(ansbtns.firstChild);
    }
}

function selectAnswer(correct) {
    clearInterval(timerInterval);
    if (correct) {
        score++;
        scoreEle.innerText = `Score: ${score}`;
    }
    ansbtns.childNodes.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === 'Answer') {
            btn.classList.add(correct ? 'correct' : 'incorrect');
        }
    });
    nextbtn.style.display = 'block';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerEle.innerText = `Time Left: ${timer}s`;
        if (timer === 0) {
            clearInterval(timerInterval);
            selectAnswer(false);
        }
    }, 1000);
}

function showScore() {
    queEle.innerText = `Your Final Score: ${score}/${shuffledQuestions.length}`;
    nextbtn.innerText = 'Restart Quiz';
    nextbtn.addEventListener('click', startQuiz);
}

function showScore() {
    resetState();
    if (score === questions.length) {
        queEle.innerHTML = `Congratulations! You got all questions correct!`;
    } else if (score >= questions.length / 2) {
        queEle.innerHTML = `Well done! You got ${score} out of ${questions.length} correct!`;
    } else {
        queEle.innerHTML = `You scored ${score} out of ${questions.length}. Better luck next time!`;
    }
    nextbtn.innerHTML = "Attempt Again";
    nextbtn.style.display = "block";
}


nextbtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

startQuiz();
