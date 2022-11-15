function getCountryName(name) {
    const countryRequestName = fetch(`https://restcountries.com/v3.1/name/${name}`)
    countryRequestName.then(res => res.json())
    .then(data => {
        getCountryInfoByName(data[0])
        const neighbor = data[0].borders
        console.log(neighbor);
        neighbor.map((key) => {
            console.log(fetch(`https://restcountries.com/v3.1/alpha/${key}`))
            return fetch(`https://restcountries.com/v3.1/alpha/${key}`)
          })
    })
    .then(res2 => res2.json())
    .then(data2 => getCountryInfoByCode(data2[0]))
}

function getCountryInfoByName(data) {
        document.querySelector('.country').innerHTML += `
            <div class='${data.name.common}'>
                <img src="${data.flags.svg}" alt="">
                <h1>${data.name.common} (${data.region})</h1>
                <h2>Capital: ${data.capital[0]}</h2>
                <p>
                Languages: ${[...Object.values(data.languages)]},
                <br> 
                Population: ${data.population}
                </p>
            </div>
        `
        if(data.borders == undefined) {
            document.querySelector('.border').innerHTML += `
            <div class='none'>
                <img src="" alt="">
                <h1>none (none)</h1>
                <h2>Capital: none</h2>
                <p>
                Languages: none, 
                <br> 
                Population: none
                </p>
            </div>
            `
        }
}

function getCountryInfoByCode(data) {
    document.querySelector('.border').innerHTML += `
    <div class='${data.name.common}'>
        <img src="${data.flags.svg}" alt="">
        <h1>${data.name.common} (${data.region})</h1>
        <h2>Capital: ${data.capital[0]}</h2>
        <p>
        Languages: ${[...Object.values(data.languages)]}, 
        <br> 
        Population: ${data.population}
        </p>
    </div>
    `
}

getCountryName('Belarus')