import {Direction, MarsRoverUseCase} from "./MarsRoverInterface";
import {MarsRover, PositionDirection} from "./MarsRover";


export const useMarsRover = (height: number, width: number): MarsRoverUseCase => {
    return new MarsRover(new PositionDirection({row:1, col:1}, Direction.West));
}