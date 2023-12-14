
export const
    // Return percentage share
    getShare = (value: number, of: number) => toPercents(value/of),
    // Return percentage change
    getChange = (value: number, oldValue: number) => toPercents((value-oldValue)/oldValue)

const
    percentagePrecision = 2,
    toPercents = (value: number) => parseFloat((value * 100).toFixed(percentagePrecision))


