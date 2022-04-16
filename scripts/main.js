if (!localStorage.getItem('balance_clover')) {
    localStorage.setItem('balance_clover', 10000)
}

document.querySelector('.balance').innerHTML = localStorage.getItem('balance_clover')