let startButton = document.querySelector(".start-button");
let answers = document.querySelector(".answers");
let quizBody = document.querySelector(".Quiz-body")
let ul = document.createElement("ul");
let counter = document.querySelector(".count");
let result = document.querySelector("#feedback");
let scoreSheet = document.querySelector("#Highscore");
let time = 40;
let count = 0;
let score = 0;
let endQuiz = false;
let participants = JSON.parse(localStorage.getItem("scoresheet")) || [];

function setTitle(title) {
    document.querySelector(".js-title").textContent = title
}

function startTimer() {
    let timer = setInterval(function() {
            if (time <= 0 || endQuiz) {
                counter.textContent = 0;
                clearInterval(timer);
                checkScore();
                addToScoreSheet();
                return
            }
            counter.textContent = time;
            time--;
        },
        1000);

}

function startQuiz() {
    startTimer();
    renderQuestionAndAnswer(0);

}

function checkAnswer(questionNum, answer) {
    let question = Questions[questionNum];
    if (answer === question.answer) {
        score = score + 5;
        msg = "Correct!"
        renderResult(msg);

    } else {
        time = time - 10;
        //counter.textContent = time;
        msg = "Wrong!"
        renderResult(msg);

    }
    localStorage.setItem("score", score);
}

function checkScore() {
    answers.innerHTML = "";
    ul.innerHTML = "";
    finalScore = localStorage.getItem("score");
    setTitle(" your final Score is " + finalScore);
}


function renderQuestionAndAnswer(i) {
    answers.innerHTML = "";
    ul.innerHTML = "";
    var selectedQuestion = Questions[i];
    setTitle(selectedQuestion.question);
    var choiselist = selectedQuestion.choices;
    for (var index = 0; index < choiselist.length; index++) {
        let li = `<li data-index="${index}">
            <button>${choiselist[index].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</button>
        </li>`
        ul.insertAdjacentHTML('beforeend', li);
    }
    answers.appendChild(ul)
}

function renderResult(message) {
    result.textContent = message;
    setTimeout(() => {
        result.textContent = "";

    }, 1000);

}

function addToScoreSheet() {
    //template litterals
    let playerInfo = `<div id="Highscore">
        <input type="text" id="name" placeholder="Enter initials"/>
        <button id="submit-button">Add to Score Sheet</button>
    </div>`;
    quizBody.insertAdjacentHTML('beforeend', playerInfo)


}


quizBody.addEventListener("click", (e) => {

    var element = e.target.textContent;
    if (element === startButton.textContent) {
        startQuiz();
    }
});

ul.addEventListener("click", (event) => {
    //maybe in
    if (count === Questions.length - 1) {
        endQuiz = true;
        return
    }
    var element = event.target;
    if (element.matches("button") === true) {
        count++;
        checkAnswer(count - 1, event.target.textContent);
    }

    renderQuestionAndAnswer(count);


});

quizBody.addEventListener("click", (e) => {
    e.preventDefault();
    //why not .match ??  ex . js-className
    if (e.target.matches("#submit-button")) {
        var name = document.querySelector("#name").value;
        localStorage.setItem("name", name);
        participants.push({
            name, //same as `name: name`
            score: localStorage.getItem("score")
        });
        // to be disscused
        localStorage.setItem("scoresheet", JSON.stringify(participants));
        showScoresheet()
    } else if (e.target.matches('.js-clear')) {
        localStorage.clear('scoresheet')
        document.querySelector('.records').innerHTML = ''
    } else if (e.target.matches('.js-reload')) {
        answers.innerHTML = `<p>Press the button below to start the game. Incorrect answers incur a time penalty!</p>
        <button class="start-button ">Start Quiz</button>`
    }
});

function showScoresheet() {
    setTitle("Score Sheet");
    var records = document.createElement("ul");
    records.setAttribute('class', 'records')
    participants.forEach((p) => records.insertAdjacentHTML('beforeend', `<li>${p.name} <strong>${p.score}</strong></li>`))
    quizBody.appendChild(records);
    quizBody.insertAdjacentHTML('beforeend', `<button class="js-clear">Clear Score</button>`)
    quizBody.insertAdjacentHTML('beforeend', `<button class="js-reload">Play Again ?</button>`)
        // for (var x = 0; x < participants.length; x++) {
        // var playerRecord = document.createElement("li");
        // playerRecord.innerHTML = `${participants[x].name} <strong>${participants[x].score}</strong>`;
        // records.appendChild(playerRecord);
        // }
}

document.querySelector('.js-showscore').addEventListener('click', showScoresheet)
document.querySelector('.js-showscore').addEventListener('click', showScoresheet)