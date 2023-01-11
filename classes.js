class Sprite {
    constructor({position, velocity, image, frames = {max : 1}, sprites = [] }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
         }
        this.moving = false
        this.sprites = sprites
    }
    draw( ){
        c.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max, // frames will represent how many times the image needs to be cut, think about if you have more than one sprite on a sheet, this solves that problem by splitting them by the amount you have
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        if (!this.moving) return 

        if (this.frames.max > 1) { 
            this.frames.elapsed++ 
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0 
        }
    }}

class Boundary {
    static width = 64 // the calculation is the pixel width * the zoom factor you imported the picture in from tiled (16 pixels * 4(00%) zoom)
    static height = 64
    constructor({position}) {
        this.position = position 
        this.width = Boundary.width // referrancing the static values of the class 
        this.height = Boundary.height // referrancing the static values of the class 
    }

    draw() {
        c.fillStyle = 'rgba(0,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}