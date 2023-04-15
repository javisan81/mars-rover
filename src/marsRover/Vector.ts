import {Position} from "./MarsRoverInterface";

export class Vector {
    private readonly x: number
    private readonly y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public apply(position: Position): Position {
        return {row: position.row + this.y, col: position.col + this.x};
    }
}