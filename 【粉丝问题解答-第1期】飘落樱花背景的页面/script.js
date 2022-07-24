const canvas = document.querySelector('canvas');

// innerWidth: 视口宽度
canvas.width = window.innerWidth;
// innerWidth: 视口高度
canvas.height = window.innerHeight;
// 使用2d绘图的上下文
const ctx = canvas.getContext('2d');

// 定义花瓣数量
const TOTAL = 70;
// 花瓣数组
const petalArray = [];


// 加载花瓣图片
const petalImg = new Image();
petalImg.src = './image/petal.png';
// 待图片加载完毕，将100个花瓣类的实例放到花瓣数组petalArray中
petalImg.addEventListener('load', () =>{
    for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal());
    };
    render();
})

/**
 * 定义渲染的方法
 */
function render() {
    // 清除页面内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach(petal => petal.animate());
    // 该方法会高速浏览器在重绘之前调用指定的函数
    // 这样可以保证在浏览器的刷新频率下去更新动画；
    window.requestAnimationFrame(render);
}

// 监听浏览器窗口大小变化，重新设置canvas的宽高
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouseX = 0;
function touchHandler(e) {
    mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
}
window.addEventListener('mousemove', touchHandler);
window.addEventListener('touchmove', touchHandler);

/**
 * 定义花瓣类
 */
class Petal {
    // 构造方法 
    constructor() {
        // 位置随机生成
        this.x = Math.random() * canvas.width;
        this.y = (Math.random() * canvas.height * 2) - canvas.height;
        // 花瓣宽高随机生成
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        // 透明度
        this.opacity = this.w / 40;
        // 旋转角度
        this.flip = Math.random();
        // 速度初始化
        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1;
        this.flipSpeed = Math.random() * 0.03;
    }

    // 绘图
    draw() {
        // 当花瓣超过边界，重新设置其位置、速度和旋转角度
        if (this.y > canvas.height || this.x > canvas.width) {
             this.x = -petalImg.width;
             this.y = (Math.random() * canvas.height * 2) - canvas.height;
             this.xSpeed = 1.5 + Math.random() * 2;
             this.ySpeed = 1 + Math.random() * 1;
             this.flip = Math.random();
        }
        // 设置整个canvas透明度基数
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
        )
    }

    animate() {
        this.x += this.xSpeed + mouseX * 5;
        this.y += this.ySpeed + mouseX * 2;
        this.flip += this.flipSpeed;
        this.draw();
    }
}