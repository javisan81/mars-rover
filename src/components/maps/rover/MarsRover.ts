export enum MoveCommand {
    Forward = "Forward"
}

export interface Position {
    row: number;
    col: number;
}

interface MarsRoverUseCase {
    move: (comands: MoveCommand[]) => void;
    getPosition: () => Position;
}

export const useMarsRover = (): MarsRoverUseCase => {
    return {
        move: (comands: MoveCommand[]) => {
        },
        getPosition: () => ({row: 1, col: 1}),
    }
}