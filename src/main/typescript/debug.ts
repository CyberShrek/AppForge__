import {resolveCSS} from "./util/resolver"
import {ForgedApplication} from "./fragments/ForgedApplication";

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("misc")

new ForgedApplication()



// reportSlot.applyNewReport({
//     charts: [
//     //     {
//     //     data: {a: 123, b: 444, c: 3334},
//     //     config: {
//     //         title: "Debug",
//     //         graphs: [
//     //             {
//     //                 type: "bar",
//     //                 color: "red",
//     //                 name: "debug"
//     //             }
//     //         ]
//     //     }
//     // },{
//     //     data: {a: 344, b: 4244, c: 23, d: 4, e: 1233},
//     //     config: {
//     //         title: "Debug",
//     //         graphs: [
//     //             {
//     //                 type: "bar",
//     //                 color: "blue",
//     //                 name: "debug"
//     //             }
//     //         ]
//     //     }
//     // },
//         {
//         title: "Debug",
//         diagram: [
//             {
//                 type: "line",
//                 name: "debug"
//             },
//             {
//                 type: "pie",
//                 name: "debug2"
//             }
//         ],
//         data: {a: [344, 44], b: [244, 51], c: [23, 134], d: [4, 100], e: [233, 10]}
//     }],
//     table: {
//         data: createTableData(2, 5, 100),
//         total: [],
//         head: [
//             [{text: "Primary", colspan: 2}, {text: "Values", colspan: 5}],
//             [{text: "1", addFilter: true},{text: "2", addFilter: true},
//                 {text: "1"}, {text: "2"}, {text: "3"}, {text: "4"}, {text: "5"}]
//         ],
//         primaryColumnsNumber: 2,
//         groupedColumnsNumber: 1,
//         xlsxExport: null
//     }
// })

function createTableData(primaryCellsSize: number, valueCellsSize: number, tableHeight: number): TableData {
    const tableData: TableData = []
    for(let i : number = 0; i < tableHeight; i++){
        const primaryCells: string[] = [];
        for(let j : number = 0; j < primaryCellsSize; j++) {
            primaryCells[j] = randomWord()
        }
        const valueCells: number[] = []
        for(let j : number = 0; j < valueCellsSize; j++)
            valueCells[j] = Math.floor(Math.random()*1000);
        tableData[i] = [...primaryCells, ...valueCells]
    }
    return tableData
}

function randomWord():string {
    const words :string [] = ['Вахта','Вакцина','Отечество','Владения','Овца','Решительность',
        'Рана','Опасность','Производство','Коммерция','Звание','Начало','Институт',
        'Происшествие','Икона','Полнота','Консерва','Доставка','Адмирал','Ассамблея',
        'Избыток','Муниципалитет','Руководство','Мышцы','Заболевание','Отзыв','Натура',
        'Дискотека','Монахиня'];
    return words[Math.floor(Math.random()*(words.length-1))];
}