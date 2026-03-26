/* Load SheetJS Libraries */
import * as xlsx from 'xlsx'
import { readFileSync } from 'node:fs';

const buf = readFileSync('Book1.xlsx')
const wb = xlsx.read(buf)

const sheetName = wb.SheetNames[0]
const sheet = wb.Sheets[sheetName!]!

const cells = Object.keys(sheet).filter(k => !k.startsWith('!'))

// console.log(cells)

const entries: Array<{
    cell: string,
    title: string
    url: string
}> = []

cells?.forEach(cell => {
    entries.push({
        cell: cell,
        title: sheet[cell]?.v?.slice(0, 16),
        url: sheet[cell]["l"]?.Target
    })
})
// console.log(entries)

export { entries }
// This is a complete sync script, export variable after it obtains all necessary vals
// is okay, but a poor practise 