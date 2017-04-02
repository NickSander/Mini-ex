function Ball() {
    this.r = 20
    this.vel = p5.Vector.random2D()
    this.pos = createVector(width / 2, height / 2)
    this.vel.mult(10)
    this.draw = function () {
        push()
        fill('WHITE')
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
        pop()
    }

    this.update = function (player1, player2) {
        this.pos.add(this.vel)

        if((this.pos.y >= height - this.r) || (this.pos.y <= this.r)) {
            this.hit("Y")
        }

        if(
            ((this.pos.x - this.r / 2) <= (player2.pos.x + player2.width / 2))
            &&
            (this.pos.y >= player2.pos.y - player2.height / 2) && (this.pos.y <= player2.pos.y + player2.height / 2)
        ) {
            this.hit("X", player2)
        }

        if(((this.pos.x - this.r / 2) >= (player1.pos.x - player1.width / 2))
            &&
          (this.pos.y >= player1.pos.y - player1.height / 2) && (this.pos.y <= player1.pos.y + player1.height / 2)
        ) {
            this.hit("X", player1)
        }

        if(this.pos.x >= width) {
            player1.score ++;
            this.reset()
            goal.play();
        } else if (this.pos.x <= 0) {
            player2.score ++;
            this.reset()
            goal.play();
        }

    }

    this.hit = function(axis, player) {
        if(axis === "Y") {
            this.vel.y *= -1

        } else if(axis === "X") {
            this.vel.x *= -1
            succes.play();
        }

        if(player) {
            this.vel.add(player.vel)

        }
    }

    this.reset = function() {
        var sign = random() >= .5
        this.vel.x = (sign ? -1 : 1) * random(5, 10)
        this.vel.y = random(0, 0.75)
        this.pos.x = width / 2
        this.pos.y = height / 2
    }
}
