import {Direction, MarsRoverUseCase} from "./MarsRoverInterface";
import {MarsRover, PositionDirection} from "./MarsRover";
import {useMemo} from "react";


export const useMarsRover = (height: number, width: number): MarsRoverUseCase => {
    return useMemo(() => {
        return new MarsRover(new PositionDirection({row: 1, col: 1}, Direction.West), {
            maxHeight: height,
            maxWidth: width
        });
    }, [height, width]);
}