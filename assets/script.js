const questions = [
    {
        question: "O que significa CSS?",
        options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["<link>", "<a>", "<href>"],
        answer: "<a>"
    },
    {
        question: "Como selecionar um elemento com id 'exemplo' no JavaScript?",
        options: [
            "document.query('#exemplo')",
            "document.getElementById('exemplo')",
            "getElement('exemplo')"
        ],
        answer: "document.getElementById('exemplo')"
    },


    {
        question: "Qual é o sistema operacional desenvolvido pela Microsoft?",
        options: ["Linux", "Windows", "MacOS"],
        answer: "Windows"
    },
    {
        question: "Qual dessas linguagens é usada principalmente para estilizar páginas web?",
        options: ["HTML", "Python", "CSS"],
        answer: "CSS"
    },
    {
        question: "Qual ferramenta é usada para versionamento de código?",
        options: ["Git", "Docker", "Apache"],
        answer: "Git"
    },
    {
        question: "O que é um algoritmo?",
        options: [
            "Uma sequência de instruções",
            "Um tipo de computador avançado",
            "Um erro de sistema"
        ],
        answer: "Uma sequência de instruções"
    },
    {
        question: "Qual desses navegadores é baseado no Chromium?",
        options: ["Mozilla Firefox", "Google Chrome", "Safari"],
        answer: "Google Chrome"
    },
    {
        question: "O que significa CPU?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Control Program Utility"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Qual desses é um banco de dados?",
        options: ["MySQL", "HTML", "Angular"],
        answer: "MySQL"
    },
    {
        question: "Qual dessas linguagens é mais usada em back-end?",
        options: ["CSS", "JavaScript", "Java"],
        answer: "Java"
    },
    {
        question: "O que significa HTML?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyperlink Model Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Qual protocolo é usado para acessar sites de forma segura?",
        options: ["FTP", "HTTP", "HTTPS"],
        answer: "HTTPS"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const progressFill = document.getElementById('progress-fill');

loadQuestion();

submitBtn.addEventListener('click', checkAnswer);

function loadQuestion() {
    resultEl.textContent = '';
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = progress + "%";

    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));

        optionsContainer.appendChild(label);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (!selectedOption) {
        resultEl.textContent = 'Por favor, selecione uma opção.';
        resultEl.style.color = 'red';
        return;
    }

    const answer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    Array.from(optionsContainer.children).forEach(label => {
        const input = label.querySelector('input');

        if (input.value === correctAnswer) {
            label.classList.add('correct');
        } else if (input.value === answer) {
            label.classList.add('incorrect');
        }
    });

    if (answer === correctAnswer) {
        score++;
        resultEl.textContent = 'Correto!';
        resultEl.style.color = 'green';
    } else {
        resultEl.textContent = `Errado! A resposta correta é: ${correctAnswer}`;
        resultEl.style.color = 'red';
    }

    submitBtn.disabled = true;

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            submitBtn.disabled = false;
        } else {
            showFinalResults();
        }
    }, 2000);
}

function showFinalResults() {
    questionEl.textContent = 'Quiz Concluído!';
    optionsContainer.innerHTML = '';

    submitBtn.style.display = 'none';

    progressFill.style.width = "100%";

    resultEl.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    resultEl.style.color = 'black';
}