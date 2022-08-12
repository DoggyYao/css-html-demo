const doc = document;
const navbar = doc.querySelector('#navbar');
const dd = doc.querySelector('#dd');

/*

    回调函数，会触发俩次

    第一次：当 dd 出现在视野范围内时触发
    第二次：当 dd 消失在视野范围内触发

*/
function hiddenNavbar(entries) {
    // 拿到 IntersectionObserverEntry 对象
    const ddEntry = entries[0];

    if (ddEntry.intersectionRatio !== 0) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
}

// 使用[交叉观察器]
const io = new IntersectionObserver(hiddenNavbar);

// 监控 little-d
io.observe(dd);