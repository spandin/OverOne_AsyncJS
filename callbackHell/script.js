// 1. Создайте функцию getCountryInfoByName. Данная функция принимает название страны, 
// далее делает XMLHttpRequest за данными об этой стране, после чего помещает эти данные на страницу.
// 2. Создайте функцию getCountryInfoByCode, 
// которая принимает код страны и делает запрос. Данные о стране также должны быть помещены на страницу.
// 3. Вызовите функцию getCountryInfoByName, получите код соседних стран и вызовите функцию getCountryInfoByCode.



function getCountryInfoByName(name) {
    const countryRequest = new XMLHttpRequest;
    countryRequest.open('GET', `https://restcountries.com/v3.1/name/${name}`)
    countryRequest.send()

    countryRequest.addEventListener('load', function() {
        const data = JSON.parse(this.responseText)
        document.querySelector('.country').innerHTML += `
            <div class='${name}'>
                <img src="${Object.values(data)[0].flags.svg}" alt="">
                <h1>Name: ${Object.values(data)[0].name.common} (${Object.values(data)[0].region})</h1>
                <h2>Capital: ${Object.values(data)[0].capital[0]}</h2>
                <p>
                Languages: ${getLanguages(data)}, 
                population: ${Object.values(data)[0].population}
                </p>
            </div>
        `
    Object.values(data)[0].borders.map((key) => {
        getCountryInfoByCode(key)
    })
})
}

function getCountryInfoByCode(code) {
    const countryRequest = new XMLHttpRequest;
    countryRequest.open('GET', `https://restcountries.com/v3.1/alpha/${code}`)
    countryRequest.send()
    countryRequest.addEventListener('load', function() {
        const data = JSON.parse(this.responseText)
        document.querySelector('.border').innerHTML += `
            <div class='country'>
                <img src="${Object.values(data)[0].flags.svg}" alt="">
                <h1>Name: ${Object.values(data)[0].name.common} (${Object.values(data)[0].region})</h1>
                <h2>Capital: ${Object.values(data)[0].capital[0]}</h2>
                <p>
                Languages: ${getLanguages(data)}, 
                population: ${Object.values(data)[0].population}
                </p>
            </div>
        `
})
}

function getLanguages(obj) {
    for (const key in Object.values(obj)[0].languages) {
        return Object.values(obj)[0].languages[key];
    }
}

getCountryInfoByName(prompt('Введите название страны(eng)', 'Belarus'))
