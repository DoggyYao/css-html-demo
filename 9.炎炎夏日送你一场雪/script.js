const doc = document;
const canvas = doc.querySelector('canvas');
// 获取 2D 上下文
const snowCtx = canvas.getContext('2d');

// 获取body元素宽高，并赋值给画布
canvas.width = width = window.innerWidth,
canvas.height = height = window.innerHeight;

// 常量、参数
const TOTAL = 500, // 雪花数量
        tsc = 1, // 用来设置雪花飘落效果的参数
        speed = 1; // 雪花速度
const sc = 1.3, // 用来生成雪花半径的参数
    t = 0, // 用来设置雪花飘落效果的参数
    mv = 20,
    minSpeed = 1, // 雪花最小速度
    snowArr = []; // 雪花数组，用来存放雪花实例

/**
 * 下雪
 */
function Snowy() {
    // 生成 TOTAL 数量的雪花类实例，存放到 snowArr 数组中
    for (let i = 0; i < TOTAL; i++) {
        const snowFlake = new Snowflake();
        snowArr.push(snowFlake);
    }
    render();
}

/**
 * 渲染函数
 */
function render() {
    // 清除画布内容，准备重新绘制
    snowCtx.clearRect(0, 0, width, height);
    snowArr.forEach(snowFlake => snowFlake.animate());
    // 该方法会高速浏览器在重绘之前调用指定的函数
    // 这样可以保证在浏览器的刷新频率下去更新动画；
    window.requestAnimationFrame(render);
}

/**
 * 雪花 类
 */
class Snowflake {

    /**
     * 构造方法，数据初始化
     */
    constructor() {
        this.y = Math.random() * (height + 50); // y轴坐标
        this.x = Math.random() * width; // x轴坐标
        this.t = Math.random() * (Math.PI * 2);
        this.size = (100 / (10 + (Math.random() * 100))) * sc; // 雪花半径
        this.speed = (Math.pow(this.size * 0.7, 2) * 0.15) * speed; // 雪花尺寸越大，速度越快，为了营造一种远近的层次感
        this.speed = this.speed < minSpeed ? minSpeed : this.speed;
    }

    /**
     * 绘制雪花方法
     */
    draw() {
        /* 
            创建(圆形)梯度渐变
            圆形起始区域 this.x(x轴坐标), this.y(y轴坐标), 0(半径)
            圆形结束区域 this.x(x轴坐标), this.y(y轴坐标), this.size(半径)
        */
        this.g = snowCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        /*
            设置区域渐变色
            简单理解：从圆心到圆外由白色渐渐变成白色透明
        */
        this.g.addColorStop(0, 'rgba(255, 255, 255, 1)'); // 白色，透明度1
        this.g.addColorStop(1, 'rgba(255, 255, 255, 0)'); // 白色，透明度0
        snowCtx.moveTo(this.x, this.y); // "画笔"移动到 (this.x, this.y)
        snowCtx.fillStyle = this.g;
        snowCtx.beginPath();
        // arc() 画圆
        snowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        snowCtx.fill();

        // y轴方向超出画布高度，重新设置y轴坐标
        if (this.y > height + 50) {
            this.y = -10 - Math.random() * mv;
        }
        // x轴方向超出画布高度，重新设置y轴坐标
        if (this.x > width + mv) {
            this.x = -mv;
        }
        if (this.x < -mv) {
            this.x = width + mv;
        }
    }

    /**
     * 重新设置参数
     */
    animate() {
        this.t += 0.05;
        this.t = this.t >= Math.PI * 2 ? 0 : this.t;
        this.y += this.speed; // y轴方向匀速下落
        this.x += Math.sin(this.t * tsc) * (this.size * 0.3); // 利用Math.sin()函数让雪花下落过程中水平方向产生正弦移动效果

        // 利用上述参数重绘雪花
        this.draw();
    }
}

// 监听浏览器窗口变化
window.addEventListener('resize', () => {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
});


// 调用 Snowy()，开始下雪
Snowy();