import * as U from './util.ts'

export function loadCsv(text:string, delimiter:string=",") {
    let lines = text.split("\n")
    let table:any[][] = new Array(lines.length)
    for (let li in lines) {
        let tokens = lines[li].split(delimiter)
        let numbers:any[] = new Array(tokens.length)
        for (let ti in tokens) {
            numbers[ti] = parseFloat(tokens[ti])
        }
        table[li] = numbers
    }
    return table
}

export function cols(table:any[][], from:number, to:number) {
    let cTo = Math.min(to, table[0].length)
    let r:any[][] = new Array(table.length)
    for (let i in table) {
        r[i] = table[i].slice(from, cTo) 
    }
    return r
}
