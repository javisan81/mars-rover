import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";
import {nextDirection, nextPosition} from "./Movements";

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
        commands.forEach((command) => {
            this.positionDirection = new PositionDirection(
                nextPosition(command, this.getDirection(), this.getPosition()),
                nextDirection(command, this.getDirection())
            );
        })
    }
}