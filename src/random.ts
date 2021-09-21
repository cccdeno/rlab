export function random(min: number = 0, max: number = 1) {
    return min + Math.random() * (max - min)
}

export function randomInt(min: number, max: number) {
    return Math.floor(random(min, max))
}

export function randomChoose(a: any[]) {
    return a[randomInt(0, a.length)]
}
