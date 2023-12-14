class Sample{



    list = []

    constructor() {

        const
            map = this.generateMap(500),
            startTime = new Date().getTime()

        for (let i = 0; i < 500; i++) {
            this.list.push(map.get(i))
        }

        console.log(this.list.length)

        console.log((new Date().getTime() - startTime)+" ms")
    }

    generateMap(size){
        const map = new Map()
        for(let i = 0; i < size; i++) {
            map.set(
                i,
                [Math.random() * 10000]
            )
        }
        return map
    }
}

new Sample()