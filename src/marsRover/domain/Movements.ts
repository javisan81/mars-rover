import {Direction, MarsMap, MoveCommand, Position} from "../MarsRoverInterface";

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

function calculateByLimit(dimension: number, maxDimensionLimit: number) {
    if (dimension === 0) {
        return maxDimensionLimit;
    }
    if (dimension === maxDimensionLimit + 1) {
        return 1;
    }
    return dimension;
}

function adjustToMap(position: Position, map: MarsMap): Position {
    return {
        row: calculateByLimit(position.row, map.maxHeight),
        col: calculateByLimit(position.col, map.maxWidth)
    };
}

export function nextPosition(command: MoveCommand, direction: Direction, currentPosition: Position, map: MarsMap): Position {
    let vector = samePositionVector;
    switch (command) {
        case MoveCommand.Backward:
            vector = Backward.get(direction) || samePositionVector;
            break;
        case MoveCommand.Forward:
            vector = Forward.get(direction) || samePositionVector;
            break
    }
    return adjustToMap(vector.apply(currentPosition), map);
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

