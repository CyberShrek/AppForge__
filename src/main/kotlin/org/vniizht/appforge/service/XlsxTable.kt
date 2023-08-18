package org.vniizht.appforge.service

import org.vniizht.appforge.model.CompleteCell
import org.vniizht.appforge.model.XlsxTableModel
import org.apache.poi.ss.usermodel.*
import org.apache.poi.ss.util.CellAddress
import org.apache.poi.ss.util.CellRangeAddress
import org.apache.poi.ss.util.RegionUtil
import org.apache.poi.xssf.usermodel.*
import java.io.OutputStream
import java.text.SimpleDateFormat
import java.util.*

data class XlsxTable(val model: XlsxTableModel){

    private val workbook = XSSFWorkbook()
    private val sheet    = workbook.createSheet(model.title)

    private val startRowIndex = 1
    private val startColumnIndex = 1
    private var lastRowIndex    = startRowIndex-1
    private var lastColumnIndex = startColumnIndex-1

    // Used styles
    private val titleStyle     = createStyleHeading(createFont(isBold = true,   height = 11))
    private val timestampStyle = createStyleHeading(createFont(isItalic = true, height = 8))
    private val extrasStyle    = createStyleHeading(createFont(isBold = true,   color = IndexedColors.BLUE_GREY))
    private fun createStyleHeading(font: Font) = createStyle(
        alignment  = HorizontalAlignment.LEFT,
        borderTop = BorderStyle.NONE,
        borderBottom = BorderStyle.NONE,
        font = font)

    private val headerStyle = createStyle(
        background = IndexedColors.BLUE_GREY,
        border = BorderStyle.MEDIUM,
        font = createFont(isBold = true, color = IndexedColors.WHITE))
    private val bodyStyle            = createStyle()
    private val bodyStyleLeft        = createStyle(alignment = HorizontalAlignment.LEFT)
    private val bodyStyleRight       = createStyle(alignment = HorizontalAlignment.RIGHT)

    private val totalStyle       = createStyleTotal()
    private val bodyStyleTotalLeft   = createStyleTotal(alignment = HorizontalAlignment.LEFT)
    private val bodyStyleTotalRight  = createStyleTotal(alignment = HorizontalAlignment.RIGHT)
    private fun createStyleTotal(alignment: HorizontalAlignment = HorizontalAlignment.CENTER) = createStyle(
        alignment = alignment,
        verticalAlignment = VerticalAlignment.TOP,
        borderTop = BorderStyle.MEDIUM,
        borderRight = BorderStyle.NONE,
        borderLeft = BorderStyle.NONE,
        font = createFont(isBold = true))

    init {
        val titleCell     = if(model.name != null) createNextCell(createNextRow(true), model.name, titleStyle) else null
        val timestampCell = createNextCell(createNextRow(), getTimestamp(), timestampStyle)
        val extrasCells   = model.context?.map{ extra -> createNextCell(createNextRow(), extra, extrasStyle)}
        val nameCell      = if(model.title  != null) createNextCell(createNextRow(true), model.title, headerStyle) else null
        mountRows(model.header, headerStyle)
        mountRows(model.body, bodyStyle)
        mountRow(model.total, totalStyle)
        spanToRowCell(titleCell)
        spanToRowCell(timestampCell)
        spanToRowCell(nameCell)
        extrasCells?.forEach{ cell -> spanToRowCell(cell) }
        finalizeAppearance()
    }

    fun write(stream: OutputStream) = workbook.write(stream)

    private fun mountRows(rows: List<List<CompleteCell>>, cellStyle: XSSFCellStyle) = rows.forEach { mountRow(it, cellStyle) }
    private fun mountRow(row: List<CompleteCell>, cellStyle: XSSFCellStyle) = with(createNextRow()){
        row.forEach { cell -> val poiCell = createNextCell(this, cell.text)
            poiCell.cellStyle = cellStyle
            if(cell.rowspan > 1 || cell.colspan > 1)
                spanCell(poiCell,
                    poiCell.rowIndex + cell.rowspan-1,
                    poiCell.columnIndex + cell.colspan-1)
        }
    }

