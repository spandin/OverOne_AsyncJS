const form = document.forms.getName
const sendCountry = form.countrySend
const showNeighbor = form.neighborShow
const border = document.querySelector('.border')

sendCountry.addEventListener('click', (e) => {
    e.preventDefault()
    getCountryName(form.countryName.value)
    form.reset()
})


function getCountryName(name) {
    const countryRequestName = fetch(`https://restcountries.com/v3.1/name/${name}`)
    countryRequestName.then(res => {
        if(!res.ok) {
            throw new Error('Страна не найдена')
        }
        return res.json()
    })
    .then(data => {
        getCountryInfoByName(data[0])
        const neighbor = data[0].borders
        if(!neighbor) {
            throw new Error('Страна имеет соседей')
        }
        neighbor.map((key) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${key}`)
            .then(res2 => res2.json())
            .then(data2 => showNeighbor.addEventListener('click', (e) => {
                e.preventDefault()
                getCountryInfoByCode(data2[0])
            }))
        })
    })
    .catch((err) => document.body.innerHTML += `
        <div class='err'>
            Ошибка - ${err}
        </div>
    `)
}

function getCountryInfoByName(data) {
        document.querySelector('.country').innerHTML = `
            <div class='${data.name.common}'>
                <img src="${data.flags.svg}" alt="">
                <h1>${data.name.common} (${data.region})</h1>
                <h2>Capital: ${data.capital[0]}</h2>
                <p>
                Languages: ${[...Object.values(data.languages)]}
                <br> 
                Population: ${data.population}
                </p>
            </div>
        `
}

function getCountryInfoByCode(data2) {
    border.innerHTML += `
    <div class='${data2.name.common}'>
        <img src="${data2.flags.svg}" alt="">
        <h1>${data2.name.common} (${data2.region})</h1>
        <h2>Capital: ${data2.capital[0]}</h2>
        <p>
        Languages: ${[...Object.values(data2.languages)]}
        <br> 
        Population: ${data2.population}
        </p>
    </div>
    `
}

