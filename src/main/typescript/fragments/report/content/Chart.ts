import {Fragment} from "../../Fragment"
import {Chart as ChartJS, ChartDataset, ChartOptions, registerables} from 'chart.js'
import {transposeMatrix} from "../../../util/data"
ChartJS.register(...registerables)

const defaultColors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]

export class Chart extends Fragment<HTMLCanvasElement>{

    constructor(model: ChartConfig) {
        super(`<canvas></canvas>`)
        createChartJS(this.root, model)
    }
}

function createChartJS(chartCanvas: HTMLCanvasElement, model: ChartConfig): ChartJS{
    const labels = Object.keys(model.data)
    const dataMatrix: number[][] = transposeMatrix(Object.values(model.data).map(data => {
        if (typeof data === "number") data = [data]
        return data
    }))

    const datasets: any[] = dataMatrix.map((dataRow, i) =>
        getChartJsDataset(model.content[i], dataRow))

    const data = Object.values(model.data)
    return new ChartJS(chartCanvas.getContext('2d'), {
        data: {labels, datasets},
        type: model.content[0].type,
        options: getChartJsOptions(model.title)
    })
}

function getChartJsDataset(config: ChartContentConfig, data: number[]): ChartDataset{
    const common = {
        label: config.name,
        backgroundColor: config.color ? config.color : defaultColors,
        // borderWidth: 3,
        data
    }
    switch (config?.type){
        case "line": return {
            ...common,
            type: "line",
            borderColor: config.color ? config.color : defaultColors,
            tension: 0.4
        }
        case "bar": return {
            ...common,
            type: "bar"
        }
        case "pie": return {
            ...common,
            // type: "pie"
        }
        default: throw new Error("Unresolved DiagramType: "+ config)
    }
}

function getChartJsOptions(title: string): ChartOptions{
    return {
        // aspectRatio: 2|1,
        interaction: {
            intersect: false,
            mode: "index"
        },
        plugins: {
            tooltip:{
                position: "nearest"
            },
            title: {
                display: true,
                text: title
            },
            legend: {
                position: 'bottom'
            }
        }
    }
}
