let startButton = document.querySelector(".start-button");
let title = document.querySelector("h1");
let answers = document.querySelector(".answers");
let quizBody = document.querySelector(".Quiz-body")
let ul = document.createElement("ul");
let counter = document.querySelector(".count");
let result = document.querySelector("#feedback");
let playerInfo = document.createElement("div");
let submitPlayer = document.querySelector("#submit-button");
let clearscore = document.querySelector(".clear-score");
let scoreSheet = document.querySelector("#Highscore");
let time = 40;
let count = 0;
let score = 0;
let endQuiz = false;
let participants = JSON.parse(localStorage.getItem("scoresheet")) || [];


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
    title.textContent = " your final Score is " + finalScore;
}


function renderQuestionAndAnswer(i) {
    answers.innerHTML = "";
    ul.innerHTML = "";
    var selectedQuestion = Questions[i];
    title.textContent = selectedQuestion.question;
    var choiselist = selectedQuestion.choices;
    for (var index = 0; index < choiselist.length; index++) {
        let li = document.createElement("li");
        button = document.createElement("button");
        li.setAttribute("data-index", index);
        button.textContent = choiselist[index];
        answers.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(button);

    }
}

function renderResult(message) {
    result.textContent = message;
    setTimeout(() => {
        result.textContent = "";

    }, 1000);

}

function addToScoreSheet() {
    //template litterals 
    answers = "";
    let input = document.createElement("input");
    let submitButton = document.createElement("button");
    input.setAttribute("placeholder", "Enter intials");
    input.setAttribute("type", "text");
    input.setAttribute("id", "name");
    playerInfo.setAttribute("id", "Highscore");
    submitButton.setAttribute("id", "submit-button");
    submitButton.textContent = "Add to Score Sheet";
    quizBody.appendChild(playerInfo);
    playerInfo.appendChild(input);
    playerInfo.appendChild(submitButton);


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
    var element = e.target.textContent;
    //why not .match ??  ex . js-className
    if (element === "Add to Score Sheet") {
        var name = document.querySelector("#name").value;
        localStorage.setItem("name", name);
        var player = {
            name: localStorage.getItem("name"),
            score: localStorage.getItem("score")
        }


        var records = document.createElement("ul");
        participants.push(player);
        // to be disscused 
        localStorage.setItem("scoresheet", JSON.stringify(participants));
        for (var x = 0; x < participants.length; x++) {
            var playerRecord = document.createElement("li");
            playerRecord.textContent = participants[x].name + participants[x].score;
            records.appendChild(playerRecord);
        }
        quizBody.textContent = "";
        let title = document.
        createElement("h1");
        title.textContent = "Score Sheet";
        quizBody.appendChild(title);
        quizBody.appendChild(records);
    }

});







//clearscore.addEventListener();