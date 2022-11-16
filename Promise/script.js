// 1. Создайте промис success, который после 3-ёх секунд будет возвращать сообщение об успешном выполнении операции.
// 2. Создайте промис failed, который после 1-ой секунды будет возвращать сообщение об ошибке.

const success = new Promise ((resolve, reject) => {
    setTimeout(() => {
        resolve('Успешно')
    }, 3000)
})

const failed = new Promise ((resolve, reject) => {
    setTimeout(() => {
        reject('Ошибка')
    }, 1000)
})

success
.then((res) => console.log(res))

failed
.catch((mes) => console.log(mes))