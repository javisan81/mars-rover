import {Direction, MarsMap, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";
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
    private map: MarsMap;

    constructor(positionDirection: PositionDirection, map: MarsMap) {
        this.positionDirection = positionDirection;
        this.map = map;
    }

    getDirection(): Direction {
        return this.positionDirection.direction;
    }

    getPosition(): Position {
        return this.positionDirection.position;
    }
    
    getMap(): MarsMap {
        return this.map;
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