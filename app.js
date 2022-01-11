document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector(".bird")
    const gameDisplay = document.querySelector(".game-container")
    const sky = document.querySelector(".sky")
    const ground = document.querySelector(".ground")

    let birdLeft = 230
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }
    function jump() {
        if(birdBottom<490) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 100
        let obstacleBottom = randomHeight
        let topObstacleBottom = obstacleBottom + 500

        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = topObstacleBottom + 'px'

        function moveObstacle() {
            if (!isGameOver) obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -50) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if ((obstacleLeft>220 && obstacleLeft<280 && (birdBottom<150+randomHeight || birdBottom>300+randomHeight))
            || birdBottom === 0
            ) {
                gameOver();
            }
        }

        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)

    }

    let gameTimerId = setInterval(startGame, 30)
    document.addEventListener('keyup', control)
    generateObstacle()
})