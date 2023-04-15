import {render, screen, within} from "@testing-library/react";
import * as dimensions from "../../../dimensions/map-dimensions";
import {COLUMN_NAME, MarsView, rotationByDirection, ROW_NAME} from "./MarsView";
import * as MarsRover from "./MarsRover";
import {Direction, MoveCommand, Position} from "./MarsRover";

import userEvent from "@testing-library/user-event";
import spyOn = jest.spyOn;

const mockedUseDimensions = spyOn(dimensions, "useDimensions");
const mockedUseMarsRover = spyOn(MarsRover, "useMarsRover");

function mockDimensions(height: number, width: number) {
    mockedUseDimensions.mockReturnValue({
        height: height,
        width: width,
        isCompleted: () => true
    });
}

function expectRoverInPosition(row: number, col: number) {
    const firstRow = screen.getByLabelText(`${ROW_NAME}${row}`);
    const firstCol = within(firstRow).getByLabelText(`${COLUMN_NAME}${col}`);
    expect(within(firstCol).getByAltText("Mars Rover")).toBeInTheDocument();
}

function expectRoverFacing(direction: Direction) {
    const rover = screen.getByAltText("Mars Rover");
    expect(rover).toHaveStyle(`transform: rotate(${rotationByDirection.get(direction)})`)
}

function mockMarsRover(newPositionWhenMoving: Position, newDirection: Direction) {
    let position = {
        row: 1,
        col: 1
    };
    let direction = Direction.West;
    mockedUseMarsRover.mockReturnValue({
        move: (comands: MoveCommand[]) => {
            position = newPositionWhenMoving;
            direction = newDirection;
        },
        getPosition: () => position,
        getDirection: () => direction
    })
}

describe("MarsView", () => {
    beforeEach(() => {
        mockMarsRover({
            row: 1,
            col: 2
        }, Direction.West);
    })
    it.each([{height: 1, width: 1}, {height: 2, width: 2}, {height: 6, width: 5}])
    ("renders exactly one rover withing the surface of dimensions %p", ({height, width}) => {
        mockDimensions(height, width);
        render(<MarsView/>);
        const rows = screen.queryAllByLabelText(/Row/);
        expect(rows.length).toBe(height);
        const surfaceElements = screen.queryAllByAltText(/Mars surface/);
        expect(surfaceElements.length).toBe(height * width - 1);
        const rover = screen.queryAllByAltText(/Mars Rover/);
        expect(rover.length).toBe(1);
    });
    it('should render the rover in position 1,1', function () {
        mockDimensions(1, 1);
        render(<MarsView/>);
        expectRoverInPosition(1, 1);
    });
    describe('Moving the rover', function () {
        it('should move forward to position 1,2', function () {
            mockDimensions(2, 2);
            const {rerender} = render(<MarsView/>);
            userEvent.click(screen.getByText("Forward"));
            rerender(<MarsView/>);
            expectRoverInPosition(1, 2);
        });

        it('should move backward to position 1,3', function () {
            mockMarsRover({row: 1, col: 3}, Direction.West);
            mockDimensions(2, 3);
            const {rerender} = render(<MarsView/>);
            userEvent.click(screen.getByText("Backward"));
            rerender(<MarsView/>);
            expectRoverInPosition(1, 3);
        });
        it('should turn left', function () {
            mockMarsRover({row: 1, col: 1}, Direction.South);
            mockDimensions(2, 2);
            const {rerender} = render(<MarsView/>);
            userEvent.click(screen.getByText("Left"));
            rerender(<MarsView/>);
            expectRoverInPosition(1, 1);
            expectRoverFacing(Direction.South);
        });
        it('should turn right', function () {
            mockMarsRover({row: 1, col: 1}, Direction.North);
            mockDimensions(2, 2);
            const {rerender} = render(<MarsView/>);
            userEvent.click(screen.getByText("Right"));
            rerender(<MarsView/>);
            expectRoverInPosition(1, 1);
            expectRoverFacing(Direction.North);
        });
    });
});