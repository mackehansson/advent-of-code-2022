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

Om nått är 2 mer så måste den andra va samma för att 

              H          V
Init        [0,0]      [0,0]    

                                X+
R 4(1)      [1,0]      [0,0]    xD: 1, yD: 0    0,0
R 4(2)      [2,0]      [1,0]    xD: 2, yD: 0    1,0
R 4(3)      [3,0]      [2,0]    xD: 2, yD: 0    2,0
R 4(4)      [4,0]      [3,0]    xD: 2, yD: 0    3,0

                                Y+
U 4(1)      [4,1]      [3,0]    xD: 1, yD: 1    3,0
U 4(2)      [4,2]      [4,1]    xD: 1, yD: 2    Diagonalt   X + 1, Y + 1    Blir T samma som H va steget innan? Ja.
U 4(3)      [4,3]      [4,2]    xD: 0, yD: 2    
U 4(4)      [4,4]      [4,3]    xD: 0, yD: 2    

                                X-
L 3(1)      [3,4]      [4,3]    xD: 1, yD: 1
L 3(2)      [2,4]      [3,4]    xD: 2, yD: 1    Diagonalt   X - 1, Y + 1. Blir T samma som H va steget innan? Ja
L 3(3)      [1,4]      [2,4]    xD: 2, yD: 0

                                Y-
D 1(1)      [1,3]      [2,4]    xD: 1, yD: 1

                                X+
R 4(1)      [2,3]      [2,4]    xD: 0, yD: 1
R 4(2)      [3,3]      [2,4]    xD: 1, yD: 1
R 4(3)      [4,3]      [3,3]    xD: 2, yD: 1    Diagonalt. Blir T samma som H va steget innan? Ja
R 4(4)      [5,3]      [4,3]    xD: 2, yD: 0

                                Y-
D 1(1)      [5,2]      [4,3]    xD: 1, yD: 1

                                X-
L 5(1)      [4,2]      [4,3]    xD: 0, yD: 1
L 5(2)      [3,2]      [4,3]    xD: 1, yD: 1
L 5(3)      [2,2]      [3,2]    xD: 2, yD: 1    Diagonalt
L 5(4)      [1,2]      [2,2]    xD: 2, yD: 0
L 5(5)      [0,2]      [1,2]    xD: 2, yD: 0

                                X+
R 2(1)      [1,2]      [1,2]    xD: 0, yD: 0
R 2(2)      [2,2]      [1,2]    xD: 1, yD: 0



[0,0]     [0,0]

[1,0]     [0,0]
[2,0]     [1,0]
[3,0]     [2,0]
[4,0]     [3,0]
[4,1]     [3,0]
[4,2]     [4,1]
[4,3]     [4,2]
[4,4]     [4,3]
[3,4]     [4,3]
[2,4]     [3,4]
[1,4]     [2,4]
[1,3]     [2,4]
[2,3]     [2,4]
[3,3]     [2,4]
[4,3]     [3,3]
[5,3]     [4,3]
[5,2]     [4,3]
[4,2]     [4,3]
[3,2]     [4,3]
[2,2]     [3,2]
[1,2]     [2,2]
[0,2]     [1,2]
[1,2]     [1,2]
[2,2]     [1,2]


Så här går det till:
====================

Först Ska vi ta fram dom koordinater som H kommer ta. Visualiserat ovan i vänster kolumnen. Dessa värden sparas i en lista.

Vi skapar en tom T lista.

Sen loopar vi igenom H Listan.

För varje H Koordinat så kollar vi:

X Diff.
Y Diff.

Sen jobbar vi med diffen mellan H och T.

Diff = 0:0, T blir samma som innan
Diff = 1:0 eller 0:1, T blir samma som innan
Diff = 2:0 eller 0:2, så ska vi uppdatera T. Om vi ökar eller minska är beroende på positiv eller negativ diff nummber.
Diff = 1:2 eller 2:1 så blir T vad H var steget innan.

Vi avslutar med att pusha T in i T listan. Vi kommer behöva kolla vad senast värdet i den listan är när vi jämför.



    
. . . . .       . . . . .       . . . . .
. . . . .       . . . . .       . . . . .
. . . . .       . . . . H       . . . . H
. . . . H       . . . . .       . . . . T
. . . T .       . . . T .       . . . . .


Det är nått när diffen är 1:2 mellan dom.....
När diffen är 1:2 eller 2:1 så blir nästa T samma som H va steget innan.




-------------------------------------
R
. . . . .   . . . . .   . . . . .
. . . . .   . . . . .   . . . . .
. . H . .   . . . H .   . . T H .
. T . . .   . T . . .   . . . . .
. . . . .   . . . . .   . . . . .
2,2 - 1,1   3,2 - 1,1   3,2 - 2,2

R
. . . . .   . . . . .   . . . . .
. T . . .   . T . . .   . . . . .
. . H . .   . . . H .   . . T H .
. . . . .   . . . . .   . . . . .
. . . . .   . . . . .   . . . . .

U
. . . . .   . . . . .   . . . . .
. . . . .   . . H . .   . . H . .
. . H . .   . . . . .   . . T . .
. T . . .   . T . . .   . . . . .
. . . . .   . . . . .   . . . . .
            
D
. . . . .   . . . . .   . . . . .
. T . . .   . T . . .   . . . . .
. . H . .   . . . . .   . . T . .
. . . . .   . . H . .   . . H . .
. . . . .   . . . . .   . . . . .

