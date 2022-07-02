const doc = document;

const btn = doc.querySelector('.open-btn');
const dialog = doc.querySelector('dialog');
const header = doc.querySelector('.header-bar');

// 点击按钮，打开弹框
btn.addEventListener('click', (e) => {
    dialog.showModal();
})

// 点击旁白区域，关闭弹框
dialog.addEventListener('click', (e) => {
    if (e.target.nodeName === 'DIALOG') {
        dialogInit();
    }
});

// 监听 esc 键，按下 esc 键关闭 dialog， 位置初始化
doc.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        dialogInit();
    }
})

// 移动弹框
header.addEventListener('mousedown', (e) => {

    // 鼠标位于弹框内的坐标
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    const dialogWidth = dialog.getBoundingClientRect().width;
    const dialogHeight = dialog.getBoundingClientRect().height;

    function mousemove(event) {
        const pageX = event.pageX;
        const pageY = event.pageY;

        // 移动后的坐标
        // 因为在css文件中设置dialog位于页面中心位置时，使用了 transform(-50%, -50%)
        // 使得 dialog 在 top: 50%; left: 50%; 的定位基础上又沿着 x, y 轴偏移了 dialog 自身宽高的50%
        // 所以这里在设置新的位置 top left 时， 应该加上 宽高的一半
        dialog.style.top = (pageY - offsetY + dialogHeight / 2) + 'px';
        dialog.style.left = (pageX - offsetX + dialogWidth / 2) + 'px';

        dialog.style.opacity = 0.2;
    }

    doc.addEventListener('mousemove', mousemove);

    // 拖动结束
    dialog.addEventListener('mouseup', (e) => {
        doc.removeEventListener('mousemove', mousemove);
        dialog.style.opacity = 1;
    })

});

// 弹框初始化
function dialogInit() {
    dialog.close();
    dialog.style.left = '50%';
    dialog.style.top = '50%';
}