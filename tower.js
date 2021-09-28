document.getElementById("testDiv").innerHTML = "<canvas id='canvas'></canvas>";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let form = document.getElementById("start-game-form");

let skeletonOfTowers = [
    [6, 4, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let postionCursor = 0; // 0  1  2
let widthUppedBox = 0;

document.getElementById('start-game-button').onclick = function () {

}

form.hidden = true;
updateCanvas();

document.addEventListener('keyup', function (event) {

    console.log("button + " + event.code);

    switch (event.code) {
        case "ArrowUp":
            if (widthUppedBox == 0) {
                moveUp();
            }
            break;
        case "ArrowDown":
            if (widthUppedBox !== 0) {
                moveDown();
            }
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
});

function moveLeft() {
    switch (postionCursor) {
        case 1:
            postionCursor = 0;
            updateCanvas();
            break;
        case 2:
            postionCursor = 1;
            updateCanvas();
            break;

    }
}

function moveRight() {
    switch (postionCursor) {
        case 0:
            postionCursor = 1;
            updateCanvas();
            break;
        case 1:
            postionCursor = 2;
            updateCanvas();
            break;

    }
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
        if (tmpArray[i] != 0) {
            tmpArray[i + 1] = widthUppedBox;
            widthUppedBox = 0;
            break;
        }
    }
    updateCanvas();
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "orange";
    let width = 15; //35
    let height = 5;
    let x;
    let widthCursor = 8;
    let deltaBetweenTowers = 60;
    let y0 = 100;
    let y = y0;
    let x0 = 40;
    let x1 = x0 + deltaBetweenTowers;
    let x2 = x1 + deltaBetweenTowers;
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
            ctx.fillRect(x - value * 5 / 2, y, value * 5, height);  // x  y  width  height
            y -= 8;
        });
        y = y0;

    });
    if (widthUppedBox !== 0) {
        ctx.fillRect(x0 + postionCursor * deltaBetweenTowers - widthUppedBox * 5 / 2,
            20, widthUppedBox * 5, 5);
    }
    ctx.fillStyle = "gray";

    switch (postionCursor) {
        case 0:
            ctx.fillRect(x0 - widthCursor / 2, 110, widthCursor, 5);
            break;
        case 1:
            ctx.fillRect(deltaBetweenTowers + x0 - widthCursor / 2 , 110, widthCursor, 5);
            break;
        case 2:
            ctx.fillRect(2 * deltaBetweenTowers + x0 - widthCursor / 2, 110, widthCursor, 5);
            break;
    }
}





