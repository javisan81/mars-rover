import {Direction, MoveCommand,} from "./MarsRoverInterface";
import {MarsRover} from "./MarsRover";

describe('MarsRoverInterface use case', function () {
    it('should be created in position 1,1 facing west', function () {
        const rover = new MarsRover({row:1, col:1}, Direction.West);
        expect(rover.getPosition()).toEqual({row:1, col:1});
        expect(rover.getDirection()).toEqual(Direction.West);
    });
    it('should move forward from 1,3 facing west to 1,2', function () {
        const rover = new MarsRover({row:1, col:3}, Direction.West);
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual({row:1, col:2});
        expect(rover.getDirection()).toEqual(Direction.West);
    });
    it('should move forward from 1,3 facing east to 1,4', function () {
        const rover = new MarsRover({row:1, col:3}, Direction.East);
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual({row:1, col:4});
        expect(rover.getDirection()).toEqual(Direction.East);
    });
});