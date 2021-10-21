document.getElementById("testDiv").innerHTML = "<canvas id='canvas'></canvas>";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let form = document.getElementById("start-game-form");
let buttonMenu = document.getElementById("main-menu-button");
//buttonMenu.hidden = true;

let skeletonOfTowers = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let postionCursor = 0; // 0  1  2
let widthUppedBox = 0;
let blockGame = false;
let countDisks;
let isTimerOn;
let isStepsOn;

var overlay      = document.querySelector('#overlay-modal'),
       closeButton = document.querySelector('.modal__cross'),
       modalForm = document.querySelector('.modal');

function unhideModal() {
    overlay.classList.add("active");
    modalForm.classList.add("active");
}

function hideModal() {
    modalForm.classList.remove("active");
    overlay.classList.remove("active");
}

closeButton.onclick = hideModal;

document.querySelectorAll(".menu-button").forEach(function(item){
    item.onclick = goToMenu;
    
});

document.querySelector(".restart").onclick = function() {
    blockGame = false;
    hideModal();
    createStartPosition();
}

function goToMenu() {
    blockGame = false;
    form.hidden = false;
    buttonMenu.hidden = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hideModal();
}

document.getElementById('start-game-button').onclick = function () {
    document.getElementsByName('count-disks').forEach(function(item, i, array) {
        if(item.checked) {
            countDisks = Number.parseInt(item.value);
        }
    });

    document.getElementsByName('timer').forEach(function(item, i, array) {
        if(item.checked && item.value == "on") {
            isTimerOn = true;
        }
        if(item.checked && item.value == "off") {
            isTimerOn = false;
        }
    });

    document.getElementsByName('count-steps').forEach(function(item, i, array) {
        if(item.checked && item.value == "on") {
            isStepsOn = true;
        }
        if(item.checked && item.value == "off") {
            isStepsOn = false;
        }
    });

    form.hidden = true;
    buttonMenu.hidden = false;
    createStartPosition();        

}

function createStartPosition() {
    switch(countDisks) {
        case 3:
            skeletonOfTowers = [
                [6, 4, 2, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            break;
        case 4:
            skeletonOfTowers = [
                [7, 5, 3, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            break;
        case 5:
            skeletonOfTowers = [
                [7, 6, 5, 4, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            break;
    }
    postionCursor = 0;
    updateCanvas();
}

document.addEventListener('keyup', function (event) {

    switch (event.code) {
        case "ArrowUp":
            if (widthUppedBox == 0) {
                moveUp();
            }
            break;
        case "ArrowDown":
            if (widthUppedBox !== 0) {
                moveDown();
                if(checkEndOfGame()) {
                    unhideModal();
                    blockGame = true;
                    //Вызвать окно с результатом и кнопками рестарт
                    // и меню
                }
            }
            break;
        case "ArrowLeft":
            changeCursor("left");
            break;
        case "ArrowRight":
            changeCursor("right");
            break;
    }
});

function checkEndOfGame () {
    let isSecondTowerFull = true;
    let isThirdTowerFull = true;

    skeletonOfTowers[0].forEach(function(value, index, array){
        if(value !== 0) {
            isSecondTowerFull = false;
            isThirdTowerFull = false;
        }
    });
    skeletonOfTowers[2].forEach(function(value, index, array){
        if(value !== 0) {
            isSecondTowerFull = false;
        }
    });
    skeletonOfTowers[1].forEach(function(value, index, array){
        if(value !== 0) {
            isThirdTowerFull = false;
        }
    });
    return isThirdTowerFull || isSecondTowerFull;
}

function changeCursor(direction) {
    if(direction === "left" && postionCursor !== 0) {
        postionCursor--;
    }

    if(direction === "right" && postionCursor !== 2) {
        postionCursor++;
    }

    updateCanvas();
}

function moveUp() {
    switch (postionCursor) {
        case 0:
            popArray(0);
            break;
        case 1:
            popArray(1);
            break;
        case 2:
            popArray(2);
            break;
    }
}

function moveDown() {
    switch (postionCursor) {
        case 0:
            pushArray(0);
            break;
        case 1:
            pushArray(1);
            break;
        case 2:
            pushArray(2);
            break;
    }
}

function popArray(position) {
    let tmpArray = skeletonOfTowers[position];
    for (let i = tmpArray.length - 1; i >= 0; i--) {
        if (tmpArray[i] != 0) {
            widthUppedBox = tmpArray[i];
            tmpArray[i] = 0;
            break;
        }
    }
    updateCanvas();
}

function pushArray(position) {
    let tmpArray = skeletonOfTowers[position];
    for (let i = tmpArray.length - 1; i >= 0; i--) {
        if (tmpArray[0] == 0) {
            tmpArray[0] = widthUppedBox;
            widthUppedBox = 0;
            break;
        }
        if (tmpArray[i] != 0 && tmpArray[i] > widthUppedBox) {
            tmpArray[i + 1] = widthUppedBox;
            widthUppedBox = 0;
            break;
        }
    }
    updateCanvas();
}

function updateCanvas() {
    if(blockGame) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let widthMultiplier = 5;
    let height = 5;
    let x;
    let widthCursor = 8;
    let deltaBetweenTowers = 60;
    let y0 = 100;
    let y = y0;
    let x0 = 40;
    let x1 = x0 + deltaBetweenTowers;
    let x2 = x1 + deltaBetweenTowers;
    ctx.fillStyle = "black";
    ctx.fillRect(40 - 15, 105, 30, 4);
    ctx.fillRect(40 - 2, 70, 4, 35);

    ctx.fillRect(x1 - 15, 105, 30, 4);
    ctx.fillRect(x1 - 2, 70, 4, 35);

    ctx.fillRect(x2 - 15, 105, 30, 4);
    ctx.fillRect(x2 - 2, 70, 4, 35);

    ctx.fillStyle = "orange";
    skeletonOfTowers.forEach(function (valueArray, i, skeletonOfTowers) {
        switch(i) {
            case 0:
                x=x0;
                break;
            case 1:
                x=x1;
                break;
            case 2:
                x=x2;
                break;
        }
        valueArray.forEach(function (value, i, valueArray) {
            ctx.fillRect(x - value * widthMultiplier / 2, y, value * widthMultiplier, height);  // x  y  width  height
            y -= 8;
        });
        y = y0;
    });
    if (widthUppedBox !== 0) {
        ctx.fillRect(x0 + postionCursor * deltaBetweenTowers - widthUppedBox * widthMultiplier / 2,
            20, widthUppedBox * widthMultiplier, 5);
    }
    ctx.fillStyle = "gray";
    ctx.fillRect(x0 + postionCursor * deltaBetweenTowers - widthCursor / 2, 110, widthCursor, 5);
    
}





