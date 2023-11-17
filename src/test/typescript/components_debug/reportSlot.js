

function createMatrixData(primaryCellsSize, valueCellsSize, tableHeight) {
    const matrixData = []
    for(let i  = 0; i < tableHeight; i++){
        const primaryCells = [];
        for(let j = 0; j < primaryCellsSize; j++) {
            // if(j === 1)
            //     primaryCells[j] = "some"
            // else
                primaryCells[j] = randomWord()
        }
        const valueCells = []
        for(let j = 0; j < valueCellsSize; j++)
            valueCells[j] = Math.floor(Math.random()*1000);
        matrixData[i] = [...primaryCells, ...valueCells]
    }
    return matrixData
}

function randomWord() {
    const words = ["apple", "banana", "orange", "grape", "pear", "watermelon", "pineapple", "strawberry", "blueberry", "kiwi", "mango", "peach", "plum", "cherry", "lemon", "lime", "coconut", "pomegranate", "apricot", "fig", "nectarine", "raspberry", "blackberry", "cranberry", "guava", "papaya", "lychee", "dragonfruit", "passionfruit", "starfruit", "cantaloupe", "honeydew", "tangerine", "clementine", "kumquat", "persimmon", "avocado", "jackfruit", "durian", "custard apple", "mangosteen", "rambutan", "longan", "date", "kiwano", "plantain", "breadfruit", "soursop", "cherimoya", "sugar apple", "saskatoonberry", "boysenberry", "elderberry", "gooseberry", "lingonberry", "cloudberry", "loganberry", "mulberry", "quince", "feijoa", "tamarillo", "ugli fruit", "ackee", "breadnut", "cupuacu", "jabuticaba", "maracuja", "pawpaw", "salak", "sapote", "tamarind", "yuzu"];
    return words[Math.floor(Math.random()*(words.length))];
}

export const reportModel = {
    title: "Debug",
    data: createMatrixData(3, 4, 500),
    table: {
        head: [
            [
                {value: "Primary 1", rowspan: 2},
                {value: "Primary 2", rowspan: 2},
                {value: "Primary 3", rowspan: 2},
                {value: "Value group 1", colspan: 2}, {value: "Value group 2", colspan: 2}
            ],
            [
                {value: "Value 1"}, {value: "Value 2"}, {value: "Value 1"}, {value: "Value 2"}
            ]
        ],
        // checkboxes: {
        //     actions: [
        //         {
        //             label: "XXX",
        //             onClick: {
        //                 fetchReport: ""
        //             }
        //         }
        //     ]
        // },
        pageSize: 100,
        columnFeatures: [
            {
                totalize: true,
                filter: true
            },
            {
                totalize: true,
                filter: true
            },
            {
                colorize: {
                    positive: true,
                    negative: true
                }
            },
            {
                colorize: {
                    positive: true,
                    negative: true
                },
                filter: true
            },
            {
                onClick: {
                    fetchReport: "1"
                }
            }
        ]
    }
}