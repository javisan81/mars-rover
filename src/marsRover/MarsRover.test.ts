import {Direction,} from "./MarsRoverInterface";
import {MarsRover} from "./MarsRover";

describe('MarsRoverInterface use case', function () {
    it('should be created in position 1,1 facing west', function () {
        const rover = new MarsRover();
        expect(rover.getPosition()).toEqual({row:1, col:1});
        expect(rover.getDirection()).toEqual(Direction.West);
    });
});