import {MarsRoverUseCase} from "./MarsRoverInterface";
import {MarsRover} from "./MarsRover";


export const useMarsRover = (): MarsRoverUseCase => {
    return new MarsRover();
}