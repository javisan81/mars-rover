import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";

export class MarsRover implements MarsRoverUseCase {
    private position: Position;
    private direction: Direction;

    constructor(position: Position, direction: Direction) {
        this.position = position;
        this.direction = direction;
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