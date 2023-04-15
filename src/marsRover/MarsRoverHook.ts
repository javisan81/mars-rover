import {Direction, MarsRoverUseCase} from "./MarsRoverInterface";
import {MarsRover, PositionDirection} from "./MarsRover";


export const useMarsRover = (): MarsRoverUseCase => {
    return new MarsRover(new PositionDirection({row:1, col:1}, Direction.West));
}