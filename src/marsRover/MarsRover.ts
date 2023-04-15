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

const Forward = new Map<Direction, Vector>(
    [
        [Direction.West, new Vector(-1, 0)],
        [Direction.East, new Vector(1, 0)],
        [Direction.North, new Vector(0, -1)],
        [Direction.South, new Vector(0, 1)]
    ]
);

function getVector(direction: Direction): Vector {
    return Forward.get(direction) || new Vector(0, 0);
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
        if (commands[0] === MoveCommand.Forward) {
            this.positionDirection = new PositionDirection(getVector(direction).apply(this.positionDirection.position), direction);
        }
    }
}