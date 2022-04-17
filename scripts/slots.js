let balance = document.querySelector('.balance')
balance.innerHTML = localStorage.getItem('balance_clover')

let slotCont = document.querySelector('.slot_cont')

let slotPicLinks = []
for (let i = 0; i < 12; i++) {
    slotPicLinks.push('../png/slot_' + (i + 1) + '.png')
}

let active = true
let autoMode = false

for (let i = 0; i < 4; i++) {

    let slot = document.createElement('div')
    slot.classList.add('slot')

    let slotPics = document.createElement('div')
    slotPics.classList.add('slot_pics')

    generatePics(slotPics, 3)

    slot.appendChild(slotPics)

    slotCont.appendChild(slot)
}

let bet = document.querySelector('.bet')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let betButton = document.querySelector('.bet_button')
let auto = document.querySelector('.auto')
let slotPicsNodes = document.querySelectorAll('.slot_pics')

let warning = document.querySelector('.warning')
let playAgain = document.querySelector('.warning .button')

setTimeout(() => {
    animateButtons()
}, 1000);
setInterval(() => {
    animateButtons()
}, 3500);

plus.onclick = () => {
    if (Number(bet.innerHTML) + 150 > Number(balance.innerHTML) || !active || autoMode) { return }
    bet.innerHTML = Number(bet.innerHTML) + 150
}

minus.onclick = () => {
    if (Number(bet.innerHTML) < 150 || !active || autoMode) { return }
    bet.innerHTML = Number(bet.innerHTML) - 150
}

playAgain.onclick = () => {
    if (!autoMode) {
        for (let slotPics of slotPicsNodes) {
            slotPics.style.transition = 'none'
            slotPics.innerHTML = ''
            slotPics.style.top = 0
            generatePics(slotPics, 3)

        }
    } else {
        autoMode = false
        auto.classList.remove(active)
    }

    warning.style.left = '-50%'
    active = true
}

betButton.onclick = () => {
    if (autoMode) { return }
    betSingle()
}

auto.onclick = () => {
    if ((!active && !autoMode) || bet.innerHTML == 0 || Number(bet.innerHTML) > Number(balance.innerHTML)) { return }

    auto.classList.toggle('active')
    autoMode = !autoMode

    if (autoMode) {
        betSingle()
    }

    let count = 0
    let autoInterval = setInterval(() => {
        betSingle()
        count += 1
        if (!autoMode) {
            clearInterval(autoInterval)
            auto.classList.remove('active')
        } else if (count == 9) {
            clearInterval(autoInterval)
            setTimeout(() => {
                warning.firstElementChild.innerHTML = 'Limit of autobets was exceeded<br/>Try it again!'
                warning.style.left = '200px'
                auto.classList.remove('active')
            }, 2000);
        }
    }, 5000);
}

function betSingle() {
    if (bet.innerHTML == 0 || (!active && !autoMode)) { return }
    active = false

    changeBalance(-Number(bet.innerHTML))

    let r = randInt(1, 3)
    let winSlot = slotPicLinks[randInt(1, 12) - 1]

    for (let slotPics of slotPicsNodes) {
        slotPics.style.transition = 'top ease 4s'
        generatePics(slotPics, 24, r, winSlot)
        slotPics.style.top = Number(slotPics.style.top.replace('px', '')) - 2160 + 'px'
    }

    prize = Number(bet.innerHTML) * 5

    setTimeout(() => {
        if (r == 1) {
            changeBalance(prize)
        }
    }, 4100);

    if (autoMode) {
        active = true
        return
    }

    setTimeout(() => {
        warning.firstElementChild.innerHTML = r == 1 ? 'Congrats!<br/>You have won ' + prize : 'No way!<br/>Try again right now'
        warning.style.left = '200px'
    }, 4500);
}

function generatePics(slotPics, count, r, winSlot) {
    let shuffledLinks = shuffle(slotPicLinks)

    for (let j = 0; j < count; j++) {
        let slotPic = document.createElement('img')

        if (j == 22) {
            slotPic.src = r == 1 ? winSlot : shuffledLinks[randInt(1, 12) - 1]
        } else {
            slotPic.src = j < 10 ? shuffledLinks[j] : shuffledLinks[randInt(1, 12) - 1]
        }
        slotPics.appendChild(slotPic)
    }
}

function animateButtons() {
    if (!active || autoMode) { return }
    betButton.classList.add('anim')
    auto.classList.add('anim')
    setTimeout(() => {
        betButton.classList.remove('anim')
        auto.classList.remove('anim')
    }, 500);
}

function changeBalance(amount) {
    localStorage.setItem('balance_clover', Number(localStorage.getItem('balance_clover')) + amount)
    balance.innerHTML = localStorage.getItem('balance_clover')
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}