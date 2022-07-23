const doc = document;

/*                            白色主题                               */
// 获取左侧元素
const light = doc.querySelector('.light');
// 获取菜单元素
const lightMenuList = doc.querySelector('.light-menu-list');
// 获取菜单选项
const lightMenuItemList = doc.querySelectorAll('.light-menu-list li');

// 监听右击事件
light.addEventListener('contextmenu', (e) => {
    // 阻止右键默认事件发生
    e.preventDefault();

    // 相对于用户浏览器左上角的xy坐标
    const { clientX, clientY } = e;

    // 获取菜单的宽高，保存为自定义类型 --width  --height
    lightMenuList.setAttribute('style', `--width: ${ lightMenuList.scrollWidth }; --height: ${ lightMenuList.scrollHeight }`);

    lightMenuList.style.top = clientY + 'px';
    lightMenuList.style.left = clientX + 'px';

    lightMenuList.classList.add('menu-show');
    lightMenuItemList.forEach(li => {
        li.classList.add('menu-item-show');
    });
});

// 点击其他区域或者点击菜单选项，关闭菜单
doc.addEventListener('click', (e) => {
    lightMenuList.classList.remove('menu-show');
    lightMenuItemList.forEach(li => {
        li.classList.remove('menu-item-show');
    });
});




/*                            黑色主题                               */
// 获取左侧元素
const dark = doc.querySelector('.dark');
// 获取菜单元素
const darkMenuList = doc.querySelector('.dark-menu-list');
// 获取菜单选项
const darkMenuItemList = doc.querySelectorAll('.dark-menu-list li');

// 监听右击事件
dark.addEventListener('contextmenu', (e) => {
    // 阻止右键默认事件发生
    e.preventDefault();

    // 相对于用户浏览器左上角的xy坐标
    const { clientX, clientY } = e;

    // 获取菜单的宽高，保存为自定义类型 --width  --height
    darkMenuList.setAttribute('style', `--width: ${ darkMenuList.scrollWidth }; --height: ${ darkMenuList.scrollHeight }`);

    darkMenuList.style.top = clientY + 'px';
    darkMenuList.style.left = clientX + 'px';

    darkMenuList.classList.add('menu-show');
    darkMenuItemList.forEach(li => {
        li.classList.add('menu-item-show');
    });
});

// 点击其他区域或者点击菜单选项，关闭菜单
doc.addEventListener('click', (e) => {
    darkMenuList.classList.remove('menu-show');
    darkMenuItemList.forEach(li => {
        li.classList.remove('menu-item-show');
    });
});