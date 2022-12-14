/*

Vart ska man INTE gå.

Ett rep med en knut i varje ände.
Ena knuten är head och den andra är tail.
Om head rörst tillräckligt långt ifrån tail så kommer tail att röra sig mot head.

Planck Length
=============

The planck length is a unit of length defined as:
plack length = 1.616255(18)×10−35

1.6 x 10-35 metres
This defines the Planck length, which is 1.6 x 10-35 metres. (That's 0.000 000 000 000 000 000 000 000 000 000 000 016 meters.)

---------------------

Borde kunna få in positionerna i en 2D grid. Sen följa en "series of motions" (puzzle input) för head så kan man bestäma hur tail kommer röra sig.

head    = H
tail    = T

H och T måste alld nudda varandra (diagonalt och överlappande räknas också)

....
.TH.
....

....
.H..
..T.
....

...
.H. (H covers T)
...

Om H någonsin är 2 steg upp, ner, vänster eller höger från T så måste T följa med i samma rörelse(direction)

.....    .....    .....
.TH.. -> .T.H. -> ..TH.
.....    .....    .....

...    ...    ...
.T.    .T.    ...
.H. -> ... -> .T.
...    .H.    .H.
...    ...    ...

Annars, om H och T inte nuddar varandra och inte är på samma rad eller kolumn så kommer T alltid röra sig diagonalt för att hinna upp.

.....    .....    .....
.....    ..H..    ..H..
..H.. -> ..... -> ..T..
.T...    .T...    .....
.....    .....    .....

.....    .....    .....
.....    .....    .....
..H.. -> ...H. -> ..TH.
.T...    .T...    .....
.....    .....    .....

Jag måste bara ta fram hur T rör sig efter H genom ett antal rörelser.

H och T börjar alltid på samma ställe.

R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2

H moves:
Right 4 steps then,
Up 4 steps then,
Left 3 steps then,
Down 1 step then,
Right 4 steps then,
Down 1 steps then,
Left 5 steps then,
Right 2 steps.

Efter varje steg måste vi uppdatera positionern för T om steget innebär att H inte är nuddande av T

När vi kör 1 steg så kan det bli diagonalt.

När vi kört igenom alla rörelser så kan räkna upp alla positioner som T har varit på minst en gång.

Svaret på exempel:

..##..
...##.
.####.
....#.
s###..

13 position (# + s)
*/

type Move = [string, number];

const day9TestInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const movements = (input: string): Move[] =>
    input.split('\n').map((i) => {
        const g = i.split(' ');
        return [g[0], Number(g[1])];
    });

const gameMovements = movements(day9TestInput);
console.log('gameMovements:', gameMovements);

const tailPositions: [number, number][] = [[0, 0]];
const headPositions: [number, number][] = [[0, 0]];

gameMovements.forEach((move) => {
    const direction = move[0];
    const steps = move[1];

    const lastTailPosition = tailPositions.at(-1);
    const lastTailPositionX = lastTailPosition[0];
    const lastTailPositionY = lastTailPosition[1];

    const lastHeadPosition = headPositions.at(-1);
    const lastHeadPositionX = lastHeadPosition[0];
    const lastHeadPositionY = lastHeadPosition[1];

    switch (direction) {
        case 'R': {
            // +X direction
            console.log('Right');
            let i = 0;
            while (i < steps) {
                const nextPos = i + lastHeadPositionX + 1;
                console.log('nextPos:', nextPos);

                /*
                    H = 0   
                    H = 1
                    H = 2
                    H = 3
                */
                i++;
            }
            return;
        }
        case 'L': {
            console.log('Left');
            return;
        }
        case 'U': {
            console.log('Up');
            return;
        }
        case 'D': {
            console.log('Down');
            return;
        }

        default: {
            console.log('D');
            return;
        }
    }
});
