/*let users = [
    {id: 1, name: "Вася"},
    {id: 2, name: "Петя"},
    {id: 3, name: "Маша"}
];

// возвращает массив, состоящий из двух первых пользователей
let someUsers = users.filter(item => item.id < 3);

console.log(someUsers);*/


let a = [ {token: "hello", sig: "hel"}, {token: "hi", sig: "h"} ]
console.log(JSON.stringify(a))
let b = [...a, {token: 'gim', sig: 'ji'}]
console.log(b)