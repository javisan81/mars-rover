export enum MoveCommand {
    Forward = "Forward",
    Backward = "Backward",
    Left = "Left", Right = "Right"
}
export enum Direction {
    North= "North",
    South= "South",
    East = "East",
    West = "West"
}

export interface Position {
    row: number;
    col: number;
}

interface MarsRoverUseCase {
    move: (comands: MoveCommand[]) => void;
    getPosition: () => Position;
    getDirection: () => Direction;
}

export const useMarsRover = (): MarsRoverUseCase => {
    return {
        move: (comands: MoveCommand[]) => {
        },
        getPosition: () => ({row: 1, col: 1}),
        getDirection: () => Direction.West
    }
}