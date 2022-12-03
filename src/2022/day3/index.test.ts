import { getSharedItem, rucksackContent, getPrioritySum, testInput, getGroups } from './index';

describe('2022 - Day 3', () => {
    it('vJrwpWtwJgWrhcsFMMfFFhFp should return p', () => {
        const firstRucksackContent = rucksackContent('vJrwpWtwJgWrhcsFMMfFFhFp');
        expect(getSharedItem(firstRucksackContent)).toBe('p');
    });
    it('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL should return L', () => {
        const firstRucksackContent = rucksackContent('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
        expect(getSharedItem(firstRucksackContent)).toBe('L');
    });

    it('PmmdzqPrVvPwwTWBwg should return P', () => {
        const firstRucksackContent = rucksackContent('PmmdzqPrVvPwwTWBwg');
        expect(getSharedItem(firstRucksackContent)).toBe('P');
    });
    it('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn should return v', () => {
        const firstRucksackContent = rucksackContent('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn');
        expect(getSharedItem(firstRucksackContent)).toBe('v');
    });
    it('ttgJtRGJQctTZtZT should return t', () => {
        const firstRucksackContent = rucksackContent('ttgJtRGJQctTZtZT');
        expect(getSharedItem(firstRucksackContent)).toBe('t');
    });
    it('CrZsJsPPZsGzwwsLwLmpwMDw should return s', () => {
        const firstRucksackContent = rucksackContent('CrZsJsPPZsGzwwsLwLmpwMDw');
        expect(getSharedItem(firstRucksackContent)).toBe('s');
    });

    it('should return the sum of 157 for the test input', () => {
        expect(getPrioritySum(testInput)).toBe(157);
    });

    it('should return 2 groups for test input', () => {
        const testData = getGroups(testInput);
        expect(testData.length).toBe(2);
    });
});
