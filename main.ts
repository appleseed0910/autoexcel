import fetch from './fetch.js'
import * as xslx from 'xlsx'

const data = await fetch()
console.log(data)

const ws = xslx.utils.json_to_sheet(data)
const wb = xslx.utils.book_new()
xslx.utils.book_append_sheet(wb, ws, "Sheet1")
xslx.writeFile(wb, "results.xlsx")

console.log("Done, check results.xlsx file");
