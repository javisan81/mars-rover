import {useMarsRover} from "./MarsRoverHook";
import {Direction} from "./MarsRoverInterface";

describe('MarsRoverHook', function () {
    it('should return mars rover facing west in 1,1', function () {
        const marsRover = useMarsRover(1,1);
        expect(marsRover.getPosition()).toEqual({row:1, col:1});
        expect(marsRover.getDirection()).toEqual(Direction.West);
    });
});