import { isAllDifferent } from '../../utils/gameUtils'

function day(input: string, dis = 4) {
    let i = 0
    let answer = null
    while (i < input.length) {
        const data = input.substring(i, i + dis)
        if (isAllDifferent(data)) {
            answer = i + dis
            break
        }
        i++
    }

    return answer
}

console.log(day('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4))
console.log(day('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14))
