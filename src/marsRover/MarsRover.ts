import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";

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
        const {position, direction} = this.positionDirection;
        if (commands[0] === MoveCommand.Forward) {
            if (direction === Direction.West) {
                this.positionDirection = new PositionDirection({...position, col: position.col - 1}, direction);
            }
            if (direction === Direction.East) {
                this.positionDirection = new PositionDirection({...position, col: position.col + 1}, direction);
            }
            if (direction === Direction.North) {
                this.positionDirection = new PositionDirection({...position, row: position.row - 1}, direction);
            }
            if (direction === Direction.South) {
                this.positionDirection = new PositionDirection({...position, row: position.row + 1}, direction);
            }
        }
    }
}