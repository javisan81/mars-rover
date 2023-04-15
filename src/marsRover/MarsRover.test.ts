import {Direction, MoveCommand,} from "./MarsRoverInterface";
import {MarsRover, PositionDirection} from "./MarsRover";

describe('MarsRoverInterface use case', function () {
    it('should be created in position 1,1 facing west', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 1}, Direction.West));
        expect(rover.getPosition()).toEqual({row: 1, col: 1});
        expect(rover.getDirection()).toEqual(Direction.West);
    });
    it.each([
        [
            new PositionDirection({row: 1, col: 3}, Direction.West),
            new PositionDirection({row: 1, col: 2}, Direction.West),
        ], [
            new PositionDirection({row: 1, col: 3}, Direction.East),
            new PositionDirection({row: 1, col: 4}, Direction.East),
        ],
        [
            new PositionDirection({row: 2, col: 2}, Direction.North),
            new PositionDirection({row: 1, col: 2}, Direction.North),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.South),
            new PositionDirection({row: 2, col: 2}, Direction.South),
        ],
    ])(`should move forward the rover from %s to %s`, (initialPositionDirection, finalPositionDirection) => {
        const rover = new MarsRover(initialPositionDirection);
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual(finalPositionDirection.position);
        expect(rover.getDirection()).toEqual(finalPositionDirection.direction);
    });

    it.each([
        [
            new PositionDirection({row: 1, col: 3}, Direction.West),
            new PositionDirection({row: 1, col: 4}, Direction.West),
        ], [
            new PositionDirection({row: 1, col: 3}, Direction.East),
            new PositionDirection({row: 1, col: 2}, Direction.East),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.North),
            new PositionDirection({row: 2, col: 2}, Direction.North),
        ],
        [
            new PositionDirection({row: 2, col: 2}, Direction.South),
            new PositionDirection({row: 1, col: 2}, Direction.South),
        ],
    ])(`should move backward the rover from %s to %s`, (initialPositionDirection, finalPositionDirection) => {
        const rover = new MarsRover(initialPositionDirection);
        rover.move([MoveCommand.Backward]);
        expect(rover.getPosition()).toEqual(finalPositionDirection.position);
        expect(rover.getDirection()).toEqual(finalPositionDirection.direction);
    });

    it.each([
        [
            new PositionDirection({row: 1, col: 3}, Direction.West),
            new PositionDirection({row: 1, col: 3}, Direction.South),
        ], [
            new PositionDirection({row: 1, col: 3}, Direction.East),
            new PositionDirection({row: 1, col: 3}, Direction.North),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.North),
            new PositionDirection({row: 1, col: 2}, Direction.West),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.South),
            new PositionDirection({row: 1, col: 2}, Direction.East),
        ],
    ])(`should turn left the rover from %s to %s`, (initialPositionDirection, finalPositionDirection) => {
        const rover = new MarsRover(initialPositionDirection);
        rover.move([MoveCommand.Left]);
        expect(rover.getPosition()).toEqual(finalPositionDirection.position);
        expect(rover.getDirection()).toEqual(finalPositionDirection.direction);
    });

    it.each([
        [
            new PositionDirection({row: 1, col: 3}, Direction.West),
            new PositionDirection({row: 1, col: 3}, Direction.North),
        ], [
            new PositionDirection({row: 1, col: 3}, Direction.East),
            new PositionDirection({row: 1, col: 3}, Direction.South),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.North),
            new PositionDirection({row: 1, col: 2}, Direction.East),
        ],
        [
            new PositionDirection({row: 1, col: 2}, Direction.South),
            new PositionDirection({row: 1, col: 2}, Direction.West),
        ],
    ])(`should turn right the rover from %s to %s`, (initialPositionDirection, finalPositionDirection) => {
        const rover = new MarsRover(initialPositionDirection);
        rover.move([MoveCommand.Right]);
        expect(rover.getPosition()).toEqual(finalPositionDirection.position);
        expect(rover.getDirection()).toEqual(finalPositionDirection.direction);
    });
});