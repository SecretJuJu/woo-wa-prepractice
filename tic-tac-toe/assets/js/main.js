const Errors = {
    NoError: 0,
    AlreadyExist: 1,
    NotValidated: 2
}

const shapeType = {
    null: 0,
    circle: 1,
    x: 2
}

const resultType = {
    draw: 1,
    confirmed: 2
}



class GameTable {
    maxTurn = 3 * 3
    table
    turn = 1
    score
    constructor() {
        this.initGame()
    }
    initGame = () => {
        this.score = {
            circle: 0,
            x: 0
        }
        this.table = [
            [0,0,0],[0,0,0],[0,0,0]
        ]
        this.turn = 1
    }
    resetGame = () => {
        this.table = [
            [0,0,0],[0,0,0],[0,0,0]
        ]
        this.turn = 1
        this.saveGame()
    }
    resetScore = () => {
        this.score = {
            circle: 0,
            x: 0
        }
    }
    newGame = () => {
        this.initGame()
        this.saveGame()
    }
    saveGame = () => {
        localStorage.setItem("table", JSON.stringify(this.table))
        localStorage.setItem("turn", JSON.stringify(this.turn))
        localStorage.setItem("score", JSON.stringify(this.score))
    }
    loadGame = () => {
        this.table = JSON.parse(localStorage.getItem("table"))
        this.turn = JSON.parse(localStorage.getItem("turn"))
        this.score = JSON.parse(localStorage.getItem("score"))
    }
    pickField = (x,y, playerShape) => {
        // filtering
        if (
            !(x >= 0 && x <= 2 && y >= 0 && y <= 2 
                && 
            (playerShape === "circle" || playerShape === "x"))
                &&
            this.turn <= this.maxTurn
            ) {
            return Errors.NotValidated
        }
        if (this.table[y][x] !== shapeType.null) {
            return Errors.AlreadyExist
        }
        this.table[y][x] = (playerShape === "circle")? shapeType.circle: shapeType.x
        this.turn += 1
        return 0
    }
    checkResult = () => {
        const table = this.table
        const turn = this.turn
        if (
            (table[0][0] == table[1][1] && table[0][0] == table[2][2] && table[0][0] !== shapeType.null) || 
            (table[0][2] == table[1][1] && table[0][2] == table[2][0] && table[0][2] !== shapeType.null)
        ) {
            return resultType.confirmed;
        } //대각선으로 빙고가 생기는지 확인
     
        for (let line = 0; line <= 2; line++) {
            if (
                (table[line][0] == table[line][1] && table[line][0] == table[line][2] && table[line][0] !== shapeType.null) || 
                (table[0][line] == table[1][line] && table[0][line] == table[2][line] && table[0][line] !== shapeType.null)
            ) {
                return resultType.confirmed;
            } //가로, 세로줄로 빙고가 생기는지 확인, line은 각 가로, 세로줄의 줄 번호 
        }
     
        if (turn >= 10) {
            return resultType.draw;
        }
    }
    
}

const gameTable = new GameTable()

let displayScore

const fieldOnClickHandler = (event) => {
    // 좌표 구하기
    const id = event.currentTarget.id
    const x = parseInt(id.split(' ')[0])
    const y = parseInt(id.split(' ')[1])
    let player
    if (gameTable.turn % 2 === 0) { // 짝수턴
        player = "circle"
    } else {
        player = "x"
    }
    gameTable.pickField(x,y,player)
    event.currentTarget.classList.add(player)
    result = gameTable.checkResult(gameTable.table,gameTable.turn)
    if (result === resultType.draw){
        alert("draw!")
        resetHandler()
    } else if (result === resultType.confirmed) {
        alert(`${player} was won!`)
        gameTable.score[player] += 1
        resetHandler()
        displayScore(gameTable.score.circle,gameTable.score.x)
    }
    
    gameTable.saveGame()
    
}



const resetHandler = (event) => {
    gameTable.resetGame()
    drawTable(gameTable.table)
}

const newGameHandler = (event) => {
    gameTable.newGame()
    drawTable(gameTable.table)
    displayScore(gameTable.score.circle,gameTable.score.x)
}

const drawTable = (table) => {
    table.forEach((row,y) => {
        row.forEach((shape,x) => {
            const target = document.getElementById(`${x} ${y}`)
            if (shape === shapeType.null) {
                target.className = "game-table-field"
                return
            }
            let shapeString
            if (shape === shapeType.circle) {
                shapeString = "circle"
            } else {
                shapeString = "x"
            }
            target.classList.add(shapeString)
            
        })
    })
}



window.onload = () => {
    const savedTable = localStorage.getItem("table")
    const savedTurn = localStorage.getItem("turn")
    const savedScore = localStorage.getItem("score")

    if (savedTable && savedTurn && savedScore) {
        gameTable.loadGame()
        drawTable(gameTable.table)
    }

    displayScore = (circleScore, xScore) => {
        const circleScoreEl = document.querySelector(".score .o-user")
        const xScoreEl = document.querySelector(".score .x-user")
        circleScoreEl.innerText = circleScore
        xScoreEl.innerText = xScore
    }
    displayScore(gameTable.score.circle, gameTable.score.x)
}