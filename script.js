'use strict'

// ? Global variables
const boxSelect = [...document.querySelectorAll('.box')]    //Selects all the boxes and stores them in an array
const btnNewGame = document.querySelector('.start')
const btnRestart = document.querySelector('.reset')
const message = document.querySelector('.message')
const images = [...document.querySelectorAll('.image')]     //Selects all the images and stores them in an array
const container = document.querySelector('.container')      //Selects container of the boxes
let random;
let clicked = false    //Checks if any image box is clicked previously?
let firstImage;        //Stores the previous image clicked if any
let firstIndex;        //Stores the index of previous image clicked
let clearedBox = []    //Stores the indices of images that are matched and cleared
let gameOn = false     //To ensure that click on boxes are only executed once player starts the game 

// ? Global Functions
const randomAssigner = function () {
    let random1 = [];
    let random2 = [];
    const randomGenerator = function (arr) {
        //This function pushes 0 to 9 unique random numbers into arr array
        for (let i = 0; i < 10; i++) {
            let number = Math.trunc(Math.random() * 10)
            let cond = true
            while (cond) {
                if (!arr.includes(number)) {
                    arr.push(number);
                    cond = false
                } else number = Math.trunc(Math.random() * 10)
            }
        }
    }
    randomGenerator(random1);
    randomGenerator(random2);
    return random1.concat(random2);
}


// ? When user click play button generate random images and display them

const gameStart = function () {
    // Set up new game
    images.forEach(img => img.classList.remove('visible'));
    clicked = false;
    boxSelect.forEach(box => box.classList.remove('clear'));
    clearedBox = [];

    // Random images appear in each box
    random = randomAssigner(); //random will have now 0 to 9 values two times and total 20 items
    random.forEach((num, i) => {
        images[i].src = `Images/img${num + 1}.jpg`;  //This will add img$ to src of images[i] 
        images[i].classList.add('visible');
    })


    // Display message
    message.textContent = 'Game starts in 5 sec...'
    // Hide images after time completion and change message
    setTimeout(function () {
        images.forEach(img => img.classList.remove('visible'));
        message.textContent = 'Start making pairs';
        gameOn = true;
    }, 5000)
}


// ! Event handlers
btnNewGame.addEventListener('click', gameStart)

// ? When user clicks on box of image, make image visible and check if both are same
boxSelect.forEach(function (box, i) {
    box.addEventListener('click', function () {
        if (gameOn) {
            if (!clicked && !clearedBox.includes(i)) {
                images[i].classList.add('visible')
                firstImage = random[i]; //Because random contains same value as of image
                firstIndex = i;
                clicked = true

            } else if (!clearedBox.includes(i)) {  //If clicked is true i.e. one image have been clicked
                images[i].classList.add('visible')
                if (random[i] === firstImage) {
                    setTimeout(function () {
                        boxSelect[i].classList.add('clear')
                        boxSelect[firstIndex].classList.add('clear')
                        images[i].classList.remove('visible')
                        images[firstIndex].classList.remove('visible')
                        clearedBox.push(i)
                        clearedBox.push(firstIndex)
                        if (clearedBox.length === 20) message.textContent = 'You win!'  //If all boxes are cleared you win
                    }, 400)
                } else {
                    setTimeout(function () {
                        images[i].classList.remove('visible')
                        images[firstIndex].classList.remove('visible')
                    }, 400)
                }
                clicked = false
            }
        }
    })
})

