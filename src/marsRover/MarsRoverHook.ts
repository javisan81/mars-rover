import {Direction, MarsRoverUseCase} from "./MarsRoverInterface";
import {MarsRover} from "./MarsRover";


export const useMarsRover = (): MarsRoverUseCase => {
    return new MarsRover({row:1, col:1}, Direction.West);
}