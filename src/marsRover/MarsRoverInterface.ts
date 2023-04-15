export enum MoveCommand {
    Forward = "Forward",
    Backward = "Backward",
    Left = "Left",
    Right = "Right"
}

export enum Direction {
    North = "North",
    South = "South",
    East = "East",
    West = "West"
}


export interface Position {
    row: number;
    col: number;
}

export interface MarsMap {
    maxHeight: number,
    maxWidth: number
}

export interface MarsRoverUseCase {
    move: (commands: MoveCommand[]) => void;
    getPosition: () => Position;
    getDirection: () => Direction;
    getMap: () => MarsMap;
}