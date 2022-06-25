const doc = document;

const themes = [
    doc.querySelector('link[data-theme="white"]'),
    doc.querySelector('link[data-theme="dark"]'),
    doc.querySelector('link[data-theme="red"]'),
    doc.querySelector('link[data-theme="blue"]')
];

const btns = doc.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const theme = btn.getAttribute('data-theme');
        this.switchTheme(theme);
    });
});

function switchTheme(theme) {
    themes.forEach(t => {
        if (t.dataset.theme === theme) {
            t.disabled = false;
        } else {
            t.disabled = true;
        }
    });
}