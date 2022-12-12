/*
        
    3   0   3   7   3
    2   5   5   1   2   
    6   5   3   3   2
    3   3   5   4   9
    3   5   3   9   0
            
    
    V   V   V   V   V
    V   V   V   H   V
    V   V   H   V   V
    V   H   V   H   V
    V   V   V   V   V

    Mapped Input (i):
    [
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
    ]
    
    field[x][y]
    
    [
        { x: 1, y: 1},
        { x: 1, y: 2},
        { x: 1, y: 3},
        { x: 2, y: 1},
        { x: 2, y: 2},
        { x: 2, y: 3},
        { x: 3, y: 1},
        { x: 3, y: 2},
        { x: 3, y: 3},
    ]
*/

const input = `30373
25512
65332
33549
35390`.split('\n');

const runMap = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
];

const mappedInput = (input: string[]) => {
    return input.reduce<number[][]>((acc, curr) => {
        const r = curr.split('').map(Number);
        acc.push(r);
        return acc;
    }, []);
};

const field = mappedInput(input);
const fieldLength = field[0].length;

// Right values
const getRightValues = (input: { x: number; y: number }, mapLength: number, right: number[] = []) => {
    let i = mapLength - 1;
    while (i >= 0) {
        if (i > input.y) {
            right.push(field[input.x][i]);
        }
        i--;
    }
    return right;
};

// Top values
const getTopValues = (input: { x: number; y: number }, mapLength: number, top: number[] = []) => {
    let i = 0;
    while (i < mapLength) {
        if (i < input.x) {
            top.push(field[i][input.y]);
        }
        i++;
    }
    return top;
};

// Bottom values
const getBottomValues = (input: { x: number; y: number }, mapLength: number, bottom: number[] = []) => {
    let i = mapLength - 1;
    while (i >= 0) {
        if (i > input.x) {
            bottom.push(field[i][input.y]);
        }
        i--;
    }
    return bottom;
};

// Left values
const getLeftValues = (input: { x: number; y: number }, mapLength: number, left: number[] = []) => {
    let i = 0;
    while (i < mapLength) {
        if (i < input.y) {
            left.push(field[input.x][i]);
        }
        i++;
    }
    return left;
};

const getTreeValues = (input: { x: number; y: number }, mapLength: number) => {
    return {
        top: getTopValues(input, mapLength),
        right: getRightValues(input, mapLength),
        bottom: getBottomValues(input, mapLength),
        left: getLeftValues(input, mapLength),
    };
};

const getInnerCount = (
    runMap: {
        x: number;
        y: number;
    }[],
    counter = 0,
) => {
    runMap.forEach((run) => {
        const currentTree = field[run.x][run.y];
        const tVal = getTreeValues(run, fieldLength);

        const isTop = !tVal.top.some((i) => i >= currentTree);
        const isRight = !tVal.right.some((i) => i >= currentTree);
        const isBottom = !tVal.bottom.some((i) => i >= currentTree);
        const isLeft = !tVal.left.some((i) => i >= currentTree);

        if (isTop || isRight || isBottom || isLeft) counter++;
    });
    return counter;
};

console.log(getInnerCount());
