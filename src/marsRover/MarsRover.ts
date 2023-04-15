import {Direction, MarsRoverUseCase, MoveCommand, Position, PositionDirection} from "./MarsRoverInterface";

export class MarsRover implements MarsRoverUseCase {
    private position: Position;
    private direction: Direction;

    constructor(positionDirection: PositionDirection) {
        this.position = positionDirection.position;
        this.direction = positionDirection.direction;
    }

    getDirection(): Direction {
        return this.direction;
    }

    getPosition(): Position {
        return this.position;
    }

    move(commands: MoveCommand[]): void {
        if (commands[0] === MoveCommand.Forward) {
            if (this.direction === Direction.West) {
                this.position = {
                    ...this.position,
                    col: this.position.col - 1
                }
            }
            if (this.direction === Direction.East) {
                this.position = {
                    ...this.position,
                    col: this.position.col + 1
                }
            }
        }
    }
}