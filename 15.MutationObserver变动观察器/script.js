const doc = document;

class WaterMark {

    constructor() {
        this.pattern = doc.querySelector('#pattern');
        this.waterMark = doc.querySelector('#water-mark');
        // 获取 pattern 的上下文
        this.patternCtx = this.pattern.getContext('2d');
        // 获取 水印区域 的上下文
        this.waterMarkCtx = this.waterMark.getContext('2d');

        this.init();
    }

    /**
     * 初始化
     *  1. 画 pattern 模式
     *  2. 画 水印
     *  3. 屏幕尺寸自适应重绘
     */
    init() {
        this.drawPattern(this.patternCtx);
        this.drawWaterMark(this.waterMarkCtx);
        this.resize();
    }

    /**
     * 画单个水印
     */
    drawPattern(ctx) {
        // 单个水印的宽高
        const width = 120, height = 80;
        const text = 'yao大叔';
        // 清空一块矩形区域，这块区域用来写单个水印的内容
        ctx.clearRect(0, 0, width, height);
        // 设置字体和大小
        ctx.font = 'bold 32px Microsoft Yahei';
        // 设置水印颜色
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        // 旋转
        ctx.rotate(-Math.PI / 180 * 30);
        // 设置内容和坐标(0, 80)
        ctx.fillText(text, -10, 120);
        // 这个单个水印不需要显示，隐藏
        this.pattern.style.display = 'none';
    }

    /**
     * 将单个水印平铺到整个页面
     */
     drawWaterMark(ctx) {
        // 获取 <body> 宽高
        const clientWidth = doc.body.clientWidth;
        const clientHeight = doc.body.clientHeight;

        this.waterMark.width = clientWidth;
        this.waterMark.height = clientHeight;

        // 绘图前先对区域内的内容进行清场（即 清除矩形区域内的内容）
        ctx.clearRect(0, 0, clientWidth, clientHeight);

        // createPattern: 在指定的方向内重复指定的元素。元素可以是图片、视频，或者其他 <canvas> 元素。
        // 在这里的效果就是将我们单个的水印 pattern 平铺满整个屏幕
        const pattern = ctx.createPattern(this.pattern, 'repeat');

        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, clientWidth, clientHeight);
    }

    /**
     * // 监听浏览器窗口大小变化，重绘水印
     */
     resize() {
        window.addEventListener('resize', () => {
            this.drawWaterMark(this.waterMarkCtx);
        });
    }




}

new WaterMark();