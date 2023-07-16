import {TableFragment} from "./fragments/report/content/TableFragment";
import {setOf} from "./utils/misc";

const debugElement: HTMLElement = document.querySelector("debug"),
    tableFragment = new TableFragment({
        target: debugElement
    })

tableFragment.setHead(setOf(
    [{content: "Primary", colSpan: 2}, {content: "Values", colSpan: 5}],
    [{content: "1"}, {content: "2"}, {content: "1"}, {content: "2"}, {content: "3"}, {content: "4"}, {content: "5"}]
))
tableFragment.setBody(createContentMap(2, 5, 1000))



// создание и заполнение MAP
function createContentMap(primaryCellsSize: number, valueCellsSize: number, tableSize: number): TableBody {
    const contentMap: TableBody = new Map(); //создание MAP
    for(let i : number = 0; i < tableSize; i++){
        const primaryCells: string[] = []; //создание массива для значений ключа
        for(let j : number = 0; j < primaryCellsSize; j++)
            primaryCells[j] = randomWord(); //заполнение массива значений ключа
        const valueCells: number[] = [] // создание массива для значений строки
        for(let j : number = 0; j < valueCellsSize; j++) //заполнение массива значений строки
            valueCells[j] = Math.floor(Math.random()*1000); // запись значений в массив
        contentMap.set(primaryCells, valueCells); //создание пар ключ-значение для данных
    }
    return contentMap;
}

//рандомная строка
function randomWord():string {
    const words :string [] = ['Вахта','Вакцина','Отечество','Владения','Овца','Решительность',
        'Рана','Опасность','Производство','Коммерция','Звание','Начало','Институт',
        'Происшествие','Икона','Полнота','Консерва','Доставка','Адмирал','Ассамблея',
        'Избыток','Муниципалитет','Руководство','Мышцы','Заболевание','Отзыв','Натура',
        'Дискотека','Монахиня','Биржа','Национализм','Претендент','Водитель','Пепел',
        'Продолжение','Забава','Диаметр','Огонь','Предание','Конверт','Всполох','Калий',
        'Барокко','Вертолёт','Добропорядочность','Закон','Пурпур','Наконечник','Республика',
        'Реклама','Единство','Истина','Попрошайка','Ветер','Намётка','Город','Благодарность',
        'Дом','Захоронение','Предпосылка','Мероприятие','Черпак','Лад','Ощущение','Вексель',
        'Купальник','Прикосновение','Приступ','Депо','Езда','Кольцо','Превышение','Факт',
        'Управление','Мгновенность','Достижение','Наличка','Вести','Регион','Пациент',
        'Орлан','Вывих','Низ','Плуг','Осторожность','Кадр','Горечь','Лиса','Инвестиции',
        'Деление','Интервал','Клуб','Понятие','Надежда','Равенство','Рубеж','Направление',
        'Мина','Прошлое','Построение'];
    return words[Math.floor(Math.random()*100)];
}