    private fun getTimestamp() = SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(Calendar.getInstance().time)

    private fun createNextRow(thick: Boolean = false) = sheet.createRow(++lastRowIndex).also{
        if(thick) it.height = 500
    }
    private fun createNextCell(row: XSSFRow, text: String, cellStyle: XSSFCellStyle? = null): XSSFCell{
        var nextCellIndex = if(row.lastCellNum > startRowIndex-1) row.lastCellNum.toInt() else startRowIndex

        sheet.mergedRegions.forEach{region ->
            while(region.contains(CellAddress(row.rowNum, nextCellIndex)))
                nextCellIndex++
        }
        if(nextCellIndex > lastColumnIndex)
            lastColumnIndex = nextCellIndex

        return row.createCell(nextCellIndex).also{
            it.setCellValue(text)
            if(cellStyle != null) it.cellStyle = cellStyle
        }
    }

    private fun createStyle(background: IndexedColors = IndexedColors.WHITE,
                            alignment: HorizontalAlignment = HorizontalAlignment.CENTER,
                            verticalAlignment: VerticalAlignment = VerticalAlignment.CENTER,
                            border: BorderStyle = BorderStyle.THIN,
                            borderTop: BorderStyle = border,
                            borderRight: BorderStyle = border,
                            borderBottom: BorderStyle = border,
                            borderLeft: BorderStyle = border,
                            font: Font = createFont()
    ) = workbook.createCellStyle().also {
        it.alignment           = alignment
        it.verticalAlignment   = verticalAlignment
        it.fillForegroundColor = background.index
        it.fillPattern         = FillPatternType.SOLID_FOREGROUND
        it.borderTop    = borderTop
        it.borderRight  = borderRight
        it.borderBottom = borderBottom
        it.borderLeft   = borderLeft
        it.setFont(font)
    }

    private fun spanToRowCell(cell: XSSFCell?) {
        if (cell != null) spanCell(cell, toColumnIndex = lastColumnIndex)
    }
    private fun spanCell(cell: XSSFCell,
                         toRowIndex: Int = cell.rowIndex,
                         toColumnIndex: Int = cell.columnIndex) =
        sheet.addMergedRegion(
            CellRangeAddress(
                cell.rowIndex, toRowIndex, cell.columnIndex, toColumnIndex))

    fun finalizeAppearance(){
        sheet.mergedRegions.forEach{ region -> borderTheRegion(region)}

        // Surrounding the whole table
        borderTheRegion(CellRangeAddress(startRowIndex, lastRowIndex, startColumnIndex, lastColumnIndex), createStyle(
            border = BorderStyle.MEDIUM
        ))

        // Autosizing
        for (i in 0..lastColumnIndex) {
            sheet.autoSizeColumn(i)
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 500)
        }
    }

    private fun borderTheRegion(region: CellRangeAddress,
                                style: XSSFCellStyle = sheet
                                    .getRow(region.firstRow)
                                    .getCell(region.firstColumn).cellStyle)
    {
        fun setBorder (border: BorderStyle,
                       setter:(BorderStyle, CellRangeAddress, Sheet) -> Unit) = setter(border, region, sheet)

        setBorder(style.borderTop,    RegionUtil::setBorderTop)
        setBorder(style.borderRight,  RegionUtil::setBorderRight)
        setBorder(style.borderBottom, RegionUtil::setBorderBottom)
        setBorder(style.borderLeft,   RegionUtil::setBorderLeft)
    }

    private fun createFont(height: Short = 10,
                           isBold: Boolean = false,
                           isItalic: Boolean = false,
                           color: IndexedColors = IndexedColors.BLACK
    ): XSSFFont {
        val font = workbook.createFont()
        font.fontHeightInPoints = height
        font.fontName = "Arial Cyr"
        font.color = color.index
        font.bold = isBold
        font.italic = isItalic
        return font
    }
}