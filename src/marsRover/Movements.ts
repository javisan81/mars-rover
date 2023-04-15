import {Direction, MoveCommand, Position} from "./MarsRoverInterface";

export class Movements {
    private readonly x: number
    private readonly y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public apply(position: Position): Position {
        return {row: position.row + this.y, col: position.col + this.x};
    }
}

const samePositionVector = new Movements(0, 0);

const Forward = new Map<Direction, Movements>(
    [
        [Direction.West, new Movements(-1, 0)],
        [Direction.East, new Movements(1, 0)],
        [Direction.North, new Movements(0, -1)],
        [Direction.South, new Movements(0, 1)]
    ]
);
const Backward = new Map<Direction, Movements>(
    [
        [Direction.West, new Movements(1, 0)],
        [Direction.East, new Movements(-1, 0)],
        [Direction.North, new Movements(0, 1)],
        [Direction.South, new Movements(0, -1)]
    ]
);

const Left = new Map<Direction, Direction>(
    [
        [Direction.West, Direction.South],
        [Direction.East, Direction.North],
        [Direction.North, Direction.West],
        [Direction.South, Direction.East]
    ]
);

const Right = new Map<Direction, Direction>(
    [
        [Direction.West, Direction.North],
        [Direction.East, Direction.South],
        [Direction.North, Direction.East],
        [Direction.South, Direction.West]
    ]
);

export function getVector(direction: Direction, command: MoveCommand): Movements {
    switch (command) {
        case MoveCommand.Backward:
            return Backward.get(direction) || samePositionVector;
        case MoveCommand.Forward:
            return Forward.get(direction) || samePositionVector;
        default:
            return samePositionVector;
    }
}

export function nextDirection(command: MoveCommand, currentDirection: Direction): Direction {
    switch (command) {
        case MoveCommand.Left:
            return Left.get(currentDirection) || currentDirection;
        case MoveCommand.Right:
            return Right.get(currentDirection) || currentDirection;
        default:
            return currentDirection;
    }
}

