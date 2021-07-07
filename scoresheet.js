
let participants = JSON.parse(localStorage.getItem("scoresheet")) || [];
let tableBody = document.querySelector("#table-body")
let clearscore = document.querySelector("#js-clear")

function showScoresheet() {
    for (var x = 0; x < participants.length; x++) {
        var records = document.createElement("tr");
        var name = document.createElement("td");
        var score = document.createElement("td");
        name.setAttribute("style", "padding-top: 1rem;  padding-bottom: 1rem; padding-left: 2rem; padding-right: 2rem;   border-width: 1px; ");
        score.setAttribute("style", "padding-top: 1rem;  padding-bottom: 1rem; padding-left: 2rem;  padding-right: 2rem;   border-width: 1px; ");
        name.innerHTML = `${participants[x].name}`;
        score.innerHTML = `${participants[x].score}`;
        records.appendChild(name);
        records.appendChild(score);
        tableBody.appendChild(records)
    }
}

showScoresheet();


clearscore.addEventListener("click", () => {
   
    localStorage.clear();
    tableBody.innerHTML="";
});



