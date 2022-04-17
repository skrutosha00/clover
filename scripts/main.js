if (!localStorage.getItem('balance_clover')) {
    localStorage.setItem('balance_clover', 10000)
}

document.querySelector('.balance').innerHTML = localStorage.getItem('balance_clover')

setTimeout(() => {
    animateAll()
}, 500);
setInterval(() => {
    animateAll()
}, 2500)

function animateAll() {
    for (let logo of document.querySelectorAll('.logo')) {
        logo.classList.add('big')
        setTimeout(() => {
            logo.classList.remove('big')
        }, 500);
    }

    for (let logo of document.querySelectorAll('.go')) {
        logo.classList.add('anim')
        setTimeout(() => {
            logo.classList.remove('anim')
        }, 500);
    }
}