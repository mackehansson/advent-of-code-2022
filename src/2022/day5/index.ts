const testInput = [
    '    [D]    ',
    '[N] [C]    ',
    '[Z] [M] [P]',
    ' 1   2   3 ',
    '',
    'move 1 from 2 to 1',
    'move 3 from 1 to 3',
    'move 2 from 2 to 1',
    'move 1 from 1 to 2',
];

interface MoveModel {
    move: number;
    from: number;
    to: number;
}

function formatInput(input: string[], stacks = [], instructions = [], columns = '') {
    input.forEach((i) => {
        if (i.charAt(0) === 'm') instructions.push(i);
        if (i.includes('[')) stacks.push(i);
        if (/^\d$/.test(i.charAt(1))) columns = i;
    });

    const formattedColumns = Math.max(
        ...columns
            .split(' ')
            .filter((i) => i.length > 0)
            .map(Number),
    );

    const formattedInstructions = instructions.reduce<MoveModel[]>((acc, curr) => {
        const draft = curr.replace(/\s/g, '').match(/(\d+)/gm).map(Number);
        acc.push({
            move: draft[0],
            from: draft[1],
            to: draft[2],
        });
        return acc;
    }, []);

    const formatedStacks = {};

    stacks.forEach((i) => {
        const row = i.match(/.{1,4}/g).map((i) => i.replace(/\s/g, ''));
        let cols = 0;
        while (cols < formattedColumns) {
            const fsNo = cols + 1;
            if (!formatedStacks[fsNo]) {
                formatedStacks[fsNo] = [row[cols]];
            } else {
                formatedStacks[fsNo].push(row[cols]);
            }

            cols++;
        }
    });

    const formattedStacks: string[][] = [];
    for (const o in formatedStacks) {
        const boxes = formatedStacks[o]
            .filter((i) => i.length > 0)
            .reverse()
            .map((i) => i.replace('[', '').replace(']', ''));
        formattedStacks.push(boxes);
    }

    return { formattedStacks, formattedColumns, formattedInstructions };
}

function moveBoxesInStack(input: string[][], instruction: MoveModel) {
    const source = input[instruction.from - 1];
    const target = input[instruction.to - 1];
    const package = source.pop();
    target.push(package);
    return input;
}

function puzzle1(input: string[]) {
    const formattedInput = formatInput(input);

    let data = formattedInput.formattedStacks;
    formattedInput.formattedInstructions.forEach((i) => {
        data = moveBoxesInStack(formattedInput.formattedStacks, i);
    });

    // console.log(
    //     moveBoxesInStack(formattedInput.formattedStacks, {
    //         move: 1,
    //         from: 2,
    //         to: 1,
    //     }),
    // );
}

puzzle1(testInput);
