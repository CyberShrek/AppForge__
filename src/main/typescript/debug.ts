import {setAppConfig} from "./store/appConfig"
import {ForgedApplication} from "./fragments/applicatons/ForgedApplication"

setAppConfig({
    code: "SUBURB",
    salesForm: {
        title: "Отчёт по итогам продаж по пригороду",
        periodSection: {
            dateField: {
                type: "datepicker",
                range: true,
                label: "Период продаж"
            }
        },
        salesSection: {
            carriersField: {
                label: "Перевозчик",
                type: "select",
                search: true
            },
            roadsField: {
                label: "Дорога продажи",
                type: "select",
                search: true
            },
            regionsField: {
                label: "Субъект продажи",
                type: "select",
                search: true
            }
        },
        toggleSection: {
            switchField: {
                type: "switch",
                label: "Дополнительные параметры"
            },
        },
        additionalSection: {
            calculationTypeField: {
                type: "select",
                label: "Вид расчёта"
            },
            travelTypesField: {
                type: "select",
                multiple: true,
                label: "Виды проездных документов"
            },
            shippingTypesField: {
                type: "select",
                multiple: true,
                label: "Виды перевозочных документов"
            },
            operationTypeField: {
                type: "select",
                label: "Вид операции"
            }
        },
        submitText: "🔍︎ Поиск"
    },
    departuresForm: {
        title: "Отчёт по итогам отправления по пригороду",
        periodSection: {
            dateField: {
                type: "datepicker",
                range: true,
                label: "Период отправления"
            }
        },
        departuresSection: {
            carriersField: {
                label: "Перевозчик",
                type: "select",
                search: true
            },
            roadsField: {
                label: "Дорога отправления",
                type: "select",
                search: true
            }
        },
        toggleSection: {
            switchField: {
                type: "switch",
                label: "Дополнительные параметры"
            },
        },
        additionalSection: {
            trainCategoryField: {
                type: "select",
                label: "Категория поезда"
            }
        },
        submitText: "🔍︎ Поиск"
    },
    reportSlot: {
        title: "Результат поиска"
    }
})

const app = new ForgedApplication()

// app.reportSlots.get("reportSlot").applyReport({
//     title: "Debug",
//     table: {
//         data: createTableData(2, 5, 100),
//         head: [
//             [{text: "Primary", colspan: 2}, {text: "Values", colspan: 5}],
//             [{text: "1", addFilter: true},{text: "2", addFilter: true},
//                 {text: "1"}, {text: "2"}, {text: "3"}, {text: "4"}, {text: "5"}]
//         ],
//         primaryColumnsNumber: 2,
//         groupedColumnsNumber: 1
//     },
//     context: {
//         fields: {
//             "Поле контекста 1": "none",
//             "Поле контекста 2": "none",
//             "Поле контекста 3": "none"
//         }
//     }
// }, {
//
// }
// )

function createTableData(primaryCellsSize: number, valueCellsSize: number, tableHeight: number): TableArrayData {
    const tableData: TableArrayData = []
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