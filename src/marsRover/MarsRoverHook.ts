import {Direction, MarsRoverUseCase, PositionDirection} from "./MarsRoverInterface";
import {MarsRover} from "./MarsRover";


export const useMarsRover = (): MarsRoverUseCase => {
    return new MarsRover(new PositionDirection({row:1, col:1}, Direction.West));
}