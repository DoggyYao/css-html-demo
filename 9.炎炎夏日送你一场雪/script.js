const doc = document;
const canvas = doc.querySelector('canvas');
// 获取 2d 上下文
const snowCtx = canvas.getContext('2d');

// 获取window的宽高，赋值给画布
canvas.width = width = window.innerWidth;
canvas.height = height = window.innerHeight;

// 常量、参数
const TOTAL = 600, // 雪花数量
        tsc = 1, // 用来设置雪花飘落效果的参数
        speed = 1; // 雪花飘落速度
const sc = 1.3, // 用来生成雪花半径的参数
        t = 0, // 用来设置雪花飘落效果的参数
        mv = 20,
        minSpeed = 1, // 雪花飘落的最小速度
        snowArr = []; // 雪花数组，用来存放雪花的实例

/**
 * 下雪
 */
function Snowy() {
    // 生成 TOTAL 数量的雪花类实例，存放到 snowArr 数组中
    for (let i = 0; i < TOTAL; i++) {
        const snowFlake = new SnowFlake();
        snowArr.push(snowFlake);
    }
    // 渲染雪花
    render();
}

/**
 * 渲染函数
 */
function render() {
    // 清除画布内容，准备绘制
    snowCtx.clearRect(0, 0, width, height);
    // 遍历雪花数组，让雪花数组中的实例改变位置、速度 等参数
    snowArr.forEach(snowFlake => snowFlake.animate());
    // 该方法会让浏览器在重绘之前调用指定的函数 render
    // 这样可以保证在浏览器的刷新频率下更新动画；
    window.requestAnimationFrame(render);
}

/**
 * 雪花 类
 */
class SnowFlake {

    /**
     * 构造方法,数据初始化
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
     * 雪花绘制的方法
     */
    draw() {

        /*
            createRadialGradient：创建(圆形)梯度渐变
            圆形起始区域：this.x(x轴坐标) this.y(y轴坐标) 0(半径)
            圆形结束区域：this.x(x轴坐标) this.y(y轴坐标) this.size(半径)
        */
        this.g = snowCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        /*
            设置区域渐变色
            简单理解：从圆心到园外由白色渐渐变成白色透明效果
        */
        this.g.addColorStop(0, 'rgba(255, 255, 255, 1)'); // 白色，透明度1
        this.g.addColorStop(1, 'rgba(255, 255, 255, 0)'); // 白色，透明度0
        snowCtx.moveTo(this.x, this.y); // “画笔”移动到 (this.x, this.y) 位置，准备开始画
        snowCtx.fillStyle = this.g;
        snowCtx.beginPath(); // 开始
        // arc() 画圆（雪花）
        snowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        snowCtx.fill(); // 着色

        // y轴方向超出画布高度，重新设置雪花在y轴的坐标
        if (this.y > height + 50) {
            this.y = -10 - Math.random() * mv;
        }
        // x轴方向超出画布的宽度，重新设置雪花在x的坐标
        if (this.x > width + mv) {
            this.x = -mv;
        }
        if (this.x < -mv) {
            this.x = width + mv;
        }
    }

    /**
     * 重新设置雪花运动时的参数，包括位置、速度等
     */
    animate() {
        this.t += 0.05;
        this.t = this.t >= Math.PI * 2 ? 0 : this.t;
        this.y += this.speed; // y轴方向匀速下落
        this.x += Math.sin(this.t * tsc) * (this.size * 0.3); // 利用 Math.sin() 函数让雪花下落过程中水平方向产生正弦图形似的移动效果

        // 利用上述参数重新绘制雪花
        this.draw();
    }

}

// 监听浏览器窗口变化
window.addEventListener('resize', () => {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
});

// 调用 Snowy(), 开始下雪！
Snowy();