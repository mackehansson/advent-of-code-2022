import { getInput } from '../../utils/getInput';
const input = getInput(__dirname + '/input.txt');
const testInput = ['A Y', 'B X', 'C Z'];

enum PlayerPlay {
    'Rock' = 'X',
    'Paper' = 'Y',
    'Scissors' = 'Z',
}

enum OpponentPlay {
    'Rock' = 'A',
    'Paper' = 'B',
    'Scissors' = 'C',
}

enum Outcome {
    'Win' = 6,
    'Loss' = 0,
    'Draw' = 3,
}

enum Points {
    'Rock' = 1,
    'Paper' = 2,
    'Scissors' = 3,
}

enum RountResult {
    'Lose' = 'X',
    'Draw' = 'Y',
    'Win' = 'Z',
}

function getRoundOutcome(player: PlayerPlay, opponent: OpponentPlay) {
    if (player === PlayerPlay.Rock && opponent === OpponentPlay.Rock) return Outcome.Draw + Points.Rock;
    if (player === PlayerPlay.Paper && opponent === OpponentPlay.Paper) return Outcome.Draw + Points.Paper;
    if (player === PlayerPlay.Scissors && opponent === OpponentPlay.Scissors) return Outcome.Draw + Points.Scissors;

    if (player === PlayerPlay.Rock && opponent === OpponentPlay.Paper) return Outcome.Loss + Points.Rock;
    if (player === PlayerPlay.Rock && opponent === OpponentPlay.Scissors) return Outcome.Win + Points.Rock;

    if (player === PlayerPlay.Paper && opponent === OpponentPlay.Rock) return Outcome.Win + Points.Paper;
    if (player === PlayerPlay.Paper && opponent === OpponentPlay.Scissors) return Outcome.Loss + Points.Paper;

    if (player === PlayerPlay.Scissors && opponent === OpponentPlay.Paper) return Outcome.Win + Points.Scissors;
    if (player === PlayerPlay.Scissors && opponent === OpponentPlay.Rock) return Outcome.Loss + Points.Scissors;
}

const whatToPlay = {
    X: function (opponent: string) {
        if (opponent === OpponentPlay.Paper) {
            return getRoundOutcome(PlayerPlay.Rock, OpponentPlay.Paper);
        } else if (opponent === OpponentPlay.Rock) {
            return getRoundOutcome(PlayerPlay.Scissors, OpponentPlay.Rock);
        } else if (opponent === OpponentPlay.Scissors) {
            return getRoundOutcome(PlayerPlay.Paper, OpponentPlay.Scissors);
        }
    },
    Y: function (opponent: string) {
        if (opponent === OpponentPlay.Paper) {
            return getRoundOutcome(PlayerPlay.Paper, OpponentPlay.Paper);
        } else if (opponent === OpponentPlay.Rock) {
            return getRoundOutcome(PlayerPlay.Rock, OpponentPlay.Rock);
        } else if (opponent === OpponentPlay.Scissors) {
            return getRoundOutcome(PlayerPlay.Scissors, OpponentPlay.Scissors);
        }
    },
    Z: function (opponent: string) {
        if (opponent === OpponentPlay.Paper) {
            return getRoundOutcome(PlayerPlay.Scissors, OpponentPlay.Paper);
        } else if (opponent === OpponentPlay.Rock) {
            return getRoundOutcome(PlayerPlay.Paper, OpponentPlay.Rock);
        } else if (opponent === OpponentPlay.Scissors) {
            return getRoundOutcome(PlayerPlay.Rock, OpponentPlay.Scissors);
        }
    },
};

function day(input: string[]) {
    const puzzle1 = () => {
        return input.reduce((acc, curr) => {
            const play = curr.split(' ');
            const opponent = play[0] as OpponentPlay;
            const player = play[1] as PlayerPlay;
            return acc + getRoundOutcome(player, opponent);
        }, 0);
    };

    const puzzle2 = () => {
        const result = input.reduce((acc, round) => {
            const play = round.split(' ');
            const opponent = play[0];
            const outcome = play[1];
            return acc + whatToPlay[outcome](opponent);
        }, 0);
        return result;
    };

    return [puzzle1(), puzzle2()];
}

console.log(day(input));
