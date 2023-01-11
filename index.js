const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1440
canvas.height = 640

const collisionMap = [] // storing the collision map in an array 
for (let i = 0; i < collisions.length; i += 90) {
    collisionMap.push(collisions.slice(i, 90 + i))
} // looping through the json file pulled from Tiled with the collision data. This for loop with create the rows to represent the same thing you see in Tiled. In the calculation you will see the 90 limit, that is the amount of tiles used to create the map. Going through the json data and creating an array with arrays in it 

const boundries = []
const offset = {
    x: -900,
    y: -900
}

collisionMap.forEach((row, i) => { // i represents the current index of the row we are on 
    row.forEach((symbol, j) => { // j represents the entry in the array we are on in the corresponding row 
        if (symbol == 1610614388 || symbol == 1652) {
            boundries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

// images and store constants 
const backgroundimage = new Image()
backgroundimage.src = './Images/RPGMap.png'
const layerTrees = new Image()
layerTrees.src = './Images/Trees.png'
const playerDownimage = new Image()
playerDownimage.src = './Images/playerDown.png'
const playerUpimage = new Image()
playerUpimage.src = './Images/playerUp.png'
const playerLeftimage = new Image()
playerLeftimage.src = './Images/playerLeft.png'
const playerRightimage = new Image()
playerRightimage.src = './Images/playerRight.png'

// canvas.width / 2 - this.image.width / 4 / 2,
// canvas.height / 2 - this.image.height / 2,

// all objects under the title Sprite 
const player = new Sprite({
    position: {
        x: (canvas.width / 2) - (192 / 4 / 2), // this calculation will put the character in the center of the screen in the first sum (1440 / 2 will get us to the center of the screen) and the second sum will have us seperate the sprites in the image. The image will include four different sprites and that means that we will need to do the calculation (192 (width of the pixel of the image) / 4 (amount of sprites on one image) / 2 (this is to get to the center of the single character image))
        y: canvas.height / 2 - 68 / 2 // this calculation will put the character in the center of the screen in the first sum (720 / 2 will get us to the center of the screen) and the second sum will have us seperate the sprites in the image. The image will include four different sprites and that means that we will need to do the calculation (68 (height  of the pixel of the image) / 4 (amount of sprites on one image) / 2 (this is to get to the center of the single character image))
    }, 
    image: playerDownimage, // this will be the image of the character that has been stored in a seperate object 
    frames: {
        max: 4 // amoutn of character frames in one image 
    }, 
    sprites: {
        up: playerUpimage,
        down: playerDownimage, 
        left: playerLeftimage,
        right: playerRightimage
    }
})
const background = new Sprite({
    position: {
        x: offset.x, // offset that will have us placed in the right spot on the map 
        y: offset.y // offset that will have us placed in the right spot on the map 
    },
    image: backgroundimage
})
const Trees = new Sprite({
    position: { x: offset.x, y: offset.y},
    image: layerTrees
})

// variables used 
const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle2.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle2.height >= rectangle2.position.y
    )
}

const moveables = [background, Trees, ...boundries] // variable storing all objects that need to be moved in the scene
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    Trees.draw()

    let moving = true
    player.moving = false
    // console.log(moving) debugging 
    if (keys.w.pressed == true && lastpressed == 'w'){
        player.moving = true
        player.image = player.sprites.up

        boundries.forEach(boundary => {
            if (rectangularCollision({ 
                rectangle1: player, 
                rectangle2: 
                    {...boundary, 
                        position: {
                            x: boundary.position.x, 
                            y: boundary.position.y + 3}
                    }
                })) // end of if condition (function rectangleCollision)
                { // start of if statement 
                    moving = false // setting the movement to false to disable moving everytime collision is detected 
                    return
                } // end of if statement 
            }
        )
        if (moving == true){
            moveables.forEach((moveable) => {
                moveable.position.y += 3})
        } // end of checking moving statement 
    } // end of w pressed statement 
    else if (keys.s.pressed == true && lastpressed == 's'){
        player.moving = true
        player.image = player.sprites.down

        boundries.forEach(boundary => {
            if (rectangularCollision({ 
                rectangle1: player, 
                rectangle2: 
                    {...boundary, 
                        position: {
                            x: boundary.position.x, 
                            y: boundary.position.y - 3}
                    }
                })) // end of if condition (function rectangleCollision)
                { // start of if statement 
                    moving = false // setting the movement to false to disable moving everytime collision is detected 
                    return
                } // end of if statement 
            }
        )
        if (moving == true){
            moveables.forEach((moveable) => {
                moveable.position.y -= 3})
        } // end of checking moving statement 
    } // end of a pressed statement 
    else if (keys.a.pressed == true && lastpressed == 'a'){
        player.moving = true
        player.image = player.sprites.left

        boundries.forEach(boundary => {
            if (rectangularCollision({ 
                rectangle1: player, 
                rectangle2: 
                    {...boundary, 
                        position: {
                            x: boundary.position.x + 3, 
                            y: boundary.position.y}
                    }
                })) // end of if condition (function rectangleCollision)
                { // start of if statement 
                    moving = false // setting the movement to false to disable moving everytime collision is detected 
                    return
                } // end of if statement 
            }
        )
        if (moving == true){
            moveables.forEach((moveable) => {
                moveable.position.x += 3})
        } // end of checking moving statement 
    } // end of a pressed statement 
    else if (keys.d.pressed == true && lastpressed == 'd'){
        player.moving = true
        player.image = player.sprites.right

        boundries.forEach(boundary => {
            if (rectangularCollision({ 
                rectangle1: player, 
                rectangle2: 
                    {...boundary, 
                        position: {
                            x: boundary.position.x - 3, 
                            y: boundary.position.y}
                    }
                })) // end of if condition (function rectangleCollision)
                { // start of if statement 
                    moving = false // setting the movement to false to disable moving everytime collision is detected 
                    return
                } // end of if statement 
            }
        )
        if (moving == true){
            moveables.forEach((moveable) => {
                moveable.position.x -= 3})
        } // end of checking moving statement 
    } // end of a pressed statement 

}

animate()
let lastpressed = ''

window.addEventListener( 'keydown', (e)=> {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastpressed = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastpressed = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastpressed = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastpressed = 'd'
            break
    }
})

window.addEventListener( 'keyup', (e)=> {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})