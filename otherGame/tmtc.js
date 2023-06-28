document.getElementById("teamsInput").addEventListener('keypress', addTeam);
document.addEventListener('click', (event) => {
    console.log("X: " + event.clientX + " Y: " + event.clientY)
})

let teamList = [];


function addTeam(event) {
    let input = document.getElementById("teamsInput");
    let name = input.value;
    if (event.key === 'Enter' && name !== "") {
        input.value = "";

        addToken(name);
        placeToken(name);
        addTeamToBoard(name);
        displayDeleteAllButton();
    }
}

function addToken(team) {
    let token = document.createElement("div");
    token.id = team;
    token.className = "shape";
    moveToken(token);

    document.getElementById("tokens").appendChild(token);
    document.getElementById(team).style.background = stringToColor(team);
    teamList.push(team);
}

function placeToken(team) {
    let token = document.getElementById(team);
    token.style.left = (725 + teamList.indexOf(team) * 20).toString() + "px";
    token.style.top = "1175px";
}

function addTeamToBoard(name) {
    let team = document.createElement("div");
    let teamName = document.createElement("div");
    let deleteButton = document.createElement("button");

    team.id = name;
    teamName.className = "teamName";
    teamName.innerText = name;
    deleteButton.className = "deleteThisTeam";
    deleteButton.innerText = "Supprimer cette équipe :(";
    deleteButton.addEventListener('click', deleteTeam);

    document.getElementById("teamManager").appendChild(team);
    document.getElementById(name).appendChild(teamName);
    document.getElementById(name).appendChild(deleteButton);

    addCssStyle(name);
}

function deleteAllTeams() {
    let teamManager = document.getElementById("teamManager");
    let tokens = document.getElementById("tokens");

    while (teamManager.firstChild) {
        teamManager.removeChild(teamManager.firstChild);
        tokens.removeChild(tokens.firstChild);
    }

    hideDeleteAllButton();
}

function deleteTeam(team) {
    let kid = team.target.parentNode;
    let parent = kid.parentNode;
    parent.removeChild(kid);

    let name = kid.id;
    let tokens = document.getElementById("tokens");
    tokens.removeChild(document.getElementById(name));

    if (!parent.firstChild) {
        hideDeleteAllButton();
    }
}

function displayDeleteAllButton() {
    let deleteButton = document.getElementById("deleteAllTeams");
    deleteButton.style.display = "block";
    deleteButton.addEventListener('click', deleteAllTeams);

    document.getElementById("teamManager").style.border = "solid";
}

function hideDeleteAllButton() {
    let deleteButton = document.getElementById("deleteAllTeams");
    deleteButton.style.display = "none";

    document.getElementById("teamManager").style.border = "none";
}

function addCssStyle(name) {
    let teamStyle = document.getElementById(name).style;
    teamStyle.display = "flex";
    teamStyle.alignItems = "center";
    teamStyle.justifyContent = "space-between"
    teamStyle.backgroundColor = "gold"
}

function moveToken(token) {
    let startCoordinatesX;
    let startCoordinatesY;

    function move(t) {
        const movingX = t.clientX - startCoordinatesX;
        const movingY = t.clientY - startCoordinatesY;

        token.style.left = ((token.offsetLeft + movingX)).toString() + "px";
        token.style.top = ((token.offsetTop + movingY)).toString() + "px";

        startCoordinatesX = t.clientX;
        startCoordinatesY = t.clientY;
    }

    function stopMoving() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('click', stopMoving);
    }

    function startMoving(t) {
        startCoordinatesX = t.clientX;
        startCoordinatesY = t.clientY;

        document.addEventListener('mousemove', move);
        document.addEventListener('click', stopMoving);
    }

    token.addEventListener('dblclick', startMoving);
}

function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    return '#' + (hash & 0x00ffffff).toString(16).padStart(6, '0');
}
