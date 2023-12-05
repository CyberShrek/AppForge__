

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
            valueCells[j] = Math.round(Math.random()*1000)/10;
        matrixData[i] = [...primaryCells, ...valueCells]
    }
    return matrixData
}

function randomWord() {
    const words = ["apple", "banana", "orange", "grape", "pear", "watermelon", "pineapple", "strawberry", "blueberry", "kiwi", "mango", "peach", "plum", "cherry", "lemon", "lime", "coconut", "pomegranate", "apricot", "fig", "nectarine", "raspberry", "blackberry", "cranberry", "guava", "papaya", "lychee", "dragonfruit", "passionfruit", "starfruit", "cantaloupe", "honeydew", "tangerine", "clementine", "kumquat", "persimmon", "avocado", "jackfruit", "durian", "custard apple", "mangosteen", "rambutan", "longan", "date", "kiwano", "plantain", "breadfruit", "soursop", "cherimoya", "sugar apple", "saskatoonberry", "boysenberry", "elderberry", "gooseberry", "lingonberry", "cloudberry", "loganberry", "mulberry", "quince", "feijoa", "tamarillo", "ugli fruit", "ackee", "breadnut", "cupuacu", "jabuticaba", "maracuja", "pawpaw", "salak", "sapote", "tamarind", "yuzu"];
    return words[Math.floor(Math.random()*(words.length))];
}

const data =  createMatrixData(2, 4, 10)

export const reportModel = {
    title: "Debug",
    data,
    // labels: [
    //     {
    //         title: "Label 1",
    //         valueCell: 3,
    //         valueUnit: "Items",
    //         image: "passenger.svg"
    //     },
    //     {
    //         title: "Label 2",
    //         valueCell: 5,
    //         valueUnit: "Items",
    //         image: "woman.svg",
    //         frame: true
    //     },
    //     {
    //         title: "Label 3",
    //         valueCell: 4,
    //         valueUnit: "Items",
    //         image: "ruble.svg",
    //         background: "lime"
    //     },
    //     {
    //         title: "Label 3",
    //         valueCell: 3,
    //         valueUnit: "Items",
    //         image: "loan_document.svg",
    //         frame: true,
    //         background: "coral"
    //     }
    // ],
    // charts: [
    //     {
    //         title: "Line graph",
    //         keyColumn: 0,
    //         content: [{
    //             type: "line",
    //             name: "Line 1",
    //             column: 3,
    //             color: "red",
    //             dash: true
    //         },{
    //             type: "line",
    //             name: "Line 2",
    //             column: 4,
    //             color: "green",
    //             curve: true
    //         },{
    //             type: "line",
    //             name: "Line 3",
    //             column: 5,
    //             color: "blue",
    //             fill: "rgba(255, 99, 132, 0.2)"
    //         }]
    //     },
    //     {
    //         title: "Bar chart",
    //         keyColumn: 0,
    //         content: [{
    //             type: "bar",
    //             name: "bar 1",
    //             column: 3,
    //             // color: "red"
    //         },{
    //             type: "bar",
    //             name: "bar 1",
    //             column: 4,
    //             // color: "green"
    //         }]
    //     },
    //     {
    //         title: "Doughnut chart",
    //         keyColumn: 0,
    //         content: [{
    //             type: "donut",
    //             name: "donut 1",
    //             column: 5
    //         },{
    //             type: "donut",
    //             name: "donut 2",
    //             column: 6,
    //             color: ["red", "green", "blue"]
    //         }]
    //     }
    // ],
    // context: {
    //     reportData: [{
    //         title: "First data",
    //         columns: [0, 1, 2]
    //     },{
    //         title: "Second data",
    //         columns: [3, 4, 5, 6]
    //     }],
    //     fields: {
    //         "first.first": "Первый",
    //         "second.second": "Второй",
    //         "third.third": "Третий"
    //     }
    // },
    table: {
        pageSize: 50,
        head: [
            [
                {
                    value: "Primary 1"
                },
                {
                    value: "Primary 2"
                },
                {
                    value: "Value 1"
                },
                {
                    value: "Value 2"
                },
                {
                    value: "Value 3"
                },
                {
                    value: "Value 4"
                }
            ]
        ],
        columnFeatures: [
            {
                filter: true
            },
            {
                filter: true
            }
        ],
        total: true
    },
    usedValues: {
        "first.first": 111,
        "second.second": [222, 222],
        "third.third": true,
        "fourth.fourth": "444",
        "fifth.fifth": "555"
    },
    usedData: data
}

export const reportModel2 = {
    title: "Debug",
    data: createMatrixData(2, 4, 100),
    table: {
        pageSize: 50,
        head: [
            [
                {
                    value: "Primary 1"
                },
                {
                    value: "Primary 2"
                },
                {
                    value: "Value 1"
                },
                {
                    value: "Value 2"
                },
                {
                    value: "Value 3"
                },
                {
                    value: "Value 4"
                }
            ]
        ],
        columnFeatures: [
            {
                filter: true
            },
            {
                filter: true
            }
        ],
        total: true
    },
    usedValues: {
        "first.first": 111,
        "second.second": [222, 222],
        "third.third": true,
        "fourth.fourth": "444",
        "fifth.fifth": "555"
    },
    usedData: data
}