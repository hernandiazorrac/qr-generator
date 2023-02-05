let qrContainer = document.getElementById('qrContainer')
let input = document.getElementById('input')
let submitBtn = document.getElementById('submitBtn')
let searchHistory = document.getElementById('searchHistory')
let clearHistoryBtn = document.getElementById('clearHistory')
let qr = new QRCode(qrContainer) //initialize qrcode.js library

let searchHistoryArray = (localStorage.searchHistoryArray) ? JSON.parse(localStorage.searchHistoryArray) : []

// const clearHistory = () => {
//     searchHistoryArray = []
//     searchHistory.innerHTML = ""

//     if(searchHistoryArray.length === 0){
//         clearHistoryBtn.style.display = "none"
//     }else{
//         clearHistoryBtn.style.display = "flex"
//     }
// }

input.addEventListener('input', () => {
    if(input.value.length == 0){
        submitBtn.disabled = true
    }else{
        submitBtn.disabled = false
    }
})

submitBtn.addEventListener('click', () => {
    qr.makeCode(input.value) //returns qr based on your text/link
    historyText()
})

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault()
        submitBtn.click()
    }
})



const historyText = () => {
    if(input.value.length != 0){ //prevents adding an empty string to history array when loading DOM
        searchHistoryArray.push(input.value)
    }

    localStorage.searchHistoryArray = JSON.stringify(searchHistoryArray)
    searchHistory.innerHTML = ""
    searchHistoryArray.slice(-7).forEach((search) => {
        searchHistory.innerHTML = `<p>QR code history</p><li>${searchHistory.innerHTML}</li>`
        searchHistory.querySelector('li').innerText = search
    })
}