---------------------------------------
L
. . . . .   . . . . .   . . . . .
. . . T .   . . . T .   . . . . .
. . H . .   . H . . .   . H T . .
. . . . .   . . . . .   . . . . .
. . . . .   . . . . .   . . . . .

L
. . . . .   . . . . .   . . . . .
. . . . .   . . . . .   . . . . .
. . H . .   . H . . .   . H T . .
. . . T .   . . . T .   . . . . .
. . . . .   . . . . .   . . . . .

D
. . . . .   . . . . .   . . . . .
. . . T .   . . . T .   . . . . .
. . H . .   . . . . .   . . T . .
. . . . .   . . H . .   . . H . .
. . . . .   . . . . .   . . . . .

U
. . . . .   . . . . .   . . . . .
. . . . .   . . H . .   . . H . .
. . H . .   . . . . .   . . T . .
. . . T .   . . . T .   . . . . .
. . . . .   . . . . .   . . . . .
-------------------------------------


[0,0]                   [0,0]
[1,0]   xd: +1 yd: +0     [0,0]
[2,0]   xd: +2 yd: +0     [1,0]  X+ = TX+
[3,0]   xd: +2 yd: +0     [2,0]  X+ = TX+
[4,0]   xd: +2 yd: +0     [3,0]
[4,1]   xd: +1 yd: +1     [3,0]
[4,2]   xd: +1 yd: +2     [4,1] diff 1:2, T blir samma som H steget innan
[4,3]   xd: +0 yd: +2     [4,2]
[4,4]   xd: +0 yd: +2     [4,3]
[3,4]   xd: -1 yd: +1     [4,3]
[2,4]   xd: -2 yd: +1     [3,4] diff 2:1, T blir samma som H steget innan
[1,4]   xd: -2 yd: +0     [2,4]
[1,3]   xd: -1 yd: -1     [2,4]
[2,3]   xd: +0 yd: -1     [2,4]
[3,3]   xd: +1 yd: -1     [2,4]
[4,3]   xd: +2 yd: -1     [3,3] diff 2:1, T blir samma som H steget innan
[5,3]   xd: +2 yd: +0     [4,3]
[5,2]   xd: +1 yd: -1     [4,3]
[4,2]   xd: +0 yd: -1     [4,3]
[3,2]   xd: -1 yd: -1     [4,3]
[2,2]   xd: -2 yd: -1     [3,2] diff 2:1, T blir samma som H steget innan
[1,2]   xd: -2 yd: +0     [2,2]
[0,2]   xd: -2 yd: +0     [1,2]
[1,2]   xd: +0 yd: +0     [1,2]
[2,2]   xd: +1 yd: +0     [1,2]



[0,0]   [0,0]

[1,0]   [0,0]
[2,0]   [1,0]
[3,0]   [2,0]
[4,0]   [3,0]
[4,1]   [3,0]
[4,2]   [4,1]
[4,3]   [4,2]
[4,4]   [4,3]
[3,4]   [4,3]
[2,4]   [3,4]
[1,4]   [2,4]
[1,3]   [2,4]
[2,3]   [2,4]
[3,3]   [2,4]
[4,3]   [3,3]
[5,3]   [4,3]
[5,2]   [4,3]
[4,2]   [4,3]
[3,2]   [4,3]
[2,2]   [3,2]
[1,2]   [2,2]
[0,2]   [1,2]
[1,2]   [1,2]
[2,2]   [1,2]

[0,0]   [0,0]
[1,0]   [1,0]
[2,0]   [2,0]
[3,0]   [3,0]
[4,0]   [4,0]
[4,1]   [4,1]
[4,2]   [4,2]
[4,3]   [4,3]
[4,4]   [4,4]
[3,4]   [3,4]
[2,4]   [2,4]
[1,4]   [1,4]
[1,3]   [1,3]
[2,3]   [2,3]
[3,3]   [3,3]
[4,3]   [4,3]
[5,3]   [5,3]
[5,2]   [5,2]
[4,2]   [4,2]
[3,2]   [3,2]
[2,2]   [2,2]
[1,2]   [1,2]
[0,2]   [0,2]
[1,2]   [1,2]
[2,2]   [2,2]
*/

type Move = [string, number];

const day9TestInput = `R 4`;
// const day9TestInput = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;

const movements = (input: string): Move[] =>
    input.split('\n').map((i) => {
        const g = i.split(' ');
        return [g[0], Number(g[1])];
    });

const gameMovements = movements(day9TestInput);
console.log('gameMovements:', gameMovements);

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

const getTailCoords = (headMoves: number[][]): number[][] => {
    const tailPositions = [[0, 0]];

    headMoves.forEach((headMove) => {
        console.log('headMove:', headMove);
        const hX = headMove[0];
        const hY = headMove[1];
        const lastTailPosition = tailPositions.at(-1);
        const lastTailX = lastTailPosition[0];
        const lastTailY = lastTailPosition[1];

        const xDiff = difference(hX, lastTailX);
        const yDiff = difference(hY, lastTailY);

        // Samma värde som innan
        if (xDiff <= 1 && yDiff <= 1) {
            tailPositions.push(lastTailPosition);
        } else if (xDiff === 2) {
        }

        // Nytt värd
    });

    console.log('tailPositions:', tailPositions);
    return tailPositions;
};

getTailCoords(getHeadCoords(gameMovements));
