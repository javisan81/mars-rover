import {Dir} from "fs";

export enum MoveCommand {
    Forward = "Forward",
    Backward = "Backward",
    Left = "Left", Right = "Right"
}

export enum Direction {
    North = "North",
    South = "South",
    East = "East",
    West = "West"
}

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

export interface Position {
    row: number;
    col: number;
}

export interface MarsRoverUseCase {
    move: (comands: MoveCommand[]) => void;
    getPosition: () => Position;
    getDirection: () => Direction;
}