let teams = [
    {
        name: "Mercedes",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
        drivers: [
            {
                num: 44,
                name: "Lewis Hamilton",
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png"
            },
            {
                num: 77,
                name: "Valtteri Bottas",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/22px-Flag_of_Finland.svg.png"
            }
        ]
    },
    {
        name: "Ferrari",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
        drivers: [
            {
                num: 5,
                name: "Sebastian Vettel",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
            },
            {
                num: 16,
                name: "Charles Leclerc",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/22px-Flag_of_Monaco.svg.png"
            }
        ]
    },
    {
        name: "Alfa Romeo",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/24px-Flag_of_Switzerland.svg.png",
        drivers: [
            {
                num: 7,
                name: "Kimi Raikkonen",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/22px-Flag_of_Finland.svg.png"
            },
            {

                num: 99,
                name: "Antonio Giovinazzi",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
            }
        ]
    },
    {
        name: "Racing Point",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
        drivers: [
            {
                num: 11,
                name: "Sergio Perez",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/22px-Flag_of_Mexico.svg.png"
            },
            {
                num: 18,
                name: "Lance Stroll",
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/22px-Flag_of_Canada_%28Pantone%29.svg.png"
            }
        ]
    },
    {
        name: "Toro Rosso",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
        drivers: [
            {
                num: 10,
                name: "Pierre Gasly",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png"
            },
            {
                num: 26,
                name: "Daniil Kvyat",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/22px-Flag_of_Russia.svg.png"
            }
        ]
    },
    {
        name: "Williams",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
        drivers: [
            {
                num: 63,
                name: "George Russell",
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
            },
            {

                num: 88,
                name: "Robert Kubica",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/22px-Flag_of_Poland.svg.png"
            }
        ]
    },
    {
        name: "Red Bull",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/22px-Flag_of_Austria.svg.png",
        drivers: [
            {
                num: 23,
                name: "Alexander Albon",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/22px-Flag_of_Thailand.svg.png"
            },
            {
                num: 33,
                name: "Max Verstappen",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/22px-Flag_of_the_Netherlands.svg.png"
            }
        ]
    },
    {
        name: "Renault",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
        drivers: [
            {
                num: 3,
                name: "Daniel Ricciardo",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/22px-Flag_of_Australia.svg.png"
            },
            {
                num: 27,
                name: "Nico Hulkenberg",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
            }
        ]
    },
    {
        name: "Haas",
        flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png",
        drivers: [
            {
                num: 8,
                name: "Romain Grosjean",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png"
            },
            {
                num: 20,
                name: "Kevin Magnussen",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/22px-Flag_of_Denmark.svg.png"
            }
        ]
    },
    {
        name: "McLaren",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
        drivers: [
            {
                num: 4,
                name: "Bruno Barros",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png",
            },
            {
                num: 55,
                name: "Anthony Pct",
                flag: "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png"
            }
        ]
    }
];




























}