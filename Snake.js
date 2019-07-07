//Board constraint sizes
const board_dimension_x = 32*17; //32 pixels * 17 boxes
const board_dimension_y = 32*15 + 2*32; //32 pixels * 15 boxes + 3 boxes on top

state = {
    current: 0,
    playing: 0,
    end: 1
}

class Snake {
    constructor(x, y, ctx) {
        this.ctx = ctx;
        this.speed = 32;
        this.position = [
            {
                x: x,
                y: y
            }
        ];
    }

    draw() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = '#FFF';
            this.ctx.strokeStyle = (i === 0) ? 'red' : 'black'

            this.ctx.beginPath();
            this.ctx.rect(p.x, p.y, 30, 30);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    update() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            //check for collision with board
            if (p.x < 32 || p.x > board_dimension_x || p.y < 3*32 || p.y > board_dimension_y) {
                //draw box to previous state for Gui
                p.y -= 32;
                state.current = state.end;
            } else {
                if (state.current === state.playing) p.y += this.speed;
            }

            
        }
    }



}