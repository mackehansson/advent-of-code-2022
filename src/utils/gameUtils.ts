export function isAllDifferent(input: string) {
    const splitted = input.split('')
    const removedDupes = splitted.filter((item, index) => splitted.indexOf(item) === index)
    return input.length === removedDupes.length
}
