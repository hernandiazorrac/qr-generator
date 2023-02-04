let qrContainer = document.getElementById('qrContainer')
let input = document.getElementById('input')
let submitBtn = document.getElementById('submitBtn')
let searchHistory = document.getElementById('searchHistory')
let qr = new QRCode(qrContainer) //initialize qrcode.js library

let searchHistoryArray = (localStorage.searchHistoryArray) ? JSON.parse(localStorage.searchHistoryArray) : []

submitBtn.addEventListener('click', () => { //
    qr.makeCode(input.value) //returns qr based on your text/link

    searchHistoryArray.push(input.value)
    localStorage.searchHistoryArray = JSON.stringify(searchHistoryArray)
    searchHistory.innerHTML = ""
    searchHistoryArray.forEach((search) => {
        searchHistory.innerHTML = `<li>${searchHistory.innerHTML}</li>`
        searchHistory.querySelector('li').innerText = search
    })

    input.value = ""
})

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault()
        submitBtn.click()
        input.value = ""
    }
})

input.addEventListener('input', () => {
    if(input.value.length == 0){
        submitBtn.disabled = true
    }else{
        submitBtn.disabled = false
    }
})