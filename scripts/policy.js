setInterval(() => {
    let go = document.querySelector('.go')
    go.classList.add('anim')
    setTimeout(() => {
        go.classList.remove('anim')
    }, 500);
}, 2500);