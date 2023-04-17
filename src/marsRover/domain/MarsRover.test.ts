import {Direction, MoveCommand,} from "../MarsRoverInterface";
import {MarsRover, PositionDirection} from "./MarsRover";

describe('MarsRoverInterface use case', function () {
    const defaultMap = {
        maxWidth: 5,
        maxHeight: 5
    }
    it('should be created in position 1,1 facing west', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 1}, Direction.West), defaultMap);
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
        const rover = new MarsRover(initialPositionDirection, defaultMap);
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
        const rover = new MarsRover(initialPositionDirection, defaultMap);
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
        const rover = new MarsRover(initialPositionDirection, defaultMap);
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
        const rover = new MarsRover(initialPositionDirection, defaultMap);
        rover.move([MoveCommand.Right]);
        expect(rover.getPosition()).toEqual(finalPositionDirection.position);
        expect(rover.getDirection()).toEqual(finalPositionDirection.direction);
    });

    it('should move the rover by multiple commands', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 3}, Direction.West), defaultMap);
        rover.move([MoveCommand.Left, MoveCommand.Forward, MoveCommand.Right, MoveCommand.Backward]);
        expect(rover.getPosition()).toEqual({row: 2, col: 4});
        expect(rover.getDirection()).toEqual(Direction.West);
    });

    it('should forward the rover from 1,3 North to 5,3 North', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 3}, Direction.North), {
            maxHeight: 5,
            maxWidth: 4
        });
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual({row: 5, col: 3});
        expect(rover.getDirection()).toEqual(Direction.North);
    });

    it('should backward the rover from 5,3 South to 1,3 South', function () {
        const rover = new MarsRover(new PositionDirection({row: 5, col: 3}, Direction.North), {
            maxHeight: 5,
            maxWidth: 4
        });
        rover.move([MoveCommand.Backward]);
        expect(rover.getPosition()).toEqual({row: 1, col: 3});
        expect(rover.getDirection()).toEqual(Direction.North);
    });

    it('should forward the rover from 1,1 West to 1,4 West', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 1}, Direction.West), {
            maxHeight: 5,
            maxWidth: 4
        });
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual({row: 1, col: 4});
        expect(rover.getDirection()).toEqual(Direction.West);
    });
    it('should forward the rover from 1,4 East to 1,1 East', function () {
        const rover = new MarsRover(new PositionDirection({row: 1, col: 4}, Direction.East), {
            maxHeight: 5,
            maxWidth: 4
        });
        rover.move([MoveCommand.Forward]);
        expect(rover.getPosition()).toEqual({row: 1, col: 1});
        expect(rover.getDirection()).toEqual(Direction.East);
    });
});