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
            textField: {
                type: "text",
                label: "Ввод текста"
            }
        },
        additionalSection: {
            calculationTypeField: {
                type: "select",
                label: "Вид расчёта",
                size: 3
            },
            travelTypesField: {
                type: "select",
                multiple: true,
                label: "Виды проездных документов",
                size: 2
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
        // gridLayout: "vertical",
        submitText: "🔍︎ Поиск",
        submitPath: "sales/report"
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
            }
        },
        additionalSection: {
            trainCategoryField: {
                type: "select",
                label: "Категория поезда"
            }
        },
        gridLayout: "horizontal",
        submitText: "🔍︎ Поиск",
        submitPath: "departures/report",
    },
    reportSlot: {
        title: "Результат поиска"
    }
})

const app = new ForgedApplication()

app.reportSlots.get("reportSlot").applyReport({
    title: "Debug",
    data: createTableData(3, 4, 500).sort((a, b) => {
        return [a[0], a[1]] >[b[0], b[1]] ? 1 : 0
    }),
    dataFeatures: [
        {type: "text"},
        {type: "text"},
        {type: "text"},
        {type: "numeric", colored: true},
        {type: "numeric"},
        {type: "numeric"},
        {type: "numeric"}
    ],
    table: {
        head: ["A", "B", "C", "D", "E", "F", "G"],
        primaryColumnsNumber: 3,
        groupedColumnsNumber: 3
    },
    context: {
        "Поле контекста 1": "none",
        "Поле контекста 2": "none",
        "Поле контекста 3": "none"
    }
}, {

}
)

function createTableData(primaryCellsSize: number, valueCellsSize: number, tableHeight: number): MatrixData {
    const tableData: MatrixData = []
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