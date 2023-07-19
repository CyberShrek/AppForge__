import {TableFragment} from "./fragments/report/content/TableFragment";
import {setOf} from "./utils/misc"
import {resolveCSS} from "./utils/resolver"
import {Text} from "./fragments/inputs/Text";

resolveCSS("global")
resolveCSS("inputs")
resolveCSS("states")
resolveCSS("third-party/animate")
resolveCSS("report/table")

const debugElement: HTMLElement = document.querySelector("debug")
debugElement.className = "report"

// const textInput = new Text({target: debugElement})
// textInput.subscribe(value => console.log(value))

const tableFragment = new TableFragment({
    target: debugElement
})

tableFragment.setHead(setOf(
    [{content: "Primary", colSpan: 2}, {content: "Values", colSpan: 5}],
    [{content: "1", hasFilter: true}, {content: "2", hasFilter: true}, {content: "1", hasFilter: true}, {content: "2", hasFilter: true}, {content: "3", hasFilter: true}, {content: "4", hasFilter: true}, {content: "5", hasFilter: true}]
))
tableFragment.setBody(createContentMap(2, 5, 30))
tableFragment.setTotal()



// создание и заполнение MAP
function createContentMap(primaryCellsSize: number, valueCellsSize: number, tableSize: number): TableBody {
    const contentMap: TableBody = new Map();
    for(let i : number = 0; i < tableSize; i++){
        const primaryCells: string[] = [];
        for(let j : number = 0; j < primaryCellsSize; j++) {
            primaryCells[j] = (primaryCells.length > 0 ? primaryCells[j-1]+"." : "")+randomWord()
        }
        const valueCells: number[] = []
        for(let j : number = 0; j < valueCellsSize; j++)
            valueCells[j] = Math.floor(Math.random()*1000);
        contentMap.set(primaryCells, valueCells);
    }
    return contentMap;
}

//рандомная строка
function randomWord():string {
    const words :string [] = ['Вахта','Вакцина','Отечество','Владения','Овца','Решительность',
        'Рана','Опасность','Производство','Коммерция','Звание','Начало','Институт',
        'Происшествие','Икона','Полнота','Консерва','Доставка','Адмирал','Ассамблея',
        'Избыток','Муниципалитет','Руководство','Мышцы','Заболевание','Отзыв','Натура',
        'Дискотека','Монахиня'];
    return words[Math.floor(Math.random()*(words.length-1))];
}