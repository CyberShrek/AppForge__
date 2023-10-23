
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