import { getInput } from '../../utils/getInput';
const input = getInput(__dirname + '/input.txt');
import { priority } from './priority';

export const testInput = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
];

type RucksackContent = string[];

export function rucksackContent(allItems: string): RucksackContent[] {
    return [allItems.substring(0, allItems.length / 2).split(''), allItems.substring(allItems.length / 2, allItems.length).split('')];
}

export function getSharedItem(content: RucksackContent[], sharedItem: string | null = null): string {
    content[0].forEach((i) => {
        if (content[1].includes(i)) sharedItem = i;
    });
    return sharedItem ? sharedItem : '';
}

export function getPrioritySum(items: string[]): number {
    return items.reduce((acc, curr) => {
        const sharedItem = getSharedItem(rucksackContent(curr));
        return acc + priority[sharedItem];
    }, 0);
}

export function getGroups(input: string[], size: number): string[][] {
    const res = [];
    for (let i = 0; i < input.length; i += size) {
        res.push(input.slice(i, i + size));
    }
    return res;
}

export function getSharedItemInGroup(input: string[]) {
    const e1 = input[0].split('');
    const e2 = input[1].split('');
    const e3 = input[2].split('');
    let res: string | null = null;

    e1.forEach((i) => {
        if (e2.includes(i) && e3.includes(i)) res = i;
    });

    if (!res) return '';

    return res;
}

export function getShareItemSum(input: string[][]): number {
    const resultArr = [];

    input.forEach((i) => {
        const sharedItem = getSharedItemInGroup(i);
        resultArr.push(priority[sharedItem]);
    });

    return resultArr.reduce((acc, curr) => acc + curr, 0);
}

//////////////////////////////////////////////////////////////////////////

export function puzzle1(input: string[]) {
    return getPrioritySum(input);
}

export function puzzle2(input: string[]) {
    const groups = getGroups(input, 3);
    return getShareItemSum(groups);
}

console.log([puzzle1(input), puzzle2(input)]);
