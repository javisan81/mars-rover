import {Direction, MarsRoverUseCase, MoveCommand, Position} from "./MarsRoverInterface";

export class MarsRover implements MarsRoverUseCase {
    getDirection(): Direction {
        return Direction.West;
    }

    getPosition(): Position {
        return {row: 1, col: 1};
    }

    move(comands: MoveCommand[]): void {
    }
}