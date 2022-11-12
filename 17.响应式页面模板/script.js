const doc = document;


const bread = doc.querySelector('#bread'); // 面包按钮
const drop = doc.querySelector('#drop'); // 下拉菜单

doc.addEventListener('click', e => {
    drop.classList.remove('drop-show');
});

// 点击事件, 显示/隐藏下拉菜单
bread.addEventListener('click', e => {
    e.stopPropagation();
    drop.classList.toggle('drop-show');
});


// // 监听页面尺寸变化，动态修改 html 下 font-size 大小
// window.onresize = () => {
//     setHtmlFontSize();
// };

// function setHtmlFontSize() {
//     const clientWidth = doc.body.clientWidth; // 获取 body 宽度
//     doc.querySelector('html').style.fontSize = clientWidth / 100 + 'px';
// }

// // 页面初始化时执行一次
// setHtmlFontSize();