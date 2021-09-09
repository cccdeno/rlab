import { Complex } from './complex.ts'

const e = new Complex(Math.E, 0)
const i = new Complex(0, 1)

export function DFT(f:Complex[]) {
    let N = f.length
    let F = []
    for (let n = 0; n < N; n++) F[n] = new Complex(0, 0) // Complex.parse('0+0i')
    for (let x = 0; x < N; x++) {
        for (let n = 0; n < N; n++) {
            let eix = Complex.expi((-2.0*Math.PI*x)/N*n)  
            let fexp = f[x].mul(eix)
            F[n] = F[n].add(fexp)
        }
    }
    return F
}

export function iDFT(F:Complex[]) {
    let N = F.length
    let f = []
    for (let x = 0; x < N; x++) f[x] = new Complex(0, 0)
    for (let n = 0; n < N; n++) {
        for (let x = 0; x < N; x++) {
            let eix = Complex.expi((2.0 * Math.PI * x) / N * n)
            let Fexp = F[n].mul(eix)
            Fexp.a /= N; Fexp.b /= N;
            f[x] = f[x].add(Fexp)
        }
    }
    return f
}
