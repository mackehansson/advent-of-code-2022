import { getRawInput } from '../../utils/getInput';
const day9Input = getRawInput(__dirname + '/input.txt');

type Move = [string, number];

// const day9TestInput = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`.split('\n');
const day9TestInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split('\n');

const movements = (input: string[]): Move[] =>
    input.map((i) => {
        const g = i.split(' ');
        return [g[0], Number(g[1])];
    });

const difference = (number1: number, number2: number) => {
    return number1 - number2;
};

const getHeadCoords = (gameMovements: Move[]): number[][] => {
    const headPositions = [[0, 0]];

    gameMovements.forEach((move) => {
        const direction = move[0];
        const steps = move[1];

        const lastHeadPosition = headPositions.at(-1);
        const lastHeadPositionX = lastHeadPosition[0];
        const lastHeadPositionY = lastHeadPosition[1];

        const tempPos = [];

        if (direction === 'R') {
            let i = 0;

            while (i < steps) {
                const lastTempPos = tempPos.at(-1);
                if (!lastTempPos) {
                    tempPos.push([lastHeadPositionX + 1, lastHeadPositionY]);
                    i++;
                    continue;
                }

                tempPos.push([lastTempPos[0] + 1, lastTempPos[1]]);
                i++;
            }
        } else if (direction === 'U') {
            let i = 0;

            while (i < steps) {
                const lastTempPos = tempPos.at(-1);
                if (!lastTempPos) {
                    tempPos.push([lastHeadPositionX, lastHeadPositionY + 1]);
                    i++;
                    continue;
                }

                tempPos.push([lastTempPos[0], lastTempPos[1] + 1]);
                i++;
            }
        } else if (direction === 'L') {
            let i = 0;

            while (i < steps) {
                const lastTempPos = tempPos.at(-1);
                if (!lastTempPos) {
                    tempPos.push([lastHeadPositionX - 1, lastHeadPositionY]);
                    i++;
                    continue;
                }

                tempPos.push([lastTempPos[0] - 1, lastTempPos[1]]);
                i++;
            }
        } else if (direction === 'D') {
            let i = 0;

            while (i < steps) {
                const lastTempPos = tempPos.at(-1);
                if (!lastTempPos) {
                    tempPos.push([lastHeadPositionX, lastHeadPositionY - 1]);
                    i++;
                    continue;
                }

                tempPos.push([lastTempPos[0], lastTempPos[1] - 1]);
                i++;
            }
        }

        headPositions.push(...tempPos);
    });

    return headPositions;
};

const getKnotCoords = (headMoves: number[][]): number[][] => {
    const tailPositions: number[][] = [[0, 0]];

    for (let i = 0; i < headMoves.length; i++) {
        const headMove = headMoves[i];
        if (i === 0) {
            continue;
        }

        const hX = headMove[0];
        const hY = headMove[1];

        const lastTailPosition = tailPositions.at(-1);
        const lastTailX = lastTailPosition[0];
        const lastTailY = lastTailPosition[1];

        const xDiff = difference(hX, lastTailX);
        const yDiff = difference(hY, lastTailY);

        // Samma värde som innan
        if (xDiff === 0) {
            if (yDiff === 0) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 2) {
                tailPositions.push([lastTailX, lastTailY + 1]);
            } else if (yDiff === -1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === -2) {
                tailPositions.push([lastTailX, lastTailY - 1]);
            }
        } else if (xDiff === 1) {
            if (yDiff === 0) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 2) {
                //  Här går vi höger 1 steg och upp 2 steg

                tailPositions.push([lastTailX + 1, lastTailY + 1]);

                // tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === -1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === -2) {
                // Här går vi höger 1 steg och ner 1 steg

                tailPositions.push([lastTailX + 1, lastTailY - 1]);

                // tailPositions.push(headMoves[i - 1]);
            }
        } else if (xDiff === 2) {
            if (yDiff === 0) {
                tailPositions.push([lastTailX + 1, lastTailY]);
            } else if (yDiff === 1) {
                // Här går vi höger 2 s teg och upp 1
                tailPositions.push([lastTailX + 1, lastTailY + 1]);
                //tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === 2) {
                tailPositions.push([lastTailX + 1, lastTailY + 1]);
            } else if (yDiff === -1) {
                // Här går vi höger 2 steg och ner 1 steg
                tailPositions.push([lastTailX + 1, lastTailY - 1]);
                //tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === -2) {
                tailPositions.push([lastTailX + 1, lastTailY - 1]);
            }
        } else if (xDiff === -1) {
            if (yDiff === 0) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === 2) {
                // Här går vi vänster 1 steg och upp 2 steg
                tailPositions.push([lastTailX - 1, lastTailY + 1]);
                //tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === -1) {
                tailPositions.push(lastTailPosition);
            } else if (yDiff === -2) {
                // Här går vi vänster 1 steg och ner 2 steg
                tailPositions.push([lastTailX - 1, lastTailY - 1]);
                //tailPositions.push(headMoves[i - 1]);
            }
        } else if (xDiff === -2) {
            if (yDiff === 0) {
                tailPositions.push([lastTailX - 1, lastTailY]);
            } else if (yDiff === 1) {
                // Här går vi vänster 2 steg och upp 1 steg
                tailPositions.push([lastTailX - 1, lastTailY + 1]);
                //tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === 2) {
                tailPositions.push([lastTailX - 1, lastTailY + 1]);
            } else if (yDiff === -1) {
                // Här går vi vänster 2 steg och ner 1 steg
                tailPositions.push([lastTailX - 1, lastTailY - 1]);
                // tailPositions.push(headMoves[i - 1]);
            } else if (yDiff === -2) {
                tailPositions.push([lastTailX - 1, lastTailY - 1]);
            }
        }
    }

    return tailPositions;
};

const getTailPositionCount = (coords: number[][]) => {
    return coords
        .map((i) => JSON.stringify(i))
        .reduce<string[]>((acc, curr) => {
            if (!acc.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, []);
};

const getKnotPositions = (knotLength: number, headCoords: number[][]): number[][][] => {
    const knotPositions = [];

    let i = 1;
    while (i < knotLength) {
        if (knotPositions.length === 0) {
            const loopCoords = getKnotCoords(headCoords);
            knotPositions.push(loopCoords);
        } else {
            const loopCoords = getKnotCoords(knotPositions.at(-1));
            knotPositions.push(loopCoords);
        }
        i++;
    }
    return knotPositions;
};

const day9puzzle1 = (input: string[]) => {
    const gameMovements = movements(input);
    const headCoords = getHeadCoords(gameMovements);
    const tailCoords = getKnotCoords(headCoords);
    const uniqueTailCoords = getTailPositionCount(tailCoords);
    return uniqueTailCoords.length;
};

const day9puzzle2 = (input: string[]) => {
    const gameMovements = movements(input);
    const headCoords = getHeadCoords(gameMovements);
    const allKnotPositions = getKnotPositions(10, headCoords);

    const firstKnot = allKnotPositions.at(-1);
    const firstKnotAsString = getTailPositionCount(firstKnot);

    const uArr = firstKnotAsString.reduce<string[]>((acc, curr) => {
        if (!acc.includes(curr)) {
            acc.push(curr);
        }
        return acc;
    }, []);

    return uArr.length;
};

//console.log(day9puzzle1(day9TestInput));
console.log(day9puzzle2(day9Input));
