const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var target;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {

   constructor(x, y, velX, velY, color, size, text) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
      this.text = text;
   }

   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   boundWall() {
      if ( width <= (this.x + this.size*3) ) {
         this.velX = -(Math.abs(this.velX));
      }

      if (this.x <= 0) {
         this.velX = Math.abs(this.velX);
      }

      if (height <= (this.y + this.size*1.5) ) {
         this.velY = -(Math.abs(this.velY));
      }

      if ((this.y + this.size) <= 0) {
         this.velY = Math.abs(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }


}

const balls = [];

while (balls.length < 1) {
   const size = 40;
   const ball = new Ball(//x y dx dy color size
      random(size, width - size),
      random(size, height - size),
      1,
      1,
      'rgb(0,0,0)',
      size,
      '待機中...'//文字列
   );
  balls.push(ball);
}


function loop() {
    ctx.fillStyle = 'rgb(0, 0, 0 )';//background
    ctx.fillRect(0, 0,  width, height);
   for (const ball of balls) {
     ball.draw();
     ball.boundWall();
   }

　　target = document.getElementById('target_element');
    target.style.left=balls[0].x+'px';
    target.style.top=balls[0].y+'px';
    addEventListener('click',function(){
        target.style.color=randomRGB();
    })

   requestAnimationFrame(loop);
}

loop();