// let list = document.getElementsByTagName("td");
// for (let index = 0; index < list.length; index++) {
//     const element = list[index];

//     if(element.childNodes.length == 6) {
//         for (let index = 0; index < element.childNodes.length; index++) {
//             const child = element.childNodes[index];
//             if(child.tagName == "SPAN" && child.getAttribute("class") == "flagicon") {
//                 console.log(child.childNodes[0].childNodes[0].getAttribute("src"));
//             }
//             // if(child.tagName == "A") {
//             //     console.log(child.getAttribute('title'));
//             // }
//         }
//     }
// }

// let list = document.getElementsByTagName("td");
// for (let index = 0; index < list.length; index++) {
//     const element = list[index];

//     if(element.childNodes[0].tagName == "A" && new RegExp("Grande").test(element.childNodes[0].getAttribute('title'))) {
//         console.log(element.childNodes[0].getAttribute('title'));
//     }
// }

const countries = [
    "Grande Prêmio da Austrália",
    "Grande Prêmio do Bahrein",
    "Grande Prêmio da China",
    "Grande Prêmio do Azerbaijão",
    "Grande Prêmio da Espanha",
    "Grande Prêmio de Mônaco",
    "Grande Prêmio do Canadá",
    "Grande Prêmio da França",
    "Grande Prêmio da Áustria",
    "Grande Prêmio da Grã-Bretanha",
    "Grande Prêmio da Alemanha",
    "Grande Prêmio da Hungria",
    "Grande Prêmio da Bélgica",
    "Grande Prêmio da Itália",
    "Grande Prêmio de Singapura",
    "Grande Prêmio da Rússia",
    "Grande Prêmio do Japão",
    "Grande Prêmio do México",
    "Grande Prêmio dos Estados Unidos",
    "Grande Prêmio do Brasil",
    "Grande Prêmio de Abu Dhabi",
]
const flag = [
    "upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/22px-Flag_of_Australia.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/22px-Flag_of_Bahrain.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/22px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/22px-Flag_of_Azerbaijan.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/22px-Flag_of_Spain.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/22px-Flag_of_Monaco.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/22px-Flag_of_Canada_%28Pantone%29.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/22px-Flag_of_Austria.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/22px-Flag_of_Hungary.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Belgium_%28civil%29.svg/22px-Flag_of_Belgium_%28civil%29.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/22px-Flag_of_Singapore.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/22px-Flag_of_Russia.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/22px-Flag_of_Japan.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/22px-Flag_of_Mexico.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png",
    "upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/22px-Flag_of_the_United_Arab_Emirates.svg.png",
]
let objectCircuits = [];
for (let index = 0; index < countries.length; index++) {
    const element = countries[index];
    
    let objCircuit = {
        flag: flag[index],
        name: element
    }

    objectCircuits.push(objCircuit);
}

console.log(objectCircuits);
console.log(JSON.stringify(objectCircuits));