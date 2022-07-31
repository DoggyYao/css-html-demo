const doc = document;

const image = doc.querySelector('.image'); // 获取图片容器的元素
const zoom = doc.querySelector('.zoom'); // 获取放大镜区域的元素
const zoomImage = doc.querySelector('.zoom-image'); // 获取放大镜区域中的img元素
const imagesSrc = doc.querySelectorAll('img'); // 获取所有的img标签的元素

let clearSrc;
let zoomLevel = 1; // 放大的程度

// 图片数组
const images = [
    './image/1.jpg',
    './image/2.jpg',
    './image/3.jpg',
    './image/4.jpg',
    './image/5.jpg',
    './image/6.jpg'
];

// 随机选择一张图片
let img = images[Math.floor(Math.random() * images.length)];
// 将随机选出的图片放到图片区域显示
imagesSrc[0].setAttribute('src', img);

// 【鼠标事件】
// 当鼠标移动到image上时，会触发 mouserover 事件
image.addEventListener('mouseover', enterImage);
// 当鼠标移出image时，会触发 mouseout 事件
image.addEventListener('mouseout', leaveImage);
// 当鼠标在image上移动时，会触发 mousemove 事件
image.addEventListener('mousemove', move);
// 在 image 上鼠标滚轮滚动时会触发 wheel 事件
image.addEventListener('wheel', scrollWheel);

/**
 * 鼠标进入到图片区域
 */
function enterImage(event) {
    // 显示 zoom 区域
    zoom.classList.add('show', 'loading');

    clearTimeout(clearSrc);

    let x, y;
    // client: 客户端坐标
    x = event.clientX;
    y = event.clientY;
    // 设置放大区域的位置(offsetWidth: 放大区域的宽)
    zoom.style.left = `${ x - zoom.offsetWidth / 2 }px`;
    zoom.style.top = `${ y - zoom.offsetHeight / 2 }px`;

    // 设置放大区域的图片
    zoomImage.setAttribute('src', img);
    //
    zoomImage.onload = function() {
        setTimeout(() => {
            zoom.classList.remove('loading');
        }, 500);
    }
}

/**
 * 鼠标离开图片区域
 */
function leaveImage(evnet) {
    zoom.style.transform = null;
    zoomLevel = 1;
    // 移除 show 样式
    zoom.classList.remove('show');
    // 0.25s 之后移除放大镜图片
    clearSrc = setTimeout(() => {
        zoomImage.setAttribute('src', '')
    }, 250);
}

/**
 * 鼠标在图片区域移动
 */
function move(event) {
    event.preventDefault();

    let x, y;
    // client: 客户端坐标
    x = event.clientX;
    y = event.clientY;

    // 设置放大区域的位置(offsetWidth: 放大区域的宽)
    zoom.style.left = `${ x - zoom.offsetWidth / 2 }px`;
    zoom.style.top = `${ y - zoom.offsetHeight / 2 }px`;

    // 这里求出的时鼠标所在位置的比例 鼠标的坐标 x - image区域坐标 x = 鼠标在图片区域中的一个相对x坐标
    // this 指向的是 image
    let zx =  (x - this.offsetLeft) / this.offsetWidth,
        zy = (y - this.offsetTop) / this.offsetHeight;
        
    // 放大镜效果
    let zoomLeft = -zx * zoomImage.offsetWidth + (zoom.offsetWidth / 2),
        zoomTop = -zy * zoomImage.offsetHeight + (zoom.offsetHeight / 2);

    zoomImage.style.left = `${ zoomLeft }px`;
    zoomImage.style.top = `${ zoomTop }px`;
}

/**
 * 图片区域鼠标滚轮滚动
 */
function scrollWheel(event) {
    event.preventDefault();

    // 设置放大级别
    event.deltaY > 0 ? zoomLevel-- : zoomLevel++;
    // 最小缩放到1倍
    if (zoomLevel < 1) {
        zoomLevel = 1;
    }
    // 最大放大倍数为5
    if (zoomLevel > 5) {
        zoomLevel = 5;
    }

    zoom.style.transform = `scale(${ zoomLevel })`;
} 