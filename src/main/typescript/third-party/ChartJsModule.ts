import {Module} from "./abstract/Module"
import {Chart as ChartJS, ChartDataset, ChartOptions, registerables} from 'chart.js'
ChartJS.register(...registerables)

export class ChartJsModule extends Module{

    readonly chartJs: ChartJS

    constructor(private rootCanvas: HTMLCanvasElement,
                private data: MatrixData,
                private config: ChartConfig) {
        super()
        if (this.config.content) {
            if (!Array.isArray(this.config.content))
                this.config.content = [this.config.content]

            this.chartJs = new ChartJS(rootCanvas.getContext('2d'), {
                data: {labels: this.getColumn(config.keyColumn), datasets: this.getDatasets()},
                type: config.content[0].type,
                options: this.getCommonOptions()
            })
        }
    }

    private getDatasets(): ChartDataset[] {
        return (this.config.content as ChartContentConfig[]).map(config =>
            config.type === "line" ? this.getLineGraphDataset(config as LineGraphConfig) :
                config.type === "bar" ? this.getBarGraphDataset(config as BarGraphConfig) :
                    config.type === "pie" ? this.getPieGraphDataset(config as PieGraphConfig) : null
        )
    }

    private getLineGraphDataset(config: LineGraphConfig): ChartDataset{
        return {
            ...this.getCommonDataset(config)
        }
    }

    private getBarGraphDataset(config: BarGraphConfig): ChartDataset{
        return {
            ...this.getCommonDataset(config)
        }
    }

    private getPieGraphDataset(config: PieGraphConfig): ChartDataset {
        return {
            ...this.getCommonDataset(config)
        }
    }

    private getCommonDataset(config: ChartContentConfig): ChartDataset {
        // @ts-ignore
        return {
            type: config.type,
            label: config.name,
            data: this.getColumn(config.column) as number[],
            borderColor: config.color,
            fill: config.fill
        }
    }

    private getCommonOptions(): ChartOptions {
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
                    text: this.config.title
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    }

    private getColumn(columnId: number): CellData[]{
        return this.data.map(row => row[columnId])
    }
}