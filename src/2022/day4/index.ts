import { getInput } from '../../utils/getInput';
const input = getInput(__dirname + '/input.txt');

const getElfMap = (input: string, eMap = []) => {
    let i = input.split('-').map(Number)[0];
    while (i <= input.split('-').map(Number)[1]) {
        eMap.push(i);
        i++;
    }
    return eMap;
};

const getElfAssignments = (input: string): number[][] => [getElfMap(input.split(',')[0]), getElfMap(input.split(',')[1])];
const doesFirstArrayExistInSecondArray = (sourceArr: number[], lookupArr: number[]) => sourceArr.every((i) => lookupArr.includes(i));
const checkIfContain = (input: number[][]): boolean =>
    doesFirstArrayExistInSecondArray(input[0], input[1]) || doesFirstArrayExistInSecondArray(input[1], input[0]) ? true : false;
const checkIfAnyOverlap = (input: number[][]) => input[0].reduce((acc, curr) => (input[1].includes(curr) ? (acc = true) : acc), false);
const puzzle1 = (input: string[]) => input.reduce((acc, curr) => (checkIfContain(getElfAssignments(curr)) ? (acc = acc + 1) : acc), 0);
const puzzle2 = (input: string[]) => input.reduce((acc, curr) => (checkIfAnyOverlap(getElfAssignments(curr)) ? (acc = acc + 1) : acc), 0);

console.log([puzzle1(input), puzzle2(input)]);
