/* Load SheetJS Libraries */
import * as xlsx from 'xlsx'
import { readFileSync } from 'node:fs';

const buf = readFileSync('Book1.xlsx')
const wb = xlsx.read(buf)

const sheetName = wb.SheetNames[0]
const sheet = wb.Sheets[sheetName!]!

// console.log(JSON.stringify(sheet, null, 2));

const range = sheet["!ref"]
const cells = range?.split(':')
// console.log(cells);

const entries : Array<{
    cell: string,
    url: string
}> = []

cells?.forEach(cell => {
    entries.push({
        cell: cell,
        url: sheet[cell]["l"]?.Target
    })
})
console.log(entries)

export { entries }