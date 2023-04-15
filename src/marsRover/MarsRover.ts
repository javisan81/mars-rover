import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";
import {Vector} from "./Vector";

export class PositionDirection {
    readonly position: Position;
    readonly direction: Direction;

    constructor(position: Position, direction: Direction) {
        this.position = position;
        this.direction = direction;
    }

    public toString(): String {
        return `row:${this.position.row} col:${this.position.col}, facing: ${this.direction}`;
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

function getVector(direction: Direction, command: MoveCommand): Vector {
    switch (command) {
        case MoveCommand.Backward:
            return Backward.get(direction) || samePositionVector;
        case MoveCommand.Forward:
            return Forward.get(direction) || samePositionVector;
        default:
            return samePositionVector;
    }
}

function nextDirection(command: MoveCommand, currentDirection: Direction): Direction {
    switch (command) {
        case MoveCommand.Left:
            return Left.get(currentDirection) || currentDirection;
        case MoveCommand.Right:
            return Right.get(currentDirection) || currentDirection;
        default:
            return currentDirection;
    }

}

export class MarsRover implements MarsRoverUseCase {
    private positionDirection: PositionDirection;

    constructor(positionDirection: PositionDirection) {
        this.positionDirection = positionDirection;
    }

    getDirection(): Direction {
        return this.positionDirection.direction;
    }

    getPosition(): Position {
        return this.positionDirection.position;
    }

    move(commands: MoveCommand[]): void {
        const {direction} = this.positionDirection;
        this.positionDirection = new PositionDirection(getVector(direction, commands[0]).apply(this.positionDirection.position), nextDirection(commands[0], this.getDirection()));
    }

}