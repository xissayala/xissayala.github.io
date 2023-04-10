const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.globalAlpha = 0.25;
const dots = [];
const maxDistance = 100;
const maxSpeed = 2;
const minSpeed = 0.5;
const dotsCount = Math.floor(canvas.width* canvas.height/5000)
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * maxSpeed * maxSpeed - maxSpeed;
        this.vy = Math.random() * maxSpeed * maxSpeed - maxSpeed;
        this.vx = Math.abs(this.vx) < minSpeed ? Math.sign(this.vx) * minSpeed : this.vx;
        this.vy = Math.abs(this.vy) < minSpeed ? Math.sign(this.vy) * minSpeed : this.vy;
        this.radius = 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy;
        }
    }

    connectDots(dots) {
        for (let i = 0; i < dots.length; i++) {
            const distance = Math.sqrt((this.x - dots[i].x) ** 2 + (this.y - dots[i].y) ** 2);

            if (distance < maxDistance) {
                ctx.beginPath();
                var alpha = Math.min(100-distance,70)/70;
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(dots[i].x, dots[i].y);
                ctx.stroke();
            }
        }
    }
}

function createDots() {
    for (let i = 0; i < dotsCount; i++) {
        const dot = new Dot(Math.random() * canvas.width, Math.random() * canvas.height);
        dots.push(dot);
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        dots[i].draw();
        dots[i].update();
        dots[i].connectDots(dots.slice(i + 1));
    }
}

createDots();
animate();
