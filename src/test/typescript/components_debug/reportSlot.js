

function createMatrixData(primaryCellsSize, valueCellsSize, tableHeight) {
    const matrixData = []
    for(let i  = 0; i < tableHeight; i++){
        const primaryCells = [];
        for(let j = 0; j < primaryCellsSize; j++) {
            primaryCells[j] = randomWord()
        }
        const valueCells = []
        for(let j = 0; j < valueCellsSize; j++)
            valueCells[j] = Math.round(Math.random()*1000)/10;
        matrixData[i] = [...primaryCells, ...valueCells]
    }
    return matrixData.sort()
}

function randomWord() {
    const words = ["apple", "banana", "orange", "grape", "pear", "watermelon", "pineapple", "strawberry", "blueberry", "kiwi", "mango", "peach", "plum", "cherry", "lemon", "lime", "coconut", "pomegranate", "apricot", "fig", "nectarine", "raspberry", "blackberry", "cranberry", "guava", "papaya", "lychee", "dragonfruit", "passionfruit", "starfruit", "cantaloupe", "honeydew", "tangerine", "clementine", "kumquat", "persimmon", "avocado", "jackfruit", "durian", "custard apple", "mangosteen", "rambutan", "longan", "date", "kiwano", "plantain", "breadfruit", "soursop", "cherimoya", "sugar apple", "saskatoonberry", "boysenberry", "elderberry", "gooseberry", "lingonberry", "cloudberry", "loganberry", "mulberry", "quince", "feijoa", "tamarillo", "ugli fruit", "ackee", "breadnut", "cupuacu", "jabuticaba", "maracuja", "pawpaw", "salak", "sapote", "tamarind", "yuzu"];
    return words[Math.floor(Math.random()*(words.length))];
}

const data =  createMatrixData(2, 4, 10)

export const reportModel = {
    slot: "main",
    data: createMatrixData(3, 4, 500),
    dataDefine: ["prim1", "prim2", "prim3", "val1", "val2", "val3", "val4"],
    config: {
        title: "Debug",
        table: {
            columns: [
                {
                    title: "Primary 1",
                    formula: "prim1"
                }, {
                    title: "Primary 2",
                    formula: "prim2",
                    filter: true
                },{
                    title: "Primary 3",
                    formula: "prim3"
                }, {
                    title: "Value group 1",
                    columns: [
                        {
                            title: "Value 1",
                            formula: "val1"
                        }, {
                            title: "Value 2",
                            formula: "val2"
                        }
                    ]
                }, {
                    title: "Value group 2",
                    columns: [
                        {
                            title: "Value 1",
                            formula: "val3"
                        }, {
                            title: "Value 2",
                            formula: "val4"
                        }
                    ]
                },
            ],
            checkboxAction: {
                title: "Action",
                buttons: [
                    {
                        title: "O_o",
                        hint: "What do you want"
                    },
                    {
                        title: "^_^",
                        hint: "I want some action"
                    }
                ]
            },
            group: true,
            total: true
        }
    }
}