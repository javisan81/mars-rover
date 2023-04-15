import {Direction, MoveCommand, Position} from "./MarsRoverInterface";

class Vector {
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

const samePositionVector = new Vector(0, 0);

const Forward = new Map<Direction, Vector>(
    [
        [Direction.West, new Vector(-1, 0)],
        [Direction.East, new Vector(1, 0)],
        [Direction.North, new Vector(0, -1)],
        [Direction.South, new Vector(0, 1)]
    ]
);
const Backward = new Map<Direction, Vector>(
    [
        [Direction.West, new Vector(1, 0)],
        [Direction.East, new Vector(-1, 0)],
        [Direction.North, new Vector(0, 1)],
        [Direction.South, new Vector(0, -1)]
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

export function getVector(direction: Direction, command: MoveCommand): Vector {
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

