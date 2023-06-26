var playerOne,
    playerTwo,
    playerThree,
    playerOneName,
    playerTwoName,
    playerThreeName,
    playerOneIcon,
    playerTwoIcon,
    playerThreeIcon;
var currentPlayer, currentPlayerDisplay;
var tableSize, smallSize;
var sizeSelect = document.getElementById("sizeSelect");
var table = document.getElementsByClassName("table")[0];
var board = document.getElementById("board-body");
var playerThreeIcon;
var viewportWidth = window.innerWidth;

document
    .getElementById("playerSubmitButton")
    .addEventListener("click", function (event) {
        playerOneName = document.getElementById("namePlayerOne").value;
        playerTwoName = document.getElementById("namePlayerTwo").value;
        playerThreeName = document.getElementById("namePlayerThree").value;
        tableSize = sizeSelect.item(sizeSelect.selectedIndex).value;
        smallSize = tableSize - 4;

        playerOneIcon = document.getElementById("playerOneIcon").value;
        playerTwoIcon = document.getElementById("playerTwoIcon").value;
        playerThreeIcon = document.getElementById("playerThreeIcon").value;

        if (
            playerOneName === "" ||
            playerTwoName === "" ||
            playerThreeName === ""
        ) {
            document.getElementById("errorMsgUsers").style.display = "block";
        } else if (tableSize <= 0) {
            document.getElementById("errorMsgUsers").style.display = "none";
            document.getElementById("errorMsgTable").style.display = "block";
        } else if (
            playerOneIcon === playerTwoIcon ||
            playerTwoIcon === playerThreeIcon ||
            playerOneIcon === playerThreeIcon
        ) {
            document.getElementById("errorMsgUsers").style.display = "none";
            document.getElementById("errorMsgTable").style.display = "none";
            document.getElementById("errorMsgIcon").style.display = "block";
        } else {
            document.getElementById("playerNameInput").style.display = "none";
            document.getElementById("boardHolder").classList.remove("d-none");

            playerOne = {
                name: playerOneName,
                icon: playerOneIcon,
                symbol: '<span class="' + playerOneIcon + '"></span>',
            };
            playerTwo = {
                name: playerTwoName,
                icon: playerTwoIcon,
                symbol: '<span class="' + playerTwoIcon + '"></span>',
            };
            playerThree = {
                name: playerThreeName,
                icon: playerThreeIcon,
                symbol: '<span class="' + playerThreeIcon + '"></span>',
            };
            currentPlayer = playerOne;
            currentPlayerDisplay = document.getElementById(
                "currentPlayerDisplay"
            );

            displayCurrentPlayer();

            createBoard();
        }
        event.preventDefault();
    });

// 620 px alatt nem lehet nagy táblát választani
if (viewportWidth < 620) {
    sizeSelect.options[3] = null;
}

function clickBoard() {
    if (table != null) {
        for (var i = 0; i < tableSize; i++) {
            for (var j = 0; j < tableSize; j++) {
                table.rows[i].cells[j].onclick = function () {
                    // Nem engedi, hogy ugyan oda mégegyszer tegyél
                    if (this.innerText) {
                        return;
                    }
                    tableText(this);
                    if (checkGame()) {
                        for (var i = 0; i < tableSize; i++) {
                            for (var j = 0; j < tableSize; j++) {
                                table.rows[i].cells[j].onclick = "";
                            }
                        }
                    } else {
                        if (currentPlayer == playerOne) {
                            currentPlayer = playerTwo;
                        } else if (currentPlayer == playerTwo) {
                            currentPlayer = playerThree;
                        } else {
                            currentPlayer = playerOne;
                        }
                        displayCurrentPlayer();
                    }
                };
            }
        }
    }
}

// Tábla kirajzolása
function createBoard() {
    tableSize = sizeSelect.item(sizeSelect.selectedIndex).value;
    for (var i = 0; i < tableSize; i++) {
        board.insertAdjacentHTML("beforeend", "<tr></tr>");
        var row = board.getElementsByTagName("tr")[i];
        for (var j = 0; j < tableSize; j++) {
            row.insertAdjacentHTML("beforeend", "<td></td>");
        }
    }

    clickBoard();
}

// Ikonok kirakása
function tableText(tableCell) {
    tableCell.innerHTML = currentPlayer.symbol;
}

// Aktuális játékos kiírása
function displayCurrentPlayer() {
    currentPlayerDisplay.innerHTML =
        'Most <span class="' +
        currentPlayer.icon +
        '">' +
        currentPlayer.name +
        "</span> következik";
}

function checkGame() {
    // Horizontális ellenőrzés
    for (var i = 0; i < tableSize; i++) {
        for (var j = 0; j < smallSize; j++) {
            if (table.rows[i].cells[j].innerHTML === currentPlayer.symbol) {
                if (
                    table.rows[i].cells[j + 1].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i].cells[j + 2].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i].cells[j + 3].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i].cells[j + 4].innerHTML ===
                        currentPlayer.symbol
                ) {
                    displayWinMessage();
                    return true;
                }
            }
        }
    }
    // Vertikális ellenörzés
    for (var i = 0; i < smallSize; i++) {
        for (var j = 0; j < tableSize; j++) {
            if (table.rows[i].cells[j].innerHTML === currentPlayer.symbol) {
                if (
                    table.rows[i + 1].cells[j].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 2].cells[j].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 3].cells[j].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 4].cells[j].innerHTML ===
                        currentPlayer.symbol
                ) {
                    displayWinMessage();
                    return true;
                }
            }
        }
    }
    // Jobb átlós ellenörzés
    for (var i = 0; i < smallSize; i++) {
        for (var j = 0; j < smallSize; j++) {
            if (table.rows[i].cells[j].innerHTML === currentPlayer.symbol) {
                if (
                    table.rows[i + 1].cells[j + 1].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 2].cells[j + 2].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 3].cells[j + 3].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i + 4].cells[j + 4].innerHTML ===
                        currentPlayer.symbol
                ) {
                    displayWinMessage();
                    return true;
                }
            }
        }
    }
    // Bal átlós ellenörzés
    for (var i = 4; i < tableSize; i++) {
        for (var j = 0; j < smallSize; j++) {
            if (table.rows[i].cells[j].innerHTML === currentPlayer.symbol) {
                if (
                    table.rows[i - 1].cells[j + 1].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i - 2].cells[j + 2].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i - 3].cells[j + 3].innerHTML ===
                        currentPlayer.symbol &&
                    table.rows[i - 4].cells[j + 4].innerHTML ===
                        currentPlayer.symbol
                ) {
                    displayWinMessage();
                    return true;
                }
            }
        }
    }
}

// Nyertes kiírása
function displayWinMessage() {
    currentPlayerDisplay.classList.add("winner");
    currentPlayerDisplay.innerHTML =
        "Gratulálok, a játékot <mark>" + currentPlayer.name + "</mark> nyerte!";
    document.getElementById("newGame").classList.remove("d-none");
}
