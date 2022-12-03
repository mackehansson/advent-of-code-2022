import { getInput } from '../../utils/getInput';
const testInput = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];
const testInputPuzzle2 = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];
const input = getInput(__dirname + '/input.txt');

function getTwosAndThrees(id: string) {
    const uniqueChars = {};
    const resultObj = {};
    const resultArr = [];
    const splittedId = id.split('');
    splittedId.forEach((i) => {
        if (uniqueChars[i]) {
            uniqueChars[i].push(i);
        } else {
            uniqueChars[i] = [i];
        }
    });
    for (const box in uniqueChars) {
        if (uniqueChars[box].length === 2 || uniqueChars[box].length === 3) {
            resultObj[box] = uniqueChars[box].length;
        }
    }
    for (const res in resultObj) {
        if (!resultArr.includes(resultObj[res])) {
            resultArr.push(resultObj[res]);
        }
    }

    return resultArr;
}

function compareIds(source: string, arr: string[]) {
    const lookupArray = source.split('');
    console.log('lookupArray:', lookupArray);
    const stringLength = lookupArray.length;

    arr.forEach((row) => {
        console.log('row:', row);
    });
}

function day(input: string[]) {
    function puzzle1(input: string[]) {
        const resArr = [];
        input.forEach((i) => {
            const twosThrees = getTwosAndThrees(i);
            if (twosThrees.length > 0) {
            }
            resArr.push(...twosThrees);
        });
        const twos = resArr.reduce((acc, curr) => {
            if (curr === 2) {
                acc++;
            }
            return acc;
        }, 0);
        const threes = resArr.reduce((acc, curr) => {
            if (curr === 3) {
                acc++;
            }
            return acc;
        }, 0);

        return twos * threes;
    }

    return [puzzle1(input)];
}

compareIds('fghij', testInputPuzzle2);

console.log(day(testInputPuzzle2));
