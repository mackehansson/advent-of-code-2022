const gameInput = `30373
25512
65332
33549
35390`.split('\n');

/**
 * Get 2D Array with numbers from game input
 * @param input Game input
 * @returns 2D array with numbers
 */
const mappedInput = (input: string[]) => {
    return input.reduce<number[][]>((acc, curr) => {
        const r = curr.split('').map(Number);
        acc.push(r);
        return acc;
    }, []);
};

/**
 * Get the inner grid from game input
 * @param input 2D array with game inputs
 * @returns 2D array with inner grid
 */
const getInnerGrid = (input: number[][]) => {
    const workingArr = [...input];
    workingArr.pop();
    workingArr.shift();
    return workingArr.reduce<number[][]>((acc, curr) => {
        const currDraft = [...curr];
        currDraft.pop();
        currDraft.shift();
        acc.push(currDraft);
        return acc;
    }, []);
};

/**
 * Get all the Coordinates to run
 * @param input Inner grid 2D game input
 * @returns List of x and y coords to run
 */
const getTreeCoords = (input: number[][]): { x: number; y: number }[] => {
    const treeCoords = [];

    for (let y = 0; y < input.length; y++) {
        const yRow = input[y];

        for (let x = 0; x < yRow.length; x++) {
            treeCoords.push({
                x: x + 1,
                y: y + 1,
            });
        }
    }

    return treeCoords;
};

/**
 * Get right trees
 * @param input Coordinate
 * @param field Game input
 * @param mapLength Length of the game input
 * @param right The trees from right, counting from the border and inwards
 * @returns Trees from border and inwards as a number list
 */
const getRightValues = (input: { x: number; y: number }, field: number[][], mapLength: number, outToIn = true, right: number[] = []) => {
    if (!outToIn) {
        let i = 0;
        while (i < mapLength) {
            if (i > input.y) {
                right.push(field[input.x][i]);
            }
            i++;
        }
        return right;
    }
    let i = mapLength - 1;
    while (i >= 0) {
        if (i > input.y) {
            right.push(field[input.x][i]);
        }
        i--;
    }
    return right;
};

/**
 * Get top trees
 * @param input Coordinate
 * @param field Game input
 * @param mapLength Length of the game input
 * @param top The trees from top, counting from the border and inwards
 * @returns Trees from border and inwards as a number list
 */
const getTopValues = (input: { x: number; y: number }, field: number[][], mapLength: number, outToIn = true, top: number[] = []) => {
    if (!outToIn) {
        let i = mapLength - 1;
        while (i >= 0) {
            if (i < input.x) {
                top.push(field[i][input.y]);
            }
            i--;
        }
        return top;
    }

    let i = 0;
    while (i < mapLength) {
        if (i < input.x) {
            top.push(field[i][input.y]);
        }
        i++;
    }
    return top;
};

/**
 * Get bottom trees
 * @param input Coordinate
 * @param field Game input
 * @param mapLength Length of the game input
 * @param bottom The trees from bottom, counting from the border and inwards
 * @returns Trees from border and inwards as a number list
 */
const getBottomValues = (input: { x: number; y: number }, field: number[][], mapLength: number, outToIn = true, bottom: number[] = []) => {
    if (!outToIn) {
        let i = 0;
        while (i < mapLength) {
            if (i > input.x) {
                bottom.push(field[i][input.y]);
            }
            i++;
        }
        return bottom;
    }

    let i = mapLength - 1;
    while (i >= 0) {
        if (i > input.x) {
            bottom.push(field[i][input.y]);
        }
        i--;
    }
    return bottom;
};

/**
 * Get left trees
 * @param input Coordinate
 * @param field Game input
 * @param mapLength Length of the game input
 * @param left The trees from left, counting from the border and inwards
 * @returns Trees from border and inwards as a number list
 */
const getLeftValues = (input: { x: number; y: number }, field: number[][], mapLength: number, outToIn = true, left: number[] = []) => {
    if (!outToIn) {
        let i = mapLength - 1;
        while (i >= 0) {
            if (i < input.y) {
                left.push(field[input.x][i]);
            }
            i--;
        }
        return left;
    }

    let i = 0;
    while (i < mapLength) {
        if (i < input.y) {
            left.push(field[input.x][i]);
        }
        i++;
    }
    return left;
};

/**
 * Get mapped values for all directions
 * @param input Coordinate
 * @param field Game input
 * @param mapLength Length of game input
 * @returns Mapped values for all directions
 */
const getTreeValues = (input: { x: number; y: number }, field: number[][], mapLength: number, outToIn = true) => {
    return {
        top: getTopValues(input, field, mapLength, outToIn),
        right: getRightValues(input, field, mapLength, outToIn),
        bottom: getBottomValues(input, field, mapLength, outToIn),
        left: getLeftValues(input, field, mapLength, outToIn),
    };
};

/**
 * Get number of visible trees from inner grid
 * @param runMap All the coordinates
 * @param field Game input
 * @param fieldLength Length of game input
 * @param counter number of visible trees
 * @returns Number of visible trees for the inner grid
 */
const getInnerCount = (
    runMap: {
        x: number;
        y: number;
    }[],
    field: number[][],
    fieldLength: number,
    counter = 0,
) => {
    runMap.forEach((run) => {
        const currentTree = field[run.x][run.y];
        const tVal = getTreeValues(run, field, fieldLength);

        const isTop = !tVal.top.some((i) => i >= currentTree);
        const isRight = !tVal.right.some((i) => i >= currentTree);
        const isBottom = !tVal.bottom.some((i) => i >= currentTree);
        const isLeft = !tVal.left.some((i) => i >= currentTree);

        if (isTop || isRight || isBottom || isLeft) counter++;
    });
    return counter;
};

const getScenicScore = (
    runMap: {
        x: number;
        y: number;
    }[],
    field: number[][],
    fieldLength: number,
    counter = 0,
) => {
    runMap.forEach((run) => {
        const currentTree = field[run.x][run.y];
        const tVal = getTreeValues(run, field, fieldLength, false);

        const isTop = !tVal.top.some((i) => i >= currentTree);
        const isRight = !tVal.right.some((i) => i >= currentTree);
        const isBottom = !tVal.bottom.some((i) => i >= currentTree);
        const isLeft = !tVal.left.some((i) => i >= currentTree);

        if (isTop || isRight || isBottom || isLeft) counter++;
    });
    return counter;
};

/**
 * Get the number of visible trees in the border
 * @param input 2D array of numbers
 * @returns Number of outer trees
 */
const getNumberOfVisibleTreesInBorder = (input: number[][]) => {
    const workingDraft = [...input];
    const lastRow = workingDraft.pop();
    const firstRow = workingDraft.shift();
    return firstRow.length + lastRow.length + workingDraft.length * 2;
};

const puzzle1 = (input: string[]) => {
    const field = mappedInput(input);
    const fieldLength = field[0].length;
    const innerGrid = getInnerGrid(field);
    const treeCoords = getTreeCoords(innerGrid);
    const innerCount = getInnerCount(treeCoords, field, fieldLength);
    const borderTreeCount = getNumberOfVisibleTreesInBorder(field);
    return innerCount + borderTreeCount;
};

const puzzle2 = (input: string[]) => {
    const field = mappedInput(input);
    const fieldLength = field[0].length;
    const innerGrid = getInnerGrid(field);
    const treeCoords = getTreeCoords(innerGrid);
    const scenicPoints = getScenicScore(treeCoords, field, fieldLength);
};

// puzzle1(gameInput);
puzzle2(gameInput);
