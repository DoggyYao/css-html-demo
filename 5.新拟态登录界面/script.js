const doc = document;

// 获取 .switch-panel 的标签
const switchPanel = doc.querySelector('.switch-panel');
// 获取 .register-login-panel 的标签
const register_login_Panel = doc.querySelector('.register-login-panel');

const switchPanel_login = doc.querySelector('#login');
const switchPanel_register = doc.querySelector('#register');
const registerPanel = doc.querySelector('.register');
const loginPanel = doc.querySelector('.login');

// 监听切换按钮点击事件
const switchBtn1 = doc.querySelector('#switch1');
switchBtn1.addEventListener('click', switchStyle);

const switchBtn2 = doc.querySelector('#switch2');
switchBtn2.addEventListener('click', switchStyle);

/**
 * 切换样式
 * 
 * 通过 toggle 方法来 增加 / 移除 定义好的用来 移动 / 隐藏 元素的样式
 * 
 */
function switchStyle() {
    switchPanel.classList.toggle('switch-panel-slide');
    register_login_Panel.classList.toggle('register-login-panel-slide');
    switchPanel_login.classList.toggle('switch-hidden');
    switchPanel_register.classList.toggle('switch-hidden');
    loginPanel.classList.toggle('switch-hidden-2');
    registerPanel.classList.toggle('switch-hidden-2');
}
