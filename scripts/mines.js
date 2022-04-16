let balance = document.querySelector('.balance')
balance.innerHTML = localStorage.getItem('balance_clover')

let field = document.querySelector('.field')
let bombs = document.querySelector('.bombs')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let bet = document.querySelector('.bet')
let stake = document.querySelector('.green.button')

let active = true
let bombMode = 0

for (let i = 0; i < 4; i++) {
    let bombsButton = document.createElement('div')
    bombsButton.innerHTML = i + 1
    bombsButton.classList.add('black_button', 'button')

    bombsButton.onclick = () => {
        if (!active) { return }
        for (let button of document.querySelectorAll('.bombs div')) {
            button.classList.remove('active')
        }
        bombsButton.classList.add('active')
        bombMode = i + 1
        generateField(i + 1)
    }

    bombs.appendChild(bombsButton)
}

generateField(0)


plus.onclick = () => {
    if (Number(bet.innerHTML) + 150 > Number(balance.innerHTML) || !active) { return }
    bet.innerHTML = Number(bet.innerHTML) + 150
}

minus.onclick = () => {
    if (Number(bet.innerHTML) < 150 || !active) { return }
    bet.innerHTML = Number(bet.innerHTML) - 150
}

stake.onclick = () => {
    if (!active) {
        changeBalance(Number(bet.innerHTML))
    } else {
        return
    }
    bet.innerHTML = 0
    hideAll()
    setTimeout(() => {
        generateField(bombMode)
        active = true
        stake.innerHTML = 'STAKE'
    }, 800);
}

function generateField(bombs) {
    let map = ['golden_clover']
    for (let i = 0; i < 15; i++) {
        map.push(i < bombs ? 'bomb' : 'clover')
    }
    map = shuffle(map)

    field.innerHTML = ''

    for (let item of map) {
        let cellCont = document.createElement('div')
        cellCont.classList.add('cell_cont')
        cellCont.dataset.type = item

        let cell = document.createElement('div')
        cell.classList.add('cell')

        let img = document.createElement('img')
        img.classList.add('hidden')
        img.src = '../png/' + item + '.png'

        cellCont.appendChild(img)
        cellCont.appendChild(cell)

        cellCont.onclick = () => {
            if (!bombMode || bet.innerHTML == 0) { return }
            if (active) { changeBalance(-Number(bet.innerHTML)) }
            active = false

            reveal(cellCont)
            if (item == 'bomb') {
                bet.innerHTML = 0
                revealAll()
                stake.innerHTML = 'PLAY AGAIN'
            } else if (item == 'golden_clover') {
                bet.innerHTML = Math.round(Number(bet.innerHTML) * (3 + bombMode))
            } else if (item == 'clover') {
                bet.innerHTML = Math.round(Number(bet.innerHTML) * (1 + bombMode * 0.1))
            }
        }
        field.appendChild(cellCont)
    }
}

function reveal(cellCont) {
    cellCont.querySelector('div').classList.add('hidden')
    cellCont.querySelector('img').classList.remove('hidden')
}

function revealAll() {
    for (let c of document.querySelectorAll('.cell_cont')) {
        reveal(c)
    }
}

function hideAll() {
    for (let cellCont of document.querySelectorAll('.cell_cont')) {
        cellCont.querySelector('div').classList.remove('hidden')
        cellCont.querySelector('img').classList.add('hidden')
    }
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