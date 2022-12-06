import { getInput } from '../../utils/getInput'
import produce from 'immer'
const inputInstructions = getInput(__dirname + '/input.txt')
interface MoveModel {
    move: number
    from: number
    to: number
}

const inputStacks = {
    1: ['Z', 'J', 'G'],
    2: ['Q', 'L', 'R', 'P', 'W', 'F', 'V', 'C'],
    3: ['F', 'P', 'M', 'C', 'L', 'G', 'R'],
    4: ['L', 'F', 'B', 'W', 'P', 'H', 'M'],
    5: ['G', 'C', 'F', 'S', 'V', 'Q'],
    6: ['W', 'H', 'J', 'Z', 'M', 'Q', 'T', 'L'],
    7: ['H', 'F', 'S', 'B', 'V'],
    8: ['F', 'J', 'Z', 'S'],
    9: ['M', 'C', 'D', 'P', 'F', 'H', 'B', 'T'],
}

const testInputStacks = {
    1: ['Z', 'N'],
    2: ['M', 'C', 'D'],
    3: ['P'],
}

const testInstructions = ['move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2']

function formatInstructions(rawInstructions: string[]) {
    return rawInstructions.reduce<MoveModel[]>((acc, curr) => {
        const draft = curr.replace(/\s/g, '').match(/(\d+)/gm).map(Number)
        acc.push({
            move: draft[0],
            from: draft[1],
            to: draft[2],
        })
        return acc
    }, [])
}

function moveStacks(stacks: Record<number, string[]>, instructions: MoveModel[], model9001 = false) {
    return produce(stacks, (nextState) => {
        instructions.forEach((i) => {
            const source = nextState[i.from]
            const target = nextState[i.to]
            const amount = i.move
            const payload = source.splice(Math.abs(amount) * -1, amount)
            if (model9001) {
                target.push(...payload)
            } else {
                target.push(...payload.reverse())
            }
        })
        return nextState
    })
}

function getTopBoxes(stack: Record<number, string[]>) {
    const result = []
    for (const box in stack) {
        const stackBoxes = stack[box]
        if (stackBoxes.length >= 1) {
            const topBox = stackBoxes.at(-1)

            result.push(topBox)
        }
    }
    return result.join('')
}

const instructions = formatInstructions(inputInstructions)
const movedBoxes = moveStacks(inputStacks, instructions)
const movedBoxes9001 = moveStacks(inputStacks, instructions, true)
console.log(getTopBoxes(movedBoxes))
console.log(getTopBoxes(movedBoxes9001))
