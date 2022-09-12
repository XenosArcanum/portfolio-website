document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid ')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0

    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]

    // Create Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', 'true')
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundColor = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    // Drag the candies
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor
        squareIdBeingDragged = parseInt(this.id)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragover')
    }

    function dragEnter(e) {
        console.log(this.id, 'dragenter')
        e.preventDefault()
    }

    function dragLeave() {
        console.log(this.id, 'dragleave')
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundColor
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundColor = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, 'dragend')
            //what is a valid move?
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
        } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged

    }

    //
    //Drop candies after some have been cleared
    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundColor === '') {
                squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
                squares[i].style.backgroundColor = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundColor === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundColor = candyColors[randomColor]
                }
            }
        }
    }



    //
    //
    //Checking for matches//

    //Check for row of Five
    function checkRowForFive() {
        for (i = 0; i < 59; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowForFive();

    //
    //Check for column of Five
    function checkColumnForFive() {
        for (i = 0; i < 32; i++) {
            let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnForFive();

    //
    //Check for row of Four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowForFour();

    //
    //Check for column of Four
    function checkColumnForFour() {
        for (i = 0; i < 40; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnForFour();

    //
    //Check for row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowForThree();

    //Check for column of Three
    function checkColumnForThree() {
        for (i = 0; i < 48; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnForThree();


    //Match checking intervals - rework later to clear after game won/game over.
    // 
    window.setInterval(function() {
        moveDown()
        checkRowForFive();
        checkColumnForFive();
        checkRowForFour()
        checkColumnForFour();
        checkRowForThree()
        checkColumnForThree();
    }, 100)
    
})