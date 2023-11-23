import {executeFormulaForRowData} from "../../../main/typescript/util/DANGEROUS";

test(
    "test executeFormulaForRowData (1 + 2)",
    () => expect(
        executeFormulaForRowData(
            "1 + 2",
            0,
            ["a", 1],
            ["a", 3]
            )
        ).toEqual(3)
)

test(
    "test executeFormulaForRowData (i + i)",
    () => expect(
        executeFormulaForRowData(
            "i + i",
            2,
            ["a", 1],
            ["a", 3]
        )
    ).toEqual(4)
)

test(
    "test executeFormulaForRowData (row[i] + totalRow[i-1])",
    () => expect(
        executeFormulaForRowData(
            "row[i] + totalRow[i-1]",
            1,
            [2, 1],
            [4, 3]
        )
    ).toEqual(5)
)

test(
    "test executeFormulaForRowData typeof (row[i] + totalRow[i-1])",
    () => expect(
        typeof executeFormulaForRowData(
            "row[i] + totalRow[i-1]",
            1,
            [2, 1],
            [4, 3]
        )
    ).toEqual("number")
)

test(
    "test executeFormulaForRowData typeof (row[i-1] / totalRow[i-1] * 100).toFixed(1)",
    () => expect(
        typeof executeFormulaForRowData(
            "Number((row[i-1] / totalRow[i-1] * 100).toFixed(1))",
            1,
            [2, 1],
            [4, 3]
        )
    ).toEqual("number")
)