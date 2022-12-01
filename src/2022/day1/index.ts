import { getRawInput } from '../../utils/getInput';
const testInput = ['1000', '2000', '3000', '', '4000', '', '5000', '6000', '', '7000', '8000', '9000', '', '10000'];
const input = getRawInput(__dirname + '/input.txt');

function getSortedCals(input: string[], numberOfElves = 1): Record<string, number[]> {
    return input.reduce((acc, curr) => {
        const cal = parseInt(curr as string, 10);

        if (curr === '') {
            numberOfElves++;
            return acc;
        }

        if (!acc[numberOfElves]) {
            acc[numberOfElves] = [cal];
        } else {
            acc[numberOfElves].push(cal);
        }

        return acc;
    }, {});
}

function getCalculatedCals(input: Record<string, number[]>, calcCals: Record<string, number> = {}): Record<string, number> {
    for (const cal in input) {
        calcCals[cal] = input[cal].reduce((acc, curr) => acc + curr, 0);
    }
    return calcCals;
}

function getMostCals(input: Record<string, number>) {
    let mostCals = 0;
    for (const cal in input) {
        if (input[cal] > mostCals) mostCals = input[cal];
    }
    return mostCals;
}

function getTopThree(input: Record<string, number>) {
    const allCals = [];
    for (const cal in input) {
        allCals.push(input[cal]);
    }

    return allCals.sort((a, b) => a - b).splice(allCals.length - 3);
}

function day(input: string[]) {
    function puzzle1(input: string[]) {
        const sortedCals = getSortedCals(input);
        const calculatedCals = getCalculatedCals(sortedCals);
        const mostCals = getMostCals(calculatedCals);
        return mostCals;
    }

    function puzzle2(input: string[]) {
        const sortedCals = getSortedCals(input);
        const calculatedCals = getCalculatedCals(sortedCals);
        const topThree = getTopThree(calculatedCals);
        return topThree.reduce((acc, curr) => acc + curr, 0);
    }

    return [puzzle1(input), puzzle2(input)];
}

console.log(day(input));
