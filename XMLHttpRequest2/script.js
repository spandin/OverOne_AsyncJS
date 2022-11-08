1.
const request = new XMLHttpRequest;
request.open('GET', 'https://jsonplaceholder.typicode.com/comments')
request.send()

request.addEventListener('load', function() {
    const data = JSON.parse(this.responseText)
    document.querySelector('.comments').innerHTML += `
        ${  data.map((key, index) => {
            return `<br> ${index + 1}. ${key.name}`
        })}
    `
})

2.
const countryRequest = new XMLHttpRequest;
countryRequest.open('GET', 'https://restcountries.com/v3.1/all')
countryRequest.send()

countryRequest.addEventListener('load', function() {
    const data = JSON.parse(this.responseText)
    document.querySelector('.countries').innerHTML += `
        <img src="${Object.values(data)[86].flags.svg}" alt="">
        <h1>Name: ${Object.values(data)[86].name.common} (${Object.values(data)[86].region})</h1>
        <h2>Capital: ${Object.values(data)[86].capital[0]}</h2>
        <p>Languages: ${Object.values(data)[86].languages.msa}, population: ${Object.values(data)[86].population}</p>
    `
})
