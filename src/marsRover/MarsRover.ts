import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";
import {getVector, nextDirection} from "./Movements";

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
        const {direction} = this.positionDirection;
        this.positionDirection = new PositionDirection(
            getVector(direction, commands[0]).apply(this.positionDirection.position),
            nextDirection(commands[0], this.getDirection())
        );
    }

}