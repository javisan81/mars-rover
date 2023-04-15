import {useMarsRover} from "./MarsRoverHook";
import {Direction, MoveCommand} from "./MarsRoverInterface";
import {renderHook} from "@testing-library/react";

describe('MarsRoverHook', function () {
    it('should return mars rover facing west in 1,1', function () {
        const marsRover = renderHook(() => useMarsRover(1, 1)).result.current;
        expect(marsRover.getPosition()).toEqual({row: 1, col: 1});
        expect(marsRover.getDirection()).toEqual(Direction.West);
    });
    it('should return mars rover in a map of dimensions 2,2', function () {
        const marsRover = renderHook(() => useMarsRover(2, 2)).result.current;
        expect(marsRover.getPosition()).toEqual({row: 1, col: 1});
        expect(marsRover.getDirection()).toEqual(Direction.West);
        expect(marsRover.getMap()).toEqual({maxHeight: 2, maxWidth: 2})
    });
    it('should reuse the same rover', function () {
        const {result, rerender} = renderHook(() => useMarsRover(2, 2));
        result.current.move([MoveCommand.Left]);
        rerender();
        result.current.move([MoveCommand.Left]);
        expect(result.current.getDirection()).toEqual(Direction.East);
    });
});