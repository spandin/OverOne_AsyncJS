const request = new XMLHttpRequest;
request.open('GET', 'https://jsonplaceholder.typicode.com/comments')
request.send()

request.addEventListener('load', function() {
    const data = JSON.parse(this.responseText)
    console.log(data)
    data.map((key, index) => {
        console.log(index + 1 + '. ' + key.name);
    })
})